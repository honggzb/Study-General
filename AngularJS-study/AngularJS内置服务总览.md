[AngularJS内置服务](#top)

- [全局对象服务](#%E5%85%A8%E5%B1%80%E5%AF%B9%E8%B1%A1%E6%9C%8D%E5%8A%A1)
- [异常处理](#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)
- [处理危险数据$sce](#%E5%A4%84%E7%90%86%E5%8D%B1%E9%99%A9%E6%95%B0%E6%8D%AEsce)

## 全局对象服务

全局对象服务类型|code
---|---
访问window对象|`$window.alert(msg);`
访问document对象|`$document.find("button").on("click", function (e) {   })`
Interval|`$interval`
Timeout|`$timeout`
访问HTML5 MRUL|`$locationProvider`, `$anchorScrollProvider`
日志|`$log`

```javascript
app.controller("defaultCtrl", function ($scope, $location) {
        // $location所定义的事件---URL被改变后触发
        $scope.$on("$locationChangeSuccess", function (event, newUrl) {
            $scope.url = newUrl;
        })
        $scope.setUrl = function (component) {
            switch (component) {
                // 重置URL
                case "reset":
                    $location.path("");
                    $location.hash("");
                    $location.search("");
                    break;
                // 路径
                case "path":
                    $location.path("/cities/london");
                    break;
                // 散列
                case "hash":
                    $location.hash("north");
                    break;
                // 查询字符串
                case "search":
                    $location.search("select", "hotels");
                    break;
                // 完整路径
                case "url":
                    $location.url("/cities/london?select=hotels#north");
                    break;
            }
        }
    }) 
```

**滚到$location散列的位置**

```javascript
angular.module("exampleApp", [])L
    .config(function($anchorScrollProvider) {
        $anchorScrollProvider.disableAutoScrolling();   // 禁用自动滚动
    })
    .controller("defaultCtrl", function ($scope, $location, $anchorScroll) {
        $scope.itemCount = 50;
        $scope.items = [];
        for(var i = 0; i < $scope.itemCount; i++) {
            $scope.items[i] = "Item " + i;
        }
        $scope.show = function (id) {
            $location.hash(id);
            if (id == "bottom") {   // 只允许向下滚动
                $anchorScroll();
            }
        }
    })
```

**执行日志**

```javascript
angular.module("exampleApp", [])
    .factory("logService", function ($log) {
        var messageCount = 0;
        return {
            log : function (msg) {
                $log.log("Click count: " + messageCount++ + ") " + msg);
            }
        }
    })
    .controller("defaultCtrl", function ($document, logService) {
        $document.on("click", function () {
            logService.log("click me");
        })
    })
```

## 异常处理

异常一般分为两大类：

- 一种是在编码和测试中产生的
- 一种是你的应用程序公布用户所看见的

```javascript
//自定义异常处理器 by using $log
angular.module("exampleApp", [])
    .controller("defaultCtrl", function ($scope, myException) {
        $scope.throwEx = function () {
            try {
                throw new Error("Triggered Exception");
            } catch (ex) {
                // ex.message == Triggered Exception
                myException(ex, "Button Click");
            }
        }
    })
    .factory("myException", function ($log){
        return function (exception, cause) {
            $log.error("Message: " + exception.message + " (Cause: " + cause + ")");
        }
    });
```

## 处理危险数据$sce

```html
<div class="well">
  <p><input class="form-control" ng-model="htmlData"></p>
        <!-- 显示危险数据, NG自动过滤html标签 -->
  <p>{{htmlData}}</p>
        <!-- 进行不安全绑定， 可以解析html，但是去除了JS等属性 -->
  <p ng-bind-html="htmlData"></p>
        <!-- 受信任的数据，当鼠标移到标签上，弹出JS对话框 -->
  <p ng-bind-html="trustData"></p>
</div>
<script>
angular.module("exampleApp", ["ngSanitize"])
    .controller("defaultCtrl", function ($scope, $sce) {
        // 数据模型
        $scope.htmlData = "<p>This is <b onmouseover=alert('aaa')>danger</b> data</p>";
        $scope.trustData = "<p>This is <b onmouseover=alert('trust')>trust</b> data</p>";
        $scope.trustData = $sce.trustAsHtml($scope.trustData);
    }) 
</script>
```
