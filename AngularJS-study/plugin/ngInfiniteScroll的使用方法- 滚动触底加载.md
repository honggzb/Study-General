[ngInfiniteScroll的使用方法- 滚动/触底加载](#top)

## 插件说明

```html
<ANY infinite-scroll='{expression}'
     [infinite-scroll-distance='{number}']
     [infinite-scroll-disabled='{boolean}']
     [infinite-scroll-immediate-check='{boolean}']
     [infinite-scroll-listen-for-event='{string}']
     [infinite-scroll-container='{HTMLElement | [] | string}']
     [infinite-scroll-use-document-bottom='{boolean}']
     [infinite-scroll-parent]>
</ANY>
```

属性|含义
---|---
:one: `infinite-scroll`|表示数据请求的方法，当滚动到浏览器底部时，所执行的函数或者表达式，通常是函数形式
:two: `infinite-scroll-distance (optional)`|表达式或者数字，触发请求滚动条距离页面底部的距离<br>- 如果是一个数字，表示滚动条距离浏览器底部多少远时，执行:one:中里面的函数。<br>- 如果将这个值设置为2，对于1000px高度的元素，当元素底部距离浏览器窗口底部距离在2000px像素以内，没滚动一次，都会执行一次:one:里面的函数。<br>- 这个值默认是0，即当元素滚动到元素底部达到浏览器窗口（滚动区域）底部时，执行滚动区域里面的函数
:three: `infinite-scroll-disabled (optional)`|一个布尔值，用于标志滚动表达函数能否执行，即是否禁用infinite-scroll<br>- 如果值为true，表示禁用，滚动函数不能被执行。false表示不禁用<br>- 通常用于暂停或者停止滚动。比如在AJAX请求数据的过程中，移动了滚动条，这时就需要设置这个属性，禁止滚动函数的执行
:four: `infinite-scroll-immediate-check (optional)` |一个布尔值，用于标志指令在初始化页面时，是否为初始执行一次（即使这种情况下，没有初始滚动），<br>- 默认值为true，表示初始会执行一次这 里面的函数
:five: `infinite-scroll-listen-for-event (optional)`|`{string}` 一个事件，当接受到这个事件时候，会重新执行滚动函数，重新定位滚动位置，比如到元素被修改时，会重新执行滚动函数

## Demo

```html
<div ng-app='myApp' ng-controller='DemoController'>
  <div infinite-scroll='loadMore()' infinite-scroll-distance='2'>
    <img ng-repeat='image in images' ng-src='http://placehold.it/225x250&text={{image}}'>
  </div>
</div>
<script>
var myApp = angular.module('myApp', ['infinite-scroll']);
myApp.controller('DemoController', function($scope) {
  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];
  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
</script>
```

**无限请求**

```html
<div  infinite-scroll-disabled="ifReq" infinite-scroll='indexLoadMore()' infinite-scroll-distance='0'>
<script>
$scope.indexLoadMore = function(reqUrl,method,page,totalPage) {//分页加载数据方法
        indexDataLoadFun(reqUrl,method,totalPage);//数据加载方法
    };
    var indexDataLoadFun = function(reqUrl,method,totalPage){//首页加载方法独立出来，进行数据的分页加载
        //分页总数
        if(totalPage > currentPage){//开始请求后台数据
            if ($scope.ifReq) return;//判断当前数据是否请求完成
                $scope.ifReq = true;
                currentPage = currentPage +1;//分页页码数+1
                $http({
                    method:method ,
                    data:{
                        "pageNumber": currentPage
                    },
                    url:reqUrl
                }).then(function successCallback(response) {                        
                   //请求成功，开始操作数据
                   $scope.ifReq = false;
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    $scope.ifReq = false;
                    currentPage = currentPage - 1;
                    $scope.loadingTitle = "出错啦，请稍后重试~";
                });
            }
        else{
        console.log("没有数据了")
        }
    };
</script>
```

## 容易犯的错误

**把ng-repeat标签和infinite-scroll放在同一个**

```html
<!-- 错误的写法! -->
<div infinite-scroll='pagerFunction()' ng-repeat='item in items'>
  {{item}}
</div>
<!-- 正确的写法! -->
<div infinite-scroll='pagerFunction()'>
  <div ng-repeat='item in items'>{{item}}</div>
</div>
```

> [ngInfiniteScroll documentation](https://sroze.github.io/ngInfiniteScroll/documentation.html)
