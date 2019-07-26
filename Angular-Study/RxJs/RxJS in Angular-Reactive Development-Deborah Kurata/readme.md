[RxJS in Angular: Reactive Development - Deborah Kurata](#top)

- [General Concepts](#general-concepts)
  - [Processing Observable Streams](#processing-observable-streams)
  - [Working with Observable in Angular](#working-with-observable-in-angular)
- [RxJs Operators](#rxjs-operators)
  - [Cold Observable vs Hot Observable](#cold-observable-vs-hot-observable)
  - [Opertators](#opertators)
- [Using in Project Sample](#using-in-project-sample)
  - [Common parttern of async pipe](#common-parttern-of-async-pipe)
  - [Handling Error](#handling-error)
  - [declarative pattern for data retrieval](#declarative-pattern-for-data-retrieval)
- [Mapping Returned Data](#mapping-returned-data)
- [Combining Streams](#combining-streams)
  - [Reacting to Actions(data stream vs action stream)](#reacting-to-actionsdata-stream-vs-action-stream)
  - [Reacting to actions 1 - Filter a Stream](#reacting-to-actions-1---filter-a-stream)
  - [Reacting to actions 2 - react to selections](#reacting-to-actions-2---react-to-selections)
  - [Reacting to actions 3 - react to error](#reacting-to-actions-3---react-to-error)
  - [Reacting to actions 4 - react to an Add operation](#reacting-to-actions-4---react-to-an-add-operation)
- [Caching Observable](#caching-observable)
- [Higher-order Mapping Operators](#higher-order-mapping-operators)
- [Combining all the streams](#combining-all-the-streams)
- [two way of combine streams](#two-way-of-combine-streams)
  - [Multiple Async pipes](#multiple-async-pipes)

## General Concepts

![](https://i.imgur.com/ghY2dM5.png)

- RxJS is a library for composing asynchronous and event-based programs by using observable sequences
- Functional reactive programming is to specify the dynamic behavior of a value completely at the time of declaration
  - quick to react to user interactions
  - resilient to failure
  - reactive to state changes

![](https://i.imgur.com/oHGm5UJ.png)

![](https://i.imgur.com/WUbRilK.png)

### Processing Observable Streams

```
start the stream                           | calling subscribe()
  - Emit items into the stream             |  - Emits items
Items pass through a set of operations     | Pipe through a set of operations
As an Observer                             | Observer
  - next item, process it                  |  - next()
  - Error occurred, handle it              |  - error()
  - Complete                               |  - complete()
Stop the stream                            | Unsubscribe
```

![](https://i.imgur.com/wV6W5Ex.png)

### Working with Observable in Angular

1. Create an Observable in Angular
   - Constructor
   - creation functions
     - of, from
   - Returned from an angular feature
     - Forms: valueChanges
     - Routing: paramMap
     - Http: get
     - ...
2. Start an Observable in Angular
   - call subscribe
   - Pass in an Observer
     - next(), error(), complete()
3. Stopping an Observable in Angular
   - call complete() on the Observer
   - use a creation function that completes
     - of, from, ...
   - use an operator that completes
     - take, ...
   - throw an error
   - call unsubscribe() on the Subscription
     - `sub.unsubscribe();`

![](https://i.imgur.com/yQ6TRl0.png)

```javascript
//using of, from
const appleStream = of('Apple1', 'Apple2');
const appleStream = from(['Apple1', 'Apple2']);
//sample
//sample 1: create Observable from Event
@ViewChild('para') par: ElementRef;
ngAfterViewInit(){
  const parStream = fromEvent(this.par.nativeElement, 'click').subscribe(console.log);
}
//sample 2: create Observable from interval
const num = interval(1000).subscribe(console.log);
```

[back to top](#top)

## RxJs Operators

### Cold Observable vs Hot Observable

![](https://i.imgur.com/7Jfx65c.png)

### Opertators

function|RxJS Operators| others
---|---|---
creation Function|`combineLatest`| `import from 'rxjs';`
debugging Observables| `tap`|
combination Operators(Array)|`combineLatest`, `forkJoin`, `withLatestFrom`|don't emit until each source stream emits at least once
require input Observables| `forkJoin`, `toArray` | take care when using them in action streams, which often don't complete

```javascript
of(2,4,6,8)
  .pipe(
    map(item => item * 2),
    tap(item => console.log(item),
    take(2)
  ).subscribe(console.log);
```

[back to top](#top)

## Using in Project Sample

### Common parttern of async pipe

![](https://i.imgur.com/ykVDEdX.png)

 `<li *ngFor="let product of products | async"></li>`

```html
<div *ngIf="product$ | async as products">
  <table>
    <tr *ngFor="let product of products">...</tr>
  </table>
</div>
<script>
product$: Observable<Product[]>;
constructor(private productService ProductService){}
ngOninit(){
  this.product$ = this.productService.getProducts();
}
</script>
```

### Handling Error

- catchError, throwError, Empty

![](https://i.imgur.com/25SkV3H.png)

1. Catch and Replace

- An observable that emits an alternate set of data
- EMPTY: An observable that emits an empty set

```javascript
//product service
return this.http.get<Product[]>(this.productUrl)
                .pipe(
                  catchError(err => {
                    console.log(err);
                    return of([{id: 1, productName: 'cart'},
                               {id: 2, productName: 'hammer'}]);
                  })
                );
//pruduct-list.component
ngOnInit(){
  this.productService.getProducts()
      .subscribe(
        products => this.products = products,
        err => this.errorMessage = err
      );
}
```

1. Catch and throw

```javascript
//product service
return this.http.get<Product[]>(this.productUrl)
                .pipe(
                  catchError(err => {
                    console.log(err);
                    return throwError(err);
                  })
                );
```

3. Catch and Empty

```javascript
//pruduct-list.component
this.product$ = this.productService.getProducts()
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
```

### declarative pattern for data retrieval

Benifit of Declarative pattern

- Levarages the power of RxJS observables and operators
- Effectively combine streams
- Easily share observables
- Readily react to actions(user interaction)

![](https://i.imgur.com/UJCtFAn.png)

[back to top](#top)

## Mapping Returned Data

- Mapping an HTTP response
- Mapping array elements

```javascript
products$ = this.http.get<Product[]>(this.productsUrl)
      .pipe(
          map(products =>   //Mapping Returned Data
            products.map(product => ({  //mapping and transforming Array Element
              // id: product.id,
              // productName: product.productName,
              // productCode: product.productCode,
              // description: product.description,
              ...product,
              price: product.price * 1.5,
              searchKey: [product.productName]
            }) as Product )),
          tap(data => console.log('Products: ', JSON.stringify(data))),
          catchError(this.handleError));
```

[back to top](#top)

## Combining Streams

- map id to a string
- work with multiple data sources
- react to actions
- simplify template code
- RxJS Features: `combineLatest`, `forkJoin`, `withLatestFrom`
- Types of combination Operators/Functions
  - ![](https://i.imgur.com/CdMS2uL.png)
- Combining Observable Streams
  - ![](https://i.imgur.com/KWFC7Jo.png)

![](https://i.imgur.com/jMfIE4D.png)


- Sample: mapping an categoryId to Category name(string)

![](https://i.imgur.com/rclrFtQ.png)

[back to top](#top)

### Reacting to Actions(data stream vs action stream)

### Reacting to actions 1 - Filter a Stream

- **Data stream**
  - RxJS Operation: `filter`

![](https://i.imgur.com/UsOC296.png)

- **Action Stream**
  - Use a built-in stream(such as http)
  - fromEvent
  - `Subject`/`BehaviorSubject`(have initial value)
- Unicast vs Multicast
  - ![](https://i.imgur.com/Ym4xe8h.png)
- initial value
  - startWith: `this.categorySelectedAction$.pipe(startWith(0))`
  - BehaviorSubject:  `private categorySelectedSubject = new BehaviorSubject<number>(0);`
- **steps of reacting to actions**
  - ![](https://i.imgur.com/HPTkK2b.png)

RxJS operator| Features
---|---
filter| only emits items that match criteria
startWith | defines an initial value emitted before the input stream values
subject| special type of Observable that is both an Observable and Observer
behaviorSubject| special type of subject that emits an intial value

- Action stream created with a `subject`does not immediately emit, it need be subscribe
- when combining with an action stream, consider using `behaviorSubject` since it emits a default value

[back to top](#top)

### Reacting to actions 2 - react to selections

```javascript
//product.service.ts
private productSelectedSubject = new BehaviorSubject<number>(1);
productSelectedAction$ = this.productSelectedSubject.asObservable();
selectedProduct$ = combineLatest(
      [this.productsWithCategory$, this.productSelectedAction$])
    .pipe(
      map(([products, selectedProductId]) =>
          products.find( product => product.id === selectedProductId)),
      tap(product => console.log('selectdProduct', product))
    );
selectedProductChanged(selectProductId: number): void{
    this.productSelectedSubject.next(selectProductId);
}
```

[back to top](#top)

### Reacting to actions 3 - react to error

```javascript
//xxx.component.ts
private errorMessageSubject = new Subject<string>();
errorMessage$ = this.errorMessageSubject.asObservable();
products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        //this.errorMessage = err;
        this.errorMessageSubject.next(err);
        return EMPTY;
    })
  );
<div class="alert alert-danger" *ngIf="errorMessage$ | async as errorMessage">
  {{errorMessage}}
</div>
```

[back to top](#top)

### Reacting to actions 4 - react to an Add operation

![](https://i.imgur.com/qod3y3L.png)

![](https://i.imgur.com/FSa4nJK.png)

```javascript
//product.service.ts
private productInsertedSubject = new Subject<Product>();
productInsertedAction$ = this.productInsertedSubject.asObservable();
productsWithAdd$ = merge(this.productsWithCategory$, this.productInsertedAction$)
  .pipe(
    scan((acc: Product[], value: Product) => [...acc, value])
  );
addProduct(newProduct?: Product){
  newProduct = newProduct || this.fakeProduct();
  this.productInsertedSubject.next(newProduct);
}
```

[back to top](#top)

## Caching Observable

- retain retrieved data locally
- reuse previously retrieved data
- storedd in memory or external

![](https://i.imgur.com/lFe7Jba.png)

```javascript
//1) caching categories
// product-category.service.ts
productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
                           .pipe(
                             tap(data => console.log('categories', JSON.stringify(data))),
                             shareReplay(1),
                             catchError(this.handleError)
                           );
//product.service.ts
productsWithCategory$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 1.5,
        category: categories.find(c => product.categoryId === c.id).name,
        searchKey: [product.productName]
      }) as Product)
    ),
    shareReplay(1)
  );
//caching selected Product
selectedProduct$ = combineLatest(
    [this.productsWithCategory$, this.productSelectedAction$])
  .pipe(
    map(([products, selectedProductId]) =>
        products.find( product => product.id === selectedProductId)),
    tap(product => console.log('selectdProduct', product)),
    shareReplay(1)
  );
```

[back to top](#top)

## Higher-order Mapping Operators

- ![](https://i.imgur.com/jFj03fH.png)
- RXJS Higher-order Mapping Operators
  - xxxMap(): concatMap, mergeMap, switchMap
  - Map each value(emitted items) to a new Observable
    - from a source(outer) Observable
    - to a new(inner) Observable
  - **Automatically subscribe/unsubscribe from inner Observables**
  - **Emit the resulting values to the output Observable**
  - Use instead of nested subscribes

![](https://i.imgur.com/tWpiwCH.png)

Operators| difference
---|---
concatMap| **Waits** for inner Observable to complete before processing the next one
mergeMap| processes inner Observable **in parallel**
swithcMap | **unsubscribes** fro mthe prior inner Observable an **switchs** to the new one

[back to top](#top)

## Combining all the streams

## two way of combine streams

- ![](https://i.imgur.com/GpWbt1E.png)
- Get it all
  - get all data from the related dataset
  - find the related items in that dataset
- Just in time
  - ![](https://i.imgur.com/GxAW0ij.png)

```javascript
// Get it all
 selectedProductSuppliers$ = combineLatest(
      [this.selectedProduct$, this.supplierService.suppliers$])
    .pipe(
      map(([selectedProduct, suppliers]) =>
        suppliers.filter(
          supplier => selectedProduct.supplierIds.includes(supplier.id))
      )
    );
// just in time
selectedProductSuppliers$ = this.selectedProduct$
    .pipe(
      // return true if item is true,
      // return false if item is undefined, null or undefined
      filter(selectedProduct => Boolean(selectedProduct)),
      //use switchMap instead of mergeMap in case of use click product very quickly
      switchMap(selectedProduct =>
        from(selectedProduct.supplierIds)
          .pipe(
            mergeMap( supplierId => this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`) ),
            toArray(),
            tap(suppliers => console.log('Product suppliers', JSON.stringify(suppliers)))
          ))
      );
```

### Multiple Async pipes

![](https://i.imgur.com/1Sv5nyT.png)



[back to top](#top)

> Reference
- https://www.learnrxjs.io/
- https://rxjs-dev.firebaseapp.com/guide/overview
- https://github.com/DeborahK/Angular-Rxjs
- https://stackblitz.com
