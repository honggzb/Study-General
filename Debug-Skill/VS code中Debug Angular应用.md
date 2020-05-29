[VS code中Debug Angular应用](#top)

- [前提条件](#前提条件)
- [配置](#配置)

## 前提条件

- VS code 1.14+
- Debugger for Chrome插件
- angular/cli -g
- 用@angular/cli创建新项目ng new my-app

## 配置

1. 配置launch.json

外部调用Scope方法

```javascript
// $watch方法可以监视Scope某个变量的变化，当变化发生调用回调函数
myApp.controller("NGCtrl", function($scope){
    $scope.counter = 0;
    $scope.jQBtnState = false;
    //当jQBtnState变量值为false的时候就会禁用id为jQBtn的按钮
    $scope.$watch("jQBtnState", function(newVal){
        $('#jQBtn').attr('disabled', newVal);
    });
    $scope.jQBtnClick = function(){
        $scope.counter++;
    }
})
// 外部调用Scope方法
$('#jQBtn').on("click", function(){
    console.log("JQuery button clicked");
    var scope = angular.element(ngSection).scope();   //先获取Scope
    scope.$apply(function(){                          //然后使用$apply方法调用Scope内的方法
        scope.jQBtnClick();
    });
})
```

```html
<!-- Pre-select the 1st radio button of the list -->
<tr *ngFor="let entry of entries; let idx = index">
    <td><input type="radio" name="radiogroup" [checked]="idx === 0">
</tr>
<!-- Binding: Model -> Template -->
<input type="radio" name="radiogroup" [checked]="idx === 0" [value]="entry.id">
<!-- Binding: Template -> Model -->
<input type="radio" name="radiogroup" [checked]="idx === 0" [value]="entry.id" (change)="onSelectionChange(entry)">
<script>
@Component({...})
class App {
    //...
    selectedEntry;
    onSelectionChange(entry) {
        this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
    }
}
</script>
```


check if it is an empty JavaScript object

- ECMA 5+:

`// because Object.keys(new Date()).length === 0;, we have to do some additional check`
`Object.keys(obj).length === 0 && obj.constructor === Object`

- Pre-ECMA 5:

```javascript
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
```

- jQuery:     `jQuery.isEmptyObject({}); // true`, jQuery have special function
- lodash:     `_.isEmpty({}); // true`
- Underscore: `_.isEmpty({}); // true`
- AngularJS (version 1):  `angular.equals({}, {}); // true`
- Ramda:      `R.isEmpty({}); // true`

```javascript
function isObjectEmpty(object){
  var isEmpty = true;
  for(keys in object){
     isEmpty = false;
     break; // exiting since we found that the object is not empty
  }
  return isEmpty;
}
```

**the jQuery implementation of isEmptyObject**

```javascript
function isEmptyObject ( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }
```

**adding isEmpty() to the object prototype**

```javascript
// As a prototype:
Object.prototype.isEmpty = function() {
    for(var i in this) 
        return false;
    return true;
}
// As a function
function objectIsEmpty(obj) {
    for (var i in obj) return false;
    return true;
}
var obj = {};
if (obj.isEmpty()) console.log('empty');
if (objectIsEmpty(obj)) console.log('empty');
```
