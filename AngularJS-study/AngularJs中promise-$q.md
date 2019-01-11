
`$q.when()` takes a promise or any other type, if it is not a promise then it will wrap it in a promise and call resolve

```javascript
//https://jsfiddle.net/jeremylikness/Q2jMG/
(function () {
    var app = angular.module("myApp", []);
    app.service('noPromise', function() {
        return {
            getResult: function() {
                return { status: "noPromise" };
            }
        };
    });
    app.service("promise", ['$q', '$timeout', function($q, $timeout) {
        return {
            getResult: function() {
                var deferral = $q.defer();
                $timeout(function() {
                    deferral.resolve( { status: "promise" } );
                }, 1000);
                return deferral.promise;
            }
        };
    }]);
    app.run(['$rootScope', '$q', 'noPromise', 'promise', 
             function ($rootScope, $q, noPromise, promise) {
                $rootScope.status = 'Ready.'; 
                 $q.when(noPromise.getResult()).then(function(result) {
                     $rootScope.status = result.status;
                 });
                 $q.when(promise.getResult()).then(function(result) {
                     $rootScope.status = result.status;
                 });
    }]);
})();
// noPromise
//promise
```

