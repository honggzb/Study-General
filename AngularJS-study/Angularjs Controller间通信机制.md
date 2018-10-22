[Angularjs Controller间通信机制](#top)

- `$broadcast`会把事件广播给所有子controller
- `$emit`则会将事件冒泡传递给父controller
- `$on`则是angularjs的事件注册函数

## 传递数据

```javascript
// 子级传递数据给父级  $emit
// 子级传递  
$scope.checkLoggedIn = function(type) {  
          $scope.transferType = type;  
          $scope.$emit('transfer.type', type);  
}  
// 父级接收  
$scope.$on('transfer.type', function(event, data) {  
          $scope.transferType = data;  
        });  
        $scope.checkLoggedIn = function() {  
          var type = $scope.transferType;  
}  
// 父级传递数据给子级   $broadcast
// 父级传递  
$scope.transferType = '';  
$scope.checkLoggedIn = function(type) {  
          $scope.transferType = type;  
          $scope.$broadcast('transfer.type', type);  
}  
// 子级接收  
$scope.transferType = '';  
$scope.$on('transfer.type', function(event, data) {  
          $scope.transferType = data;  
        });  
        $scope.checkLoggedIn = function() {  
          var type = $scope.transferType;  
}  
```

## 

```html
<div ng-app="app" ng-controller="parentCtr">
    <div ng-controller="childCtrl">name :
        <input ng-model="name" type="text" ng-change="change(name);" />
    </div>
    <div ng-controller="childCtrl2">Ctr1 name:
        <input ng-model="ctrlName" />
    </div>
</div>
<script>
angular.module("app", []).controller("parentCtr",
   function ($scope) {
     $scope.$on("CtrlNameChange", function (event, msg) {
          console.log("parent", msg);
          $scope.$broadcast("CtrlNameChangeFromParent", msg);
     });
}).controller("childCtrl", function ($scope) {
    $scope.change = function (name) {
        console.log("childCtrl", name);
        $scope.$emit("CtrlNameChange", name);
    };
}).controller("childCtrl2", function ($scope) {
    $scope.$on("CtrlNameChangeFromParent",
      function (event, msg) {
          console.log("childCtrl2", msg);
          $scope.ctrlName = msg;
    });
});
</script>
```
