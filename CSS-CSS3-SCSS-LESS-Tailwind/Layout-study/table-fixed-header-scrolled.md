## Simple sample

```html
<style>
*, :after, :before {
  box-sizing: border-box;
}
.container-fluid:after, .container-fluid:before,.row:after, .row:before {
  display: table;
  content: " ";
}
</style>
<div class="container-fluid">
  <div class="row fixed_header">This is header</div>
  <div class="row">
    <div class="affix-top">
      content top
      <p>top header</p><p>top header</p><p>top header</p>
    </div>
    <div class="affix-content">
      <div class="col-sm-12 table-list-section">
        <div class="page-header-row">
          <p>content header</p><p>content header</p><p>content header</p>
        </div>
        <section class="table-outer-wrapper" style="overflow: auto;position: relative;">
          <div class="table-inner-wrapper" style="height: 300px; overflow-y: auto;">
            <table id="content-table">
              <thead> 
                <tr>
                  <th>
                    <div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table
                      header</div>
                  </th>
                  <!-- ... -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td>
                </tr>
                <!-- ... -->
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
```

## Whole sample

**get the width of an element using AngularJS**

- `angular.element(document.getElementById(id)).clientWidth;`
- `angular.element(document.querySelectorAll(".class")[0]).clientWidth;`
- `angular.element(document.getElementById(id)).getBoundingClientRect();`, if need to get non rounded numbers

```html
<style>
*, :after, :before {
  box-sizing: border-box;
}
.container-fluid:after, .container-fluid:before,.row:after, .row:before {
  display: table;
  content: " ";
}
.table--outer-wrapper {
  padding-top: 37px;
  position: relative;
  margin: 0 auto;
  width: 100%;
  border: 0;
  background-color: #fff;
}
.table--inner-wrapper {
  overflow-y: auto;
}
</style>
<div class="container-fluid">
      <div class="row fixed_header">This is header</div>
      <div class="row">
        <div class="affix-top" style="background-color: antiquewhite">
          content top
          <p>top header</p><p>top header</p><p>top header</p>
        </div>
        <div class="affix-content">
          <div class="col-sm-12 table-list-section">
            <div class="page-header-row" style="background-color: aquamarine">
                <p>content header</p><p>content header</p><p>content header</p>
            </div>
            <section class="table-outer-wrapper" style="overflow: auto;">
                <div class="table-inner-wrapper" ng-style="{height: {true:'300px'}[$ctrl.data.length > 0]}" style="height: 300px;">
                    <table id="content-table" class="table" infinite-scroll="$ctrl.loadMore()" infinite-scroll-container="#infContainer" infinite-scroll-distance="1">
                      <thead>
                        <!-- <th ng-repeat="headername in $ctrl.header track by $index" class="table--headers ng-scope" id="clx-table-header-7" ng-style="{width: headername.width}" style="width: 15%;background-color: chartreuse>
                          <div class="clx-table-header-title-wrapper ng-binding" ng-style="{ width: $ctrl.calculateWidth('clx-table-header-' + $index) }" style="position: absolute;text-overflow: ellipsis; overflow: hidden;">table header</div>
                        </th> -->
                        <tr>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                          <th><div class="clx-table-header-title-wrapper ng-binding" style="position: absolute;text-overflow: ellipsis; overflow: hidden;width:100px;">table header</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td><td style="width:100px">1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>                  
                      </tbody>
                      </table>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
```
