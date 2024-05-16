[Angular学习笔记之--Global Error Handling](#top)

- [Global Error Handling](#global-error-handling)
- [HTTP Global Error Handling](#http-global-error-handling)

---------------------------------------------------------------------------------------

## Global Error Handling

- create a service implements `ErrorHandler`(global-error-handler.ts)
- Triggler an error when using `throw Error()`

```ts
// global-error-handler.ts
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this.errorDialogService.openDialog(
        error?.message || 'Undefined client error',
        error?.status
      )
    );
    console.error('Error from global error handler', error);
  }
}
// trigger when use throw Erroe() method] in other component
localError() {
  throw Error("The app component has thrown an error!");
}
```

][back to top](#top)

## HTTP Global Error Handling

- create a HTTP Loading Interceptor, Interceptor is called automatically on every HTTP request that is made through application
- Interceptor implements `HttpInterceptor`
- Interceptor provided the method `intercept`

```ts
// HTTP Loading Interceptor
@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    constructor(private loadingDialogService: LoadingDialogService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingDialogService.openDialog();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingDialogService.hideDialog();
            })
        ) as Observable<HttpEvent<any>>;
    }
}
// inject Interceptor] in core module
 providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
  ]
```

][back to top](#top)

> references
- [Global Error Handling in Angular]](https://pkief.medium.com/global-error-handling-in-angular-ea395ce174b1)
  - https://github.com/PKief/angular-global-error-handling
- [Error Handling with Angular 8 – Tips and Best Practices](https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/)
