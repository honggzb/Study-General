angularjs自身有二种设置全局变量的方法，在加上js的设置全局变量的方法，总共有三种。要实现的功能是，在ng-app中定义的全局变量，在不同的ng-controller里都可以使用。

1. 通过var 直接定义global variable，这根纯js是一样的
2. 用angularjs value来设置全局变量
3. 用angularjs constant来设置全局变量
4. 还可以通过其他方法来实现全局变量，例如：angularjs factory的功能

```javascript
var myApp = angular.module('myApp', [], ['$provide', function ($provide) {
   //...
}])
    .config(function (name) {   //把name注入config
        console.log("config中的值:" + name);
    })
    //run是在config之后 在controller之前执行
    .run(function () {
        console.log("run在config之后在controller之前:" + 'run');
    })
    //定义常量 可以注入任何方法
    .constant('name', 'zhangsan')
    .constant('config', {
      appName: 'My App',
      appVersion: 2.0,
      apiUrl: ‘http://www.google.com?api’
    })
    //只能注入到controller/service/factory
    .value('version', 'v-1.0')
    .controller('firstController', ['name', function (name) {
        console.log("controller中的值:" + name);
    }]);
 
app.controller('TestCtrl', ['config', function TestCtrl(config) {   //register config
    console.log(config);
    console.log('App Name', config.appName);    //My App
    console.log('App Name', config.appVersion);
}]);
```

better way

```javascript
// first define the un-changeable constants javascript way
var constants = constants || {};
constants.environment = “Development”;
constants.webService = “someUrl”;
Object.freeze(constants);
// add to angular
var app = angular.module(‘myApp’, []);
app.constant(‘constants’, constants);
// inject constants into a controller which won’t be able to change
app.controller(‘TestCtrl’, [‘constants’, function TestCtrl(constants) {
console.log(constants.environment);
}]);
```

**value和constant区别**

- value可以被修改，constant一旦声明无法被修改
- value不可在config里注入，constant可以

```javascript
myApp.config(function(pageCount){
    //可以得到constant定义的'pageCount'
}
```
