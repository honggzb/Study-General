[ag-grid+angularJS](#top)

- [Basic concept](#basic-concept)
- [Basic Sample](#basic-sample)
- [Columns Properties](#columns-properties)
- [Group](#group)
- [Style Cell/Row](#style-cellrow)
- [Fitler](#fitler)
  - [Bulit In Column Filters](#bulit-in-column-filters)
  - [Filter Events](#filter-events)
  - [External Filter](#external-filter)
- [Sorting](#sorting)
- [Sample with Cell Templates](#sample-with-cell-templates)

## Basic concept

**Grid Options** - needed

- columnDefs for columns
- rowData for rows

**Five themes come with the grid **

- ag-theme-material
- ag-theme-balham
- ag-theme-fresh
- ag-theme-dark
- ag-theme-blue

**Events & Digest Cycle**

For AngularJS 1.x - ag-Grid does not not fire events inside an Angular JS digest cycle. This is done on purpose for performance reasons, as there are many events fired, even if you don't listen to them. Firing the digest cycle for each one would kill performance. So you may want to $scope.$apply() after you handle the event.

**Destroy**

If using ag-Grid's AngularJS direction, you do not need to manually clean up the grid. The grid ties in with the AngularJS 1.x lifecycle and releases all resources when the directive is destroyed.

## Basic Sample

```html
<div ng-controller="exampleCtrl" style="height: 300px;width: 70%;margin: 0 auto;">
  <!-- need using ag-grid -->
  <div ag-grid="gridOptions" class="ag-theme-blue" style="height: 100%;"></div>
</div> 
<script>
agGrid.initialiseAgGridWithAngular1(angular);
var module = angular.module("example", ["agGrid"]);
module.controller("exampleCtrl", function($scope) {
    var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];
    var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];
    $scope.gridOptions = {    // gridOptions need columnDerfs and rowData at least
        columnDefs: columnDefs,
        rowData: rowData
    };
});
</script>
```

[back to top](#top)

## Columns Properties

Properities| Defination
---|---
columnDefs|Array
defaultColDef|A [default column] definition
defaultColGroupDef|A [default column group] definition
enableColResize|true: allow [column resizing] by dragging the mouse at a columns headers edge
colResizeDefault|Set to 'shift' to have shift-resize as the default resize operation (same as user holding down 'shift' while resizing)
suppressAutoSize|Suppresses [auto-sizing columns] for columns. In other words, double clicking a columns headers edge will not auto-size.
autoSizePadding|many pixels to add to a column width after the auto-sizing calculation. The default is 4 pixels
suppressColumnMoveAnimation	|true: the ag-column-moving class is not added to the grid while columns are moving. In the default themes, this transpires to no animation for moving columns
suppressMovableColumns|true: to suppress column moving. In other words, set to true to make the columns fixed position.
suppressFieldDotNotation|If true, then dots (eg address.firstline) in field names are not treated as deep references. Allows you to use dots in your field name if you prefer.
unSortIcon|Set to true to show the 'no sort' icon. See [Example Custom Sorting](https://www.ag-grid.com/javascript-grid-sorting/#example-custom-sorting)
suppressMultiSort|Set to true to suppress multi-sort when the user shift-clicks a column header.
suppressMenuHide|Set to true to always show the column menu button, rather than only showing when the mouse is over the column header.
autoGroupColumnDef|	Allows specifying the group 'auto column' if you are not happy with the default. If grouping, this column def is included as the first column definition in the grid. If not grouping, this column is not included
suppressSetColumnStateEvents|Set to true to suppress column events being raised when `columnApi.setColumnState(state)` and `columnApi.resetColumnState()` are invoked

**Header Template- format Header**

Header Template Properities| Defination
---|---
Ref|Description
eLabel|	The container where there is going to be an onClick mouse listener to trigger the sort
eText|	The text displayed on the column
eFilter|	The container with the icon that will appear if the user filters this column
eSortOrder|	In case of sorting my multiple columns, this shows the index that represents the position of this column in the order
eSortAsc	|In case of sorting ascending the data in the column, this shows the associated icon
eSortDesc|	In case of sorting descending the data in the column, this shows the descending icon
eSortNone|	In case of no sort being applied, this shows the associated icon. Note this icon by default is empty

**Column Types**

[back to top](#top)

## Group

```javascript
// 1) group
var gridOptions = {
    rowData: myRowData,
    columnDefs: [
        {   
            headerName: 'Group A',   // put the three columns into a group   
            headerClass: 'my-css-class',   // Coloring Groups
            groupId: 'medalsGroup',
            children: [   // group defination
                {headerName: 'Total', field: 'total', columnGroupShow: 'closed'},   // columnGroupShow: Showing -Hiding Columns
                {headerName: 'gold', field: 'gold', columnGroupShow: 'open'},
                {headerName: 'Silver', field: 'silver', columnGroupShow: 'open'},
                {headerName: 'Bronze', field: 'bronze', columnGroupShow: 'open',}
            ]
        }
    ],
}
```

[back to top](#top)

## Style Cell/Row

- Cell
  - `cellStyle`
  - `cellClass`
  - `cellClassRules`
    - The expression has the following attributes available to it (mapping the the attributes of the equivalent params object):
    - x: maps value
    - ctx: maps context
    - node: maps node
    - data: maps data
    - colDef: maps colDef
    - rowIndex: maps rowIndex
    - api: maps api
- Row
  - rowStyle
  - rowClass
  - rowClassRules
    - ctx: maps context
    - node: maps node
    - data: maps data
    - rowIndex: maps rowIndex
    - api: maps api

[back to top](#top)

## Fitler

- turn on sorting by setting `enableSorting = true`
- turn on filtering with `enableFilter = true`

Properities| Defination
---|---
enableSorting| Set to true when using Client-side Row Model to enable Row Sorting. Clicking a column header will cause the grid to sort the data.
enableServerSideSorting	| Set to true when using Infinite, Server-side or Viewport Row Models to enable Row Sorting. Clicking a column header will result in your datasource getting asked for the data again with the new sort order
enableFilter| Set to true when using Client-side Row Model to enable Row Filtering
enableServerSideFilter|Set to true when using Infinite, Server-side or Viewport Row Models to enable Row Filtering. A change in filter will result in your datasource getting asked for the data again with the new filter
quickFilterText|Rows are filtered using this text as a quick filter
cacheQuickFilter| Set to true to turn on the quick filter cache, used for a performance gain when using the quick filter
sortingOrder| 	Array defining the order in which sorting occurs (if sorting is enabled). Values can be asc, desc or null. For example: sortingOrder: ['asc', 'desc']. See Example Sorting Order and Animation
accentedSort|	Set to true to specify that the sort should take into account accented characters, if this feature is turned on the sort will perform slower
multiSortKey| Set to 'ctrl' to have multi sorting work using the Control or Command (for Apple) keys. See Multi Column Sorting
enableOldSetFilterModel|Set to true to return the old set filter model format. This is intended as a temporary measure to facilitate migration

### Bulit In Column Filters

Filter|Description
---|---
agNumberColumnFilter|	A Number Filter for number comparisons
agTextColumnFilter|	A Text Filter for string comparisons
agDateColumnFilter|	A Date Filter for date comparisons
agSetColumnFilter|	A Set Filter, influenced by how filters work in Microsoft Excel. This is an ag-Grid-Enterprise feature
-custom-|	A Filter Component where you can provide you own filter written in a framework of your choice

Each filter can take additional filter params by setting **colDef.filterParams**

```javascript
columnDefinition = {
    headerName: 'Athlete',
    field: 'athlete'
    // set the column to use text filter
    filter: 'agTextColumnFilter',
    // pass in additional parameters to the text filter
    filterParams: {apply: true, newRowsAction: 'keep'}
}
```

- [agTextColumnFilter Parameters](https://www.ag-grid.com/javascript-grid-filter-text/)
- [agNumberColumnFilter Parameters](https://www.ag-grid.com/javascript-grid-filter-number/)
- [agDateColumnFilter Parameters](https://www.ag-grid.com/javascript-grid-filter-date/)
- [customer filter](https://www.ag-grid.com/javascript-grid-filter-custom/)

### Filter Events

- `filterChanged`
- `filterModified`: Gets called when filter has been modified but filterChanged not necessarily called. This is useful when using an apply button inside the filter, as this event fires when the filter is modified, and then filterChanged is fired when the apply button is pressed

### External Filter

- `isExternalFilterPresent` is called exactly once every time the grid senses a filter change. It should return true if external filtering is active, otherwise false. If you return true, then `doesExternalFilterPass()` will be called while filtering, otherwise `doesExternalFilterPass()` will not be called.
- `doesExternalFilterPass` is called once for each row node in the grid. If you return false, the node will be excluded from the final set.

[back to top](#top)

## Sorting

- Enable Sorting: 
  - adding: `enableSorting: true`
  - adding `sort`, it will sort a column by clicking on the column header
- Custom Sorting: adding `comparator` The sort methods gets the value as well as the row nodes

```javascript
colDef.comparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
    return valueA - valueB;
}
// ---------------------------------------
var columnDefs = [
    {headerName: "Athlete", field: "athlete", width: 150, sort: 'desc'},   //sort by desc
    {headerName: "Year", field: "year", width: 90, unSortIcon: true},      //it shows a custom icon, (up/down arrow)
    {headerName: "Date", field: "date", width: 110, comparator: dateComparator},
]
function dateComparator(date1, date2) {
    var date1Number = monthToComparableNumber(date1);
    var date2Number = monthToComparableNumber(date2);
    if (date1Number===null && date2Number===null) {
        return 0;
    }
    if (date1Number===null) {
        return -1;
    }
    if (date2Number===null) {
        return 1;
    }
    return date1Number - date2Number;
}
```

[back to top](#top)

## Sample with Cell Templates

to specify [templates](https://www.ag-grid.com/javascript-grid-cell-rendering-components/#angular-cell-render-components) to use to render your cells

```javascript
module.controller('exampleCtrl', function($scope, $http) {
    var columnDefs = [
        //1) static template, can't change the content
        {headerName: 'Useless', width: 100, template: '<span style="font-weight: bold;">BLAH</span>'},
        // 2) inline template
        {headerName: 'Athlete', width: 150, template: '<span style="font-weight: bold;" ng-bind="data.athlete"></span>'},
        // 3) loads the template from the server.
        {headerName: 'Age', width: 90, template: '<span style="font-weight: bold;" ng-bind="data.age"></span>'},
        {headerName: 'Country', field: 'country', width: 120},
        //...
    ];
    $scope.gridOptions = {
        // we are using angular in the templates
        angularCompileRows: true,
        columnDefs: columnDefs,
        rowData: null
    };
    $http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json')
        .then(function(res){
            $scope.gridOptions.api.setRowData(res.data);
        });
});
```
