[angularjs学习tips](#top)

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



[back to top](#top)

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
                        2) 跳转页面，因为对话框关闭会有延迟，应该利用promise
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
