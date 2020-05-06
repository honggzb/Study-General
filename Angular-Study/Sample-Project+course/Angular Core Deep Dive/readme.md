[Angular Core Deep Dive](#top)

## Migration to version 9

### update commands

```shell
# First update the local angular cli to version 8.3.17 or 8.x
npm install --no-save @angular/cli@^8.3.15
# using flag --next is required while using ng update command. This flag is not required, once final version of Angular 9 is released
# using @9 is required, otherwise it will update to 10 directly
# using --allow-dirty if there is message : Repository is not clean. Please commit or stash any changes
ng update @angular/cli@9 @angular/core@9 --next --allow-dirty
```
### some breaking changes are coming in Angular 9

> Static flag migration.
  Removes the `static` flag from dynamic queries.
  As of Angular 9, the "static" flag defaults to false and is no longer required for your view and content queries.
  Read more about this here: https://v9.angular.io/guide/migration-dynamic-flag

> Missing @Injectable and incomplete provider definition migration.
  In Angular 9, enforcement of @Injectable decorators for DI is a bit stricter and incomplete provider definitions behave differently.
  Read more about this here: https://v9.angular.io/guide/migration-injectable

> ModuleWithProviders migration.
  In Angular 9, the ModuleWithProviders type without a generic has been deprecated.
  This migration adds the generic where it is missing.
  Read more about this here: https://v9.angular.io/guide/migration-module-with-providers

> Renderer to Renderer2 migration.
  As of Angular 9, the Renderer class is no longer available.
  Renderer2 should be used instead.
  Read more about this here: https://v9.angular.io/guide/migration-renderer

> Undecorated classes with decorated fields migration.
  As of Angular 9, it is no longer supported to have Angular field decorators on a class that does not have an Angular decorator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes

> Undecorated classes with DI migration.
  As of Angular 9, it is no longer supported to use Angular DI on a class that does not have an Angular decorator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes

### Update Angular CLI version Globally

```shell
npm uninstall -g angular-cli
npm cache clean       # or npm cache verify (if npm &gt; 5)
npm install -g @angular/cli@latest
```

> [How To Update Angular CLI To Latest Version 9](https://www.angularjswiki.com/angular/update-angular-cli-version-ng-update-to-latest-6-7-versions/)

[back to top](#top)



> Conference
- https://github.com/angular-university
- https://github.com/angular-university/angular-course
