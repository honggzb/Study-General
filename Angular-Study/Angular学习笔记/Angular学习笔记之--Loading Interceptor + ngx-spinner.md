[Loading Interceptor + ngx-spinner](#top)

- [setup for ngx-spinner](#setup-for-ngx-spinner)
- [create loading services](#create-loading-services)
- [create a loading interceptor](#create-a-loading-interceptor)
- [using in component](#using-in-component)

--------------------------------------------------------------

## setup for ngx-spinner 

1. `npm install ngx-spinner@15.0.1 --save`
   - note: using appropriate version based on your Angular version, [ngx-spinner](https://www.npmjs.com/package/ngx-spinner)
2. add Add css animation files to 'angular.json' config
   - `"styles": [ "node_modules/ngx-spinner/animations/ball-scale-multiple.css" ]`
3. Import `NgxSpinnerModule` in in the root module(`AppModule`)
   1. `import { NgxSpinnerModule } from "ngx-spinner";`
   2. `imports: [ NgxSpinnerModule, ... ]`
   3. `import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";`
   4. `schemas: [CUSTOM_ELEMENTS_SCHEMA],`

[⬆ back to top](#top)

## create loading services

- `ng g s core/services/loading`

```ts
// loading.service.ts
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingReqCount = 0;
  constructor(private spinnerService: NgxSpinnerService) { }
  loading() {
    this.loadingReqCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-scale-multiple',
      bdColor: 'rgba(255, 255, 255,0.7)',
      color: '#333333',
    });
  }
  idle() {
    this.loadingReqCount--;
    if(this.loadingReqCount <= 0) {
      this.loadingReqCount = 0;
      this.spinnerService.hide();
    }
  }
}
```

## create a loading interceptor

- `ng g interceptor interceptors/loading`

```ts
import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,  HttpEvent, HttpInterceptor } from '@angular/common/http';
import {delay, Observable, finalize } from 'rxjs';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.loading();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.loadingService.idle();
      })
    );
  }
}
```

[⬆ back to top](#top)

## using in component

```html
<ngx-spinner>
  <h1>Fetching results...</h1>
</ngx-spinner>
<app-navbar></app-navbar>
```

[⬆ back to top](#top)
