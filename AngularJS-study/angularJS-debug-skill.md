
```
**scope**
`$s`           |scope
`$is`          |isolatescope
`$rs`          |rootscope|
`$($0).scope()`|the scope associated with the element|
`$($0).scope().foo`|the scope of property foo|
`$($0).scope().$parent`|parent scope, can use chain, `$($0).scope().$parent.$parent`|
|`$($0).scope().$root`|root scope|
|`$($0).isolateScope()`|directive with isolate scope|
|**element**||
|`$el`| jQuery element|
|`$events`|the events associated with the jQuery element|
|**Services**||
|`angular.element($0)`|get the element(jquery)|
|`$get`|Services/Factories/Constants|
|`angular.element(document.querySelector('html')).injector().get('MyService')`||
|**controller**||
|`$($0).attr('ng-controller')`||
|`$($0).closest('[ng-controller]').attr('ng-controller')`||
```
- **value change**
  
```javascript
$($0).scope().isFoo = true  //set isFoo firstly
$($0).scope().$digest()     //to force Angular to reevaluate the value
```

- **Inspect the Scope Tree**  -> AngularJS Batarang

> Reference

- [Tips & Tricks for debugging unfamiliar AngularJS code](https://eng.localytics.com/tips-and-tricks-for-debugging-unfamiliar-angularjs-code/)
- 
