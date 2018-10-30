## HTML structure

```html
<!-- outside layer  - controller is process-monitoring controller -->
<typeahead-and-filter filter="filter" search-details="searchDetails" drawer-id="'processMonitoringFilter'"
        page-id="processMonitoring" used-typeahead="partyUserTypeahead" pill-text="pillText">
  <form name="form">  <!-- filter form ...  --> </form>
</typeahead-and-filter>

<!-- middle layer - from typeahead-and-filter.directive.js -->
<div>
  <!--Search Filter-->
  <div>
    <a ng-click="vm.drawer.toggle()">
      <i class="cgi-icon-filter"></i>
    </a>
    <cgi-custom-typeahead search-details="vm.searchDetails" attributes="vm.usedTypeahead.attributes" parent-callback="vm.usedTypeahead.parentCallback"
      child-callback="vm.usedTypeahead.childCallback" class="typeahead-and-filter">
    </cgi-custom-typeahead>
  </div>
  <div ng-attr-id="{{vm.drawerId}}" class="table-list-filter-drawer center-block row">
  <!--transcluded filter panel content-->
  <div ng-transclude>
  <!--...-->
</div>

<!-- inner layer - come from cgi-custom-typeahead.directive.js -->
<div class="search-input">
  <div class="search-filter">
    <div ng-if="vm.readOnly">
      <span ng-bind="vm.pillText"></span>
    </div>
    <div ng-if="!vm.readOnly">
      <a ng-if="vm.attributes.selectedItem" ng-click="vm.clear();" class="btn btn-pill showTypeaheadPill">
        <span ng-bind="vm.pillText"></span><i class="fa fa-close"></i>
      </a>
      <div ng-show="!vm.attributes.selectedItem">
        <span class="input-group-addon cgi-icon-search2"></span>
        <input ng-model="vm.attributes.searchString" ng-model-options="{debounce: 250}" type="text" maxlength="30"
          ng-attr-id="{{::vm.inputName + 'Typeahead' }}" ng-attr-placeholder="{{::vm.placeholderText}}" name="{{::vm.inputName}}Typeahead"
          ng-disabled="vm.selectionDisabled" tabindex="0" aria-autocomplete="list" autocomplete="off" class="form-control"
          uib-typeahead="item for item in vm.parentCallback.getItems($viewValue)" typeahead-no-results="vm.noResults"
          typeahead-on-select="vm.onSelect($item, $model, $label)" typeahead-min-length="2"
          typeahead-popup-template-url="core/views/partials/custom-typeahead-popup.partial.html" />
        <a ng-click="vm.clear();" ng-show="vm.attributes.searchString.length > 0" class="input-clear">
          <i class="glyphicon glyphicon-remove"></i>
        </a>
      </div>
    </div>
  </div>
</div>
```

```javascript
/**
  inner layer - come from cgi-custom-typeahead.directive.js
*/
 bindToController: {
        attributes: '=',   // selectedItem, searchString, placeholderLabel, searchEntity
        parentCallback: '=',
        childCallback: '=',
        selectionDisabled: '=',
        readOnly: '=?',
        selectionRequired: '=',
        customErrors: '=',
        form: '=',
        inputName: '@?',
      },
      scope: {},
      controllerAs: 'vm',
      controller: customTypeaheadController
}
function customTypeaheadController($scope, $translate, $timeout) {
  var vm = this;
  vm.pillText = null;
  vm.inputName = (vm.inputName || '') + vm.attributes.searchEntity;
  var pillTexts = {//...
      };
  //===============================================================
  // Initializing variables to bind to view
  //===============================================================
  vm.attributes.searchString = null;
  //...
  //===============================================================
  // Initializing functions to bind to view
  //===============================================================
  vm.clear = clear;
  vm.onSelect = onSelect;
  vm.setRequiredValidity = setRequiredValidity;
  // Setting callback functions - in case the parent requires them
  vm.childCallback.clear = clear;
  vm.childCallback.onSelect = onSelect;
  vm.childCallback.setRequiredValidity = setRequiredValidity;
  function clear(){
    //..
    if (vm.parentCallback.clear) {
          vm.parentCallback.clear();
    }
  }
  function onSelect(item, model, label) {
    setRequiredValidity(true);
    vm.attributes.selectedItem = item;
    vm.selectedModel = model;
    vm.selectedLabel = label;
    vm.pillText = pillTexts[vm.attributes.searchEntity]();
    if (vm.parentCallback.onSelect) {
          vm.parentCallback.onSelect();
        }
    }
});
/**
  middle layer - from typeahead-and-filter.directive.js 
*/
 bindToController: {
        filter: '=',          // filter class, houses and controls the selected filters
        searchDetails: '=',   // object containing the typeahead parameters and function, etc)
        drawerId: '=',        // id required for identifying this drawer
        invalid: '=',         // for invalidating the "Apply" button
        pageId: '@',          // optional parameter for specifying the page the affixed content is on (for handling multiple affixed content)
        callbacks: '=?',       // optional parameter, object whose props are functions to be called in cancel(), apply(), and reset() e.g. callbacks = "{reset: function () {}}"
        usedTypeahead: '=',    //searchEntity name
      },
      transclude: true,
      scope: {},
      controllerAs: 'vm',
      controller: TypeaheadAndFilter
}
function TypeaheadAndFilter(Drawer) {
      var vm = this;
      vm.cancel = cancel;
      vm.apply = apply;
      vm.reset = reset;
      function cancel() {
        try {
          vm.callbacks.cancel();
        } catch (e) {}
        vm.filter.restoreFilters();  
        vm.drawer.close();
      }
      function apply() {
        try {
          vm.callbacks.apply();
        } catch (e) {}
        vm.filter.saveFilters();
        vm.searchDetails.searchCallback();   // this will call the searchDetails.searchCallback()
        vm.drawer.close();
      }
      function reset() {
        try {
          vm.callbacks.reset();
        } catch (e) {}
        vm.filter.resetFilters();
        vm.searchDetails.reset();   
      }
    }
/**
  outside layer  - controller is process-monitoring controller
*/
function init(){
  //...
   $scope.searchDetails = {
        searchCallback: applyFilters,
        searchboxPlaceholder: 'PROCESS_MONITORING.FILTERS.INITIATOR_PLACE_HOLDER',
        reset: resetTypeahead,
      };
  //...
}
```
