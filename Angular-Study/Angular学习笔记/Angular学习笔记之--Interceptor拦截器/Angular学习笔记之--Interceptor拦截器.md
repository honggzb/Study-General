[Angular中使用HttpInterceptor拦截器的方式](#top)

- [Authentication](#authentication)
- [自动刷新Token](#自动刷新token)
- [处理Http请求头](#处理http请求头)
- [处理Http响应 (Http Response)](#处理http响应-http-response)
- [Http错误处理 (Http Error)](#http错误处理-http-error)
- [Converting](#converting)
- [使用HttpIntercetpor](#使用httpintercetpor)

-----------------------------------------------------

- ![Angular interceptors](../images/Angular-interceptors.png)
- 拦截器在实战中的作用有很多，比如：统一配置网关地址，设置Http请求头，处理Http请求返回数据，统一错误处理等都是常见的需求
- Loader
- Converting
- Headers
  - Authentication/authorization
  - Caching behavior; for example, If-Modified-Since
  - XSRF protection
- Notifications
- Errors: check the status of the exception
- Profiling: such as log the outcome with the elapsed time
- Fake backend: A mock or fake backend can be used in development when you do not have a backend yet
- Caching:  **increases performance**

## Authentication

- Authentication
  - Add bearer token
  - Refresh Token
  - Redirect to the login page

```javascript
//sample 1 - add token to request
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const newCloneRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(newCloneRequest);
  }
//sample 2
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;
            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);
            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {               
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshTokenInProgress = false)
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
  private refreshAccessToken(): Observable<any> {
    return of("secret token");
  }
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    if (!request.url.match(/www.mydomain.com\//)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
```

[⬆ back to top](#top)

## 自动刷新Token

![JWT token流程](../images/token流程.png)

```javascript
// 1. Token解析与存储
interface JWT {
    sub: string;
    iat: number; // Token 生成时间戳
    exp: number； // Token 过期时间戳
}
// 2. 创建一个拦截器refresh-token.interceptor.service.ts
export RefreshTokenInterceptor implements HttpIntercetpor {
  //refreshTokenSubject声明
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  // shouldRefreshToken 的实现：
  get shouldRefreshToken() {
      const token = localStorage.getItem('token');
      if(token) {
        const tokenObj = JSON.parse(atob(token.splice('.')[1]));
        const maxAge = (tokenObj.exp - tokenObj.iat) * 1000 - 3000; // 生命周期 - 3秒，留点buffer，避免 token太小的极端情况导致过期。
        const shift = Math.floor(maxAge / 2); // 刷新token时间设定为token过期时间的一半
        const lastModify = localStorage.getItem('tokenLastModify');
        if (lastModify) {
            return (new Date().getTime() - Number(LastModify) > maxAge - shift); 
        } else {
            return true;
        }
      } else {
        return true;
      }
   }
  constructor () {}
  //实现intercept
  intercept(req: HttpRequest, next: HttpHandler): Observable> { 
    const  { url } = req;
    if (this.shouldRefreshToken && isNotRefreshTokenApi) { //refres token的API不需要这个逻辑，直接请求就可以了，否则循环调用 refresh token API。
        if (!this.refreshTokenInProgress) {  //refreshTokenInProgress：这个变量用于标记当前是否有获取token的动作在进行中，当这个值为true 的时候其他的API将不会重复请求refresh token
            this.refreshTokenInProgress = true;  
            this.refreshTokenSubject.next(null);  //refreshTokenSubject  置空，拦截当前请求；
            //  重新获取token，得到新的token之后, 使用新token发送原始请求。
            return this.refreshToken().pipe(
                switchMap((resp) => {
                    this.storageService.setStorage({  //跟新storage
                        ... resp, 
                        tokenLastModify: new Date().getTime(),  //更新token刷新时间。
                    });
                    this.refreshTokenSubject.next(resp.token);  //refreshTokenSubject返回非null 值， 放行其他的API
                    return next.handle(this.injectTOken(req)); //injectTOken() 方法实现替换新token， 这里将使用新token发送原始请求
                  })，
                  catchError(errorRes => this.handlError(errorRes)),
                  finalize(() => {
                        this.refreshTokenInProgress = false; //最终必须要还原 refreshTokenInProgress状态，否则会阻止后面的请求通过。
                  }) 
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),  //这个过滤器就实现当有请求token的进程发生，挂起其他请求的作用。
                take(1),
                switchMap(() => {
                    return next.handle(this.injectToken(req));
                })
            )
        }
    } else {
        return next.handle(req);
    }
}
// 3. 注入到AppModule(app.module.ts)中
{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
```

- 利用 `refreshTokenSubject.next(null)` 来阻止后面的其他http请求被真正发出（其他的API 会进入下面的 else 条件中，进而被 ` fileter(result => result !== null)` 过滤掉，不执行 `next.handle()`方法）， 而当前的这次请求会先请求刷新token的API， 当拿到新的token 存入storage并跟新获得token的时间戳，在token更新之后  执行  `this.refreshTokenSubject.next(resp.token)`，可以告知其他的API token已经刷新 ，其他的API 就会使用新token 继续之前的请求。最终，当前的请求会通过  `return next.handle(this.injectTOken(req))`带上新token真正发送Http请求。

[⬆ back to top](#top)

## 处理Http请求头

- HttpInterceptor是Angular提供用于在全局应用程序级别处理HTTP请求的内置工具，拦截并处理HttpRequest或HttpResponse
- ![httpclient拦截流程](../images/httpclient拦截流程.png)

```javascript
// sample 1 - addToken
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(req, 'bearer my token'));
    }
    //为所有的请求加上token信息
    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: token } });
    }
}
// 应用在其他component, service
constructor(private httpClient: HttpClient) {
        this.httpClient.get('/assets/json/data.json').subscribe(ret => {
            // TODO:
        });
    }
//
// Headers.interceptor.ts
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          request = request.clone({
            setHeaders: {
            Authorization: `Bearer ${user.token}`
            }})
        }
      }
    })
    return next.handle(request);
  }
// sample 2 - add XSRF protection
const modified = req.clone({ 
  setHeaders: { "X-Man": "Wolverine" } 
});
return next.handle(modified);
```

[⬆ back to top](#top)

## 处理Http响应 (Http Response)

```javascript
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
           //当返回的数据状态是200的时候，只返回body中需要的data数
            filter(event => event instanceof HttpResponse && event.status === 200),
            map((event: HttpResponse<any>) => event.clone({ body: event.body.data }))
        );
    }
}
```

[⬆ back to top](#top)

## Http错误处理 (Http Error)

```javascript
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                switch (error.status) {
                    case 401: // Unauthorized
                        // todo
                        break;
                    case 403: // Forbidden
                        // todo
                        break;
                    default:
                        // todo
                        return throwError(error);
                }
            }),
            retry(3)
        );
    }
}
//error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error) {
          if(error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if(error.status === 401) {
            this.router.navigateByUrl('/not-authenticated');
          }
          if(error.status === 500) {
            //this.toastr.error(“unauthorized”, error.status.toString())
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
```

[⬆ back to top](#top)

## Converting

- converting from XML to JSON
- converting from PascalCase to camelCase

```ts
return next.handle(req).pipe(
  map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      let camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k));
      const modEvent = event.clone({ body: camelCaseObject });
      
      return modEvent;
    }
  })
);
```

[⬆ back to top](#top)

## 使用HttpIntercetpor

```ts
// app.module.ts
providers: [
  { provide: HTTP_INTERCEPTORS,useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
]
```

[⬆ back to top](#top)

- [在 Angular 中使用拦截器的方式 Top 10](https://juejin.cn/post/6911614350067236871)
- [GitHub 示例代码 10.x版本](https://github.com/llccing-demo/ng-interceptors)
- [GitHub 示例代码 8.x版本](https://github.com/melcor76)

> references
- [Angular HttpInterceptor拦截器 多情景应用](https://www.jianshu.com/p/8b080a2587c2)
- [HttpInterceptor官方链接](https://angular.io/guide/understanding-communicating-with-http#http-interceptors)
- [基于Angular Http Interceptor(拦截器)实现自动刷新Token](https://www.jianshu.com/p/1db9c9f294a3)
- [【Angular中的HTTP请求】- 拦截器 HttpInterceptor 详解](https://blog.csdn.net/evanyanglibo/article/details/122368884)
- [Angular使用Interceptor(拦截器)请求添加token并统一处理API错误](https://blog.csdn.net/donjan/article/details/103592341)
- [HttpInterceptor 101](https://juejin.cn/post/6911614350067236871)
- [Angular — Interceptors for Errors and Headers](https://medium.com/nerd-for-tech/angular-interceptors-for-errors-and-headers-a35372f4304b)
- [Top 10 ways to use Interceptors in Angular](https://medium.com/angular-in-depth/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6)
- [Advanced caching with RxJS](https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html)
