## Angularjs的过滤器orderby实现表格点击某一列标题进行排序

orderBy是内置的过滤器，可以在html和js代码中使用

- html：`{{ orderBy_expression | orderBy : expression : reverse}}`
- js  ：`$filter('orderBy')(array, expression, reverse)`
  - orderBy_expression ：需要排序的数组
  - expression ：需要根据哪个条件排序
  - reverse ：正序还是倒序（boolean)

```html
<table class="table table-border" ng-app="myapp" ng-controller="orderByCtrl">
  <thead>
    <tr>
      <th>inx</th>
      <th ng-click="col='name';desc=!desc">name</th>
      <!-- 当点击列标题时，执行click事件，将排序条件反转，即，如果原来是升序则将按降序，降序亦如此 -->
      <th ng-click="col='gender';desc=!desc">gender</th>
      <th ng-click="col='age';desc=!desc">age</th>
      <th ng-click="col='score';desc=!desc">score</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="d in data|orderBy:col:desc">
      <td ng-bind="$index+1"></td>
      <td ng-bind="d.name"></td>
      <td ng-bind="d.gender"></td>
      <td ng-bind="d.age"></td>
      <td ng-bind="d.score"></td>
    </tr>
  </tbody>
</table>
<script>
var app = angular.module('myapp', []);
app.controller('orderByCtrl', function($scope) {
  $scope.col = 'name';//默认按name列排序
  $scope.desc = 0;//默认排序条件升序
  $scope.data = [
      { name: 'name 1', gender: 'male', age: 26, score: 70 }, 
      { name: 'name 2', gender: 'female', age: 24, score: 84 }, 
      { name: 'name 3', gender: 'male', age: 20, score: 76 }, 
      { name: 'name 4', gender: 'female', age: 22, score: 64 }
  ];
})
</script>
```
