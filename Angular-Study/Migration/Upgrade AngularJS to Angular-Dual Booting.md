[Upgrade AngularJS to Angular-Dual Booting](#top)

## Overview

### Mental Model

```
      AngularJS | Angular
----------------|----------------
    Controllers | Component
Directives+HTML | Component
Service/Factory | Service
        Filters | N/A
some Directives | N/A
         Entity | Entity
```

- Dual Booting
- Interoperability

### Steps

1. Single Responsibility
2. TypeScript & Webpack
3. AngularJS 1.5+
4. Componentify
5. Modernise
6. Dual Boot
7. Service -> Angualar
8. Components -> Angular
9. Routing -> Angular
10. Removing AngularJS

> Refence
- [AngularJS Migration](https://codecraft.tv/courses/angularjs-migration/)

## Upgrade Shell Strategy

### Strategy

- take an AngularJS application, and replace its root component with a new Angular component
- ![](https://i.imgur.com/jYHgqVl.png)

### Implementation

the order of events during bootstrap

- Angular application bootstraps
- AngularJS application bootstraps
- AppComponent gets created
- AngularJS router kicks in and inserts its view into the ng-view

```javascript
/* 1) remove the angularjs bootstrap call */
const m = angular.module('AngularJSAppModule', [deps]);
m.component(...);
m.service(...);
// angular.bootstrap(document, ['AngularJSAppModule']); - No longer needed
/* 2) define a root component rendering a single element with the ng-view class applied */
@Component({
  selector: 'app-component',
  template: `<div class="ng-view"></div>`,
})
class AppComponent {}
/* 3) downgrade the root component and register with the AngularJS module */
m.directive('appRoot', downgradeComponent({component: AppComponent}));
/* 4) define an Angular module importing UpgradeModule */
@NgModule({
  imports: [ BrowserModule, UpgradeModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent]
})
class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  //injected UpgradeModule to bootstrap the existing AngularJS application in ngDoBootstrap
  ngDoBootstrap() {
    this.upgrade.bootstrap(document, ['AngularJsAppModule']);
  }
}
/* 5) */

```

> Reference
- [Upgrading Angular Applications: Upgrade Shell](https://blog.nrwl.io/upgrading-angular-applications-upgrade-shell-4d4f4a7e7f7b)
- [Upgrading Angular Applications: NgUpgrade in Depth](https://blog.nrwl.io/ngupgrade-in-depth-436a52298a00)
- [ngUpgrade: Run AngularJS and Angular side by side]()
- [Running AngularJS 1.6 in Angular 5 (side by side)](https://medium.com/sv-blog/running-angularjs-1-6-in-angular-5-side-by-side-d2ed771e2a8f)
- [Upgrading Angular Applications-Book](https://leanpub.com/ngupgrade)
- [Two Approaches to Upgrading Angular Apps](https://blog.nrwl.io/two-approaches-to-upgrading-angular-apps-6350b33384e3)
- [NgUpgrade in Depth](https://blog.nrwl.io/ngupgrade-in-depth-436a52298a00)
- [Converting Bower to NPM](https://codecraft.tv/courses/angularjs-migration/step-2-typescript-and-webpack/converting-bower-to-npm/)