[ui-Bootstrap之Typeahead](#top)

- [uib-typeahead可以使用的属性](#uib-typeahead可以使用的属性)
- [Sample](#sample)
- [Sample 1-Asynchronous results](#sample-1-asynchronous-results)
- [Sample 2-Custom templates for results](#sample-2-custom-templates-for-results)
- [Sample 3-Custom popup templates for typeahead's dropdown - with default value](#sample-3-custom-popup-templates-for-typeaheads-dropdown---with-default-value)

## uib-typeahead可以使用的属性

属性名|默认值|备注
---|---|---
`ng-model`||文本框的值, Assignable angular expression to data-bind
`ng-model-options`|设置ng-model的选项。支持debounce和getterSetter
`typeahead-append-to`|null|指定智能提示的父元素
`typeahead-append-to-body`|false|智能提示内容popup放在$body中，而不是它的父元素中
`typeahead-append-to-element-id`|false|typeahead popup be appended to an element id instead of the parent element
`typeahead-editable`|true|为true时文本框的值可以任意输入，为false时文本框的值只能从智能提示列表中选取
`typeahead-focus-first`|true|智能提示列表中的第一个值是否获取焦点
`typeahead-focus-on-select`|true|从智能提示列表中选中值后，文本框是否获取焦点
`typeahead-input-formatter`|undefined|选取值后格式化文本框内容
`typeahead-is-open`|angular.noop|绑定一个变量，表示智能提示列表是否展开
`typeahead-loading`|angular.noop|绑定一个变量，表示匹配项是否异步获取
`typeahead-min-length`|1|触发智能提示的最小输入字符数。必须大于等于0
`typeahead-no-results`|angular.noop|绑定一个变量，表示没有找到匹配项时的处理方式
`typeahead-on-select($item, $model, $label, $event)`|null|从列表中选中值后的回调函数。如果选中动作不是用户触发的，$event则为undefined
`typeahead-popup-template-url`|uib/template/typeahead/typeahead-popup.html| 
`typeahead-select-on-blur`|false|文本框失去焦点时，选中当前高亮的匹配项
`typeahead-select-on-exact`|false|只有一个匹配项时自动选中
`typeahead-show-hint`|false|输入内容的前半部分有匹配项时，是否提示后半部分
`typeahead-template-url`|uib/template/typeahead/typeahead-match.html|	 
`typeahead-wait-ms`|0|输入字符后，等待多少毫秒触发智能提示

## Sample

```html
<input type="text" class="form-control"
       ng-model="selected" 
       uib-typeahead="n.name as n.name+'('+n.ename+')' for n in names | filter:$viewValue | limitTo:8">
<script>
angular.module('myApp', ['ui.bootstrap'])
 .controller('TypeaheadCtrl', function($scope){
    $scope.selected = undefined;
    $scope.names = [
            { 'name': '张三', 'ename': 'zhangsan' },
            { 'name': '李四', 'ename': 'lisi' },
            { 'name': '王五', 'ename': 'wangwu' }
      ];
    });
 });
</script>
```

[back to top](#top)

## Sample 1-Asynchronous results

```html
<input type="text" class="form-control"
       ng-model="asyncSelected" 
       uib-typeahead="address for address in getLocation($viewValue)" 
       typeahead-loading="loadingLocations" 
       typeahead-no-results="noResults">
<i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>
<div ng-show="noResults">
  <i class="glyphicon glyphicon-remove"></i> No Results Found
</div>
<script>
angular.module('myApp', ['ui.bootstrap'])
 .controller('TypeaheadCtrl', function($scope, $http){
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: val,
            sensor: false
          }
        }).then(function(response){
          return response.data.results.map(function(item){
            return item.formatted_address;
          });
        });
      };    
 });
</script>
```

[back to top](#top)

## Sample 2-Custom templates for results

```html
<script type="text/ng-template" id="customTemplate.html">
  <a>
      <img ng-src="http://upload.wikimedia.org/wikipedia/commons/thumb/{{match.model.flag}}" width="16">
      <span ng-bind-html="match.label | uibTypeaheadHighlight:query"></span>
  </a>
</script>
<input type="text" class="form-control"
       ng-model="customSelected" 
       uib-typeahead="state as state.name for state in statesWithFlags | filter:{name:$viewValue}"
       typeahead-template-url="customTemplate.html">
<script type="text/ng-template" id="customTemplate.html">
```

[back to top](#top)

## Sample 3-Custom popup templates for typeahead's dropdown - with default value

```html
<script type="text/ng-template" id="customPopupTemplate.html">
        <div class="custom-popup-wrapper"
           ng-style="{top: position().top+'px', left: position().left+'px'}"
           style="display: block;"
           ng-show="isOpen() && !moveInProgress"
           aria-hidden="{{!isOpen()}}">
          <p class="message">select location from drop down.</p>
      
          <ul class="dropdown-menu" role="listbox">
              <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }"
                  ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{::match.id}}">
                  <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>
              </li>
          </ul>
        </div>
</script>
<input type="text" placeholder="Custom popup template" class="form-control"
                 ng-model="customPopupSelected"
                 uib-typeahead="state as state.name for state in statesWithFlags | filter:{name:$viewValue}" typeahead-popup-template-url="customPopupTemplate.html">
<script>
angular.module('myApp', ['ui.bootstrap'])
 .controller('TypeaheadCtrl', function($scope, $http) {
    $scope.customPopupSelected = $scope.statesWithFlags[0];
});
</script>
```

[back to top](#top)

> References
- http://angular-ui.github.io/bootstrap/versioned-docs/0.14.3/#/typeahead
- [AngularJs的UI组件ui-Bootstrap分享（十一）——Typeahead](https://www.cnblogs.com/gongshunkai/p/6752609.html)
