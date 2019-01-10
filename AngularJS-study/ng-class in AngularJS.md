[AngularJS ng-class directive](#top)

- [Add/Remove classes based on string](#addremove-classes-based-on-string)
- [Add/Remove classes based on Array/Map Syntax](#addremove-classes-based-on-arraymap-syntax)
- [Add/Remove classes based on evaluated expressions](#addremove-classes-based-on-evaluated-expressions)
- [Bind single or multiple classes based on dynamic data](#bind-single-or-multiple-classes-based-on-dynamic-data)
- [Animation](#Animation)
  
**adding classes dynamically/conditionally**

|Usage as|example|
|---|---|
|string|`<h2 ng-class="superClass">Using String Syntax</h2>`|
|Array|`<p ng-class="[style1, style2, style3]">Using Array Syntax</p>`|
|Map|`<p ng-class="[style4, {orange: warning}]">Using Array and Map Syntax</p>`|
|expressions|`<div ng-class="{ 'text-success': awesome, 'text-large': giant }">`|
|Ternary Operator|`<li ng-class="{ 'text-info': $even, 'text-danger': $odd }" ng-repeat="item in items">{{ item.name }}</li>`|

## Add/Remove classes based on string

```html
<style>
.bubble { 
  animation:pulse 1s infinite; 
  -webkit-animation:pulse 1s infinite;
}
@keyframes pulse {
  0%      { transform:scale(1); }
  25%     { transform:scale(2); }
  75%     { transform:scale(1); }
}
@-webkit-keyframes pulse {
  0%      { -webkit-transform:scale(1); }
  25%     { -webkit-transform:scale(2); }
  75%     { -webkit-transform:scale(1); }
}
</style>
<div class="row">
    <div class="col-xs-6">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Type Your Class" ng-model="superClass">
        </div>
      </form>
      <p>Try:</p>
      <ul>
        <li>text-danger</li>
        <li>text-success</li>
        <li>text-danger</li>
        <li>bg-primary</li>
        <li>bg-info</li>
        <li>bubble</li>
      </ul>
    </div>   
    <div class="col-xs-6">
      <div class="jumbotron text-center">
        <h2 ng-class="superClass">Stuff Stuff</h2>
      </div>
    </div>
  </div>
```

[back to top](#top)

## Add/Remove classes based on Array/Map Syntax

```html
<!-- input bold strike red, 三种class均施加到p -->
<input type="text" ng-model="style" placeholder="Type: bold strike red">
<p ng-class="[style1, style2, style3]">Using Array Syntax</p>
<p ng-class="[style4, {orange: warning}]">Using Array and Map Syntax</p>
```

[back to top](#top)

## Add/Remove classes based on evaluated expressions

```html
<input type="checkbox" ng-model="awesome"> Are You Awesome?
<input type="checkbox" ng-model="giant"> Are You a Giant?
<div ng-class="{ 'text-success': awesome, 'text-large': giant }">
```

[back to top](#top)

## Bind single or multiple classes based on dynamic data 

- ngClass Using the Ternary Operator
    - `ng-class="$variableToEvaluate ? 'class-if-true' : 'class-if-false'"`
- Evaluating First, Last or Specific Number

```html
<ul>
  <!-- add a class to the first item -->
  <li ng-class="{ 'text-success': $first }" ng-repeat="item in items">{{ item.name }}</li>
  <!-- add a class to the last item -->
  <li ng-class="{ 'text-danger': $last }" ng-repeat="item in items">{{ item.name }}</li>
  <!-- add a class to the even items and a different class to the odd items -->
  <li ng-class="{ 'text-info': $even, 'text-danger': $odd }" ng-repeat="item in items">{{ item.name }}</li>
</ul>
```

[back to top](#top)

## Animation

ngClass directive still supports CSS3 Transitions/Animations even if they do not follow the ngAnimate CSS naming structure

Animation|Occurs
---|---
addClass|just before the class is applied to the element
removeClass|just before the class is removed from the element
setClass|just before classes are added and classes are removed from the element at the same time

```html
<input id="setbtn" type="button" value="set" ng-click="myVar='my-class'">
<input id="clearbtn" type="button" value="clear" ng-click="myVar=''">
<span class="base-class" ng-class="myVar">Sample Text</span>
```

[back to top](#top)
