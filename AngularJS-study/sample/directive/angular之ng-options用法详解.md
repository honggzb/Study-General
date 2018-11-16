## ng-options用法详解

- [基本概念](#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
- [ng-options语法格式](#ng-options%E8%AF%AD%E6%B3%95%E6%A0%BC%E5%BC%8F)
- [sample](#sample)
- [select三级联动](#select%E4%B8%89%E7%BA%A7%E8%81%94%E5%8A%A8)

## 基本概念

- ng-options属性可以在表达式中使用数组或对象来自动生成一个select中的option列表
- ng-options与ng-repeat很相似，但是ng-options可减少内存提高速度，以及提供选择框的选项来让用户选择
- 当select中一个选项被选择，该选项将会被绑定到ng-model
- 想设一个默认值，可以像这样：`$scope.selected = $scope.collection[3]`, 或 `$scope.selected = 2016;`

## ng-options语法格式

**for array data sources**

```
label for value in array
select as label for value in array
label group by group for value in array
select as label group by group for value in array track by trackexpr
```

**for object data sources**

```
label for (key , value) in object
select as label for (key , value) in object
label group by group for (key, value) in object
select as label group by group for (key, value) in ob
```

```html
<script>
$scope.mycity = '北京';
$scope.Cities = [{ id: 1, name: '北京', group: '中国' }, { id: 2, name: '上海', group: '中国' }, { id: 3, name: '广州', group: '中国' }];
</script>
<div ng-controller="selectController">
    <!-- 为cities数组加上group属性，并按照group分组 -->
    <select ng-model="mycity" ng-options="city.name as city.name group by city.group for city in Cities"></select>
    <h1>欢迎来到{{mycity}}</h1>
</div>
```

![](https://i.imgur.com/QwMiF0W.png)


## sample

```html
<script>
$scope.colors = [
    {name:'black', shade:'dark'},
    {name:'white', shade:'light', notAnOption: true},
    {name:'red', shade:'dark'},
    {name:'blue', shade:'dark', notAnOption: true},
    {name:'yellow', shade:'light', notAnOption: false}
];
$scope.myColor = $scope.colors[2];    // red
<div>
    <label><input type="checkbox" ng-model="color.notAnOption"> Disabled?</label>
    <button ng-click="colors.splice($index, 1)" aria-label="Remove">X</button>
    <button ng-click="colors.push({})">add</button>
</div>
<div>
    <label>Color (null not allowed):
    <select ng-model="myColor" ng-options="color.name for color in colors"></select>

    <label>Color (null allowed):
    <span class="nullable">
        <select ng-model="myColor" ng-options="color.name for color in colors">
            <option value="">-- choose color --</option>
        </select>
    </span>

    <label>Color grouped by shade:
        <select ng-model="myColor" ng-options="color.name group by color.shade for color in colors">
    </select>

    <label>Color grouped by shade, with some disabled:
        <select ng-model="myColor" ng-options="color.name group by color.shade disable when color.notAnOption for color in colors">
    </select>

    Select <button ng-click="myColor = { name:'not in list', shade: 'other' }">bogus</button>.
    Currently selected: {{ {selected_color:myColor} }}
    <div style="border:solid 1px black; height:20px" ng-style="{'background-color':myColor.name}"></div>
</div>
</script>
```

## select三级联动

**实现代码1**

https://www.cnblogs.com/xythree/articles/3949236.html

```html
<div ng-controller='cityCtrl'>
    <label ng-class="{error: error.province}" >省份：
        <select ng-model="selected" ng-options="s.name for s in list" ng-change="c()" >
            <option value="">--请选择--</option>
        </select>
    </label>
    <label ng-show="selected.child.length" ng-class="{error: error.city}">市/区：
        <select ng-model="selected2" ng-options="sh.name for sh in selected.child" ng-change="c2()" >
             <option value="">--请选择--</option>
        </select>
    </label>
    <label ng-show="selected2.child.length" ng-class="{error: error.area}">县级/区域：
        <select ng-model="selected3" ng-options="x.value for x in selected2.child" ng-change="c3()" >
             <option value="">--请选择--</option>
        </select>
    </label>
    <input type="submit" value="subimt" ng-click="submit()" /><br />
    {{selected.name}} {{selected2.name}} {{selected3.value}}
</div>
<script type="text/javascript">
    $scope.error = {};
    $scope.list = [];
    $http.get('list.json').success(function (data) {
        $scope.list = data;
    });
    $scope.c = function () {
        $scope.error.province = false;
        $scope.error.city = false;
        $scope.error.area = false;
        $scope.selected2 = "";
        $scope.selected3 = "";
    };
    $scope.c2 = function () {       
        $scope.error.city = false;
        $scope.error.area = false;
        $scope.selected3 = "";
    };
    $scope.c3 = function () {
        $scope.error.area = false;
    };
    $scope.submit = function () {
        $scope.error.province = $scope.selected ? false : true;
        $scope.error.city = $scope.selected2 ? false : true;
        $scope.error.area = $scope.selected3 ? false : true;
    };

$http.get('static/js/prod/data/city.json').success(function(data) {
    $scope.division = data;
}).error(function(e) {
    toaster.pop('error', '系统错误 ' + '加载城市信息失败');
});   
</script>
[
    {
        "id": 0, 
        "name": "北京",
        "code": "001",
        "child": [
            {
                "id": 0, 
                "name": "东城区",
                "child": []
            },
            {
                "id": 1,
                "name": "西城区",
                "child": []
            },
            ...
        ]
    },
    {
        "id": 1, 
        "name": "广西",
        "code": "002",
        "child": [
            {
                "id": 0, 
                "name": "南宁",
                "child": [
                    {"value": "兴宁区"},
                    {"value": "青秀区"},
                    ...
                ]
            },
            ...
        ]
    },
    ...
]
```

**实现代码2**： https://www.cnblogs.com/maderlzp/p/7687161.html

**实现思路**

json数据源数据格式必须是key,value形式的三级数组

```html
<select  class="form-control" ng-model="address.province" ng-options="key as key for (key,value) in division" ng-change="address.city='';address.district='';">
    <option value="">省</option>
</select>
```

```html
<!--ng-options中key作为select的value绑定到ng-model（就是省市区的编号),value为省市区的名字显示在下拉列表中-->
        <select ng-model="areaObj.addressProvince"
                ng-change="areaObj.addressCity=undefined;areaObj.addressDistrict=undefined"
                ng-options="key as value for (key,value) in DISTRICTS['100000']">
            <option value="">省</option>
        </select>
        <select ng-model="areaObj.addressCity"
                ng-change="areaObj.addressDistrict=undefined;"
                ng-options="key as value for (key,value) in DISTRICTS[areaObj.addressProvince]">
            <option value="">市</option>
        </select>
        <select class="form-control form-control-new"
                ng-model="areaObj.addressDistrict"
                ng-options="key as value for (key,value) in DISTRICTS[areaObj.addressCity]">
            <option value="">区</option>
        </select>
```
