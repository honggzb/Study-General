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

```javascript
$scope.infoFrom.$setPristine();   //设置表单为未编辑的纯净状态
$scope.infoFrom.name.$setDirty();   //设置表单为用户已经编辑过得【脏】状态
$scope.infoFrom.$setUntouched();
//去掉浏览器验证
<form name="infofrom" novalidate></from>
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

> References
- [Form validation with AngularJS](https://scotch.io/tutorials/angularjs-form-validation)
- https://codepen.io/sevilayha/pen/xFcdI
- [Handling Checkboxes and Radio Buttons in Angular Forms](https://scotch.io/tutorials/handling-checkboxes-and-radio-buttons-in-angular-forms)
- http://embed.plnkr.co/g0NMG4rmF4uwzoG2uZhf/


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
