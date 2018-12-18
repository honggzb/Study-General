[AngularJS学习之表单验证](#top)

- [Basic concept](#basic-concept)
- [ng-form表单校验实现原理](#ng-form%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
  - [angular自带验证器指令- Angular built-in validation directives](#angular%E8%87%AA%E5%B8%A6%E9%AA%8C%E8%AF%81%E5%99%A8%E6%8C%87%E4%BB%A4--angular-built-in-validation-directives)
  - [表单验证状态访问](#%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81%E7%8A%B6%E6%80%81%E8%AE%BF%E9%97%AE)
  - [表单验证状态设置](#%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81%E7%8A%B6%E6%80%81%E8%AE%BE%E7%BD%AE)
  - [提高输入体验-Enhance input element](#%E6%8F%90%E9%AB%98%E8%BE%93%E5%85%A5%E4%BD%93%E9%AA%8C-enhance-input-element)
- [使用ngMessages指令来显示错误](#%E4%BD%BF%E7%94%A8ngmessages%E6%8C%87%E4%BB%A4%E6%9D%A5%E6%98%BE%E7%A4%BA%E9%94%99%E8%AF%AF)
  - [自定义验证创建自定义消息](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%AA%8C%E8%AF%81%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B6%88%E6%81%AF)
- [Simple full Sample](#simple-full-sample)
- [自定义验证器](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%AA%8C%E8%AF%81%E5%99%A8)
  - [验证当前名字是否被注册-用户名的唯一性](#%E9%AA%8C%E8%AF%81%E5%BD%93%E5%89%8D%E5%90%8D%E5%AD%97%E6%98%AF%E5%90%A6%E8%A2%AB%E6%B3%A8%E5%86%8C-%E7%94%A8%E6%88%B7%E5%90%8D%E7%9A%84%E5%94%AF%E4%B8%80%E6%80%A7)
  - [验证两个密码是否相等](#%E9%AA%8C%E8%AF%81%E4%B8%A4%E4%B8%AA%E5%AF%86%E7%A0%81%E6%98%AF%E5%90%A6%E7%9B%B8%E7%AD%89)
  - [允许输入偶数](#%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5%E5%81%B6%E6%95%B0)
  - [input输入框只能输入数字和小数点](#input%E8%BE%93%E5%85%A5%E6%A1%86%E5%8F%AA%E8%83%BD%E8%BE%93%E5%85%A5%E6%95%B0%E5%AD%97%E5%92%8C%E5%B0%8F%E6%95%B0%E7%82%B9)
- [自定义表单元素](#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0)
- [完整案例](#%E5%AE%8C%E6%95%B4%E6%A1%88%E4%BE%8B)

-------------------

## Basic concept

```html
<form name="demoForm" novalidate="novalidate">
    <input name=“name” type="text" required ng-model=“name”/>
    <input name=“password” type="text" minlength=“8” ng-model=“password”/>
    <button ng-disabled="demoForm.$invalid">Save</button>
</form>
```

**注意**

- 在<form>上加了一个novalidate，用来禁止掉浏览器默认的验证行为，因为ng已经对HTML5的几种表单新特性做了兼容处理。
- 表单元素必须有ng-model，否则无法触发验证
- ng-form是Angular提供的directive。ng-form指令为form增补了一些额外特性。 它会控制那些带有ng-model指令和name属性的元素，监听他们的属性（包括其有效性）

## ng-form表单校验实现原理

- 通过ng-model指令跟踪修改状态与有效性验证， 
  - 状态：控件被访问过（ng-touched、ng-untouched） 
  - 控件的值变化了（ng-dirty、ng-pristine） 
  - 控件的值有效（ng-valid、ng-invalid） 
  - 有效性：通过将验证器（validator）添加到表单控件上、一旦控件发生变化Angular就会调用验证器 
- 表单中控件的formcontroller实例(持有ng-model属性)会将自身注册到ng-form指令的formcontroller上，控件的name属性作为注册的键值

### angular自带验证器指令- Angular built-in validation directives

指令 |说明 
---|---
required、ng-required |必须有输入 
pattern、ng-pattern |正则或函数进行校验 
minlength、ng-minlength |最小长度控制 
maxlength、ng-maxlength| 最大长度控制

```html
<form name="myForm">
    <input type="text"
        class="input"
        name="username"
        minlength="4"
        maxlength="15"
        ng-model="form.data.username"
        pattern="^[-\w]+$"
        username-available-validator
        placeholder="Choose a username for yourself"
        required />
    <div ng-if="myForm.username.$pending">Checking Username...</div>
    <!-- ... -->
</form>
```

>  https://docs.angularjs.org/api/ng/directive/input

### 表单验证状态访问

表单验证状态|css属性|返回类型|说明
---|---|---|---
`formName.inputFieldName.$valid`|ng-valid| Boolean|这一项当前基于你设定的规则是否验证通过, 判断表单的内容是否合法的，如果合法则该属性的值为true
`formName.input|FieldName.$invalid`| ng-invalid| Boolean| 这一项当前基于你设定的规则是否验证未通过
`formName.inputFieldName.$pristine`| ng-pristine| Boolean |表示表单元素是纯净的，用户未操作过, 未修改的表单(表单没有填写记录)，用来判断用户是否修改了表单，如果修改了则为true，未修改则为false
`formName.inputFieldName.$dirty`| ng-dirty| Boolean| 表示表单元素是已被用户操作过, 如果表单或者输入框有使用到则为True, 只要用户修改过表单，无论输入是否通过验证，该值都将返回true
`formName.inputFieldName.$error`|ng-error|Boolean|如果验证失败，则此属性将是true的，而如果它是false的，那么该值通过验证的<br>$error的值为一个js对象, 包含了当前表单的所有验证内容, 如email/max/maxLength/min/minLength/number/pattern/required/url，<br>以及它们是否合法的信息，如果验证失败，该属性值为true，如果验证成功，则该值为false
`formName.inputFieldName.$touched`|ng-touched|Boolean|True if the input has been blurred

### 表单验证状态设置

```javascript
$scope.infoFrom.$setPristine();   //设置表单为未编辑的纯净状态
$scope.infoFrom.name.$setDirty();   //设置表单为用户已经编辑过得【脏】状态
$scope.infoFrom.name.$setTouched();  //not to show errors while a user is typing
$scope.infoFrom.$setUntouched();
```

### 提高输入体验-Enhance input element

```html
<input type="text" name="usernameField" placeholder="username here" ng-model="credentials.username" minlength="3"
       ng-model-options="{updateOn: 'default blur', debounce: {default: 500, blur: 0}}"/>
```

[back to top](#top)

## 使用ngMessages指令来显示错误

**控件状态CSS类** 

- .ng-valid 
- .ng-invalid 
- .ng-pending 
- .ng-pristine: 未修改
- .ng-dirty 
- .ng-untouched 
- .ng-touched 
  
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
<!------>
<div ng-messages="myForm.colorCode.$error" ng-if="myForm.$submitted || myForm.colorCode.$touched">
    <div ng-message="required">22.</div>
    <div ng-message="minlength">333...</div>
    <div ng-message="pattern">444...</div>
</div>
```

- https://docs.angularjs.org/api/ngMessages/directive/ngMessages
- 如果需要同时显示所有错误，就需要在ng-messages指令旁加上`ng-messages-mutiple`
- 很多时候这些信息相互之间非常相似。我们可以将它们保存到模板中从而减少麻烦，而不是重新输入每个字段的错误信息, 可以用ng-message-include

```html
<！--In template/error.html-->
<div ng-message="required">This field is required</div>
<div ng-message="minlength">The field must be at least 3 characters</div>
<div ng-message="maxlength">The field cannot be longer than 20 characters</div>
<!-- a generic template of error messages known as "my-custom-messages" -->
<script type="text/ng-template" id="my-custom-messages">
  <div ng-message="required">This field is required</div>
  <div ng-message="minlength">This field is too short</div>
</script>
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController">
    <label>Your name</label>
    <input type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength=3 ng-maxlength=20 required/>
    <div class="error" ng-messages="signup_form.name.$error" ng-messages-multiple>
        <small ng-message="minlength">覆盖模板中的提示不能小于3位</small><!--这样可以覆盖模板中的提示-->
        <div ng-messages-include="template/errors.html"></div>
        <!--或者这样写 <ng-messages-include src="templates/errors.html"></ng-messages-include> -->
    </div>
    <button type="submit">Submit</button>
</form>
```

**另一种用法**

```html
<script type="script/ng-template" id="required-message">
  <ng-message when="required">This field is required!</ng-messages>
</script>
<ng-messages ng-messages-include="required-message" for="loginForm.password.$error">
  ...
</ng-messages>
<!-- somewhere else -->
<ng-messages ng-messages-include="required-message" for="otherForm.field.$error">
  ...
</ng-messages>
```

[back to top](#top)

### 自定义验证创建自定义消息

**原理**

- manually add an error to the `$error` object via `$setValidity(field, isValid)`

```html
<body ng-app="ngMessagesExample" ng-controller="ctl">
  <form name="myForm" novalidate ng-submit="submitForm(myForm)">
    <label> This field is only valid when 'aaa' is entered  
      <input type="text" ng-model="data.field1" name="field1" />
    </label>
    <div ng-messages="myForm.field1.$error" style="color:red">
        <div ng-message="validationError">this is the error</div>
    </div>
  <br/><br/>
  <button style="float:left" type="submit">Submit</button>
</form>
</body>
<script>
var app = angular.module('ngMessagesExample', ['ngMessages']);
app.controller('ctl', function ($scope) {
  $scope.submitForm = function(form) {
    if ($scope.data.field1 != 'aaa') {
        form.field1.$error.validationError = true;
        console.log('show error');
    }
    else {
        form.field1.$error.validationError = false;
        console.log('don\'t show error');
    }
  };
});
</script>
```

```html
<form name="myFormName" novalidate>
    <md-input-container class="md-block">
        <label>myField</label>
        <input ng-model="ctrl.myFieldName" name="myFieldName" ng-change="ctrl.validateField(myFormName)" />
        <div ng-show="myFormName.myFieldName.$touched || myFormName.$submitted">
            <div ng-messages="myFormName.myFieldName.$error">
                <div ng-message="myCustomValidationName">this is the message to show</div>
            </div>
        </div>
    </md-input-container>
</form>
<script>
var app = angular.module('ngMessagesExample', ['ngMessages']);
app.controller('ctl', function ($scope) {
    //Function before show your form:
    vm.showForm(form){
        form.$setPristine();
        form.$setUntouched();
        form.myFieldName.$setValidity('myCustomValidationName', false);
     //More code...
    }
    //funtion to validate field on "ng-change"
    vm.validateField(form){
        if(xxxx == yyy) //Make your own validation{
            form.myFieldName.$setValidity('myCustomValidationName', true);
        }else{
            form.myFieldName.$setValidity('myCustomValidationName', false);
        }
    }
});
</script>
```

**案例**

```html
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController" ensure-unique="/api/checkUsername.json">
    <label>Your name</label>
    <input type="text" placeholder="Username" name="username" ng-model="signup.username" ng-minlength=3 ng-maxlength=20 required />
    <div class="error" ng-messages="signup_form.username.$error">
        <div ng-message="required"> Make sure you enter your username </div>
        <!-- 自定义错误消息checkingAvailability, usernameAvailablity  -->
        <div ng-message="checkingAvailability"> Checking... </div>
        <div ng-message="usernameAvailablity"> The username has already been taken. Please choose another </div>
    </div>
    <button type="submit"> Submit </button>
</form>
<script>
app.directive('ensureUnique', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            var url = attrs.ensureUnique;
            ctrl.$parsers.push(function(val) {
            if (!val || val.length === 0) {
                return;
        }
        ngModel.$setValidity('checkingAvailability', true);
        ngModel.$setValidity('usernameAvailablity', false);
        $http({
                method: 'GET',
                url: url,
                params: {
                    username: val
                }
            }).success(function() {
                ngModel.$setValidity('checkingAvailability', false);
                ngModel.$setValidity('usernameAvailablity', true);
            })['catch'](function() {
                ngModel.$setValidity('checkingAvailability', false);
                ngModel.$setValidity('usernameAvailablity', false);
            });
            return val;
            })
        }
    }
});
</script>
```

[back to top](#top)

## Simple full Sample

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

[back to top](#top)

## 自定义验证器

- 使用`ctrl.$setValidity（'field', true/false）`
- 使用`$parsers`数组:  当用户同控制器进行交互，并且ngModelController中的`$setViewValue()`方法被调用时，`$parsers`数组中的函数会以流水线的形式被逐个调用。第一个`$parse`被调用后，执行结果会传递给第二个`$parse`，以此类推
  - 每个`$parser`返回的值都会被传入下一个`$parser`中。当不希望数据模型发生更新时返回`undefined`
- `$formatters`: 当绑定的ngModel值发生了变化，并经过`$parsers`数组中解析器的处理后，这个值会被传递给`$formatters`流水线。同`$parsers`数组可以修改表单的合法性状态类似，`$formatters`中的函数也可以修改并格式化这些值

### 验证当前名字是否被注册-用户名的唯一性

```html
<form name="myForm" ng-submit="submit()" novalidate>
  <input type="text" ng-model="username" name="username" ng-minlength="5" ng-maxlength="15" required ensure-unique />
  <div class="invalid" ng-messages="myForm.username.$error" ng-messages-include="error-messages.html">
  </div>
  <input type="submit"/>
</form>
<script>
app.directive('ensureUnique', function () {
    return {
        require:'ngModel',
        link: function (scope, element, attrs, ctrl) {
            console.log(attrs.ngModel);
            //通过检测属性ngModel的名称的变化，动态查询是否存在相应的用户名
            scope.$watch(attrs.ngModel, function (newVal,oldVal) {
                if(['Tom','Jerry'].indexOf(newVal) != -1){ //新注册的用户名在其中
                    ctrl.$setValidity('unique',false);
                }
                else{
                    ctrl.$setValidity('unique',true);
                }
            });
            // 
            scope.$watch(attrs.ngModel, function(n) {
                if (!n) return;
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: {
                        field: attrs.ensureUnique,
                        value: scope.ngModel
                    }
                }).success(function(data) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data) {
                    c.$setValidity('unique', false);
                });
            });
        }
    }
})
</script>
```

[back to top](#top)

### 验证两个密码是否相等

```html
<form>
    <input type="password" required="required" ng-minlength="6" name="pwd" ng-model="user.password" id="pwd"/>
    <span class="warning" ng-show="!angularForm.pwd.$pristine && angularForm.pwd.$error.required">*</span>
    <span class="warning" ng-show="angularForm.pwd.$error.minlength">最少为6位数</span>
    <!--这里compare-pwd的值，要等于被比较的对象的name属性值，即第一个密码框的name值-->
    <input type="password" required="required" name="pwd2" compare-pwd="pwd" ng-model="pwd2"/>
    <span class="warning" ng-show="angularForm.pwd2.$error.required">*</span>
    <!--注意这里的pwdmatch,是指令里面设置的-->
    <span class="warning" ng-show="angularForm.pwd2.$error.pwdmatch">X</span>
    <span class="warning" ng-show="angularForm.pwd2.$valid" style="color: green;">OK</span>
    <span ng-show="user.password !=pwd2">两次密码输入不一致</span>        
</form>                    
<script>
/*自定义指令--比较两个密码是否相等.angular的指令是驼峰的形式*/
app.directive('comparePwd',function(){
    return{
        require : 'ngModel',
        /*scope表示作用域，elem表示使用这个指令的元素对象（这里指第二个密码框），attrs。。。ctrl。。。*/
        link : function(scope,elem,attrs,ctrl){
            //注意这样取值的话，第一密码框的Id值必须要设置且必须与第二个密码框的compare-pwd属性的值相同
            var firstPwdIdObj = "#" + attrs.comparePwd;
            $(elem).add(firstPwdIdObj).on('keyup',function(){
                /*手动执行脏检查*/
                scope.$apply(function(){
                    //$(firstPwdIdObj).val()表示第一个密码框的值。elem.val()表示第二个密码框的值
                    var flag = elem.val() === $(firstPwdIdObj).val();
                    //alert(flag+",--"+elem.val()+",--"+$(firstPwdIdObj).val());
                    ctrl.$setValidity("pwdmatch",flag);//flag,表示是否相等。pwdmatch用于$error时的标识符，注意看页面，$setValidity是require中ngModel的方法！
                });
            });
        }
    }
});
</script>
```

[back to top](#top)

### 允许输入偶数

```html
<form>
    <input type="number" ng-model="test1" even-num />   
</form>                    
<script>
app.directive('evenNum',function(){
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.push(function(viewValue) {
        if (viewValue % 2 == 0) {
          ctrl.$setValidity('evenNum', true);
          return viewValue;
        } else {
          ctrl.$setValidity('evenNum', false);
          return viewValue;
        }
      });
    }
  };
});
</script>
```

### input输入框只能输入数字和小数点

**AngularJS方法**

```html
<input type="text" name="chargeid2" ng-model="item.chargeid2" ng-keyup="clearNoNum(item,'chargeid2')">
<script>
$scope.clearNoNum = function(obj,attr){
  obj[attr] = obj[attr].replace(/[^\d.]/g,"");   //先把非数字的都替换掉，除了数字和.
  obj[attr] = obj[attr].replace(/^\./g,"");      //必须保证第一个为数字而不是.
  obj[attr] = obj[attr].replace(/\.{2,}/g,"");   //保证只有出现一个.而没有多个.
  obj[attr] = obj[attr].replace(".","$#$").replace(/\./g,"").replace("$#$",".");  //保证.只出现一次，而不能出现两次以上
}
</script>
```

**HTML方法: 并限制小数位数**

`<span style="font-size:14px;"> <input type="number" step="0.01" ng-model="interest" name="interest" required /></span>`

[back to top](#top)

## 自定义表单元素

```html
<smarttextarea contenteditable="true" class="smarttextarea" ng-model="test3" required></smarttextarea>
<script>
app.directive('smarttextarea',function(){
  var link = function(scope, elm, attrs, ctrl) {
      //view=>model数据绑定
      elm.bind('keyup', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });
      //model=>view数据绑定
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };
      ctrl.$setViewValue(elm.html());
    };
  return {
    template : '<div></div>',
    replace : true,
    require: 'ngModel',
    restrict: 'E',
    link : link
  };
});
</script>
```

[back to top](#top)

## 完整案例

- 在提交后显示验证信息
- 自定义ngFocus指令 - 在用户离开该输入框时显示错误信息
- 自定义ensureUnique指令 - 验证当前名字是否被注册-用户名的唯一性

```html
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController">
  <fieldset>
    <legend>Signup</legend>
    <div class="row">
      <div class="large-12 columns">
        <label>Your name</label>
        <!-- 自定义ngFocus指令给表单输入字段的blur和focus添加了对应的行为 -->
        <input type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength=3 ng-maxlength=20
               ng-class="{error: signup_form.name.$dirty && signup_form.name.$invalid}" ng-focus required />
        <!-- focused, 根据表单是否具有焦点来展示独立的错误信息。 -->
        <div class="error" ng-show="signup_form.name.$dirty && signup_form.name.$invalid && !signup_form.name.$focused">
            <!-- ngModel控制器中使用$isEmpty()方法来判断输入字段是否为空 -->
            <small class="error" ng-show="signup.name.$isEmpty()"> Your name can not be empty. </small>
            <small class="error" ng-show="signup_form.name.$error.required"> Your name is required. </small>
            <small class="error" ng-show="signup_form.name.$error.minlength"> Your name is required to be at least 3 characters </small>
            <small class="error" ng-show="signup_form.name.$error.maxlength"> Your name cannot be longer than 20 characters </small>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="large-12 columns">
        <label>Your email</label>
        <input type="email" placeholder="Email" name="email" ng-model="signup.email"
          ng-minlength=3 ng-maxlength=20 ng-class="{error: signup_form.name.$dirty && signup_form.name.$invalid}" required />
          <!-- 在ng-show指令中加入submitted, 在提交后显示验证信息 -->
        <div class="error" ng-show="signup_form.email.$dirty && signup_form.email.$invalid && signup_form.submitted">
          <small class="error" ng-show="signup_form.email.$error.required"> Your email is required. </small>
          <small class="error" ng-show="signup_form.email.$error.minlength"> Your email is required to be at least 3 characters </small>
          <small class="error" ng-show="signup_form.email.$error.email"> That is not a valid email. Please input a valid email.  </small>
          <small class="error" ng-show="signup_form.email.$error.maxlength"> Your email cannot be longer than 20 characters</small>
        </div>
      </div>
    </div>
    <div class="large-12 columns">
      <label>Username</label>
        <!-- 自定义ensure-unique指令 -->
        <input  type="text" placeholder="Desired username" name="username" ng-model="signup.username"
                ng-minlength=3 ng-maxlength=20 ng-class="{error: signup_form.name.$dirty && signup_form.name.$invalid}"
                ensure-unique="username" required />
       <!-- 在ng-show指令中加入submitted, 在提交后显示验证信息 -->
      <div class="error" ng-show="signup_form.email.$dirty && signup_form.email.$invalid && signup_form.submitted">
        <small class="error" ng-show="signup_form.username.$error.required"> Please input a username </small>
        <small class="error" ng-show="signup_form.username.$error.minlength"> Your username is required to be at least 3 characters
        </small>
        <small class="error"ng-show="signup_form.username.$error.maxlength">Your username cannot be longer than 20 characters</small>
        <!-- 自定义验证 $error.unique -->
        <small class="error" ng-show="signup_form.username.$error.unique">That username is taken, please try another</small>
      </div>
    </div>
    <button type="submit" class="button radius">Submit</button>
  </fieldset>
</form>
<script>
angular.module('myApp', [])
    .directive('ensureUnique', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: {'field': attrs.ensureUnique}
                }).success(function(data, status, headers, cfg) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                });
            });
            }
        };
    }])
    .directive('ngFocus', [function() {
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
    }])
    .controller('signupController', ['$scope', function($scope) {
        // 只有在提交后显示验证信息， 使用summitted属性
        // 仅当signup_form.submitted设置为true时，容纳错误信息的div才会展示出来
        $scope.submitted = false;
        $scope.signupForm = function() {
            if ($scope.signup_form.$valid) {
            // Submit as normal
            } else {
                $scope.signup_form.submitted = true;
            }
        }
    }]);
</script>
```

[back to top](#top)

> References
- AngularJS权威教程.pdf
- [Form validation with AngularJS](https://scotch.io/tutorials/angularjs-form-validation)
- https://codepen.io/sevilayha/pen/xFcdI
- [Handling Checkboxes and Radio Buttons in Angular Forms](https://scotch.io/tutorials/handling-checkboxes-and-radio-buttons-in-angular-forms)
- http://embed.plnkr.co/g0NMG4rmF4uwzoG2uZhf/
