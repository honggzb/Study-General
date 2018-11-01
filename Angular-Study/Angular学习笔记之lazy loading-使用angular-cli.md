[Angular学习笔记之lazy loading-使用angular-cli](#top)

### 1. 生成相应的组件

```shell
# 1) create App project
ng new --routing true angular-cli-lazyload
# 2) create home component
ng g c Home
# 3) create the lazy-loaded module, 生成lazy模块（app/lazy/lazy.module.ts和app/lazy/lazy-routing.module.ts）
ng g module --routing true lazy
# 4) Add a component to be used as the router outlet for the lazy-loaded page
cd lazy
ng g component --flat lazy
ng g component lazy/LazyPage
```

## 修改相应的文件

```JavaScript
// 1) app/app-routing.module.ts
import { HomeComponent } from './home/home.component';
const appRoutes: Routes = [    //rename to appRoutes
  { path: '', component: HomeComponent },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],   //using forRoot
  exports: [RouterModule]
})
export class AppRoutingModule { }
//  app/app.module.ts
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// 2) app/lazy/lazy-routing.module.ts
import { LazyComponent } from './lazy.component';
import { LazyPageComponent } from './lazy-page/lazy-page.component';
const routes: Routes = [
  {
    path: '',     //note: this path must be '', otherwise can not load whole lazy module
    component: LazyComponent,
    children: [
      { path: 'lazypage', component: LazyPageComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],  //use forChild
  exports: [RouterModule]
})
export class LazyRoutingModule { } 
// app/lazy/lazy.module.ts
import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { LazyPageComponent } from './lazy-page/lazy-page.component';
@NgModule({
  imports: [
    CommonModule,
    LazyRoutingModule
  ],
  declarations: [LazyComponent, LazyPageComponent]
})
export class LazyModule { }
```

> [Lazy-loading content with angular-cli](https://keathmilligan.net/lazy-loading-content-with-angular-cli/)
> [How to implement Lazy Loading in Angular](https://medium.com/@thiago.reis/how-to-implement-lazy-loading-in-angular-c8dcbf165561)
