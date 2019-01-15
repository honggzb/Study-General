[AngularJS的alert和Excetion设计-debug和diagnostics](#top)

- [Alert设计](#alert%E8%AE%BE%E8%AE%A1)
  - [template sample](#template-sample)
  - [alert Service](#alert-service)
  - [alert directive](#alert-directive)
  - [alert controller](#alert-controller)
- [counting requests](#counting-requests)
- [catching with Promises](#catching-with-promises)

------------------------------

- alert
  - alert categories
  - alert service(alerting)
  - alert directive(alerts)
- Decorating Services(design pattern)
  - decorating `$exceptionHandler`
  - use Decorators and interceptors for runtime diagnostics
  - wrap a service to add behavior
  - extend/modify existing behavior

## Alert设计

### template sample

```html
<div class="container">
    <div class="row">
        <h3>Alert</h3>
        <div class="form-group">
            <input type="text" class="form-control" ng-model="model.alertMessage" />
            <div>{{ model.alertMessag.length }}</div>
        </div>
        <div class="form-group">
            <select class="form-control" ng-model="model.alertType">
                <option ng-repeat="alertType in alertTypes">{{ alertType }}</option>
            </select>
        </div>
    </div>
    <div class="row">
        <h3>Exception</h3>
        <button class="btn btn-default btn-lg" ng-click="model.createException()">Throw Exception</button>
    </div>
</div>
```

[back to top](#top)

### alert Service

```javascript
(function() {
    angular.module('common').factory('alerting', alerting);
    Service.$inject = ['$timeout'];

    function alerting($timeout) {

        var currentAlerts = [];
        var alertTypes = ['success', 'warning', 'danger', 'info'];

        function addWarning(message){
            addAlert("warning", message);
        }
        function addDanger(message){
            addAlert("danger", message);
        }
        function addInfo(message){
            addAlert("info", message);
        }
        function addSuccess(message){
            addAlert("success", message);
        }

        function addAlert(type, message) { 
            var alert = { type: type, message: message };
            currentAlerts.push(akert);
            $timeout(function(){
                removeAlert(alert);
            }, 5000);
        }
        function removeAlert(alert) { 
            for(var i=0;i<currentAlerts.length;i++ ){
                if(currentAlerts[i] === alert){
                    currentAlerts.splice(i,1);
                    break;
                }
            }
        }
        function errorHandler(description){
            return function(){
                addDanger(description);
            }
        }

        return {
            addWarning: addWarning,
            addDanger: addDanger,
            addInfo: addInfo,
            addSuccess: addSuccess,
            currentAlerts: currentAlerts,
            alertTypes: alertTypes,
            addAlert: addAlert,
            removeAlert:removeAlert,
            errorHandler: errorHandler
        }
    }
})();
```

[back to top](#top)

### alert directive

```javascript
(function() {
    angular.module('common').directive('alerts', alerts);
    Directive.$inject = [];
    function alerts() {
        return {
            restrict: 'AE',
            template: `<div ng-repeat="alert in currentAlerts" class="alert alert-{{alert.type}}">
                            {{ alert.message }}
                            <div class="close" ng-click="removeAlert(alert)">
                                <span class="glyphicon glyphicon-remove"></span>
                            </div>
                        </div>`,
            scope: true,   //or {}
            controller: function($scope){
                $scope.removeAlert = function(alert) {
                    alerting.removeAlert(alert);
                }
            },
            link: function(scope){
                scope.currentAlerts = alerting.currentAlerts;
            }
        };
    }
})();
```

[back to top](#top)

### alert controller

```javascript
(function() {
  angular.module('common').controller('errorProneController', errorProneController);
  ControllerController.$inject = ['alerting', '$http'];

  function errorProneController(alerting, $http) {
    var model = this;
    model.alertTypes = alerting.alertTypes;
    model.alertType = model.alertTypes[0];
    model.alertMessage = '';

    model.createException = function (params) {
        throw new Error('Something has gone terribly wrong!');
    }

    $http.get('/api/slow')
         .then(function(){
             //process success
         })
         .catch(alerting.errorHandler('Failed to load data!'));
  }

})();
// use Decorators and interceptors for runtime diagnostics
(function() {
  angular.module('common').config(function($provide){
      $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
          return function(exception, cause){
              $delegate(exception, cause);
              var alerting = $injector.get('alerting');   // donnot inject directly, using $injector
              alerting.addDanger(exception.message);
          }
      });
      // for 检查和debug <div>{{ model.alertMessag.length }}</div> 的语法错误
      $provide.decorator('$interpolate', function ($delegate, $log) {
          var serviceWrapper = function (arguments) {
              var bindingFunction = $delegate.apply(this, arguments);
              if(angular.isFunction(bindingFunction) && arguments[0]){
                  return bindingWrapper(bindingFunciton, arguments[0].trim());
              }
              return bindingFunction;
          };
          var bindingWrapper = function (bindingFunction, bindingExpression) {
              return function(){
                  var result = bindingFunction.apply(this, arguments);
                  var trimmedResult = result.trim();
                  var log = trimmedResult ? $log.info: $log.warn;
                  log.call($log, bindingExpression + ' = ' + trimmedResult);
                  return result;
              };
          }
          angular.extend(serviceWrapper, $delegate);
          return serviceWrapper;
      });
  });
})();
```

[back to top](#top)

## counting requests

```html
<div>
    <work-spinner><img src="/content/spinner.gif" /></work-spinner>
    <alerts></alerts>
</div>
```

```javascript
// workSpinner.directive.js
(function() {
    angular.module('common').directive('workSpinner', workSpinner);
    Directive.$inject = [];
    function workSpinner() {
        return {
            restrict: 'AE',
            template: `<ng-transclude ng-show='requestCount'></ng-transclude>`,
            scope: {},
            link: function(scope){
                scope.$watch(function(){
                    return requestCounter.getRequestCount();
                }, function (requestCount) {
                    scope.requestCount = requestCount; 
                });
            },
        };
    }
})();
//requestCounter.js
(function() {
    angular.module('common').factory('requestCounter', requestCounter);
    Service.$inject = ['$q'];

    function requestCounter($q) {
        var requests = 0;
        function request(config){
            requests += 1;
            return $q.when(config);
        }
        function requestError(error){
            requests -= 1;
            return $q.reject(error);
        }
        function response(response){
            requests -= 1;
            return $q.when(response);
        }
        function responseError(error){
            requests -= 1;
            return $q.reject(error);
        }
        function getRequestCount(){
            return requests;
        }
        return {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError,
            getRequestCount: getRequestCount
        }
    }

    angular.module.config(function($httpProvider){
        $httpProvider.interceptors.push('requestCounter');
    });
})();
```

## catching with Promises
