[angular之ng-model-options指令](#top)

- [基本概念](#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
- [samples](#samples)
- [同步模型和视图](#%E5%90%8C%E6%AD%A5%E6%A8%A1%E5%9E%8B%E5%92%8C%E8%A7%86%E5%9B%BE)
- [composition sample](#composition-sample)
- [Programmatically changing options](#programmatically-changing-options)

## 基本概念

ng-model-options允许控制ng-model和其子孙何时进行同步. 比如:

1. 当某个确定的事件被触发的时候 
2. 在指定的防抖动延迟时间之后,这样视图值就会在指定的时间之后被同步到模型

**选项**

`<ANYng-model-options="Object">...</ANY>`, `ng-model-options="{ debounce: 1000, updateOn: 'blur' }"`

- `updateOn`: string, 失去焦点的时候更新, There is a special event called default that matches the default events belonging to the control. These are the events that are bound to the control, and when fired, update the `$viewValue` via `$setViewValue`
- `debounce`: integer value, 延迟更新,  debounce model update value in milliseconds. A value of 0 triggers an immediate update
- `allowInvalid`: boolean value, 是否需要验证后绑定数据, which indicates that the model can be set with values that did not validate correctly instead of the default behavior of setting the model to undefined.
- `getterSetter`: boolean value, 是否绑定到getters/setters函数上, telling ngModel that the ngModel expression on the scope refers to a "getter/setter" function rather than the value itself
- Input-type specific options: to adjust the value that is displayed in the control. **Note that browsers may apply their own formatting in the user interface**
    - `timezone`: Defines the timezone to be used to read/write the Date instance in the model for <input type="date" />, <input type="time" />, ... . 
    - `timeSecondsFormat`: Defines if the time and datetime-local types should show seconds and milliseconds. The option follows the format string of date filter. 
        - By default, the options is undefined which is equal to 'ss.sss' (seconds and milliseconds). The other options are 
        - 'ss' (strips milliseconds)
        - '' (empty string), which strips both seconds and milliseconds
    - `timeStripZeroSeconds`: Defines if the time and datetime-local types should strip the seconds and milliseconds from the formatted value if they are zero. This option is applied after timeSecondsFormat.
- `$rollbackViewValue` **同步模型和视图**: 由于通过ng-model-options来控制了模型的更新时间, 在很多时候,模型和视图就会出现不同步的情况. 这时,angular提供了一个叫做$rollbackViewValue的方法来同步数据模型到视图. 这个方法会把数据模型的值返回给视图,同时取消所有的将要发生的延迟同步更新事件

## samples

**Overriding immediate updates**

```html
<form name="userForm">
    <label>Name:
        <input type="text" name="userName" ng-model="user.name" ng-model-options="{ updateOn: 'blur' }" ng-keyup="cancel($event)" />
    </label><br />
    <label> Other data:
        <input type="text" ng-model="user.data" />
    </label><br />
</form>
<script>
$scope.user = { name: 'say', data: '' };
$scope.cancel = function(e) {
    if (e.keyCode === 27) {
      $scope.userForm.userName.$rollbackViewValue();    //同步模型和视图
    }
};
</script>
```

**Debouncing updates**

```html
<form name="userForm">
    Name:
    <input type="text" name="userName" ng-model="user.name" ng-model-options="{ debounce: 1000 }" />
    <button ng-click="userForm.userName.$rollbackViewValue(); user.name=''">Clear</button><br />
  </form>
```

**Connecting to the scope**

`<input type="text" name="userName" ng-model="user.name" ng-model-options="{ getterSetter: true }" />`

**Specifying timezones**

```html
<input type="time" name="timeFormatted" ng-model="$ctrl.time" step="any" ng-model-options="$ctrl.options" />
<input type="text" ng-model="$ctrl.options.timeSecondsFormat" ng-change="$ctrl.optionChange()">
<input type="checkbox" ng-model="$ctrl.options.timeStripZeroSeconds" ng-change="$ctrl.optionChange()">
<script>
this.time = new Date(1970, 0, 1, 14, 57, 0);
this.options = {
    timeSecondsFormat: 'ss',
    timeStripZeroSeconds: true
};
this.optionChange = function() {
    this.timeForm.timeFormatted.$overrideModelOptions(this.options);
    this.time = new Date(this.time);
};
</script>
```

## 同步模型和视图

```html
<!-- http://plnkr.co/edit/vve2Xh7LROQLQFa6FFrn?p=preview -->
<label>执行了 $rollbackViewValue() 方法</label>
<input name="myInput1" ng-model="myValue1" class="form-control" ng-keydown="resetWithRollback($event)">
<script>
$scope.resetWithRollback = function(e){
    if(e.keyCode == 27) {    // 按Esc的时候
        $scope.myValue1 = '';
        $scope.myForm2.myInput1.$rollbackViewValue();  //使用了$rollbackViewValue,总是可以同步视图,清空myValue1值
    }
    };
</script>
```

## composition sample

- 当用户在input里输入的时候,延迟1000毫秒更新模型,但是当input元素失去焦点的时候,立刻更新模型
- 通过给debounce属性定义一个json对象来实现

```html
<input type="search" ng-model="searchQuery" ng-model-options="{updateOn:'default blur',debounce:{default:1000,blur:0}}">
<p>Search results for: {{searchQuery}}</p>
```

## Programmatically changing options

- The ngModelOptions expression is only evaluated once when the directive is linked
- It is not watched for changes. However, it is possible to override the options on a single `ngModel.NgModelController` instance with `NgModelController#$overrideModelOptions()`
- refer to: https://docs.angularjs.org/api/ng/directive/ngModelOptions#default-events-extra-triggers-and-catch-all-debounce-values

```javascript
this.updateOptions = function() {
      var options = angular.extend(this.options, {
        updateOn: Object.keys(this.events).join(' ').replace('*', ''),
        debounce: this.events
      });
      this.form.input.$overrideModelOptions(options);
    };
```

> Reference
- https://docs.angularjs.org/api/ng/directive/ngModelOptions
- [NG-MODEL-OPTIONS IN ANGULAR 1.3](https://blog.thoughtram.io/angularjs/2014/10/19/exploring-angular-1.3-ng-model-options.html)
- 
