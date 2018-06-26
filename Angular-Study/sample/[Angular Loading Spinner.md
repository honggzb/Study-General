[Angular Loading Spinner](#top)

- [App loading spinner](#App-loading-spinner)
  - Style loading before app startup
  - Adding Additional styles entry point
- [loader spinner on every http request](#loader-spinner-on-every-http-request)

## App loading spinner

Angular CLI Project loading queue

1. index.html
2. all scripts referenced at the end of `index.html`(sytles, inline, polyfills, vendor, main, ...)- loaded, parsed and executed.
3. angular start to execute `platformBrowserDynamic().bootstrapModule(AppModule);` statement for Just in Time (JIT) compiler or `platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);` statement for Ahead of Time (AoT) compiler
4. angular displays app component


- very small logo : convert it into base64 string and inline it directly in `index.html` like this `<img src="data:image/png;base64,...the actual data..." alt="My App Logo">`
- 2 methods
  - amount of time between displaying of index.html content and displaying Angular components after successful Angular app bootstrap
  - layout and inline styles in our index.html which will be parsed and rendered straight away even before initiating requests to load our bundle files, because browser parses index.html file in top to bottom fashion and Angular CLI injects script tags with bundle references at the end of the body just before the closing `</body>` tag

 ### Style loading before app startup
 
 Angular removes content inside of `<app-root></app-root>` after successful, we can define an spinner with inline style
 
 ```html
 <!doctype html>
<html>
  <head>
    <!-- reduced for brevity -->
    <!-- inline spinner styles to be able to display spinner right away -->
    <style type="text/css">
      body, html {
        height: 100%;
      }
      .app-loading {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .app-loading .spinner {
        height: 200px;
        width: 200px;
        animation: rotate 2s linear infinite;
        transform-origin: center center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      .app-loading .spinner .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
        stroke-linecap: round;
        stroke: #ddd;
      }
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    </style>
  </head>
  <body>
    <app-root> <!-- selector from app.component.ts -->
      <!-- loading layout replaced by app after startupp -->
      <div class="app-loading">
        <div class="logo"></div>
        <svg class="spinner" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </app-root>
  </body>
</html>
 ```
 
### Adding Additional styles entry point
 
add additional style entry in `angular-cli.json`
 
 ```Json
 {
  "...": "heavily reduced for brevity",
  "apps": [
    {
      "styles": [
        "styles-app-loading.scss",
        "styles.scss"
      ]
    }
  ]
}
 ```
 
 styles-app-loading.scss
 
 ```css
 .app-loading {
  .logo {
    width: 100px;
    height: 100px;
    background: url(./assets/logo.png) center center no-repeat; 
  }
}
 ```
 
 [back to top](#top)
 
## loader spinner on every http request
 
- loading animation on the top of page which style is defined by `loader.component.css`
- in app.component.html `<angular-loader></angular-loader>` tag
 
```
├── _factories
│   └── http-service.factory.ts
├── core
│   ├── loader
│   │   ├── loader.component.css
│   │   ├── loader.component.html
│   │   ├── loader.component.ts
│   │   ├── loader.service.ts
│   │   └── loader.ts
│   ├── angular-redux-request.options.ts
│   ├── core.module.ts
│   └── httm.service.ts
```
 
### loader component - using angular material

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';
@Component({
    selector: 'angular-loader',
    templateUrl: `
      <div [class.loader-hidden]="!show">
        <div class="loader-overlay">
          <div>
            <md-progress-bar mode="indeterminate" *ngIf="show"></md-progress-bar>
          </div>
        </div>
      </div>`,
    style: `
      .loader-hidden {
          visibility: hidden;
      }
      .loader-overlay {
          position: absolute;
          width:100%;
          top:0;
          left: 0;
          opacity: 1;
          z-index: 500000;
      }`
})
export class LoaderComponent implements OnInit {
show = false;
private subscription: Subscription;
constructor(
        private loaderService: LoaderService
    ) { }
ngOnInit() { 
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
```

### Loader service

```javascript
//loader.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader';
@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
      this.loaderSubject.next(<LoaderState>{show: true});
      }
  hide() {
      this.loaderSubject.next(<LoaderState>{show: false});
      }
}
//loader.ts - LoaderState interface which holds one boolean property
export interface LoaderState {
    show: boolean;
}
```

### Importing loader in app.module.ts

```javascript
//core.module.ts -CoreModule is imported in imports array of app.module.ts.
@NgModule({
    imports: [CommonModule,MaterialModule],
    exports: [LoaderComponent],
    declarations: [LoaderComponent],
    providers: [
        LoaderService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderService ]    
        }
    ]
})
export class CoreModule { }     //oreModule is imported in imports array of app.module.ts
```

### custom http service which extends built-in http class

```JavaScript
//http.service.ts
import { LoaderService } from './loader/loader.service';
@Injectable()
export class HttpService extends Http {
  apiUrl = '...';
  constructor(
     backend: XHRBackend,
     defaultOptions: AngularReduxRequestOptions,
     private loaderService: LoaderService     //loader
  ) { 
   super(backend, defaultOptions);
  }
  // ... 
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
   this.showLoader();       //loader
   return super.get(this.getFullUrl(url), this.requestOptions(options))
               .catch(this.onCatch)
               .do((res: Response) => {
                   this.onSuccess(res);
               }, (error: any) => {
                   this.onError(error);
               })
               .finally(() => {
                   this.onEnd();
               });
  }

  private onEnd(): void {
   this.hideLoader();
  }
  private showLoader(): void {     //Show methods
   this.loaderService.show();
  }
  private hideLoader(): void {     //Hide methods
   this.loaderService.hide();
  }
}
```

### HTTP service useFactory

custom http service which extend build-in classes are required to have service provider defined and the factory

```javascript
//http-service.factory.ts
import { XHRBackend } from '@angular/http';
import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { HttpService } from '../core/http.service';
import { LoaderService } from '../core/loader/loader.service';
function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService ) {
    return new HttpService(backend, options, loaderService);
}
export { httpServiceFactory };
```

[back to top](#top)

> [How To Style Angular Application Loading With Angular CLI Like a Boss](https://medium.com/@tomastrajan/how-to-style-angular-application-loading-with-angular-cli-like-a-boss-cdd4f5358554)
> [Show loader on every request in Angular 2](https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef)
> [Source code on GitHub](https://github.com/ivanderbu2/angular-redux)
