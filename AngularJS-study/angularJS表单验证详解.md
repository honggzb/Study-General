- [Sample](#sample)
- [自定义ngFocus指令 - 在用户离开该输入框时显示错误信息](#%E8%87%AA%E5%AE%9A%E4%B9%89ngfocus%E6%8C%87%E4%BB%A4---%E5%9C%A8%E7%94%A8%E6%88%B7%E7%A6%BB%E5%BC%80%E8%AF%A5%E8%BE%93%E5%85%A5%E6%A1%86%E6%97%B6%E6%98%BE%E7%A4%BA%E9%94%99%E8%AF%AF%E4%BF%A1%E6%81%AF)
- [Only Showing Errors After Submitting the Form](#only-showing-errors-after-submitting-the-form)
- [input输入框只能输入数字和小数点](#input%E8%BE%93%E5%85%A5%E6%A1%86%E5%8F%AA%E8%83%BD%E8%BE%93%E5%85%A5%E6%95%B0%E5%AD%97%E5%92%8C%E5%B0%8F%E6%95%B0%E7%82%B9)

- [常用知识](#常用知识)

## 常用知识

状态|css属性|返回类型|说明
---|---|---|---
$valid|ng-valid| Boolean|这一项当前基于你设定的规则是否验证通过
$invalid| ng-invalid| Boolean| 这一项当前基于你设定的规则是否验证未通过
$pristine| ng-pristine| Boolean |表示表单元素是纯净的，用户未操作过, 如果表单或者输入框没有使用则为True, 
$dirty| ng-dirty| Boolean| 表示表单元素是已被用户操作过, 如果表单或者输入框有使用到则为True
$error|ng-error|Boolean|如果验证失败，则此属性将是true的，而如果它是false的，那么该值通过验证的
$touched|ng-touched|Boolean|True if the input has been blurred

**Angular built-in validation directives**

Param|Type|Details
---|---|---
ngModel|string	|Assignable AngularJS expression to data-bind to.
name(optional)|string|Property name of the form under which the control is published.
required(optional)|string|Sets **required validation error** key if the value is not entered.
ngRequired(optional)|boolean|Sets **required attribute** if set to true
ngMinlength(optional)|number|Sets **minlength validation error** key if the value is shorter than minlength.
ngMaxlength(optional)|number|Sets **maxlength validation error** key if the value is longer than maxlength. Setting the attribute to a negative or non-numeric value, allows view values of any length.
ngPattern(optional)|string|**Sets pattern validation error** key if the ngModel $viewValue value does not match a RegExp found by evaluating the AngularJS expression given in the attribute value.| If the expression evaluates to a RegExp object, then this is used directly. |If the expression evaluates to a string, then it will be converted to a RegExp after wrapping it in ^ and $ characters. For instance, "abc" will be converted to new RegExp('^abc$').<br>**Note**: Avoid using the g flag on the RegExp, as it will cause each successive search to start at the index of the last search's match, thus not taking the whole input value into account
ngChange(optional)|string|AngularJS expression to be executed when input changes due to user interaction with the input element.
ngTrim(optional)|boolean|If set to false AngularJS will not automatically trim the input. <br>This parameter is ignored for input`[type=password]` controls, which will never trim the input.(default: true)

- https://docs.angularjs.org/api/ng/directive/input

```javascript
$scope.infoFrom.$setPristine();   //设置表单为未编辑的纯净状态
$scope.infoFrom.name.$setDirty();   //设置表单为用户已经编辑过得【脏】状态
$scope.infoFrom.name.$setTouched();  //not to show errors while a user is typing
$scope.infoFrom.$setUntouched();
//去掉浏览器验证
<form name="infofrom" novalidate></from>
```

## Sample

**Simple Sample**

```html
<form name="aForm" novalidate> 
  <label for="name">Your email</label> 
  <input type="email" id="name" ng-model="name" name="aField" required>
  <ng-messages for="aForm.aField.$error" ng-show="aForm.aField.$invalid && aForm.aField.$dirty">
    <ng-message when="required">This field is required</ng-message>
    <ng-message when="email">Please enter a valid email address</ng-message>
  </ng-messages>
  <button ng-click="save()" ng-disabled="aForm.$invalid">Send</button>
</form>
```

**full Sample**

```html
<form class="pure-form pure-form-aligned" name="frm" method="post" novalidate autocomplete="off">
  <fieldset>
    <div class="pure-control-group">
      <label>Username</label>
      <input name="username" ng-model="user.username" type="text" placeholder="Username" required>
      <div class="field-message" ng-messages="frm.username.$error" ng-if='frm.username.$dirty' ng-cloak>
        <div ng-message="required">Username is required</div>
      </div>
    </div>
    <div class="pure-control-group">
      <label>Password</label>
      <input name="password" ng-model="user.password" type="password" placeholder="Password" required ng-minlength="6"
        ng-maxlength="10">
        <!-- using ng-messages directive -->
      <div class="field-message" ng-messages="frm.password.$error" ng-if='frm.password.$dirty' ng-cloak>
        <div ng-message="required">Password is required</div>
        <div ng-message="minlength">Password must have minimum 6 characters</div>
        <div ng-message="maxlength">Password must have maximum 10 characters</div>
      </div>
    </div>
    <div class="pure-control-group">
      <label>Email Address</label>
      <input name="email" ng-model="user.email" type="email" placeholder="Email Address" required>
      <div class="field-message" ng-messages="frm.email.$error" ng-if='frm.email.$dirty' ng-cloak>
        <div ng-message="required">Email is required</div>
        <div ng-message="email">Must be a valid email</div>
      </div>
    </div>
    <div class="pure-controls">
      <label class="pure-checkbox">
        <input name="conditions" ng-model="conditions" type="checkbox">I've read the terms and conditions
      </label>
      <!-- Controlling the state of the submit button -->
      <button type="submit" class="pure-button pure-button-primary" ng-disabled="frm.$invalid || !conditions">Submit</button>
    </div>
  </fieldset>
</form>
```

## 自定义ngFocus指令 - 在用户离开该输入框时显示错误信息

自定义ngFocus指令 - 在用户离开该输入框时显示错误信息

`<input ng-class="{error: signup_form.name.$dirty && signup_form.name.$invalid}" type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength=3 ng-maxlength=20 required ng-focus />`

```javascript
app.directive('ngFocus', [function() {
  var FOCUS_CLASS = "ng-focused";
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = true;});
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = false;});
      });
    }
  }
}]);
```

## Only Showing Errors After Submitting the Form

1. to take away the `ng-disabled` on the submit button
2.  add a variable after the form has been submitted. just add `$scope.submitted = true;` Inside of submitForm() function
3.  Adjust the error rules from `{ng-class="&#123; 'has-error' : userForm.name.$invalid && !userForm.name.$pristine }`" to `{ng-class="&#123; 'has-error' : userForm.name.$invalid && !userForm.name.$pristine && submitted }"`

## input输入框只能输入数字和小数点

**AngularJS方法**

`<input type="text" name="chargeid2" ng-model="item.chargeid2" ng-keyup="clearNoNum(item,'chargeid2')">`

```javascript
$scope.clearNoNum = function(obj,attr){
  obj[attr] = obj[attr].replace(/[^\d.]/g,"");   //先把非数字的都替换掉，除了数字和.
  obj[attr] = obj[attr].replace(/^\./g,"");      //必须保证第一个为数字而不是.
  obj[attr] = obj[attr].replace(/\.{2,}/g,"");   //保证只有出现一个.而没有多个.
  obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");  //保证.只出现一次，而不能出现两次以上
}
```

**HTML方法**:  并限制小数位数

`<span style="font-size:14px;"> <input type="number" step="0.01" ng-model="interest" name="interest" required /></span>`

> References
- [Form validation with AngularJS](https://scotch.io/tutorials/angularjs-form-validation)
- https://codepen.io/sevilayha/pen/xFcdI
- [Handling Checkboxes and Radio Buttons in Angular Forms](https://scotch.io/tutorials/handling-checkboxes-and-radio-buttons-in-angular-forms)
- http://embed.plnkr.co/g0NMG4rmF4uwzoG2uZhf/
