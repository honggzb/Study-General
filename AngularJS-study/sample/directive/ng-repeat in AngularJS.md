 [ng-repeat in AngularJS](#top)
 
- [Factory](#factory)
- [Service](#service)
- [Provider](#provider)
- [Basic concept](#basic-concept)
    - [Tracking and Duplicates - track by](#tracking-and-duplicates---track-by)
    - [Special properties on the local scope of each template instance](#special-properties-on-the-local-scope-of-each-template-instance)
    - [Special repeat start and end points](#special-repeat-start-and-end-points)
- [Animations](#animations)
- [Features](#features)
    - [Filter](#filter)
    - [object](#object)
    - [array of objects](#array-of-objects)
    - [order by + nested loops](#order-by--nested-loops)
- [效果案例](#%E6%95%88%E6%9E%9C%E6%A1%88%E4%BE%8B)
    - [效果1： 以S开头的显示为蓝色](#%E6%95%88%E6%9E%9C1-%E4%BB%A5s%E5%BC%80%E5%A4%B4%E7%9A%84%E6%98%BE%E7%A4%BA%E4%B8%BA%E8%93%9D%E8%89%B2)
    - [效果2： 高亮显示选择行1](#%E6%95%88%E6%9E%9C2-%E9%AB%98%E4%BA%AE%E6%98%BE%E7%A4%BA%E9%80%89%E6%8B%A9%E8%A1%8C1)
    - [效果3： 高亮显示选择行2](#%E6%95%88%E6%9E%9C3-%E9%AB%98%E4%BA%AE%E6%98%BE%E7%A4%BA%E9%80%89%E6%8B%A9%E8%A1%8C2)
    
## Basic concept

### Tracking and Duplicates - track by

- Around Angular 1.3 they started requiring **track by** for any list that may include duplicate values
- **Note: track by must always be the last expression**
- If you don't have a unique identifier, track by $index can also provide a performance boost
- If you don’t use track by in this case, you get the error: **Duplicates in a repeater are not allowed**
- When no track by expression is provided, it is equivalent to tracking by the built-in $id function, which tracks items by their identity:

```html
<div ng-repeat="obj in collection track by $id(obj)">
  {{obj.prop}}
</div>
```

### Special properties on the local scope of each template instance

Variable|Type|Details
---|---|---
`$index`|number|iterator offset of the repeated element (0..length-1)
`$first`|boolean|true if the repeated element is first in the iterator
`$middle`|boolean|true if the repeated element is between the first and last in the iterator
`$last`|boolean|true if the repeated element is last in the iterator
`$even`|boolean|true if the iterator position $index is even (otherwise false)
`$odd`|boolean|true if the iterator position $index is odd (otherwise false)

### Special repeat start and end points

`ng-repeat-start`, `ng-repeat-end`

```html
<header ng-repeat-start="item in items">
  Header {{ item }}
</header>
<div class="body">
  Body {{ item }}
</div>
<footer ng-repeat-end>
  Footer {{ item }}
</footer>
```

[back to top](#top)

## Animations

Animation|Occurs
---|---
enter|when a new item is added to the list or when an item is revealed after a filter
leave|when an item is removed from the list or when an item is filtered out
move|when an adjacent item is filtered out causing a reorder or when the item contents are reordered

[back to top](#top)

## Features

### Filter

https://plnkr.co/edit/?p=preview

```html
<style>
.example-animate-container {
  background:white;
  border:1px solid black;
  list-style:none;
  margin:0;
  padding:0 10px;
}
.animate-repeat {
  line-height:30px;
  list-style:none;
  box-sizing:border-box;
}
.animate-repeat.ng-move,
.animate-repeat.ng-enter,
.animate-repeat.ng-leave {
  transition:all linear 0.5s;
}
.animate-repeat.ng-leave.ng-leave-active,
.animate-repeat.ng-move,
.animate-repeat.ng-enter {
  opacity:0;
  max-height:0;
}
.animate-repeat.ng-leave,
.animate-repeat.ng-move.ng-move-active,
.animate-repeat.ng-enter.ng-enter-active {
  opacity:1;
  max-height:30px;
}
</style>
<div ng-controller="repeatController">
  I have {{friends.length}} friends. They are:
  <input type="search" ng-model="q" placeholder="filter friends..." aria-label="filter friends" />
  <ul class="example-animate-container">
    <li class="animate-repeat" ng-repeat="friend in friends | filter:q as results">
      [{{$index + 1}}] {{friend.name}} who is {{friend.age}} years old.
    </li>
    <li class="animate-repeat" ng-if="results.length === 0">
      <strong>No results found...</strong>
    </li>
  </ul>
<script>
$scope.friends = [
    {name:'John', age:25, gender:'boy'},
    {name:'Jessie', age:30, gender:'girl'},
    {name:'Johanna', age:28, gender:'girl'},
    {name:'Joy', age:15, gender:'girl'},
    {name:'Mary', age:28, gender:'girl'},
    {name:'Peter', age:95, gender:'boy'},
    {name:'Sebastian', age:50, gender:'boy'},
    {name:'Erika', age:27, gender:'girl'},
    {name:'Patrick', age:40, gender:'boy'},
    {name:'Samantha', age:60, gender:'girl'}
  ];
</script>
```

**stacked filters**

```html
<ul>
  <input type=”text” ng-model=”searchBox”>
  <li ng-repeat=”user in users | filter:searchBox:user.name | filter:true:user.status”>
    {{user.name}} {{user.status}}
  </li>
</ul>
<script>
$scope.users = [ 
  {“name”: "Ben", “status”: true}, 
  {“name”: “Nate”, “status”: true}, 
  {“name”: “Austin”, “status”: false}
];
</script>
```

### object

```html
<ul>
  <input type=”text” ng-model=”searchBox”>
  <li ng-repeat=”(key, value) in statuses”>
    {{key}} {{value}}
  </li>
</ul>
<script>
$scope.statuses = {"Ben": true, "Nate": true, "Austin": false};
</script>
```

### array of objects

```html
<ul>
  <input type=”text” ng-model=”searchBox”/>
  <li ng-repeat=”user in users | filter:searchBox:user.name”>
    {{user.name}} {{user.status}}
  </li>
</ul>
<script>
$scope.users = [ 
  {“name”: "Ben", “status”: true}, 
  {“name”: “Nate”, “status”: true}, 
  {“name”: “Austin”, “status”: false}
];
</script>
```

### order by + nested loops

```html
<ul>
  <li><input type="text" ng-model="searchBox"/></li>
    <li ng-repeat="user in users | filter:searchBox:user.name | orderBy:'name'">
              {{user.name}}
        <select ng-model="user.status" ng-options="status for status in statuses"></select>
    </li>
</ul>
<script>
$scope.statuses = ["away", "ready", "busy"];
$scope.users = [
  {"name": "Ben", "status": "ready"}, 
  {"name": "Nate", "status": "ready"},
  {"name": "Austin", "status": "busy"},
];
</script>
```

**orderBy value has to be a string**

[back to top](#top)

## 效果案例

### 效果1： 以S开头的显示为蓝色

![](https://i.imgur.com/i5fhuFU.png)

```html
<body ng-controller="MainCtrl">
    <h1 data-ng-repeat="person in people" data-ng-class="getClass(person)">{{person.name}}</h1>
</body>
<script>
$scope.people = [
    {id: 1, name: "Joe Jones"},
    {id: 2, name: "Billy Bob"},
    {id: 3, name: "Sally Sue"},
    {id: 4, name: "Mary Smith"},
    {id: 5, name: "Bob Jones"},
    {id: 6, name: "Sassy Susy"}
  ];
  $scope.getClass = function (person) {
    return {
      blue: person.name.substr(0,1) === 'S'
    };
  };
</script>
```

### 效果2： 高亮显示选择行1

![](https://i.imgur.com/ZSuGjxR.png)

**Conditionally Apply Classes with ng-class**
  
`<div ng-repeat="project in projects" ng-class="{ 'clearfix' : $index % 3 == 0 }">`

```html
<ul class="list-group">
    <li ng-repeat="id in idsfromserver " ng-click="setSelected(this.$index)" class="list-group-item" ng-class="{'list-group-item-info': $index == indx}">{{ id }}
        <button disabled="" class="btn btn-sm btn-danger pull-right move-button" ng-click="remove()">
            <span class="glyphicon glyphicon-remove"></span>
        </button>
        <button class="btn btn-sm pull-right move-button" ng-class="{'btn-success': Activatorator, 'btn-primary': !Activatorator}" ng-click="markActive($event, this.$index)">
            <span ng-class="{'glyphicon glyphicon-ok': Activatorator, 'glyphicon glyphicon-minus': !Activatorator}"></span>
        </button>
    </li>
</ul>
<script>
$scope.descr = "basic template";
  $scope.idsfromserver = [1, 2, 3, 4, 5, 6];
  $scope.setSelected = function(idx) {
    $scope.indx = idx
  }
  $scope.markActive = function(evt, idx) {
    evt.stopPropagation();
    $scope.Activatorator = !$scope.Activatorator
  };
</script>
```

### 效果3： 高亮显示选择行2

![](https://i.imgur.com/ZSuGjxR.png)

```html
<ul>
    <li ng-repeat="row in rows" ng-class="row.classes" ng-click="activate(row)">
        {{row.label}}  -active: {{row.classes.active}}
    </li>
</ul>
<script>
angular.module( 'Main', [] )
.controller( 'MyController', function( $scope ) {
    $scope.rows = [
        { label: 'one', classes: { active: true } },
        { label: 'two', classes: { active: false } },
        { label: 'three', classes: { active: false } }
    ];
    $scope.activate = function( selectedRow ) {
        $scope.rows.forEach( function( row ) {
            row.classes = {active : ( row === selectedRow )};
        } );
    };
} );
angular.bootstrap( document, ['Main'] );
</script>
```

> [8 Features of ng-repeat](https://blog.rjmetrics.com/2015/09/02/8-features-of-ng-repeat/)
