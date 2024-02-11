import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpInterceptor,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // authorization 授权 vs authentication 认证
    private AUTH_HEADER = 'Authorization';
    private token = 'secretToken';
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    intercept(req: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                // 没权限，或者失效
                if (err.status === 401) {
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter((result) => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        // 设置 refreshTokenSubject 为 null，这样随后的 API 将等到新的 token 被取回时才调用。
                        this.refreshTokenSubject.next(null);

                        return this.refreshAccessToken().pipe(
                            switchMap((success: boolean) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),

                            // 当我们调用刷新 token 方法完成时，重置 refreshTokenInProgress 为 false，
                            // 这是为了下次 token 需要再次被刷新
                            finalize(() => (this.refreshTokenInProgress = false))
                        );
                    }
                } else {
                    return throwError(err);
                }
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        // 实际项目中，这里应该有个接口调用
        return of('secret token');
    }

    private addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
        // 如果没有token 应该先从存储token 的地方取回。
        // 这里如何结合 login 页面和 guard 还需要找资料
        if (!this.token) {
            return req;
        }
        // https://jsonplaceholder.typicode.com
        if (!req.url.match(/https:\/\/jsonplaceholder.typicode.com/)) {
            // if (!req.url.match(/http:\/\/localhost:4200/)) {
            return req;
        }

        return req.clone({
            headers: req.headers.set(this.AUTH_HEADER, `Bearer ${this.token}`)
        });
    }
}
