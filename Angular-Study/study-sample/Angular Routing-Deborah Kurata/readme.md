[Angular Routing- Deborah Kurata](#top)

- [Route Parameters](#route-parameters)
  - [Populating Route Parameters](#populating-route-parameters)
  - [Reading Route Parameters- ActivatedRoute Service](#reading-route-parameters--activatedroute-service)
  - [Optional Parameters](#optional-parameters)
  - [Query Parameters](#query-parameters)
- [Prefetching Data using Route Resolvers](#prefetching-data-using-route-resolvers)
- [Child Routes](#child-routes)
  - [Validating Across Child Routes](#validating-across-child-routes)
- [Grouping and Component-less Routes](#grouping-and-component-less-routes)
- [Styling, Animating, and Watching Routes](#styling-animating-and-watching-routes)
  - [Styling and animation](#styling-and-animation)
  - [another animation method](#another-animation-method)
  - [Routing Events- spinner effect when loading](#routing-events--spinner-effect-when-loading)
- [Secondary (Auxiliary) Routes](#secondary-auxiliary-routes)
- [Route Guards](#route-guards)
  - [Guard Processing queue:](#guard-processing-queue)
  - [sharing data with a guard](#sharing-data-with-a-guard)
- [Lazy Loading](#lazy-loading)
  - [canLoad Guard](#canload-guard)
  - [preloading feature modules](#preloading-feature-modules)
  - [custom loading strategies](#custom-loading-strategies)

## Route Basic

### How Routing Works

![](https://i.imgur.com/Vi3ltL9.png)

### Define the base path

- `<base href="/">`
- Manually reset the base path:
  - `<base href="/APM/">`
  - `ng build --base-href /APM/`

**Using Hashe-based Urls**

![](https://i.imgur.com/NdCoskf.png)

![](https://i.imgur.com/qipQwK7.png)

`RouterModule.forRoot([...],{ useHash: true })`

### Whole route design

![](https://i.imgur.com/8BiqGeF.png)

[back to top](#top)

## Route Parameters

### Populating Route Parameters

```html
<!-- Template -->
<a [routerLink]="['/products', product.id]">{{product.productName}}</a>
<a [routerLink]="['/products', product.id, 'edit']">Edit</a>
<a [routerLink]="['/products', 0, 'edit']">Add Product</a>
<a routerLink="/products/0/edit">Add Product</a>
<script>
  //component class
  this.router.navigate(['/products',this.product.id]);
</script>
```

### Reading Route Parameters- ActivatedRoute Service

- reading route parameters: **snapshot**
- Reading Route Parameters: **Observable**

![](https://i.imgur.com/cprXQjx.png)

### Optional Parameters

![](https://i.imgur.com/woTNdEV.png)

### Query Parameters

![](https://i.imgur.com/FGuF4vJ.png)

[back to top](#top)

## Prefetching Data using Route Resolvers

**Route's Data Property**

```javascript
//product.module.ts
RouterModule.forChild([
      { path: '', component: ProductListComponent, data: { pageTitle: 'Product List'} },
])
//product-list.component.ts
ngOnInit(): void {
    this.pageTitle = this.route.snapshot.data['pageTitle'];   // private route: ActivatedRoute
//...
}
```

![](https://i.imgur.com/ssBh3ks.png)

1. Build a route resolver service

```javascript
//1) add new interface for handle error in product.ts
export interface ProductResolved {
  product: IProduct;
  error?: any;
}
//2) resolver is a service which implements Resolve
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService){}
  // there is 2 parameter in resolve function
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ProductResolved>{
    // to retrieve only one product
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});  //return false, return null, navigate to error page
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product: product })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ product: null, error: message });
        })
      );
  }
}
```

2. Add resolve to the route configuration

- need add new model - **ProductResolved**

```javascript
//product.ts
export interface ProductResolved {
  product: IProduct;
  error?: any;
}
//product.module.ts
 path: '', component: ProductListComponent,
        data: { pageTitle: 'Product List'},
        resolve: {product: ProductResolver} },
{ path: ':id', component: ProductDetailComponent, resolve: {product: ProductResolver} },
```

1. Read(Retrieve) the data from ActivatedRoute


- no need to retrieve date from route parameters
- retrieve data from resolve directly

```javascript
// product-details.component.ts
constructor(private route: ActivatedRoute) {
      this.route.data.subscribe( data => this.product = data['product']);  //need read resolver data as Observable
}
ngOnInit(): void {
    // const param = this.route.snapshot.paramMap.get('id');
    // if(param){
    //   const id = +param;
    //   this.getProduct(id);
    // }
    //use resolver to catch data
    const resolvedData: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
  // new function to handle resolved data
 onProductRetrieved(product: IProduct): void {
    this.product = product;
    if(this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
// product-edit.component.ts
constructor(private route: ActivatedRoute) {
      this.route.data.subscribe( data => this.product = data['product']);  //need read resolver data as Observable
}
ngOnInit(): void {
    //1) Reading Route Parameters by snapshot, read only one time, cannot change according to id
    //const id = +this.route.snapshot.paramMap.get('id');
    //this.getProduct(id);
    //2) Reading Route Parameters by Observable
    // this.route.params.subscribe(
    //   params => {
    //     const id = +params['id'];
    //     this.getProduct(id);
    //   }
    // );
    //3) retrieve data by resolver
    const resolvedData: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
 // new function to handle resolved data
 onProductRetrieved(product: IProduct): void {
    // Reset back to pristine
    //this.editForm.reset();
    this.originalProduct = product;
    this.product = Object.assign({}, product);

    if(this.originalProduct) {
      //this.pageTitle = `Product Detail: ${this.product.productName}`;
      if(this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    } else {
      this.pageTitle = 'No product found';
    }
```

[back to top](#top)

## Child Routes

1. Configuring Child Routes
2. Activating Child Routes
3. Obtaining Data for Child Routes

![](https://i.imgur.com/eZyHwck.png)

### Validating Across Child Routes

**Define seperate form in each child component and parent component, perform manual validation**

```javascript
// product-edit.component.ts - parent component
//1) define a variable
private dataIsValid: { [key: string]: boolean } = {};
//3) define a valid function
isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
//3) add a new validate function
validate(): void {
  // Clear the validation object
  this.dataIsValid = {};
  // 'info' tab
  if (this.product.productName && this.product.productName.length >= 3  && this.product.productCode) {
      this.dataIsValid['info'] = true;
  } else {
      this.dataIsValid['info'] = false;
  }
  // 'tags' tab
  if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
  } else {
      this.dataIsValid['tags'] = false;
  }
}
```

[back to top](#top)

## Grouping and Component-less Routes

![](https://i.imgur.com/sgEWalb.png)
![](https://i.imgur.com/ahmffzH.png)

[back to top](#top)

## Styling, Animating, and Watching Routes

### Styling and animation

1. Styling the Selected Route: `<a [routerLink]="['info']"routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Basic Information</a>`
3. Animating Route Transitions
   1. Import BrowserAnimationsModule
   2. Define the desired animations
   3. Register the animation with a component
   4. Trigger the animation from the router outlet

```javascript
//1) Import BrowserAnimationsModule in app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
imports: [
   //...
    BrowserAnimationsModule,
],
//2)Define the desired animations- create app.animation.ts
import { trigger, transition, style, animate, query, group } from '@angular/animations';
export const slideInAnimation = trigger('slideInAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);
//3) Register, and listen the animation with a component- app.component.ts, shell.component.ts, product-edit.component.ts
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass'],
  animations: [slideInAnimation]
})
//declare animation in template: app.component.html,shell.component.html, product-edit.component.html which contain router-outlet
<div [@slideInAnimation]="o.isActivated ? o.activatedRoute : ''">
  <router-outlet #o="outlet"></router-outlet>
</div>
```

[back to top](#top)

### another animation method

- [angular4 如何在全局设置路由跳转动画](https://segmentfault.com/a/1190000010708986)

```javascript
//1) Import BrowserAnimationsModule in app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
imports: [
   //...
    BrowserAnimationsModule,
],
//2) Define the desired animations- create app.animation.ts
//3) Register, and listen the animation with a component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideInAnimation]
})
export class AppComponent {
    // router跳转动画所需参数
    routerState:boolean = true;
    routerStateCode:string = 'active';
    constructor(private router:Router){
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
          // 每次路由跳转改变状态
          this.routerState = !this.routerState;
          this.routerStateCode = this.routerState ? 'active' : 'inactive';
          }
        });
    }
}
//declare animation in template: app.component.html, product-edit.component.html which contain router-outlet
<div id="app" [@slideInAnimation]="routerStateCode">
  <router-outlet></router-outlet>
</div>
```

[back to top](#top)

### Routing Events- spinner effect when loading

- NavigationStart, RoutesRecognized, NavigationEnd, NavigationCancel, NavigationError
- enable monitoring routing event

![](https://i.imgur.com/Pc3aNeH.png)

```javascript
// enable monitoring routing event- app.routing.module.ts
imports: [
RouterModule.forRoot([
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  ], { enableTracing: true })   /// enable event listening
],
```

- Reacting to Routing Events

```javascript
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
export class AppComponent {
  loading = true;
  constructor(private router: Router){
    this.router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.loading = true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.loading = false;
      }
    });
  }
}
// app.component.html
<div class="fa fa-spinner spinner" *ngIf="loading"></div>
//css
.spinner {
  font-size:300%;
  position:absolute;
  top: 50%;
  left: 50%;
  z-index:10
}
.fa-spinner {
    -webkit-animation: spin 1000ms infinite linear;
    animation: spin 1000ms infinite linear;
}
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
```

## Secondary (Auxiliary) Routes



[back to top](#top)

## Route Guards

### Guard Processing queue:

 `canDeactivate -> canLoad -> canActivateChild -> CanActive -> resolve`

Guards|Defination|Checks criteria|Commonly used to|Called
---|---|---|---|---
canActivate|Guard navigation to a route|before activating a route|Limit route access to specific users<br>Ensure prerequisites are met|Called when the Url changes to the route
canActivateChild|Guard navigation to a child route|before activating a child route|Limit route access to child routes<br>Ensure prerequisites for child routes are met|Called when the Url changes to the child route
canDeactivate|Guard navigation away from a route|before before leaving a route|Check for unsaved changes<br>Confirm leaving an incomplete operation|Called when the Url changes to a different route
canLoad|Prevent asynchronous routing|before loading an asynchronous route|Prevent loading a route if a user cannot access it

- canDeactivate: product-edit.guard.ts- to check if data changed
  - Checks criteria **before before leaving a route**
  - Commonly used to:
    - Check for unsaved changes
    - Confirm leaving an incomplete operation
  - **Called when the Url changes to a different route**
- canLoad: Prevent asynchronous routing
  - Checks criteria: **before loading an asynchronous route**
  - Commonly used to:
    - Prevent loading a route if a user cannot access it
- canActivateChild: Guard navigation to a child route
  - Checks criteria **before activating a child route**
  - Commonly used to:
    - Limit route access to child routes
    - Ensure prerequisites for child routes are met
  - **Called when the Url changes to the child route**
- canActivate: Guard navigation to a route-user.guard.ts- to check if user logged
  - Checks criteria **before activating a route**
  - Commonly used to:
    - Limit route access to specific users
    - Ensure prerequisites are met
  - **Called when the Url changes to the route**
- resolve: Prefetch data before activating a route

```javascript
//product-edit.guard.ts
import { Injectable } from '@angular/core';
import { canDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements canDeactivate {
  canDeactivate(component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(component.isDirty){
        const productName = component.product.productName || 'New Product';
        return confirm(`Navigate away and lose all changes to ${productName}?`);
      }
      return true;
  }
}

```

### sharing data with a guard

![](https://i.imgur.com/5T64VdT.png)

[back to top](#top)

## Lazy Loading

```json
{ path: 'products',
  canActivate: [AuthGuard],
  loadChildren: './products/products.module#ProductsModule'
},
```

### canLoad Guard

**canLoad Guard will block all preLoading module**

```javascript
//auth-guard.service.ts
export class AuthGuard implements CanActivate, CanLoad {
  //...
  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
}
// app-routing.module.ts
children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',
        canLoad: [AuthGuard],
        loadChildren: './products/products.module#ProductsModule'
      },
```

[back to top](#top)

### preloading feature modules

```javascript
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
```

[back to top](#top)

### custom loading strategies

1. Build a preloading strategy service
2. Set the preloading strategy routing option

```javascript
//1. Build a preloading strategy service
// selective-strategy.service.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy{
  preload(route: Route, load: Function): Observable<any> {
    //if route data property preload element is true
    if(route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
//2. Set the preloading strategy routing option- app-routing.module.ts
const ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',
        canActivate: [AuthGuard],  //cannot use canLoad for preloading
        data: { preload: true},   //set data preload
        loadChildren: './products/products.module#ProductsModule'
      },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy })],  //using SelectiveStrategy
  exports: [RouterModule]
})
```

[back to top](#top)

> Reference
- https://github.com/DeborahK/Angular-Routing


### Route Basic

### How Routing Works

![](https://i.imgur.com/Vi3ltL9.png)

### Define the base path

- `<base href="/">`
- Manually reset the base path:
  - `<base href="/APM/">`
  - `ng build --base-href /APM/`

**Using Hashe-based Urls**

![](https://i.imgur.com/NdCoskf.png)

![](https://i.imgur.com/qipQwK7.png)

`RouterModule.forRoot([...],{ useHash: true })`

### Whole route design

![](https://i.imgur.com/8BiqGeF.png)

[back to top](#top)

## Route Parameters

### Populating Route Parameters

```html
<!-- Template -->
<a [routerLink]="['/products', product.id]">{{product.productName}}</a>
<a [routerLink]="['/products', product.id, 'edit']">Edit</a>
<a [routerLink]="['/products', 0, 'edit']">Add Product</a>
<a routerLink="/products/0/edit">Add Product</a>
<script>
  //component class
  this.router.navigate(['/products',this.product.id]);
</script>
```

### Reading Route Parameters- ActivatedRoute Service

- reading route parameters: **snapshot**
- Reading Route Parameters: **Observable**

![](https://i.imgur.com/cprXQjx.png)

### Optional Parameters

![](https://i.imgur.com/woTNdEV.png)

### Query Parameters

![](https://i.imgur.com/FGuF4vJ.png)

[back to top](#top)

## Prefetching Data using Route Resolvers

**Route's Data Property**

```javascript
//product.module.ts
RouterModule.forChild([
      { path: '', component: ProductListComponent, data: { pageTitle: 'Product List'} },
])
//product-list.component.ts
ngOnInit(): void {
    this.pageTitle = this.route.snapshot.data['pageTitle'];   // private route: ActivatedRoute
//...
}
```

![](https://i.imgur.com/ssBh3ks.png)

1. Build a route resolver service

```javascript
//1) add new interface for handle error in product.ts
export interface ProductResolved {
  product: IProduct;
  error?: any;
}
//2) resolver is a service which implements Resolve
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService){}
  // there is 2 parameter in resolve function
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ProductResolved>{
    // to retrieve only one product
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});  //return false, return null, navigate to error page
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product: product })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ product: null, error: message });
        })
      );
  }
}
```

2. Add resolve to the route configuration

- need add new model - **ProductResolved**

```javascript
//product.ts
export interface ProductResolved {
  product: IProduct;
  error?: any;
}
//product.module.ts
 path: '', component: ProductListComponent,
        data: { pageTitle: 'Product List'},
        resolve: {product: ProductResolver} },
{ path: ':id', component: ProductDetailComponent, resolve: {product: ProductResolver} },
```

1. Read(Retrieve) the data from ActivatedRoute


- no need to retrieve date from route parameters
- retrieve data from resolve directly

```javascript
// product-details.component.ts
constructor(private route: ActivatedRoute) {
      this.route.data.subscribe( data => this.product = data['product']);  //need read resolver data as Observable
}
ngOnInit(): void {
    // const param = this.route.snapshot.paramMap.get('id');
    // if(param){
    //   const id = +param;
    //   this.getProduct(id);
    // }
    //use resolver to catch data
    const resolvedData: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
  // new function to handle resolved data
 onProductRetrieved(product: IProduct): void {
    this.product = product;
    if(this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
// product-edit.component.ts
constructor(private route: ActivatedRoute) {
      this.route.data.subscribe( data => this.product = data['product']);  //need read resolver data as Observable
}
ngOnInit(): void {
    //1) Reading Route Parameters by snapshot, read only one time, cannot change according to id
    //const id = +this.route.snapshot.paramMap.get('id');
    //this.getProduct(id);
    //2) Reading Route Parameters by Observable
    // this.route.params.subscribe(
    //   params => {
    //     const id = +params['id'];
    //     this.getProduct(id);
    //   }
    // );
    //3) retrieve data by resolver
    const resolvedData: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
 // new function to handle resolved data
 onProductRetrieved(product: IProduct): void {
    // Reset back to pristine
    //this.editForm.reset();
    this.originalProduct = product;
    this.product = Object.assign({}, product);

    if(this.originalProduct) {
      //this.pageTitle = `Product Detail: ${this.product.productName}`;
      if(this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    } else {
      this.pageTitle = 'No product found';
    }
```

[back to top](#top)

## Child Routes

1. Configuring Child Routes
2. Activating Child Routes
3. Obtaining Data for Child Routes

![](https://i.imgur.com/eZyHwck.png)

### Validating Across Child Routes

**Define seperate form in each child component and parent component, perform manual validation**

```javascript
// product-edit.component.ts - parent component
//1) define a variable
private dataIsValid: { [key: string]: boolean } = {};
//3) define a valid function
isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
//3) add a new validate function
validate(): void {
  // Clear the validation object
  this.dataIsValid = {};
  // 'info' tab
  if (this.product.productName && this.product.productName.length >= 3  && this.product.productCode) {
      this.dataIsValid['info'] = true;
  } else {
      this.dataIsValid['info'] = false;
  }
  // 'tags' tab
  if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
  } else {
      this.dataIsValid['tags'] = false;
  }
}
```

[back to top](#top)

## Grouping and Component-less Routes

![](https://i.imgur.com/sgEWalb.png)
![](https://i.imgur.com/ahmffzH.png)

[back to top](#top)

## Styling, Animating, and Watching Routes

### Styling and animation

1. Styling the Selected Route: `<a [routerLink]="['info']"routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Basic Information</a>`
3. Animating Route Transitions
   1. Import BrowserAnimationsModule
   2. Define the desired animations
   3. Register the animation with a component
   4. Trigger the animation from the router outlet

```javascript
//1) Import BrowserAnimationsModule in app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
imports: [
   //...
    BrowserAnimationsModule,
],
//2)Define the desired animations- create app.animation.ts
import { trigger, transition, style, animate, query, group } from '@angular/animations';
export const slideInAnimation = trigger('slideInAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);
//3) Register, and listen the animation with a component- app.component.ts, shell.component.ts, product-edit.component.ts
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass'],
  animations: [slideInAnimation]
})
//declare animation in template: app.component.html,shell.component.html, product-edit.component.html which contain router-outlet
<div [@slideInAnimation]="o.isActivated ? o.activatedRoute : ''">
  <router-outlet #o="outlet"></router-outlet>
</div>
```

[back to top](#top)

### another animation method

- [angular4 如何在全局设置路由跳转动画](https://segmentfault.com/a/1190000010708986)

```javascript
//1) Import BrowserAnimationsModule in app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
imports: [
   //...
    BrowserAnimationsModule,
],
//2) Define the desired animations- create app.animation.ts
//3) Register, and listen the animation with a component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideInAnimation]
})
export class AppComponent {
    // router跳转动画所需参数
    routerState:boolean = true;
    routerStateCode:string = 'active';
    constructor(private router:Router){
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
          // 每次路由跳转改变状态
          this.routerState = !this.routerState;
          this.routerStateCode = this.routerState ? 'active' : 'inactive';
          }
        });
    }
}
//declare animation in template: app.component.html, product-edit.component.html which contain router-outlet
<div id="app" [@slideInAnimation]="routerStateCode">
  <router-outlet></router-outlet>
</div>
```

[back to top](#top)

### Routing Events- spinner effect when loading

- NavigationStart, RoutesRecognized, NavigationEnd, NavigationCancel, NavigationError
- enable monitoring routing event

![](https://i.imgur.com/Pc3aNeH.png)

```javascript
// enable monitoring routing event- app.routing.module.ts
imports: [
RouterModule.forRoot([
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  ], { enableTracing: true })   /// enable event listening
],
```

- Reacting to Routing Events

```javascript
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
export class AppComponent {
  loading = true;
  constructor(private router: Router){
    this.router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.loading = true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.loading = false;
      }
    });
  }
}
// app.component.html
<div class="fa fa-spinner spinner" *ngIf="loading"></div>
//css
.spinner {
  font-size:300%;
  position:absolute;
  top: 50%;
  left: 50%;
  z-index:10
}
.fa-spinner {
    -webkit-animation: spin 1000ms infinite linear;
    animation: spin 1000ms infinite linear;
}
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
```

## Secondary (Auxiliary) Routes



[back to top](#top)

## Route Guards

### Guard Processing queue:

 `canDeactivate -> canLoad -> canActivateChild -> CanActive -> resolve`

Guards|Defination|Checks criteria|Commonly used to|Called
---|---|---|---|---
canActivate|Guard navigation to a route|before activating a route|Limit route access to specific users<br>Ensure prerequisites are met|Called when the Url changes to the route
canActivateChild|Guard navigation to a child route|before activating a child route|Limit route access to child routes<br>Ensure prerequisites for child routes are met|Called when the Url changes to the child route
canDeactivate|Guard navigation away from a route|before before leaving a route|Check for unsaved changes<br>Confirm leaving an incomplete operation|Called when the Url changes to a different route
canLoad|Prevent asynchronous routing|before loading an asynchronous route|Prevent loading a route if a user cannot access it

- canDeactivate: product-edit.guard.ts- to check if data changed
  - Checks criteria **before before leaving a route**
  - Commonly used to:
    - Check for unsaved changes
    - Confirm leaving an incomplete operation
  - **Called when the Url changes to a different route**
- canLoad: Prevent asynchronous routing
  - Checks criteria: **before loading an asynchronous route**
  - Commonly used to:
    - Prevent loading a route if a user cannot access it
- canActivateChild: Guard navigation to a child route
  - Checks criteria **before activating a child route**
  - Commonly used to:
    - Limit route access to child routes
    - Ensure prerequisites for child routes are met
  - **Called when the Url changes to the child route**
- canActivate: Guard navigation to a route-user.guard.ts- to check if user logged
  - Checks criteria **before activating a route**
  - Commonly used to:
    - Limit route access to specific users
    - Ensure prerequisites are met
  - **Called when the Url changes to the route**
- resolve: Prefetch data before activating a route

```javascript
//product-edit.guard.ts
import { Injectable } from '@angular/core';
import { canDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements canDeactivate {
  canDeactivate(component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(component.isDirty){
        const productName = component.product.productName || 'New Product';
        return confirm(`Navigate away and lose all changes to ${productName}?`);
      }
      return true;
  }
}

```

### sharing data with a guard

![](https://i.imgur.com/5T64VdT.png)

[back to top](#top)

## Lazy Loading

```json
{ path: 'products',
  canActivate: [AuthGuard],
  loadChildren: './products/products.module#ProductsModule'
},
```

### canLoad Guard

**canLoad Guard will block all preLoading module**

```javascript
//auth-guard.service.ts
export class AuthGuard implements CanActivate, CanLoad {
  //...
  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
}
// app-routing.module.ts
children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',
        canLoad: [AuthGuard],
        loadChildren: './products/products.module#ProductsModule'
      },
```

[back to top](#top)

### preloading feature modules

```javascript
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
```

[back to top](#top)

### custom loading strategies

1. Build a preloading strategy service
2. Set the preloading strategy routing option

```javascript
//1. Build a preloading strategy service
// selective-strategy.service.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy{
  preload(route: Route, load: Function): Observable<any> {
    //if route data property preload element is true
    if(route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
//2. Set the preloading strategy routing option- app-routing.module.ts
const ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',
        canActivate: [AuthGuard],  //cannot use canLoad for preloading
        data: { preload: true},   //set data preload
        loadChildren: './products/products.module#ProductsModule'
      },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy })],  //using SelectiveStrategy
  exports: [RouterModule]
})
```

[back to top](#top)

> Reference
- https://github.com/DeborahK/Angular-Routing
