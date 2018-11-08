[AngularJs中$http再次封装](#top)

- [General](#general)
- [use Promise Array](#use-promise-array)

## General

```javascript
ngServices.factory('httpService', function ($http, $timeout, $q) {
    // 默认参数
    var _httpDefaultOpts = {
        method: 'POST', // GET/DELETE/HEAD/JSONP/POST/PUT
        url: '',
        params: {}, // 拼接在url的参数
        data: {},
        cache: false, // boolean or Cache object
        limit: true, //是否节流
        timeout: "httpTimeout", // 节流变量名
        timeoutTime: 100,
        isErrMsg: false, // 错误提示
        isErrMsgFn: null, // 错误提示函数
        checkCode: true, // 是否校验code
        before: function () {}, // ajax 执行开始 执行函数
        end: function () {}, // ajax 执行结束 执行函数
        error: function () {}, // ajax 执行失败 执行函数
        success: function (data) {}, // ajax 执行成功 执行函数
        checkCodeError: function (code, errMsg, data) {} // ajax 校验code失败 执行函数
    };
    var _httpTimeoutArray = {
        "httpTimeout": null
    }; //ajax节流使用的定时器 集合
    var _isErrMsgFn = function (opts) {
        if (angular.isFunction(opts.isErrMsgFn)) {
            opts.isErrMsgFn();
        } else {
            alert("抱歉！因为操作不能够及时响应，请稍后在试...");
        }
    };
    // http请求之前执行函数
    var _httpBefore = function (opts) {
        if (angular.isFunction(opts.before)) {
            opts.before();
        }
    };
    // http请求之后执行函数
    var _httpEnd = function (opts) {
        if (angular.isFunction(opts.end)) {
            opts.end();
        }
        if (opts.limit) {
            $timeout.cancel(_httpTimeoutArray[opts.timeout]);
        }
    };
    // 响应错误判断
    var _responseError = function (data, opts) {
        // public.js
        return checkCode(data, opts);
    };
    // http 请求执行过程封装    deferred ：http 链式请求延迟对象
    var _httpMin = function (opts, deferred) {
        _httpBefore(opts);
        $http({
            method: opts.method,
            url: opts.url,
            params: opts.params,
            data: opts.data
        }).success(function (data, header, config, status) { //响应成功
            // 权限，超时等控制
            if (opts.checkCode && !_responseError(data, opts)) {
                return false;
            }
            // 请求成功回调函数
            if (opts.success) {
                opts.success(data, header, config, status);
            }
            if (deferred) {
                deferred.resolve(data, header, config, status); //任务被成功执行
            }
            _httpEnd(opts);
        }).error(function (data, header, config, status) { //处理响应失败
            if (opts.isErrMsg) {
                _isErrMsgFn();
            }
            opts.error(data, header, config, status);
            if (deferred) {
                deferred.reject(data, header, config, status); //任务未被成功执行
            }

            _httpEnd(opts);
        });
    };
    // http请求，内含节流等控制
    var _http = function (opts, deferred) {
        opts = $.extend({}, _httpDefaultOpts, opts);
        var result;
        if (opts.limit) {
            $timeout.cancel(_httpTimeoutArray[opts.timeout]);
            _httpTimeoutArray[opts.timeout] = $timeout(function () {
                result = _httpMin(opts, deferred);
            }, opts.timeoutTime);
        } else {
            result = _httpMin(opts, deferred);
        }
    };
    // http 链式请求
    var _linkHttpMin = function (opts, deferred) {
        _http(opts, deferred);
    };
    //自定义响应码校验
    var CODESTATUS = {
        SUCCESS: 10000,
        ERROR: -10000,
        SESSION_TIME_OUT: -10001
    };
    // 判断 code 
    function checkCode(data, opts) {
        var _data;
        var _isCode = true;
        if (isEmpty(data)) {
            _isCode = false;
        } else {
            if (typeof data == "string") {
                if (data.indexOf("code") > -1) {
                    _data = jQuery.parseJSON(data);
                } else {
                    _isCode = false;
                }
            } else {
                _data = data;
            }
        }
        if (_isCode && isNotEmpty(_data.code)) {
            if (_data.code == CODESTATUS.IS_NOT_LOGIN || _data.code == CODESTATUS.SESSION_TIME_OUT) { // 会话超时
                // 超时处理
                console.log("超时或未登录");
                window.location.href = _data.value;
                return false;
            } else if (_data.code == CODESTATUS.IS_ERROR) {
                console.log("连接错误，请稍等!");
                if (opts.checkCodeError) {
                    opts.checkCodeError(_data.code, "连接错误，请稍等!", _data);
                }
                return false;
            } else if (_data.code == CODESTATUS.USER_AUTH_FAIL) {
                console.log("用户认证失败!");
                if (opts.checkCodeError) {
                    opts.checkCodeError(_data.code, "用户认证失败!", _data);
                }
                return false;
            } else if (_data.code == CODESTATUS.PARAM_IS_ERROR) {
                console.log("无效的请求参数");
                if (opts.checkCodeError) {
                    opts.checkCodeError(_data.code, "无效的请求参数!", _data);
                }
                return false;
            }
        }
        return true;
    }

    return {
        http: function (opts) {
            _http(opts);
        }, //http请求
        linkHttp: function (opts, deferred) { // http链式请求
            deferred = deferred || $q.defer();
            _linkHttpMin(opts, deferred);
            return deferred.promise;
        }
    };

});

//调用例子
ngServices.service('errorService', function (httpService) {
    this.getError404 = function (options) {
        console.log("getError404");
        var _opts = $.extend({
            timeout: 'getError404Timeout'
        }, options);
        var _url = appUrl + "code.json";
        var _data = JSON.stringify({
            "body": {}
        });
        _opts.url = _url;
        _opts.data = _data;

        httpService.http(_opts);
    };
    this.getError404Link = function (options) {
        console.log("getError404Link");
        var _opts = $.extend({
            timeout: 'getError404Timeout'
        }, options);
        var _url = appUrl + "code.json";
        var _data = JSON.stringify({
            "body": {}
        });
        _opts.url = _url;
        _opts.data = _data;
        return httpService.linkHttp(_opts);
    };
});
```

[back to to](#top)

----------

## use Promise Array

```json
{
    "services": [
        {
            "id": "transactionAnalysis",
            "url": "transactionanalysis",
            "method": "POST"
        },
        ...
}
```

```javascript
angular.module('webServiceModule').factory('webServices', function ($q, $http, $location, ENV,  $timeout, $state) {

  var serviceList;
  var _isBatchRunningOrFailed = false;
  var _isBatchChecked = false;
  // Creating a promise to generate the list of services based on the environment
  var serviceListPromise = $http.get('assets/json/serviceUrls.json').then(function (list) {
    serviceList = list.data;
  });
  var debouncedServiceError = _.debounce(showServiceError, 100);
  // Given a serviceId, return the composed URL for making the service request
  function getServiceUrl(serviceId) {
    var service, url;
    service = _.findWhere(serviceList.services, { id: serviceId });
    url = service ? service.base ? service.base + service.url : ENV.API_ENDPOINT + '/advisor-web/' + service.url + (ENV.USERNAME || '') : null;
    return url;
  }
  // Given a serviceId, return the HTTP method of that service
  function getServiceMethod(serviceId) {
    var service;
    service = _.findWhere(serviceList.services, { id: serviceId });
    return service ? service.method || 'GET' : null;
  }
  function httpPromiseAbort(promise) {
    if (promise && promise._httpAbort && promise._httpAbort.resolve) {
      promise._httpAbort.resolve();
    }
  }
  function showRequestError(error) {
    if (error.status) {
      modalService.showSystemError().then(function () {
        modalService.setOpenFlag(false);
      });
    }
  }

 function request(serviceId, payload, headers, timeout, showErrorFlag) {
    if (_isBatchRunningOrFailed) {
      $state.go('error', { errorType: 'batch' });
      return $q.reject('Batch in progress');
    } else {
      return noBatchCheckRequest(serviceId, payload, headers, timeout, showErrorFlag);
    }
  }

function noBatchCheckRequest(serviceId, payload, headers, timeout, showErrorFlag) {
    var hasTimedOut = false;
    var hasAborted = false;
    var timeoutDelay = timeout || 25000;   // setting a default timeout
    var httpAbort = $q.defer();
    var referer = $location.absUrl();
    var requestTimeout = $timeout(function () {
        hasTimedOut = true;
        httpAbort.resolve();
    }, timeoutDelay);
    httpAbort.promise.then(function () {
        hasAborted = !hasTimedOut;
    });
    // Ensure that the payload is stringified
    payload = payload || {};
    if (_.isObject(payload)) {
        payload = JSON.stringify(payload);
    }

 var promise = serviceListPromise.then(function () {
      var url = getServiceUrl(serviceId);
      var method = getServiceMethod(serviceId);
      if (!url || !method) {
        return $q.reject();
      }
      var req = $http({
        url: url,
        method: method,
        data: payload,
        headers: headers || { 'X-Alt-Referer': referer },
        timeout: httpAbort.promise
      });
      // return a promise
      return req.then(function (response) {
        $timeout.cancel(requestTimeout);
        // check to see if user is still logged in
        var data = response.data;
        // if data has an html form inside the response, then add the form to body and submit
        if (typeof data === 'string') {
          if (data.indexOf('html') >= 0 && data.indexOf('form') >= 0) {
            var _e = $('<div />');
            _e.attr('id', 'loginTimeoutForm');
            _e.append(data);
            $('body').append(_e);
            $('#loginTimeoutForm form').submit();
            return $q.reject(data);
          }
        }
        // close loading overlay
        if (showLoadingOverlay) {
          cgiLoaderOverlay.closeLoaderOverlay();
        }
        // return the response, but unwrap the data if an unwrap callback was passed
        return unwrap ? unwrap(response) : response;
      }, function (error) {
        if (!hasTimedOut) {
          $timeout.cancel(requestTimeout);
        }
        if (!hasAborted) {
          if (error.status !== 401 && showErrorFlag) {
            showRequestError(error);
          }
          debouncedServiceError(error);
        }
        error.hasAborted = hasAborted;
        error.hasTimedOut = hasTimedOut;
        // close loading overlay
        if (showLoadingOverlay) {
          cgiLoaderOverlay.closeLoaderOverlay();
        }
        return $q.reject(error);
      });
    }, function (error) {
      if (error.status !== 401 && showErrorFlag) {
        showRequestError(error);
      }
      debouncedServiceError(error);
      // close loading overlay
      if (showLoadingOverlay) {
        cgiLoaderOverlay.closeLoaderOverlay();
      }
      return $q.reject(error);
    });
    // Attaching the httpAbort to the promise so that it can be manually resolved
    promise._httpAbort = httpAbort;
    return promise;
}

function uploadFile(uploadType, id, file) {
    //, headers, timeout, err) {
    return serviceListPromise.then(function () {
      var url, method;
      // get the URL & method
      url = getServiceUrl(uploadType);
      method = getServiceMethod(uploadType);
      if (!url || !method) {
        return $q.reject;
      }
      /* Angular’s default Content-Type header for POST and PUT requests is application/json,. By setting ‘Content-Type’: undefined,
             the browser sets the Content-Type to multipart/form-data for us and fills in the correct boundary.
             Manually setting ‘Content-Type’: //multipart/form-data will fail to fill in the boundary parameter of the request.
             */
      var fd = new FormData();
      fd.append('modelId', id);
      fd.append('file', file);
      return $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });  /*
            // option #2
            // sending the data directly, instead of using multipart/form-data.
            // file is an instance of File, e.g. from a file input.
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', '/pushfile', true);
            xmlHttpRequest.setRequestHeader('Content-Type', file.type);
            // Send the binary data.
            // Since a File is a Blob, we can send it directly.
            xmlHttpRequest.send(file);
            */
      /*
       // option #3
       // using HTML5 FileREader
       var reader = new FileReader();
       reader.onloadend = function (e) {
           var fileData = e.target.result;
           var fileData1 = reader.result;
           var param = {
               data: fileData
           };
       }
       reader.readAsArrayBuffer(fileToUpload);
       */
    });
  }

  // Show console warnings for service errors
  function showServiceError(result) {
    var msg = [
      'Web Service Error',
      result.config.url,
      result.config.data,
      result.status + ' ' + result.statusText
    ].join('\n');
    console.warn(msg);
  }

  // Exposing public methods
  return {
    httpPromiseAbort: httpPromiseAbort,
    getServiceUrl: getServiceUrlById,
    request: request,
    uploadFile: uploadFile
  };

}
```

[back to to](#top)

> https://blog.csdn.net/lzc409973859/article/details/52624880
