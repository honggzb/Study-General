## use user-defined directive in Tooltips

```html
<div ng-controller="PopoverDemoCtrl">
  <div class="col-xs-10 col-xs-offset-2">
    <button class="btn btn-skeeled"
            uib-popover-template="'example.html'"
            popover-placement="bottom" popover-trigger="outsideClick">
    Click me
</button>
<script type="text/ng-template" id="example.html">
    <my-directive></my-directive>
</script>
<!--  my-directive.html -->
<div class="row">
      <select class="form-control" ng-model="selected.person"
          ng-options="person as person.name for person in availablePeople">
          <option value="">-- Select a person --</option>
      </select>
      <div ng-hide="!selected.person.langs">
          <select class="form-control" ng-model="selected.personLang"
              ng-options="lang for lang in selected.person.langs">
              <option value="">-- Select a language --</option>
          </select>
      </div>
</div>
<!--  my-directive -->
<script>
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('PopoverDemoCtrl', function ($scope) {
  $scope.dynamicPopover = {
    content: 'Hello, World!',
    templateUrl: 'myPopoverTemplate.html',
    title: 'Title'
  };
  $scope.placement = {
    options: [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
      'left',
      'left-top',
      'left-bottom',
      'right',
      'right-top',
      'right-bottom'
    ],
    selected: 'top'
  };
  $scope.availablePeople = [{name: 'Foo', langs: ['es', 'en']}, {name: 'Lee', langs: ['fr']}, {name: 'noLang'}];
  $scope.selected = {
    person: null,
    personLang: null
  };
  
  $scope.setPerson = person => {
    $scope.selected.person = person;
  };
})
.directive('myDirective', () => {
    return {
        restrict: 'E',
        replace: true,
        controller: 'PopoverDemoCtrl',
        templateUrl: 'my-directive.html'
    };
});
</script>
```
