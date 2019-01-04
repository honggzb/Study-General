[angularjs学习tips](#top)

- [AngularJS tips](#angularjs-tips)
  - [ng-change-delay](#ng-change-delay)
  - [ng-change不允许传递$event参数](#ng-change%E4%B8%8D%E5%85%81%E8%AE%B8%E4%BC%A0%E9%80%92event%E5%8F%82%E6%95%B0)
  - [双向绑定的数据使用对象](#%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BD%BF%E7%94%A8%E5%AF%B9%E8%B1%A1)
  - [可以获取元素调用controller()函数来获取到控制器](#%E5%8F%AF%E4%BB%A5%E8%8E%B7%E5%8F%96%E5%85%83%E7%B4%A0%E8%B0%83%E7%94%A8controller%E5%87%BD%E6%95%B0%E6%9D%A5%E8%8E%B7%E5%8F%96%E5%88%B0%E6%8E%A7%E5%88%B6%E5%99%A8)
  - [点击按钮之后禁用按钮，防止多重提交](#%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE%E4%B9%8B%E5%90%8E%E7%A6%81%E7%94%A8%E6%8C%89%E9%92%AE%E9%98%B2%E6%AD%A2%E5%A4%9A%E9%87%8D%E6%8F%90%E4%BA%A4)
  - [deselect HTML radio input by click](#deselect-html-radio-input-by-click)
  - [监听angularJs列表数据是否渲染完毕](#%E7%9B%91%E5%90%ACangularjs%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE%E6%98%AF%E5%90%A6%E6%B8%B2%E6%9F%93%E5%AE%8C%E6%AF%95)
  - [$ctrl的使用](#ctrl%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [Can't make ng-repeat orderBy work - notarray Expected array but received: Object](#cant-make-ng-repeat-orderby-work---notarray-expected-array-but-received-object)
  - [li中ng-click无效问题](#li中ng-click无效问题)
- [AngularJS material tips](#angularjs-material-tips)
  - [Angular Material的多行文本框字数校验](#angular-material%E7%9A%84%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%A1%86%E5%AD%97%E6%95%B0%E6%A0%A1%E9%AA%8C)
  - [Angular Material对话框时，对话框显示以后，点击浏览器的返回按钮对话框不会消失的问题](#angular-material%E5%AF%B9%E8%AF%9D%E6%A1%86%E6%97%B6%E5%AF%B9%E8%AF%9D%E6%A1%86%E6%98%BE%E7%A4%BA%E4%BB%A5%E5%90%8E%E7%82%B9%E5%87%BB%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E8%BF%94%E5%9B%9E%E6%8C%89%E9%92%AE%E5%AF%B9%E8%AF%9D%E6%A1%86%E4%B8%8D%E4%BC%9A%E6%B6%88%E5%A4%B1%E7%9A%84%E9%97%AE%E9%A2%98)
  - [angular material的md-input-container中ng-messages不显示问题](#angular-material的md-input-container中ng-messages不显示问题)

## AngularJS tips

### ng-change-delay

- After AngularJS 1.3:  debounce property ngModelOptions provides to achieve that very easy
- Before AngularJS 1.3: $timeout

```html
<div ng-app='app' ng-controller='Ctrl'>
    <input type='text' placeholder='Type a name..' ng-model='vm.name'
        ng-model-options='{ debounce: 1000 }' ng-change='vm.greet()'
    />
    <p ng-bind='vm.greeting'></p>
</div>
<script>
angular.module('app', [])
.controller('Ctrl', [
    '$scope','$log',
    function($scope, $log){
        var vm = $scope.vm = {}
        vm.name = '';
        vm.greeting = '';
        vm.greet = function greet(){
            vm.greeting = vm.name ? 'Hey, ' + vm.name + '!' : '';
            $log.info(vm.greeting);
        };
    }
]);
//Before AngularJS 1.3
app.controller('MainCtrl', function($scope, $timeout) {
  var _timeout;
 //...
  $scope.FilterByName = function () {
    if(_timeout){ //if there is already a timeout in process cancel it
      $timeout.cancel(_timeout);
    }
    _timeout = $timeout(function(){
      console.log('filtering');
      _timeout = null;
    },500);
  }
 });
</script>
```

https://stackoverflow.com/questions/26446681/angular-ng-change-delay

[back to top](#top)

### ng-change不允许传递$event参数

### 双向绑定的数据使用对象

如`$scope.data=Object`，`ng-model='data.name'`,如果直接使用`$scope.name`和`ng-model='name'`有可能出现双向绑定失败

### 可以获取元素调用controller()函数来获取到控制器

比如表单name叫做personInfo，在控制台`angular.element('[name=personInfo]').controller()`可以把我这个个人信息编辑的控制器打印出来，包括里面的对象、函数、变量

[back to top](#top)

### 点击按钮之后禁用按钮，防止多重提交

**方法1：自定义directive**- 点击后，让button的状态变为disable

```html
<body ng-controller="MainCtrl">
    <button type="button" class="btn" click-and-disable="next()">下一步</button>
</body>
<script>
var app = angular.module('plunker', []);
app.controller('MainCtrl', function($scope, $timeout) {
  //...
});
app.directive('clickAndDisable', function() {
  return {
    scope: {
      clickAndDisable: '&'
    },
    link: function(scope, iElement, iAttrs) {
      iElement.bind('click', function() {
        iElement.prop('disabled',true);
        scope.clickAndDisable().finally(function() {
          iElement.prop('disabled',false);
        })
      });
    }
  };
});
</script>
```

**方法2： 在app.config里面，重写ng-click事件，设置一定事件内不能重复点击**

```javascript
$provide.decorator('ngClickDirective',['$delegate','$timeout', function ($delegate,$timeout) {  //记得在config里注入$provide
            var original = $delegate[0].compile;
            var delay = 500;//设置间隔时间
            $delegate[0].compile = function (element, attrs, transclude) {
                var disabled = false;
                function onClick(evt) {
                    if (disabled) {
                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                    } else {
                        disabled = true;
                        $timeout(function () { disabled = false; }, delay, false);
                    }
                }
                //   scope.$on('$destroy', function () { iElement.off('click', onClick); });
                element.on('click', onClick);
                return original(element, attrs, transclude);
            };
            return $delegate;
        }]);
```

**其他方法: 定义readDrivingUnable的值控制显示哪段代码**

```html
<button class="btn btn-primary" ng-click="readDriving(urls[item].imgUrl)" ng-show="readDrivingUnable"> 识别 </button>
    <!-- 由readDrivingUnable的值控制显示哪段代码，上面的代码可点击，下面的代码不可点击--> 
<button class="btn btn-default" disabled="disabled" ng-show="!readDrivingUnable">识别 </button>
```

```javascript
assessControllers.controller('PicModalCtrl', ['$scope', '$uibModalInstance', 'Assess', 'Report', 'data', function ($scope, $uibModalInstance, Assess, Report, data) {
    $scope.readDrivingUnable = true; //是否可用（默认可点击）        
    $scope.readDriving = function (imgUrl) {
        $scope.readDrivingUnable = false; //点击之后 变成不可点击            var param = {url: imgUrl, type: '6'};
        //type: 二代证2；行驶证6；驾照5；银行卡17；车牌19；名片 20            
        Assess.ocr(param).then(function (result) {
            $scope.readDrivingUnable = true; //后台接口调用完成之后再让按钮变成可点击状态                
            //TODO 业务逻辑            
        });
    };
}]);
```

[back to top](#top)

### deselect HTML radio input by click

```html
<!-- method 1 -->
<input type="radio" ng-model="checked" value="500" ng-click="uncheck($event)" />
<input type="radio" ng-model="checked" value="1000" ng-click="uncheck($event)" />
<script>
app.controller('MainCtrl', ['$scope', function (scope) {
    scope.uncheck = function (event) {
        if (scope.checked == event.target.value) 
            scope.checked = false;
    }
}]);
</script>
<!-- method 2 -->
<input type="radio" ng-model="forms.selected" value="one" ng-click="radioCheckUncheck($event)"><label for="radio1">One</label>
<input type="radio" ng-model="forms.selected" value="two" ng-click="radioCheckUncheck($event)"><label for="radio1">Two</label>
<script>
app.controller('MainCtrl', ['$scope', function (scope) {
 let lastChecked = null
  scope.radioCheckUncheck = function (event) {
    if (event.target.value === lastChecked) {
      delete scope.forms.selected;                   
      lastChecked = null
    } else {
      lastChecked = event.target.value;
    }
  }
}]);
</script>
<!-- method 3: use another link, it cannot unselect itself, 有时会失灵 -->
<input type="radio" id="radio1" ng-model="test1" value="one" tabindex="1" /><label for="radio1">One</label>
<input type="radio" id="radio2" ng-model="test1" value="two" tabindex="2"/><label for="radio2">Two</label>
<a class="undo" ng-click="test1 = null">&otimes;</a>
<!-- method 4: use double click -->
<input type="radio" id="radio1" ng-model="test1" value="one" tabindex="1" ng-dblclick="test1 = null"/><label for="radio1">One</label>
<input type="radio" id="radio2" ng-model="test1" value="two" tabindex="2" ng-dblclick="test1 = null"/><label for="radio2">Two</label>
```

[back to top](#top)

###  监听angularJs列表数据是否渲染完毕

数据渲染的时候经常会遇到在数据渲染完毕后执行某些操作，对于angularjs处理这类问题，最好的方式就是自定义指令directive

```html
<script>
app.directive('onfinishrenderfilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {    //判断是否是最后一条数据
                $timeout(function () {
                    scope.$emit('ngRepeatFinished'); //向父级scope传送ngRepeatFinished命令
                });
            }
        }
    };
});
</script>
<tr ng-repeat="i in provider.geoZoneList" onfinishrenderfilters>
        <td><input data-index="0" name="btSelectItem" type="radio" value="{{$index}}" ng-click="selectInput($index)"></td>
        <td class="nameId0">{{$index+1}}</td>
        <td class="nameId1">{{i.geoZoneName}}</td>
</tr>
<script>
$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    var btnList = $("input[name='btSelectItem']");
    btnList.eq(0).attr("checked","checked");
    $scope.provider.detalOutlet();
});
</script>   
```

[back to top](#top)

### $ctrl的使用

`$ctrl` is the view model object in your controller. "component" controllerAs is "$ctrl" by default in Angular 1.5

```html
<li ng-repeat="person in $ctrl.people"></li>
<!--    -->
<article ng-controller="Customers as vm">
    <h2></h2>
    <ul ng-repeat="c in vm.customers">
      <li></li>
    </ul>
</article>
<script>
angular.module('app')
       .controller('Customers', [function() {
            var vm = this;
            vm.title = 'Customers';
            vm.customers = [
                {name: 'Haley'}, {name: 'Ella'}, {name: 'Landon'}, {name: 'John'}
                ];
        }]);
</script>
```

[back to top](#top)

### Can't make ng-repeat orderBy work - notarray Expected array but received: Object

**The orderBy only works with Arrays** 

```html
<tr ng-repeat="friend in friends | orderBy: 'favoriteLetter': false">
    <td>{{friend.name}}</td>
    <td>{{friend.favoriteLetter}}</td>
</tr>
```

- https://docs.angularjs.org/api/ng/filter/orderBy
- https://code.angularjs.org/1.5.11/docs/error/orderBy/notarray?p0=10002
- [orderBy filter for Object](http://jsfiddle.net/4tkj8/1/)
- [another way-Add an array of your data objects](http://plnkr.co/edit/BXgYPTElSM3sjvLg30CL?p=preview)

```javascript
// Add an array of your data objects
$scope.dataArray = Object.keys($scope.data).map(function(key) {
    return $scope.data[key];
});
```

[back to top](#top)

### li中ng-click无效问题

- also happen in div
- solution
  - using `popover-trigger="click"`
  - https://stackoverflow.com/questions/29653348/angular-ng-click-and-li-items
  - using angular others directive such as: `ng-mousedown`
  
## AngularJS material tips

### Angular Material的多行文本框字数校验

`<textarea text-change/>`

```javascript
//在点击重置按钮手动的修改文本框的值以后，文字长度统计并不会修改
app.directive('textChange', ['$timeout',function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            scope.$on('textChanged', function () {
                $timeout(function () {
                    elem.triggerHandler('input');
                });
            });                      //可以通过$scope.$broadcast('textChanged');来触发textChanged事件
            scope.$watch(attrs.ngModel, function () {
                $timeout(function () {
                    elem.triggerHandler('input');
                });
            });
        }
    }
}]);
```

[back to top](#top)

### Angular Material对话框时，对话框显示以后，点击浏览器的返回按钮对话框不会消失的问题

解决方法就是监听$stateChangeStart事件，如果对话框已经显示则取消对话框并阻止下一步事件，如果有panel对话框需要先关闭掉panel对话框，在`$mdPanel`的Controller中绑定panelClose事件，`$scope.on('panelClose',function(){mdPanelRef.close();})`

```javascript
.run(['$rootScope', '$state', '$stateParams', 'SessionStorage', 'ENV', '$mdDialog', '$document',
        function ($rootScope, $state, $stateParams, SessionStorage, ENV, $mdDialog, $document) {
            //监听stateChange事件
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if(angular.element($document[0].body).hasClass('md-dialog-is-showing')) {//如果有对话框存在
                    $mdDialog.cancel();
                    /*  1) 在dialog和panel对话框关闭时，如要跳转页面，应写成$state.go()
                        1) 跳转页面，因为对话框关闭会有延迟，应该利用promise
                        $mdDialog.cancel().then(function(){ $state.go(); });
                        mdPanelRef.close().then(function(){ $state.go(); });
                    */
                    event.preventDefault();
                    return;
                }
                if(angular.element('.md-panel-is-showing').length>0) {//如果有Panel对话框存在
                    $rootScope.$broadcast('panelClose');
                    event.preventDefault();
                    return;
                }
            });
        }
    ]);
```

dialog和panel对话框关闭时，如果要跳转页面，不应该写成$mdDialog.cancel();$tate.go()//跳转页面和mdPanelRef.close();$tate.go()//跳转页面，因为对话框关闭会有延迟，应该利用promise

正确写法为$mdDialog.cancel().then(function(){$state.go();});和mdPanelRef.close().then(function(){$state.go();});

[back to top](#top)

### angular material的md-input-container中ng-messages不显示问题

`<div ng-messages="registrationForm.agencyName.$error" md-auto-hide="false" ng-if="registrationForm.agencyName.$touched">`

- `md-auto-hide="false"`是必须的
- 其中`$touched`是可选的

---------------

[Angular知识总结及学习资料（中文版）](https://blog.csdn.net/u013915143/article/details/51956582?utm_source=blogxgwz1)

AngularJS权威教程 清晰PDF版  http://www.linuxidc.com/Linux/2015-01/111429.htm

走近AngularJS系列：

- 带你走近AngularJS - 基本功能介绍 http://www.linuxidc.com/Linux/2014-05/102140.htm
- 带你走近AngularJS - 体验指令实例 http://www.linuxidc.com/Linux/2014-05/102141.htm
- 带你走近AngularJS - 创建自定义指令 http://www.linuxidc.com/Linux/2014-05/102142.htm
- 如何在 AngularJS 中对控制器进行单元测试 http://www.linuxidc.com/Linux/2013-12/94166.htm

- 在AngularJS 应用中通过 JSON ��件来设置状态 http://www.linuxidc.com/Linux/2014-07/104083.htm
- AngularJS 之 Factory vs Service vs Provider http://www.linuxidc.com/Linux/2014-05/101475.htm
- AngularJS —— 使用 ngResource、RESTful APIs 和 Spring MVC 框架提交数据 http://www.linuxidc.com/Linux/2014-07/104402.htm

[AngularJS 的详细介绍](http://www.linuxidc.com/Linux/2014-05/102139.htm)
[AngularJS 的下载地址](http://www.linuxidc.com/down.aspx?id=1402)
