```javascript
var myApp = angular.module('myApp', [], ['$provide', function ($provide) {
   //...
}])
    .config(function (name) {   //把name注入config
        console.log("config中的值:" + name)
 
    })
    //run是在config之后 在controller之前执行
    .run(function () {
        console.log("run在config之后在controller之前:" + 'run');
    })
    //定义常量 可以注入任何方法
    .constant('name', 'zhangsan')
    //只能注入到controller/service/factory
    .value('version', 'v-1.0')
    .controller('firstController', ['name', function (name) {
        console.log("controller中的值:" + name);
    }])
```
