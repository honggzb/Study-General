## Demo-initial

- use Observable to handle HTTP/async

```javascript
getProducts(): Observable<Product[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => this.products = data),
        catchError(this.handleError)
      );
}
private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
}
```

- use BehaviorSubject to handle communication between component(product-list.component and product-edit.component)

```javascript
//product.service.ts
// define Observable source
private selectedProductSource = new BehaviorSubject<Product | null>(null);
// define Observable vaiable
selectedProductChanges$ = this.selectedProductSource.asObservable();
changeSelectedProduct(selectedProduct: Product | null): void {
    //emit result
    this.selectedProductSource.next(selectedProduct);
}
//product-list.component.ts
productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
}
//product-edit.component.ts
ngOnInit(): void {
    // ...
    // Watch for changes to the currently selected product
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.displayProduct(selectedProduct)
    );
}
```

## Demo 1

- use strongly typed state
  - State          <- app.state.ts
  - ProductState   <- product.reducer.ts
- use strongly typed action  <- product.actions.ts
  - ToggleProductCode
  - SetCurrentProduct
  - ClearCurrentProduct
  - InitializeCurrentProduct
- use strongly typed selector  <- product.reducer.ts
  - getShowProductCode
  - getCurrentProduct
  - getProducts
