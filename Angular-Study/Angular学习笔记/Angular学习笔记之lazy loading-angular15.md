[Angular学习笔记之lazy loading(angular15)](#top)

- [Lazy loading basics](#lazy-loading-basics)
- [Step-by-step setup](#step-by-step-setup)
- [Preloading](#preloading)
  - [Preloading modules and standalone components](#preloading-modules-and-standalone-components)
  - [Standalone application](#standalone-application)
  - [Preloading component data](#preloading-component-data)
- [Troubleshooting lazy-loading moduless](#troubleshooting-lazy-loading-modules)
  
------------------------------------------------------------------------------------------------

## Lazy loading basics

1. use `loadChildren` instead of component in your `AppRoutingModule routes`
   - be sure to remove the ItemsModule from the AppModule
2. In the lazy-loaded module(ItemsModule)'s routing module, add a route for the component.

```javascript
// 1. in AppRoutingModule
const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];
// 2. in ItemsModule(lazy-loaded module)'s routing module
const routes: Routes = [
  {
    path: '',
    component: ItemsComponent
  }
];
```

[back to top](#top)

## Step-by-step setup

1. 创建带routing工程: `ng new customer-app --routing`
2. Create the feature module with the Angular CLI, using the `--route` flag
   - `ng generate module customers --route customers --module app.module`  创建带routing的模块customers
   - Configure the routes:  use `loadChildren` instead of component
   - remove customers module in appModule
3. Create another feature module with the Angular CLI
   - `ng generate module orders --route orders --module app.module`  创建带routing的模块orders
   - Configure the routes:  use `loadChildren` instead of component
   - remove orders module in appModule
4. Set up the UI for navigation


```javascript
// 2), 3) src/app/app-routing.module.ts
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: '',                  //default route
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
// 4) Navigation UI
<h1> {{title}} </h1>
<button type="button" routerLink="/customers">Customers</button>
<button type="button" routerLink="/orders">Orders</button>
<button type="button" routerLink="">Home</button>
<router-outlet></router-outlet>
```

[back to top](#top)

## Preloading

- can preload modules, standalone components or component data

### Preloading modules and standalone components

```javascript
// 1. PreloadAllModules token
import { PreloadAllModules } from '@angular/router';
// 2. in AppRoutingModule, specify  preloading strategy in forRoot()
RouterModule.forRoot(
  appRoutes,
  {
    preloadingStrategy: PreloadAllModules
  }
)
```

### Standalone application

- adding `withPreloading` to `provideRouters` RouterFeatures in `app.config.ts`

```javascript
import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
  ],
};
```

[back to top](#top)

### Preloading component data

- use a resolver. Resolvers improve UX by blocking the page load until all necessary data is available to fully display the page
- [routing tutorial section on preloading](https://angular.io/guide/router-tutorial-toh#preloading-background-loading-of-feature-areas)
- [live example](https://angular.io/generated/live-examples/router/stackblitz.html)

```javascript
// 1. create a resolver service
ng generate service <service-name>
// 2. implement the Resolve interface provided by the @angular/router package
import { Resolve } from '@angular/router';
//…
/* An interface that represents your data model */
export interface Crisis {
  id: number;
  name: string;
}
export class CrisisDetailResolverService implements Resolve<Crisis> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
    // your logic goes here
  }
}
// 3. Import this resolver into  module's routing module.
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
// 4. Add a resolve object to the component's route configuration
{
  path: '/your-path',
  component: YourComponent,
  resolve: {
    crisis: CrisisDetailResolverService
  }
}
// 5. In the component's constructor, inject an instance of the ActivatedRoute class that represents the current route
// 6. Use the injected instance of the ActivatedRoute class to access data associated with a given route
import { ActivatedRoute } from '@angular/router';
@Component({ … })
class YourComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data
      .subscribe(data => {
        const crisis: Crisis = data.crisis;
        // …
      });
  }
}
```

## Troubleshooting lazy-loading modules

1. generate the module using the Angular CLI and including the --route route-name parameter, where route-name is the name of your module
2. create the module without the --route parameter
3. If ng generate module with the --route parameter returns an error, but runs correctly without it, you might have imported the same module in multiple places

[back to top](#top)

> references
- [官网Lazy-loading feature modules](https://angular.io/guide/lazy-loading-ngmodules)
- [Angular 基础操作之 - 懒加载(Lazy Load)](https://blog.csdn.net/KenkoTech/article/details/125331958)
