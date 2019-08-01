[Angular NgRx: Getting started](#top)

- [Redux Pattern](#redux-pattern)
- [Installing, initializing and using](#installing-initializing-and-using)
  - [installing](#installing)
  - [Developer Tools and Debugging](#developer-tools-and-debugging)
  - [initializing store with reducer](#initializing-store-with-reducer)
  - [Simple implementation](#simple-implementation)
- [Strongly Typing State](#strongly-typing-state)
  - [Define interfaces for slices of state](#define-interfaces-for-slices-of-state)
  - [Build selectors](#build-selectors)
  - [using a Selector](#using-a-selector)
  - [Composing Selectors](#composing-selectors)
- [Strongly typing action](#strongly-typing-action)
  - [Creating strongly typing actions](#creating-strongly-typing-actions)
  - [using strongly typing action in reducer](#using-strongly-typing-action-in-reducer)
- [Effect](#effect)
  - [install NgRx effects Library](#install-ngrx-effects-library)
  - [Defining an effect](#defining-an-effect)
  - [Registering an effect](#registering-an-effect)
  - [Using an Effect in components](#using-an-effect-in-components)
  - [Unsubscribe the store](#unsubscribe-the-store)
  - [Using Async Pipe](#using-async-pipe)
  - [Exception Handling in Effects](#exception-handling-in-effects)
  - [Implementation of Update a Product](#implementation-of-update-a-product)
- [Architectural Considerations](#architectural-considerations)
  - [Whole architecure](#whole-architecure)
  - [General steps](#general-steps)
  - [Presentational and Container Component](#presentational-and-container-component)
  - [Other NgRx Library](#other-ngrx-library)

---------------------------------------

- [Duncan Hunter](https://duncanhunter.com.au/)
- [Deborah Kurata](https://blogs.msmvps.com/deborahk/angular-ngrx-getting-started-problem-solver/)
- https://github.com/DeborahK/angular-NgRx-GettingStarted


```shell
npm i bootstrap --save
npm i angular-in-memory-web-api --save-dev
```
-------------------------------

## Redux Pattern

- Single source of truth called the **store** -> json database
  - did not include to store
    - unshared state
    - angular form state
    - non-serializabld state
- State is read only and **only** changed by **dispatching actions**
- Changes are made using pure functions called **reducers**
  - pure functions always return consistent result
  - pure functions will not mutate or access properties outside of function

![](https://i.imgur.com/zCXInZd.png)

```javascript
//reducer, two parameters
function reducer(state, action){
    switch(action.type){
        case 'LOAD_USER':
            return { users: [...state.users, action.payload]};
    }
}
// pure function vs impure function
Pure Function                     | impure Function
function sum(a, b){               | let c = 1;
    const result = a + b;         | function sum(a, b){
    return result;                |     result = a + b + c;
}                                 |     return result;
                                  | }
```

**Advantages**

- Centralized immutable state
- Performance
- Testability
- Tooling
- Component communication

[back to top](#top)

## Installing, initializing and using

### installing

`npm i @ngrx/store --save`

### Developer Tools and Debugging

1. Install browser Redux DevTools extension
2. Install `@ngrx/store-devtools`
3. Initialize `@ngrx/store-devtoolsmodule`

```javascript
//app.module.ts
//1) add import
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
//2) initalize storeDevToolsModule
@NgModule({
  //...
  imports: [
    //...
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo DevTools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  //...
})
```

### initializing store with reducer

![](https://i.imgur.com/zM02XRK.png)

```javascript
//app.module.ts
import { StoreModule } from '@ngrx/store';
@NgModule({
  //...
  imports: [
    //...
    StoreModule.forRoot({})
  ],
  //...
})
//product.module.ts
@NgModule({
  declarations: [ProductListComponent, ProductEditComponent, ProductShellComponent],
  imports: [
    //...
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', {})
  ]
})
```

### Simple implementation

1. create a reducer- `app\products\state\product.reducer.ts`
2. add `product` state  <-  `this.store.select('products')`
3. action ->  dispatching an action state
   1. change state and store to reducer
4. action ->  subscribing it to state changes

![](https://i.imgur.com/AT4Wo6D.png)

```javascript
//1) create product reducer, /app/product/store/product.reducer.ts
export function reducer(state, action){
  switch(action.type){
    case 'TOGGLE_PRODUCT_CODE':
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return{
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
//2) add reducer to products.module.ts
@NgModule({
  //...
  imports: [
    //...
    StoreModule.forFeature('products', reducer)
  ]
})
// 3) implement reducer to \app\products\product-list\product-list.component.ts
constructor(private productService: ProductService, private store: Store<any>) { }
//
ngOnInit() {
    //...
    //add product to store
    //subscribe
    this.store.pipe(select('products')).subscribe(
      products => {
        if(products) {
          this.displayCode = products.showProductCode;
        }
    });
  }
//dispatch
checkChanged(value: boolean): void {
    //this.displayCode = value;
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }
```

[back to top](#top)

## Strongly Typing State

### Define interfaces for slices of state

   ![](https://i.imgur.com/KSvw2o2.png)

   1. **extending the state interface for lazy loaded modules**

   ```javascript
   //remove some codes in app.state.ts
    //import { ProductState } from './../products/state/product.reducer';   //remove
    export interface State {
        //products: ProductState;   //remove
        users: any;
    }
    //add some codes in product.reducer.ts
    import * as fromRoot from '../../state/app.state';
    export interface State extends fromRoot.State{
        products: ProductState;
    }
   ```

2. Use the interfaces for strong typing
3. Set initial state values
![](https://i.imgur.com/aYK3L8U.png)

```javascript
//product-list.component.ts
//import tyepe
import * as fromProduct from '../state/product.reducer';
// add type to store
constructor(private productService: ProductService, private store: Store<fromProduct.State>) { }
// can remove condition of products
this.store.pipe(select('products')).subscribe(
      products => {
        //if(products) {   //can be remove
          this.displayCode = products.showProductCode;
        //}
    });
```

### Build selectors

- benefits of selector
  - provide a strongly typed API
  - decouple the store from the components
  - encapsulate complex data transformations
  - reusable
  - memoized(cache)
- ways to create selector
  - createFeatureSelector: global
  - createSelector:        in details

    ![](https://i.imgur.com/MdHAZj5.png)
    ![](https://i.imgur.com/80mLYrH.png)

```javascript
//product.reducer.ts
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
```

### using a Selector

```javascript
//product-list.component.ts
import * as fromProduct from '../state/product.reducer';
this.store.pipe(select(fromProduct.getShowProductCode))
          .subscribe(showProductCode => this.displayCode = showProductCode);
```

### Composing Selectors

![](https://i.imgur.com/UH2Uqwu.png)

[back to top](#top)

## Strongly typing action

- prevents hard to find errors
- improves the tooling experience
- documents the set of valid actions

### Creating strongly typing actions

1. Define the action types as named constants: new file named `product.actions.ts`

```javascript
//1) define a enum - the action types as named constants
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product'
}
// 2)create different action strongly type -Build the action creators
export class ToggleProductCode implements Action {
  // readonly
  readonly type = ProductActionTypes.ToggleProductCode;
  constructor(public payload: boolean){}
}
export class SetCurrentProduct implements Action {
  // readonly
  readonly type = ProductActionTypes.SetCurrentProduct;
  constructor(public payload: Product){}
}
// 3) union output type by union pipe operator: Define a union type for those action creators
export type ProductActions = ToggleProductCode | SetCurrentProduct;
```

2. Build the action creators
3. Define a union type for those action creators

```javascript
//product.reducer.ts
switch(action.type){
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
```

[back to top](#top)

### using strongly typing action in reducer

```javascript
//product-list.component.ts
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
ngOnInit() {
    // 3) select state with selector
    this.store.pipe(select(fromProduct.getProducts)).subscribe(
      (products: Product[]) => this.products = products
    );
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode );
  }
checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
}
newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
}
productSelected(product: Product): void{
    this.store.dispatch(new productActions.SetCurrentProduct(product));
}
```

[back to top](#top)

## Effect

### install NgRx effects Library

- `npm install @ngrx/effects --save`
- manage side effects to keep components and reducer pure
  - Effects help isolate side effects into a central place, and effects make it easier to test side effects in isolation from the components that use them
  - side effect is an operation that depends on or interacts with an external source, such as external state, devices, or an API
- effects take an action, do some work and dispatch a new action
  - can't even dispatch actions from a reducer, there's no constructor in reducer

![](https://i.imgur.com/Rk09Nzb.png)

**Adding new actions- Load, LoadSuccess, LoadFail**

- Load:   filter by loadProduct effect
- LoadSuccess, LoadFail: work for loadProduct effect

```javascript
//product.actions.ts
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail'
}
export class Load implements Action {
  // readonly
  readonly type = ProductActionTypes.Load;
  // no payload for Initalize, we can delete constructor
}
export class LoadSuccess implements Action {
  // readonly
  readonly type = ProductActionTypes.LoadSuccess;
  constructor(public payload: Product[]) {}
}
export class LoadFail implements Action {
  // readonly
  readonly type = ProductActionTypes.LoadFail;
  constructor(public payload: string) {}
}
//union output type by union pipe operator
export type ProductActions = ToggleProductCode | SetCurrentProduct |ClearProductCode | InitializeCurrentProduct | Load | LoadSuccess | LoadFail;
```

[back to top](#top)

### Defining an effect

- effect is a kind type of angular Service

```javascript
export class ProductEffects {
  //inject Actions
  constructor(private actions$: Actions,private productService: ProductService{ }
  // define effect
  @Effect()
  loadProduct$ = this.actions$.pipe(
    //filter actions
    ofType(productActions.ProductActionTypes.Load),   //1) take an action - Load
    mergeMap(action =>                                //2) do some work
      //call service
      this.productService.getProducts().pipe(
        //return new action
        map(products => (new productActions.LoadSuccess(products)))   //3) return a new action
      )
    )
  );
}
```

[back to top](#top)

### Registering an effect

```javascript
//app.module.ts
@NgModule({
  //..
  imports: [
    //..
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
})
//product.module.ts
@NgModule({
  imports: [
    //...
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
```

[back to top](#top)

### Using an Effect in components

![](https://i.imgur.com/gBjZtmb.png)

```javascript
//product-list.component.ts
ngOnInit() {
    //...
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    // 2) call the dispatch method to use Load effect
    this.store.dispatch(new productActions.Load());
  }
```

[back to top](#top)

### Unsubscribe the store

![](https://i.imgur.com/Kkg7tjL.png)

- set componentActive flag
- add a takWhile pipe before the suscribe and use the componentActive property as a predicate in this operator

### Using Async Pipe

```html
<!-- product-list.component.html -->
<!-- method 1: better -->
<div class="card-body" *ngIf="products$ | async as products">
    <!-- ... -->
      <button class="list-group-item list-group-item-action rounded-0"
          *ngFor="let product of products"
          [ngClass]="{'active': product?.id === selectedProduct?.id}"
          (click)="productSelected(product)">{{ product.productName }}
      <!-- ... -->
      </button>
    </div>
</div>
<!-- method 2:  -->
<div class="card-body">
    <!-- ... -->
      <button class="list-group-item list-group-item-action rounded-0"
          *ngFor="let product of products$ | async"
          [ngClass]="{'active': product?.id === selectedProduct?.id}"
          (click)="productSelected(product)">{{ product.productName }}
      <!-- ... -->
      </button>
    </div>
</div>
<script>
//product-list.component.ts
ngOnInit() {
  //define a observable, and use it in template with async pipe
  this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
  //...
};
</script>
```

[back to top](#top)

### Exception Handling in Effects

1. create a new state(error) and new action(LoadFail)
2. add error to effect
3. add new async pipe for error

```javascript
//1) create a new state(error) and new action(LoadFail)
//product.reducer.ts
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;      //add error to product state
}
const initalState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''          // error inital value
};
export const getError = createSelector(    // new selector for error
  getProductFeatureState,
  state => state.error
);
export function reducer(state = initalState, action: ProductActions) : ProductState{
  switch(action.type){
    //...
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''                 //add error state to reducer
      };
    case ProductActionTypes.LoadFail:  // new reducer to handle error
      return {
        ...state,
        products: [],
        error: action.payload  //add error state to reducer
      }
    //....
  }
}
//2. add error to effect
//product.reducer.ts
export class ProductEffects {
  // define effect
  @Effect()
  loadProduct$ = this.actions$.pipe(
    //...
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (
          new productActions.LoadSuccess(products))),
          catchError(err => of(new productActions.LoadFail(err)))  //..add error action to effect
      )
    )
  );
}
//product-list.component.ts- define a observable errorMessage
ngOnInit() {
    //...
    // Do NOT subscribe here because it used an async pipe
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
//...
}
//product-list.component.html  -- add async pipe
<div *ngIf="errorMessage$ | async as errorMessage" class="alert alert-danger">
  Error: {{ errorMessage }}
</div>
```

[back to top](#top)

### Implementation of Update a Product

- change state 'currentProduct' to 'currentProductId'

![](https://i.imgur.com/KSuR8ol.png)

[back to top](#top)

## Architectural Considerations

### Whole architecure

![](https://i.imgur.com/FJMmj1G.png)
![](https://i.imgur.com/t1S3PjA.png)

### General steps

1. import StoreModule in different module
   1. `StoreModule.forRoot({})` in app.module.ts
   2. `StoreModule.forFeature('products', reducer)` in sub module, product.module.ts, user.module.ts
2. Define state and initalizing store in reducer
   1. import typed state, `import * as fromRoot from '../../state/app.state';`
   2. Extending the state interface for lazy loaded modules, `export interface State extends fromRoot.State`
3. Define actions in xxx.actions.ts
4. Define effects in xxx.effects.ts
5. implementation reducer in components
   1. add different selector to store in `ngOninit()`
   2. dispatch action in functions
   3. unsubscribe in `ngOnDestroy()`
   4. note: 
      1. import typed selector, `import * as fromProduct from '../state/product.reducer';`

### Presentational and Container Component

```
           Presentational(dumb)                                          |        Container(smart)
Concerned withhow things look                                            | Concerned withhow things work
HTML markupand CSS styles                                                | Have little to no HTML and CSS styles
No dependencies on the rest of the app                                   | Have injected dependencies
Don’t specify how data is loaded or changed but emit events via @Outputs | Are stateful and specify how data is loaded or changed
Receive data via @Inputs                                                 | Top level routes
May contain other components                                             | May contain other components
```

[back to top](#top)

### Other NgRx Library

1. @ngrx/entity
   1. Helps with Create, Read, Update, and Delete (CRUD) operations on entities
   2. Helper function for managing collections of entities
   3. Reduces the boilerplate required to manage entities
2. @ngrx/schematics
   1. Schematics: scaffolding library for generating code using the CLI
      1. `ng new`, `ng generate`
   2. set of schematics for generating NgRx
      1. `ng g store, action, reducer, effect, feature, container, entity`
3. @ngrx/router-store
   1. Connects the Angular router to the store
   2. Dispatches router navigation actions
4. [Angular ngrx-data](https://github.com/johnpapa/angular-ngrx-data)

> Reference

- [Angular 7|6 In-Memory Web API Tutorial | CRUD Example](https://www.techiediaries.com/angular-inmemory-web-api/)
- https://github.com/DeborahK/Angular-NgRx-GettingStarted
