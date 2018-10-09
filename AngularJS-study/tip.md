- [1. ng-change-delay](#ng-change-delay)

<h2 id="ng-change-delay">1. ng-change-delay </h2>

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
