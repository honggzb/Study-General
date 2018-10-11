[Angular $http拦截器介绍与使用](#top)

- [Angular $http拦截器](#angular-http%E6%8B%A6%E6%88%AA%E5%99%A8)
- [Angular $http拦截器实现](#angular-http%E6%8B%A6%E6%88%AA%E5%99%A8%E5%AE%9E%E7%8E%B0)
- [Angular $http拦截器使用用例](#angular-http%E6%8B%A6%E6%88%AA%E5%99%A8%E4%BD%BF%E7%94%A8%E7%94%A8%E4%BE%8B)
    - [利用request拦截器模拟实现Angular的XSRF(即CSRF)防御](#%E5%88%A9%E7%94%A8request%E6%8B%A6%E6%88%AA%E5%99%A8%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0angular%E7%9A%84xsrf%E5%8D%B3csrf%E9%98%B2%E5%BE%A1)
    - [利用response拦截器模拟实现Angular JSON易损性(JSON vulnerability)防御](#%E5%88%A9%E7%94%A8response%E6%8B%A6%E6%88%AA%E5%99%A8%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0angular-json%E6%98%93%E6%8D%9F%E6%80%A7json-vulnerability%E9%98%B2%E5%BE%A1)
    - [利用request拦截器和response拦截器计算http请求耗时](#%E5%88%A9%E7%94%A8request%E6%8B%A6%E6%88%AA%E5%99%A8%E5%92%8Cresponse%E6%8B%A6%E6%88%AA%E5%99%A8%E8%AE%A1%E7%AE%97http%E8%AF%B7%E6%B1%82%E8%80%97%E6%97%B6)
    - [实现登陆、权限校验](#%E5%AE%9E%E7%8E%B0%E7%99%BB%E9%99%86%E6%9D%83%E9%99%90%E6%A0%A1%E9%AA%8C)

## Angular $http拦截器

- http service在Angular中用于简化与后台的交互过程，其本质上使用XMLHttpRequest或JSONP进行与后台的数据交互。在与后台的交互过程中，可能会对每条请求发送到Server之前进行预处理（如加入token），或者是在Server返回数据到达客户端还未被处理之前进行预处理（如将非JSON格式数据进行转换）；当然还有可能对在请求和响应过程过发生的问题进行捕获处理
    - 全局处理错误
    - 统一进行身份验证一类的处理, 登陆、权限校验
    - 对所有发出去的请求进行预处理
    - 对所有收到的响应进行预处理
    - 做一些增强用户体验的操作，例如显示一个进度条
- Angular的$http`拦截器是通过`$httpProvider.interceptors`数组定义的一组拦截器，每个拦截器都是实现了某些特定方法的Factory

**每个拦截器都可以实现4个可选的处理函数，分别对应请求（成功/失败）和响应（成功/失败）的拦截**

- **request**: 此函数在$http向Server发送请求之前被调用，在此函数中可以对成功的http请求进行处理，其包含一个http config对象作为参数，这里对config对象具有完全的处理权限，甚至可以重新构造，然后直接返回此对象或返回包含此对象的promise即可。如果返回有误，会造成$http请求失败
- **requestError**:  此方法会在前一个拦截器抛出异常或进行了reject操作时被调用，在这里可以进行恢复请求的操作，或者进行一些对于请求时发起动作的处理（如取消loading等）
- **response**: 此函数在$http从Server接收到响应时被调用，在此函数中可以对成功的http响应进行处理，这里具有对响应的完全处理权限，甚至可以重新构造，然后直接返回响应或返回包含响应的promise即可。**如果返回有误，会造成$http接收响应失败**
- **responseError**: 此方法会在前一个拦截器抛出异常或进行了reject操作时被调用，在这里可以进行恢复响应的操作，进行一些针对错误的处理

```javascript
angular.module("myApp", [])
    .factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {
        var httpInterceptor = {
            'responseError' : function(response) {
                ......
                return $q.reject(response);
            },
            'response' : function(response) {
                ......
                return response;
            },
            'request' : function(config) {
                ......
                return config;
            },
            'requestError' : function(config){
                ......
                return $q.reject(config);
            }
        }
        return httpInterceptor;
    }
//如开发中经常需要在请求头中加入token以便验证身份
request: function(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
    }
    return config || $q.when(config);
}
```

## Angular $http拦截器实现

**一般通过定义factory的方式实现**

```javascript
myApp.factory('MyInterceptor', function($q) {
  return {
    request: function(config) {      // 可选，拦截成功的请求
      // 进行预处理 ..
      // ...
      return config || $q.when(config);
    },
   requestError: function(rejection) {   // 可选，拦截失败的请求
      // 对失败的请求进行处理
      // ...
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },
    response: function(response) {  // 可选，拦截成功的响应
      // 进行预处理
      // ....
      return response || $q.when(reponse);
    },
   responseError: function(rejection) {  // 可选，拦截失败的响应
      // 对失败的响应进行处理
      // ...
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  };
});
//将实现的拦截器加入到$httpProvider.interceptors数组中，此操作一般在config方法中进行
myApp.config(function($httpProvider) {
    $httpProvider.interceptors.push(MyInterceptor);
});
```

**通过匿名factroy的方式实现**

```javascript
$httpProvider.interceptors.push(function($q) {
  return {
   request: function(config) {
       // ...
    response: function(response) {
       // ...
    },
    // ...
  };
});
```

[back to top](#top)

## Angular $http拦截器使用用例

### 利用request拦截器模拟实现Angular的XSRF(即CSRF)防御

从客户端cookie中读取一个token，其默认的key为XSRF-TOKEN，并构造一个名为X-XSRF-TOKEN的http头部，与http请求一起发送到后台。Server端就可以根据此token识别出请求来源于同域，当然跨域的请求$http不会加入X-XSRF-TOKEN头部

```javascript
/**
* 正式开发中Angular会主动进行XSRF防御（只要cookie中存在key为`XSRF-TOKEN`的token），
* 一般不需要手动进行，除非cookie中不存在key为`XSRF-TOKEN`的token，这里只是模拟实现
*/
request: function(config) {
  if(config.url.indexOf('SAME_DOMAIN_API_URL') > -1) {
    //在同域请求头部中加入此头部以达到模拟Angular的XSRF(即CSRF)防御机制的实现效果
    config.headers['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');
  }
  return config;
}
```

### 利用response拦截器模拟实现Angular JSON易损性(JSON vulnerability)防御

Angular在$http请求安全性方面不仅为我们设计了XSRF(CSRF)防御，而且针对请求JSON数据的Url可能通过类似于<script>标签加载的方式被恶意网站获取到我们的JSON数据的情况，设计了Angular JSON易损性(JSON vulnerability)防御，即Server端返回的JSON数据头部可以添加`")]}',\n"`字符串，得到包含此前缀的响应数据后，Angular会将此前缀删去，将响应还原成正式的JSON数据。此时我们就可以通过response拦截器模拟此过

```javascript
response: function(response) {
    var data = examineJSONResponse(response); // 假设存在这样一个方法
    if(!data) {
        response = validateJSONResponse(response); // 假设存在这样一个方法
    }
    return response || $q.when(reponse);
}
```

### 利用request拦截器和response拦截器计算http请求耗时

```javascript
myApp.factory('timestampMarker', [function() {
    return {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
}]);
myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('timestampMarker');
}]);
// 每次请求后台时，就能够计算出相应请求的耗时
$http.get('https://api.github.com/users/liuwenzhuang/repos').then(function(response) {
    var time = response.config.responseTimestamp - response.config.requestTimestamp;
    console.log('The request took ' + (time / 1000) + ' seconds.');
});
```

### 实现登陆、权限校验

- $rootScope.user是登录后把用户信息放到了全局rootScope上，方便其他地方使用，$rootScope.defaultPage也是默认主页面，初始化的时候写死到rootScope里的
- 另外还有用户已经登录，但是登录超时了，还有就是增加后台接口的判断来增强安全性。不能完全依靠本地逻辑
- 在model里面增加一个用户拦截器,在rensponseError中判断错误码，抛出事件让Contoller或view来处理

```javascript
//
$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
	if(toState.name=='login')return;// 如果是进入登录界面则允许
	// 如果用户不存在
	if(!$rootScope.user || !$rootScope.user.token){
		event.preventDefault();// 取消默认跳转行为
		$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
	}
});
//增加一个用户拦截器
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
			// 如果是登录超时
			if(data["errorCode"] == "500998"){
                $rootScope.$emit("userIntercepted","sessionOut",response);
            }
            return $q.reject(response);
        }
    };
}]);
// 注册拦截器到angularjs的config中
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('UserInterceptor');
});
//在controller中处理错误事件
$rootScope.$on('userIntercepted',function(errorType){
    // 跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面
    $state.go("login",{from:$state.current.name,w:errorType});
    // 如果用户已经登录了，则立即跳转到一个默认主页上去，无需再登录
    if($rootScope.user.token){
        $state.go($rootScope.defaultPage);
        return;
    }
    //登录成功回调后还可以跳转到上一次界面，也就是上面记录的from
    var from = $stateParams["from"];
    $state.go(from && from != "login" ? from : $rootScope.defaultPage); 
});
```

> [Angular $http拦截器介绍与使用](https://blog.csdn.net/u010730126/article/details/51770946)
