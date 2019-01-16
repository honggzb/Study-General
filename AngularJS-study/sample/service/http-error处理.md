### 使用Interceptors处理HTTP的错误

```javascript
//Interceptors ——拦截战斗机——来对应用内所有的 XHR 请求进行统一处理。
var app = angular.module('app', ['ngResource']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push(HttpInterceptor);
}]);
// Service ，作为 Interceptors的处理函数
app.factory('HttpInterceptor', ['$q', '$timeout', HttpInterceptor]);
function HttpInterceptor($q, $timeout) {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "8000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  var defered = $q.defer();
  return {
    request: function(config){
    // 接收一个参数，$http中的标准config对象，同时也需要返回一个标准config，此时可以添加各类身份验证信息，同时也可在此启动进度条
      NProgress.start();
      return config;
    },
    requestError: function(err){
    //当有多个Interceptor的时候， requestError会在前一个Interceptor抛出错误或者执行 $q.reject() 时执行，接收的参数就对应的错误
      toastr["error"]("请检查您的网络连接情况", "请求发送失败");
      NProgress.start();
      return $q.reject(err);
    },
    response: function(res){
      //接受一个请求对象参数，可以不处理就直接返回，此时也可以将进度条显示为成功完成，当然，如果API返回自定义错误时，HTTP的状态码仍然是200，便在这里处理自定义错误，也可以对返回数据做一些处理，注意要将进度条置为完成
      NProgress.done();
      toastr["success"]("获取列表成功", "完成");
      return $q.resolve(res);
    },
    responseError: function(err){
     //处理标准的Http错误，如服务器没有响应时，或者PHP之类的CGI经常出现的502一类，还可以处理HTTP状态码不是200的各类自定义错误
      NProgress.done();
      if(-1 === err.status) {
        toastr["error"]("远程服务器无响应", "失败");
      } else if(404 === err.status) {
        toastr["error"]("找不到资源", "失败");
      } else {
        toastr["error"]("发生错误，代码：" + err.status , "失败");
      }
      return $q.reject(err);
    }
  };
}
// 应用
app.controller('CodingController', ['$scope', '$resource', '$timeout', CodingController]);
function CodingController($scope, $resource, $timeout){
  var rHot = $resource("hot.json");
  var rNotFound = $resource("NOT_FOUND.json");
  var r = [rHot, rNotFound];
  $scope.isLoading = false;
  $scope.load = function(){
    if($scope.isLoading) {
      return;
    } else {
      $scope.isLoading = true;
    }
    $scope.list = [];
    r[ Math.floor( Math.random()*2 )].query(function(data){
      $scope.list = data;
      $scope.isLoading = false;
    }, function(err){
      $scope.isLoading = false;
    });
  };
}
```

> reference
- [AngularJS 中利用 Interceptors 来统一处理 HTTP 的错误](https://blog.csdn.net/Mr_rencp/article/details/54926272)

> 几个相关的库
- [NProgress](http://ricostacruz.com/nprogress/)
- [toastr](http://codeseven.github.io/toastr/demo.html)
- [ngToast toast for AngularJS](http://tamerayd.in/ngToast/#)
