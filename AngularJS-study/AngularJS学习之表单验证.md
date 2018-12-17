[AngularJS学习之表单验证](#top)

- [basic concepts](#basic-concepts)
- [ng-form表单校验实现原理](#ng-form%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- [自定义验证器](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%AA%8C%E8%AF%81%E5%99%A8)
  - [验证当前名字是否被注册-用户名的唯一性](#%E9%AA%8C%E8%AF%81%E5%BD%93%E5%89%8D%E5%90%8D%E5%AD%97%E6%98%AF%E5%90%A6%E8%A2%AB%E6%B3%A8%E5%86%8C-%E7%94%A8%E6%88%B7%E5%90%8D%E7%9A%84%E5%94%AF%E4%B8%80%E6%80%A7)
  - [验证两个密码是否相等](#%E9%AA%8C%E8%AF%81%E4%B8%A4%E4%B8%AA%E5%AF%86%E7%A0%81%E6%98%AF%E5%90%A6%E7%9B%B8%E7%AD%89)
  - [允许输入偶数](#%E5%85%81%E8%AE%B8%E8%BE%93%E5%85%A5%E5%81%B6%E6%95%B0)
- [自定义表单元素](#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0)

-------------------

## basic concepts

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

**angular自带验证器指令** 

指令 |说明 
---|---
required、ng-required |必须有输入 
pattern、ng-pattern |正则或函数进行校验 
minlength、ng-minlength |最小长度控制 
maxlength、ng-maxlength| 最大长度控制

**表单验证状态访问**

表单验证状态|说明 
---|---
`formName.inputFieldName.$pristine`|未修改的表单(表单没有填写记录)，用来判断用户是否修改了表单，如果修改了则为true，未修改则为false
`formName.inputFieldName.$dirty`|修改过的表单，只要用户修改过表单，无论输入是否通过验证，该值都将返回true
`formName.input|FieldName.$valid`|判断表单的内容是否合法的，如果合法则该属性的值为true
`formName.inputFieldName.$invalid`|不合法的表单
`formName.inputFieldName.$error`|验证错误信息, $error的值为一个js对象, 包含了当前表单的所有验证内容, 如email/max/maxLength/min/minLength/number/pattern/required/url，<br>以及它们是否合法的信息，如果验证失败，该属性值为true，如果验证成功，则该值为false

**控件状态CSS类** 

- .ng-valid 
- .ng-invalid 
- .ng-pending 
- .ng-pristine: 未修改
- .ng-dirty 
- .ng-untouched 
- .ng-touched 

[back to top](#top)

## 自定义验证器

`ctrl.$setValidity（'field', true/false）`

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
            })
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
