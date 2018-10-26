[angularjs-material toast study](#top)

- [`$mdToast` Service in AngularJS material](#mdtoast-service-in-angularjs-material)
- [usage sample](#usage-sample)
  - [basic usage - show simple](#basic-usage---show-simple)
  - [basic usage - show simple with action](#basic-usage---show-simple-with-action)
- [Methods](#methods)

## `$mdToast` Service in AngularJS material

- a simple **promise** API
- **default parmeters**

  - position -> bottom
  - size -> 600px, 959px

- **custom toasts**
  - The toast's template must have an outer <md-toast> element.
  - element with class md-action -> `toast action`
  - curved corners -> add the class `md-capsule`

## usage sample

### basic usage - show simple

```html
<div ng-controller="AppCtrl">
  <md-button ng-click="showSimpleToast()">Show Simple</md-button>
</div>
<script>
angular.module('myApp', ['ngMaterial'])
       .controller('AppCtrl', function($scope, $mdToast) {
          $scope.showSimpleToast = function() {
              //var pinTo = $scope.getToastPosition();
              $mdToast.show(
                  $mdToast.simple()
                  .textContent('Simple Toast!')
                  .hideDelay(3000)
                  .capsule(true)
              );
          };
       });
</script>
```

### basic usage - show simple with action

```html
<div ng-controller="AppCtrl" layout-fill layout="column" class="inset" ng-cloak paddi>
    <div>
      <md-button ng-click="showActionToast()">Show Simple with action</md-button>
    </div>
    <div layout="row" id="toastBounds">
        <div>
          <p><b>Toast Position: "{{getToastPosition()}}"</b></p>
          <md-checkbox ng-repeat="(name, isSelected) in toastPosition" ng-model="toastPosition[name]">
            {{name}}
          </md-checkbox>
        </div>
    </div>
<script>
angular.module('myApp', ['ngMaterial'])
       .controller('AppCtrl', function($scope, $mdToast) {
          var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
          sanitizePosition();
      
          return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };
        function sanitizePosition() {
          var current = $scope.toastPosition;
          if ( current.bottom && last.top ) current.top = false;
          if ( current.top && last.bottom ) current.bottom = false;
          if ( current.right && last.left ) current.left = false;
          if ( current.left && last.right ) current.right = false;
          last = angular.extend({},current);
        }
        $scope.showActionToast = function() {
          var pinTo = $scope.getToastPosition();
          var toast = $mdToast.simple()
            .textContent('Marked as read')
            .action('UNDO')
            .highlightAction(true)
            .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            .position(pinTo);
          $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
              alert('You clicked the \'UNDO\' action.');
            }
          });
        };
      })
      .controller('ToastCtrl', function($scope, $mdToast) {
        $scope.closeToast = function() {
          $mdToast.hide();
        };
      });;
</script>
```

## Methods

- https://material.angularjs.org/1.1.9/api/service/$mdToast)
- [book-Material Design Implementation with AngularJS: UI Component Framework](https://books.google.ca/books?id=3gvpDAAAQBAJ&pg=PA132&lpg=PA132&dq=angularjs+material+$mdToast&source=bl&ots=7cVBwynMOR&sig=lolwg3Mu_TgMFBzyGsd_men1Yd8&hl=en&sa=X&ved=2ahUKEwiywJHkuKTeAhVl7YMKHRWiBSw4ChDoATADegQIBhAB#v=onepage&q&f=false)
