[Angular Http Communication- Brice Wilson](#top)

- [Consuming Rest Service in Angular](#consuming-rest-service-in-angular)
- [Handling HTTP errors](#handling-http-errors)
  - [handling through service](#handling-through-service)
  - [handle error with route resolvers - through retrieving data over HTTP with Resolvers](#handle-error-with-route-resolvers---through-retrieving-data-over-http-with-resolvers)
- [Interceptor](#interceptor)
  - [Create Interceptors](#create-interceptors)
  - [Caching HTTP requests with interceptors](#caching-http-requests-with-interceptors)
- [Structure of Jasmine Unit Tests](#structure-of-jasmine-unit-tests)
- [Angular HTTP Unit tests structure](#angular-http-unit-tests-structure)
  - [sample](#sample)

## Consuming Rest Service in Angular

![](https://i.imgur.com/A0aajz2.png)

```javascript
//REST API, subscribing to Observables
getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
}
//subscribe in components
ngOnInit() {
  this.dataService.getAllBooks()
    .subscribe(
      (data: Book[]) => this.allBooks = data,
      (err: any) => console.log(err),
      () => console.log('All done getting books.')
  );
}
//handle data
// filter or handle data when subscribing to Observable
getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => <OldBook>{    //map to new Objecct
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      )
  }
getBookById(id: number): Observable<Book> {
    return this.http.get<Book[]>(`${this.SERVER_URL}` + 'allBooks')
               .pipe(
                  tap( res => console.log(res)),
                  map( res => res.filter(b => b.bookID === id)
                ));
}
```

[back to top](#top)

## Handling HTTP errors

### handling through service

- Encapsulate HTTP errors in a service
- Use the RxJS “catchError” operator
- Return custom errors to components

```javascript
//create a error model - bookTrackerErrors.ts
export class BookTrackerError {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
}
//book-tracker-error-handler.service.ts
export class BookTrackerErrorService implements ErrorHandler {
  handleError(error: any): void {
    let customError: BookTrackerError = new BookTrackerError();
    customError.errorNumber = 200;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';
    console.log(customError);
  }
  constructor() { }
}
//add it to module.ts
@NgModule({
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ]
})
//using error service in other service
getAllReaders() : Observable<Reader[]> {
    return this.http.get<Reader[]>(`${this.SERVER_URL}` + 'allReaders')
               .pipe(
                 catchError(err => this.bookTrackerErrorService.handleError(err))
               );
  }
```

### handle error with route resolvers - through retrieving data over HTTP with Resolvers

```javascript
//books-resolver.service.ts
@Injectable()
export class BookResolverService implements Resolve<Book[] | BookTrackerError> {
  constructor(private dataService: DataService) { }
  //the only method be overwrite
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks()
      .pipe( catchError(err => of(err)) );
  }
}
//app-routing.module.ts
{
  path: 'dashboard',
  component: DashboardComponent,
  resolve: {resolvedBooks: BooksResolverService}
},
//update component to use resolver-dashboard.component.ts
import { ActivatedRoute } from '@angular/router';
constructor(private route: ActivatedRoute) { }
ngOnInit() {
  let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
  if (resolvedData instanceof BookTrackerError) {
     console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
  } else {
    this.allBooks = resolvedData;
  }
//...
}
```

[back to top](#top)

## Interceptor

### Create Interceptors

- Services which Implement the HttpInterceptor interface
  - ![](https://i.imgur.com/oqdSqdu.png)
- Manipulate HTTP requests/responses before they’re sent/returned
- Using for Interceptors
  - Adding header to all requests
  - Logging
  - Reporting progress events
  - Client-side caching

```javascript
//general format of interceptor
@Injectable()
export class FirstInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone();
    // change modifiedRequest here
    return next.handle(modifiedRequest)
               .pipe(
               .tap(event => {
                  if(event instanceof HttpResponse) {
                  // modify the HttpResponse here
                  }
               }));
  }
//provideing an interceptor
@NgModule({
  imports: [],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FirstInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SecondInterceptor, multi: true },
  ]
})
export class AppModule { }
```

logger

[back to top](#top)

### Caching HTTP requests with interceptors

```javascript
//1) create a cache service- http-cahce.service.ts
@Injectable()
export class HttpCacheService {
  private requests: any = {};
  constructor() { }
  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }
  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }
  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  }
  invalidateCache(): void {
    this.requests = {};
  }
}
//2) create a interceptor- cache.interceptor.ts
import { HttpCacheService } from './../services/http-cache.service';
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: HttpCacheService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    //1. pass along non-cacheable requests and invalidate cache
    //such as HTTP verbs like delete, put, post which can modify data in some way, therefore will potential render the data in one or more of cached responses invalid
    if(req.method !== 'GET'){
      console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }
    //2. attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
    //3. return cached response
    if(cachedResponse){
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }
    //4. send request to serve and add response to cache
    return next.handle(req)
               .pipe(
                 tap(event => {
                   if(event instanceof HttpResponse) {
                     console.log(`Adding item to cache: ${req.url}`);
                     this.cacheService.put(req.url, event);
                   }
                 })
               );
  }
}
//3) provideing cach interceptor in module
 providers: [
    //...
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheService, multi: true}
  ]
```

[back to top](#top)

## Structure of Jasmine Unit Tests

```javascript
describe('DataService Test Suite', () => {
  beforeEach(() => {
  // setup code run before each test
  });
  it('should do the thing I expect', () => {
  // execute some code and test result
  });
  afterEach(() => {
  // teardown code run after each test
  });
});
```

## Angular HTTP Unit tests structure

- HttpClientTestingModule
- HttpTestingController

```javascript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ DataService ]
  });
  dataService = TestBed.get(DataService);
  httpTestingController = TestBed.get(HttpTestingController);
});
it('should return the correct book', () => {
  dataService.getBookById(2)
             .subscribe(
              data => { /* test response here */ }
             );
  let req = httpTestingController.expectOne('/api/books/2');
  // test request here
  req.flush(<Book>{
    title: 'Winnie-the-Pooh',
    author: 'A. A. Milne'
  });
});
```

### sample

```javascript
describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;
  //test data
  let testBooks: Book[] = [
    { bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
    { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
    { bookID: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 }
  ];
  // before
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
 //after
  afterEach(() => {
    httpTestingController.verify();
  });
 //testing success
  it('should GET all books', () => {
    dataService.getAllBooks().subscribe((data: Book[]) => expect(data.length).toBe(3));
    const booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    expect(booksRequest.request.method).toEqual('GET');
    booksRequest.flush(testBooks);
  });
  //testing fail
  it('should return a BookTrackerError', () => {
    dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => fail('this should have been an error'),
        (err: BookTrackerError) => {
          expect(err.errorNumber).toEqual(100);
          expect(err.friendlyMessage).toEqual('An error occurred retrieving data.');
        }
      );
    const booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    booksRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });
  });
});
```

[back to top](#top)
