[Angularjs的前端拦截器- interceptor](#top)

- [什么是拦截器interceptors](#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8B%A6%E6%88%AA%E5%99%A8interceptors)
- [拦截器种类](#%E6%8B%A6%E6%88%AA%E5%99%A8%E7%A7%8D%E7%B1%BB)
- [interceptor在AngularJS中的使用方法](#interceptor%E5%9C%A8angularjs%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
- [拦截器案例](#%E6%8B%A6%E6%88%AA%E5%99%A8%E6%A1%88%E4%BE%8B)
    - [案例1: 拦截器使用了一个异步操作，根据结果来更新配置。然后它用更新后的配置继续执行操作。如果deferred被拒绝，http请求则会失败](#%E6%A1%88%E4%BE%8B1-%E6%8B%A6%E6%88%AA%E5%99%A8%E4%BD%BF%E7%94%A8%E4%BA%86%E4%B8%80%E4%B8%AA%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C%E6%A0%B9%E6%8D%AE%E7%BB%93%E6%9E%9C%E6%9D%A5%E6%9B%B4%E6%96%B0%E9%85%8D%E7%BD%AE%E7%84%B6%E5%90%8E%E5%AE%83%E7%94%A8%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84%E9%85%8D%E7%BD%AE%E7%BB%A7%E7%BB%AD%E6%89%A7%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%A6%82%E6%9E%9Cdeferred%E8%A2%AB%E6%8B%92%E7%BB%9Dhttp%E8%AF%B7%E6%B1%82%E5%88%99%E4%BC%9A%E5%A4%B1%E8%B4%A5)
    - [案例2: 结合angular-ui-router使用的拦截器，如果401(未被认证)，结束launch page](#%E6%A1%88%E4%BE%8B2-%E7%BB%93%E5%90%88angular-ui-router%E4%BD%BF%E7%94%A8%E7%9A%84%E6%8B%A6%E6%88%AA%E5%99%A8%E5%A6%82%E6%9E%9C401%E6%9C%AA%E8%A2%AB%E8%AE%A4%E8%AF%81%E7%BB%93%E6%9D%9Flaunch-page)
    - [案例3: Session 注入(请求拦截器)](#%E6%A1%88%E4%BE%8B3-session-%E6%B3%A8%E5%85%A5%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%E5%99%A8)
    - [案例3: 时间戳(请求和响应拦截器)](#%E6%A1%88%E4%BE%8B3-%E6%97%B6%E9%97%B4%E6%88%B3%E8%AF%B7%E6%B1%82%E5%92%8C%E5%93%8D%E5%BA%94%E6%8B%A6%E6%88%AA%E5%99%A8)
    - [案例4: 请求恢复 (请求异常拦截)](#%E6%A1%88%E4%BE%8B4-%E8%AF%B7%E6%B1%82%E6%81%A2%E5%A4%8D-%E8%AF%B7%E6%B1%82%E5%BC%82%E5%B8%B8%E6%8B%A6%E6%88%AA)
    - [案例5: Session 恢复 (响应异常拦截器)](#%E6%A1%88%E4%BE%8B5-session-%E6%81%A2%E5%A4%8D-%E5%93%8D%E5%BA%94%E5%BC%82%E5%B8%B8%E6%8B%A6%E6%88%AA%E5%99%A8)
    - [案例5: 登陆拦截器1](#%E6%A1%88%E4%BE%8B5-%E7%99%BB%E9%99%86%E6%8B%A6%E6%88%AA%E5%99%A81)
    - [案例6: 登陆拦截器2](#%E6%A1%88%E4%BE%8B6-%E7%99%BB%E9%99%86%E6%8B%A6%E6%88%AA%E5%99%A82)

## 什么是拦截器interceptors

- 用途
    - 全局处理错误: 
    	- 有时希望俘获所有的请求，并且在将其发送到服务端之前进行操作
    	- 有时希望俘获响应，并且在完成完成调用之前处理它。一个很好例子就是处理全局http异常
    - 统一进行身份验证一类的处理
    - 对所有发出去的请求进行预处理
    - 对所有收到的响应进行预处理
    - 做一些增强用户体验的操作，例如显示一个进度条
- AngularJS中的用法
    - $httpProvider中有一个**interceptors 数组**，而所谓拦截器只是一个简单的注册到了该数组中的常规服务工厂

## 拦截器种类

angularJs提供四种拦截器，其中两种成功拦截器（request、response），两种失败拦截器（requestError、responseError）

```javascript
angular.module("myApp", [])
    .factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {
        var httpInterceptor = {
            'responseError' : function(response) {
                //......
                return $q.reject(response);
            },
            'response' : function(response) {
                //......
                return response;
            },
            'request' : function(config) {
                //......
                return config;
            },
            'requestError' : function(config){
                //......
                return $q.reject(config);
            }
        }
        return httpInterceptor;
    }
```

拦截器用途|说明
---|---
通过实现 request 方法拦截请求|该方法会在 $http 发送请求道后台之前执行，因此你可以修改配置或做其他的操作。该方法接收请求配置对象(request configuration object)作为参数，然后必须返回配置对象或者 promise 。如果返回无效的配置对象或者 promise 则会被拒绝，导致 $http 调用失败
通过实现 response 方法拦截响应| 该方法会在 $http 接收到从后台过来的响应之后执行，因此你可以修改响应或做其他操作。该方法接收响应对象(response object)作为参数，然后必须返回响应对象或者promise。响应对象包括了请求配置(request configuration)，头(headers)，状态(status)和从后台过来的数据(data)。如果返回无效的响应对象或者 promise 会被拒绝，导致 $http 调用失败
通过实现 requestError 方法拦截请求异常|有时候一个请求发送失败或者被拦截器拒绝了。请求异常拦截器会俘获那些被上一个请求拦截器中断的请求。它可以用来恢复请求或者有时可以用来撤销请求之前所做的配置，比如说关闭进度条，激活按钮和输入框什么之类的。
通过实现 responseError 方法拦截响应异常|有时候我们后台调用失败了。也有可能它被一个请求拦截器拒绝了，或者被上一个响应拦截器中断了。在这种情况下，响应异常拦截器可以帮助我们恢复后台调用

[back to top](#top)

## interceptor在AngularJS中的使用方法

```javascript
// 创建一个拦截器myInterceptor
module.factory('myInterceptor', ['$log', function($log) {
    $log.debug('$log is here to show you that this is a regular factory with injection');
    var myInterceptor = {
        //...
    };
    return myInterceptor;
}]);
//通过它的名字添加到 $httpProvider.interceptors 数组:
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
}]);
```

[back to top](#top)

## 拦截器案例

### 案例1: 拦截器使用了一个异步操作，根据结果来更新配置。然后它用更新后的配置继续执行操作。如果deferred被拒绝，http请求则会失败

```javascript
module.factory('myInterceptor', ['$q', 'someAsyncService', function($q, someAsyncService) {
    var requestInterceptor = {
        //只有当 deferred 被解析，请求才算成功，如果 deferred 被拒绝，请求将会失败
        request: function(config) {
            var deferred = $q.defer();
            someAsyncService.doAsyncOperation().then(function() {
                // Asynchronous operation succeeded, modify config accordingly
                //...
                deferred.resolve(config);
            }, function() {
                // Asynchronous operation failed, modify config accordingly
                //...
                deferred.resolve(config);
            });
            return deferred.promise;
        }
    };
    return requestInterceptor;
}]);
```

[back to top](#top)

### 案例2: 结合angular-ui-router使用的拦截器，如果401(未被认证)，结束launch page

```javascript
.factory('interceptor', function ($q, $injector, cgiLaunchPage) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 401) {
          $injector.get('$state').go('error', { errorType: 'acct_exist' });
          cgiLaunchPage.closeLaunchPage();
        }
        return $q.reject(rejection);
      }
    };
  })
```

[back to top](#top)

### 案例3: Session 注入(请求拦截器)

两种方式来实现服务端的认证

- 第一种是传统的Cookie-Based 验证。通过服务端的 cookies 来对每个请求的用户进行认证
- 另一种方式是Token-Based 验证。当用户登录时，他会从后台拿到一个 sessionToken。sessionToken在服务端标识了每个用户，并且会包含在发送到服务端的每个请求中

```javascript
<!-- lang: js -->
module.factory('sessionInjector', ['SessionService', function(SessionService) {
    var sessionInjector = {
        request: function(config) {
            if (!SessionService.isAnonymus) {
                //为每个被俘获的请求添加了x-session-token头 (如果当前用户已登录)
                config.headers['x-session-token'] = SessionService.token;
            }
            return config;
        }
    };
    return sessionInjector;
}]);
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);
```

被sessionInjector 拦截之前的配置对象的header会多加一个sessionToken

```json
"headers": {
        "Accept": "application/json, text/plain, */*",
        "x-session-token": 415954427904
    }
```

[back to top](#top)

### 案例3: 时间戳(请求和响应拦截器)

通过给每个请求和响应加上时间戳, 测一下从后台返回响应需要多少时间

```javascript
<!-- lang: js -->
module.factory('timestampMarker', [function() {
    var timestampMarker = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('timestampMarker');
}]);
// using
module.controller('ExampleController', ['$scope', '$http', function($scope, $http) {
    $scope.requestTime = '[waiting]';
    $http.get('https://api.github.com/users/naorye/repos').then(function(response) {
        var time = response.config.responseTimestamp - response.config.requestTimestamp;
        $scope.requestTime = (time / 1000);
        console.log('The request took ' + $scope.requestTime + ' seconds.');
    });
});
```

[back to top](#top)

### 案例4: 请求恢复 (请求异常拦截)

```javascript
<!-- lang: js -->
module.factory('requestRejector', ['$q', function($q) {
    var requestRejector = {
        request: function(config) {
            return $q.reject('requestRejector');
        }
    };
    return requestRejector;
}]);
module.factory('requestRecoverer', ['$q', function($q) {
    var requestRecoverer = {
        requestError: function(rejectReason) {
            if (rejectReason === 'requestRejector') {
                // Recover the request
                return {
                    transformRequest: [],
                    transformResponse: [],
                    method: 'GET',
                    url: 'https://api.github.com/users/naorye/repos',
                    headers: {
                        Accept: 'application/json, text/plain, */*'
                    }
                };
            } else {
                return $q.reject(rejectReason);
            }
        }
    };
    return requestRecoverer;
}]);
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('requestRejector');
    // Removing 'requestRecoverer' will result to failed request
    $httpProvider.interceptors.push('requestRecoverer');
}]);
module.controller('ExampleController', ['$scope', '$http', function($scope, $http) {
			$scope.requestTime = '[waiting]';
			$http.get('https://api.github.com/users/naorye/repos').then(function() {
			    $scope.requestStatus = 'success';
			}, function(rejectReason) {
				$scope.requestStatus = 'failure due to ' + rejectReason;
			});
		}]);
```

[back to top](#top)

### 案例5: Session 恢复 (响应异常拦截器)

- 有时候会发生丢失session情况。这种情况可能由于session过期了或者服务器异常。创建一个拦截器，用于恢 session 然后自动重新发送原始请求(假设 session 过期的情况)
- 假设发生了 session 过期返回 http 状态码 419

```javascript
<!-- lang: js -->
module.factory('sessionRecoverer', ['$q', '$injector', function($q, $injector) {
    var sessionRecoverer = {
        responseError: function(response) {
            // Session has expired
            if (response.status == 419){
                var SessionService = $injector.get('SessionService');
                var $http = $injector.get('$http');
                var deferred = $q.defer();
                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                SessionService.login().then(deferred.resolve, deferred.reject);
                // When the session recovered, make the same backend call again and chain the request
                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            return $q.reject(response);
        }
    };
    return sessionRecoverer;
}]);
module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionRecoverer');
}]);
```

[back to top](#top)

### 案例5: 登陆拦截器1

发送一个请求判断用户是否登陆，如果没有登陆就跳转到登陆页面，登陆的话，就返回confi继续往下走

```javascript
owmsApp.factory('authHttpResponseInterceptor', ["$rootScope", '$q', '$location', "$routeParams","owmsConstant", function ($rootScope, $q, $location,$routeParams,owmsConstant) {
    //拦截器配置
    return {
        request: function (config) {
            var url = config.url;
            if(url.indexOf("/tms-web/login/getKeyPair.do")> -1||url.indexOf("/tms-web/login/getUserCookie.do")
            		> -1||url.indexOf("/tms-web/login/getPropertiesValues.do")> -1||url.indexOf("/tms-web/login/kaptcha.do")> -1
            		||url.indexOf("/tms-web/login.do")> -1||url.indexOf("/admin/login.html")> -1){
            	
            }else if(url.indexOf(".do")>0){
        	$.ajax({
    	        url : $rootScope.$host + 'check-session.do',
    	        async : false,// 注意此处需要同步
    	        type : "POST",  
    	        success : function(data) {
    	        	if (data.code == owmsConstant.getSuccess()) {
    	        	}else{
    			window.location.href = bootPATH + "/admin/login.html";
    	        	}
    	        }  
    	    });  
        }
            return config || $q.when(config);
        }
    };
}])
owmsApp.config(['$httpProvider', function ($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}])
```

[back to top](#top)

### 案例6: 登陆拦截器2

```javascript
app.factory('UserInterceptor', ["$q","$rootScope",function ($q,$rootScope) {
	return {
        request:function(config){
            config.headers["TOKEN"] = $rootScope.user.token;
            return config;
        },
        responseError: function (response) {
            var data = response.data;
			// 判断错误码，如果是未登录
            if(data["errorCode"] == "500999"){
				// 清空用户本地token存储的信息，如果
                $rootScope.user = {token:""};
				// 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                $rootScope.$emit("userIntercepted","notLogin",response);
            }
			// 如用户已经登录，但是登录超时了
			if(data["errorCode"] == "500998"){
                $rootScope.$emit("userIntercepted","sessionOut",response);
            }
            return $q.reject(response);
        }
    };
}]);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('UserInterceptor');
});
//using in controller
$rootScope.$on('userIntercepted',function(errorType){
    // 跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面
    $state.go("login",{from:$state.current.name,w:errorType});
});
// $rootScope.user是登录后把用户信息放到了全局rootScope上，方便其他地方使用
// 如果用户已经登录了，则立即跳转到一个默认主页上去，无需再登录
if($rootScope.user.token){
    $state.go($rootScope.defaultPage);
    return;
}
//在登录成功回调后还可以跳转到上一次界面，也就是上面记录的from
var from = $stateParams["from"];
$state.go(from && from != "login" ? from : $rootScope.defaultPage);
```

[back to top](#top)

> Reference
- [Angularjs的前端拦截器](https://blog.csdn.net/liaodehong/article/details/52980677)
- [AngularJs HTTP响应拦截器实现登陆、权限校验](https://blog.csdn.net/jing165121/article/details/52064656)
