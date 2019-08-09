[Using Reduce to manage state in Angular 2- Hendrik Swanepoel](#top)

- [ngrx vs angular-redux](#ngrx-vs-angular-redux)
  - [Similarities](#similarities)
  - [Differences](#differences)
- [Using ngrx](#using-ngrx)
  - [General Steps](#general-steps)
  - [using Redux Devtool to debug](#using-redux-devtool-to-debug)
- [using angular-redux](#using-angular-redux)
  - [install](#install)
  - [importing NgRedux](#importing-ngredux)
  - [Intergrate ng-redux to Angular](#intergrate-ng-redux-to-angular)
  - [using ng-redux with Service](#using-ng-redux-with-service)
  - [Using the store in components](#using-the-store-in-components)
  - [Confiuring the Redux Developer tool](#confiuring-the-redux-developer-tool)
- [Immutability- freezeState Middleware](#immutability--freezestate-middleware)
  - [浅freeze和深freeze](#%e6%b5%85freeze%e5%92%8c%e6%b7%b1freeze)
  - [using middleware](#using-middleware)

![](https://i.imgur.com/9lnKKr0.png)

## ngrx vs angular-redux

### Similarities

- Both espouse the “standard” parts needed to implement Redux like reducers, actions, and stores
- Both embrace the use of smart components to access the store and then passing down data from the smart component to dumb components as inputs
- Both work with (different) chrome extensions to view and edit state
- https://medium.com/@UReyesMeUp/differences-between-ngrx-and-angular-redux-d2d1d59d4cbd

### Differences

- The main difference is in how a smart component accesses store properties. Both of them provide a “select” method but their usages are different
  - Ngrx encourages using the select method in the component constructor and ngOnInit()
  - Angular-redux has a decorator select method
- ngrx doesn’t support middleware while angular-redux does

```javascript
//Ngrx
class MyAppComponent {
  counter: Observable<number>;
  userName: Observable<string>;
  constructor(private store: Store<AppState>){
    this.counter = store.select('counter');
    this.userName = store.select('userName');
  }
}
//Angular-redux
class MyAppComponent {
  @select() counter: Observable<number>;
  @select() userName: Observable<string>;
}
```

[back to top](#top)

## Using ngrx

### General Steps

1. import StoreModule in different module
   - `StoreModule.forRoot({})` in app.module.ts
   - `StoreModule.forFeature('products', reducer)` in sub module, product.module.ts, user.module.ts
2. Define state and initalizing store in reducer
   1. import typed state, `import * as fromRoot from '../../state/app.state';`
   2. Extending the state interface for lazy loaded modules, `export interface State extends fromRoot.State`
3. Define actions in xxx.actions.ts
4. Define effects in xxx.effects.ts
5. implementation reducer in components
   - add different selector to store in `ngOninit()`
   - dispatch action in functions
   - unsubscribe in `ngOnDestroy()`
   - note: import typed selector, `import * as fromProduct from '../state/product.reducer';`

6. import StoreModule in different module

```javascript
//1. import StoreModule in different module
//app.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    //...
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  //...
})
//product.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    //...
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  //...
})
//user.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    //...
    StoreModule.forFeature('users', reducer)
  ],
  //...
})
```

2. Define state and initalizing store in reducer

```javascript
//app/state/app.state.ts
export interface State {
    users: any;
}
//app/user/state/user.reducer.ts
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}
//app/product/state/product.reducer.ts
//import typed state from root
import * as fromRoot from '../../state/app.state';
export interface State extends fromRoot.State{
    products: ProductState;
}
//Extending the state interface for lazy loaded modules(product module)
export interface ProductState extends fromRoot.State{
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
  }
```

3. Define actions in xxx.actions.ts

```javascript
//app/product/state/product.actions.ts
import { Action } from "@ngrx/store";
export enum ProductActionTypes {
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail'
}
export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}
export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) {}
}
export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public payload: string) {}
}
//...
export type ProductActions = Load | LoadSuccess | LoadFail;
```

4. Define effects in xxx.effects.ts

```javascript
//app/product/state/product.effect.ts
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
//import actions
import * as productActions from './product.actions';
@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService){ }
  @Effect()
  loadProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new productActions.LoadSuccess(products))),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );
//...
}
```

5. implementation reducer in components

```javascript
//app/product/product-list/product-list.component.ts
import * as fromProduct from '../state/product.reducer';
products$: Observable<Product[]>;
//inject in constructor()
constructor(private store: Store<fromProduct.State>) { }
ngOnInit(): void {
    //add different selector to store in ngOninit()
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    //dispatch different actions
    this.store.dispatch(new productActions.Load());
    //add different selector to store
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
}
//dispatch different actions in functions
newProduct(): void {
  this.store.dispatch(new productActions.InitializeCurrentProduct());
}
//...
```

[back to top](#top)

### using Redux Devtool to debug

1. Install browser Redux DevTools extension
2. Install `@ngrx/store-devtools`
3. Initialize `@ngrx/store-devtoolsmodule`

```javascript
//app.module.ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
@NgModule({
  imports: [
    //...
    StoreDevtoolsModule.instrument({
      name: 'APM Demo DevTools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  //...
})
```

[back to top](#top)

## using angular-redux

### install

1. [ng-redux- Angular 2](https://github.com/angular-redux/ng-redux): `npm intall ng2-redux redux --save`
2. [angular-redux- Angular 2+](https://github.com/angular-redux/store): `npm intall @angular-redux/store --save`

### importing NgRedux

```javascript
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { store, IAppState } from './store';
import { CourseActions } from './courses/course.actions';
@NgModule({
  imports: [
    //...
    NgReduxModule
  ],
})
export class AppModule {
  //Constructing with the Store
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
```

[back to top](#top)

### Intergrate ng-redux to Angular

![](https://i.imgur.com/Ia1q87t.png)

```
├── app
│   ├── courses/
│   │   ├── course.actions.ts
│   │   └── ...
│   ├── store/
│   │   ├── actions.ts
│   │   ├── IAppState.ts
│   │   ├── index.ts
│   │   ├── reducer.ts
│   │   └── store.ts
```

```javascript
//IAppState.ts - two states
export interface IAppState {
  courses: Course[],
  filteredCourses: Course[]
}
//actions.ts - create actions
export const FILTER_COURSES = 'courses/FILTER';
export function filterCourses(searchText: string) {
  return {
    type: FILTER_COURSES,
    searchText,
  };
}
//reducer.ts
const initialState : IAppState = {
  courses,
  filteredCourses: courses
}
function filterCourses(state, action) : IAppState {
  return Object.assign({}, state, {
    filteredCourses: state.courses.filter(c => c.name.toLowerCase().indexOf(action.searchText.toLowerCase())>-1 ),
  })
}
export function reducer(state=initialState, action){
  switch(action.type){
    case FILTER_COURSES:
      return filterCourses(state, action);
    case REQUEST_COURSES_SUCCESS:
      return storeCourses(state, action);
    default:
      return state;
  }
}
```

[back to top](#top)

### using ng-redux with Service

- create a `Injectable()` action
- add it to providers in app.module.ts, `providers: [CourseActions]`

```javascript
//app/courses/course.actions.ts
@Injectable()
export class CourseActions {
  constructor(private ngRedux: NgRedux<IAppState>, private courseService: CourseService){ }
  getCourses(){
    this.courseService.getCourses()
        .subscribe(courses => {
          this.ngRedux.dispatch({         //dispatch action
            type: REQUEST_COURSES_SUCCESS,
            courses,
          })
        })
  }
  filterCourses (searchText: string){
    this.ngRedux.dispatch({
      type: FILTER_COURSES,
      searchText
    });
    return {
      type: FILTER_COURSES,
      searchText,
    };
  }
}
```

[back to top](#top)

### Using the store in components

```javascript
//app/cources/course-list.component.ts
import { filterCourses, IAppState } from '../store';
import { select, NgRedux } from 'ng2-redux';
import { CourseActions } from './course.actions';
export class CourseListComponent implements OnInit {
  @select('filteredCourses') filteredCourses$:
  Observable<Course>;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private courseActions: CourseActions,    //inject action like service
  ) {}
  filterChanged(searchText: string) {
    this.courseActions.filterCourses(searchText);
  }
  ngOnInit() {
    this.courseActions.getCourses();
    componentHandler.upgradeDom();
  }
}
```

### Confiuring the Redux Developer tool

```javascript
//xxx.store.ts
declare var window: any;
const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension) ? window.devToolsExtension() : (f) => f;
export const store = createStore<IAppState>(reducer, compose(devToolsExtension) as GenericStoreEnhancer);
```

[back to top](#top)

## Immutability- freezeState Middleware

### 浅freeze和深freeze

- `Object.freeze()` did not work in nested properies
- create a function `deepFreeze()`

```javascript
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach((prop) => {
    if(o.hasOwnProperty(prop) && o[prop] != null && typeof o[prop] === 'object' && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
  });
  return o;
}
const person = deepFreeze({ // cannot change address if use deepFreeze
  name: 'hendrik',
  surname: 'swanepoel',
  address: {
    city: 'Cape Town',
    country: 'South Africa'
  }
});
//Object.freeze()
person.address.city = 'something else';  // cannot change address if use deepFreeze
```

### using middleware

- [redux middleware](https://redux.js.org/advanced/middleware#middleware)

```javascript
//app/state/freezeState.ts
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach((prop) => {
    if(o.hasOwnProperty(prop) && o[prop] != null && typeof o[prop] === 'object' && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
  });
  return o;
}
export default function freezeState(store) {
  return (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    deepFreeze(state);
    return result;
  }
}
//change store.ts to using middleware
import freezeState from './freezeState';
export const store = createStore<IAppState>(reducer, compose(applyMiddleware(freezeState), devToolsExtension) as GenericStoreEnhancer);
```

- [other middleware- redux-freeze](https://github.com/buunguyen/redux-freeze)
- [other library- immutable.js](https://immutable-js.github.io/immutable-js/)

[back to top](#top)

> references
-  https://github.com/hendrikswan/pluralsight-angular-redux
