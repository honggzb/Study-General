- [Demo-initial](#demo-initial)
- [Demo 1](#demo-1)
- [Demo 2 - effect to handle async HTTP](#demo-2---effect-to-handle-async-http)
  - [add actions](#add-actions)
  - [add reducer](#add-reducer)
  - [define effect - product.effect.ts](#define-effect---producteffectts)
- [Demo 3 - Refracture and Improvement](#demo-3---refracture-and-improvement)

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

## Demo 2 - effect to handle async HTTP

### add actions

- Load
- LoadSuccess
- LoadFail
- UpdateProduct
- UpdateProductSuccess
- UpdateProductFail
- CreateProduct
- CreateProductSuccess
- CreateProductFail
- DeleteProduct
- DeleteProductSuccess
- DeleteProductFail

### add reducer

```javascript
export function reducer(state=initalState, action: ProductActions): ProductState {
  switch(action.type) {
    //...no Load, Update, CreateProduct, DeleteProduct, it should use in effect
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
      item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };
    // add to products after create
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };
     // After a delete, the currentProduct is null.
    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
```

### define effect - product.effect.ts

## Demo 3 - Refracture and Performance Improvements 

- Container and Presentational Components
  - move all dispatch method to container(product-shell component)
  - just use input/output in presentation component(product-list and product-edit components)
- add index.ts, move all state and selector to index.ts

```
├── app
│   ├── home/
│   │   ├── menu.component.html
│   │   ├── menu.component.ts
│   │   ├── page-not-found.component.ts 
│   │   ├── shell.component.html 
│   │   ├── shell.component.ts
│   │   ├── welcome.component.html 
│   │   └── welcome.component.ts 
│   ├── products/
│   │   ├── components/
│   │   │   ├── product-edit/
│   │   │   └── product-list/
│   │   ├── container/
│   │   │   ├── product-shell.component.html
│   │   │   └── product-shell.component.ts
│   │   ├── state/
│   │   │   ├── product.actions.ts
│   │   │   ├── product.effect.ts
│   │   │   ├── product.reducer.ts
│   │   │   └── index.ts
│   │   ├── product-data.ts
│   │   ├── product.module.ts
│   │   ├── product.service.ts
│   │   └── product.ts
│   ├── shared/
│   │   ├── generic-validator.ts
│   │   ├── number.validator.ts
│   │   └── shared.module.ts
│   ├── state/
│   │   └── app.state.ts
│   ├── user/
│   │   ├── state/
│   │   │   ├── user.actions.ts
│   │   │   ├── user.reducer.ts
│   │   │   └── index.ts
│   │   ├── auth-guard.service.ts
│   │   ├── auth.service.ts
│   │   ├── login.component.css
│   │   ├── login.component.html
│   │   ├── login.component.ts
│   │   ├── user.module.ts
│   │   └── user.ts
│   ├── app-routing.module.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   └── app.module.ts
```
