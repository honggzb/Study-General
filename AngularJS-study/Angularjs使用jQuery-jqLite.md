[Angularjs使用jQuery-jqLite](#top)

- [jqLite使用方法](#jqlite%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
    - [获得angular的元素](#%E8%8E%B7%E5%BE%97angular%E7%9A%84%E5%85%83%E7%B4%A0)
    - [在directive中使用](#%E5%9C%A8directive%E4%B8%AD%E4%BD%BF%E7%94%A8)
- [jqLite API](#jqlite-api)
    - [jqLite的DOM导航方法](#jqlite%E7%9A%84dom%E5%AF%BC%E8%88%AA%E6%96%B9%E6%B3%95)
    - [jqLite修改元素（支持的jquery方法列表）](#jqlite%E4%BF%AE%E6%94%B9%E5%85%83%E7%B4%A0%E6%94%AF%E6%8C%81%E7%9A%84jquery%E6%96%B9%E6%B3%95%E5%88%97%E8%A1%A8)
    - [jqLite事件处理](#jqlite%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
    - [使用jqLite访问angularjs](#%E4%BD%BF%E7%94%A8jqlite%E8%AE%BF%E9%97%AEangularjs)
- [案例](#%E6%A1%88%E4%BE%8B)
    - [案例1： 三级的树形菜单](#%E6%A1%88%E4%BE%8B1-%E4%B8%89%E7%BA%A7%E7%9A%84%E6%A0%91%E5%BD%A2%E8%8F%9C%E5%8D%95)
    - [案例2： 计算ng-repeat中的div高度](#%E6%A1%88%E4%BE%8B2-%E8%AE%A1%E7%AE%97ng-repeat%E4%B8%AD%E7%9A%84div%E9%AB%98%E5%BA%A6)
- [小坑](#%E5%B0%8F%E5%9D%91)
    - [查找某个dom元素的子级元素只能使用find('子级tagName')](#%E6%9F%A5%E6%89%BE%E6%9F%90%E4%B8%AAdom%E5%85%83%E7%B4%A0%E7%9A%84%E5%AD%90%E7%BA%A7%E5%85%83%E7%B4%A0%E5%8F%AA%E8%83%BD%E4%BD%BF%E7%94%A8find%E5%AD%90%E7%BA%A7tagname)
    - [在标签身上自定义属性的时候的，命名不能出现大写，就算写了最后都会转成小写形式](#%E5%9C%A8%E6%A0%87%E7%AD%BE%E8%BA%AB%E4%B8%8A%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E7%9A%84%E6%97%B6%E5%80%99%E7%9A%84%E5%91%BD%E5%90%8D%E4%B8%8D%E8%83%BD%E5%87%BA%E7%8E%B0%E5%A4%A7%E5%86%99%E5%B0%B1%E7%AE%97%E5%86%99%E4%BA%86%E6%9C%80%E5%90%8E%E9%83%BD%E4%BC%9A%E8%BD%AC%E6%88%90%E5%B0%8F%E5%86%99%E5%BD%A2%E5%BC%8F)

----

- jqLite是jQuery的一个轻量级实现，允许Angular在跨浏览器兼容的方式下操纵DOM, 包含了大多数常用功能。一般在项目中，不需要依赖jQuery，一般功能通过jqLite实现就足够了
- angular并不依赖jQuery

## jqLite使用方法

### 获得angular的元素

jqLite中，通过`angular.element(param)`获得angular的元素。其功能与Jquery中的$()类似，但是存在一定的区别，$()里面是通过各种选择器选择到元素；但是angular.element方法的参数只有两种，一种是Dom元素，一种是类似html元素的字符串

```html
<input name="email" id="myId" />
<script>
    var email = angular.element(document.getElementById(‘myId’));
    email.removeAttr("readonly");   //移除掉readonly这个属性
</script>
```

### 在directive中使用

```html
<ol demo-directive class="list-group">
        <li class="list-group-item">Kobe Bryant</li>
        <li class="list-group-item">Tim Duncan</li>
        <li class="list-group-item">Tracy McGrady</li>
    </ol>
<script>
angular.module("exampleApp", [])
       .directive("demoDirective", function () {
            return function (scope, element, attrs) {
                var items = element.children();
                for (var i = 0; i < items.length; i++) {
                    if (items.eq(i).text() == "Kobe Bryant") {
                            items.eq(i).css("font-weight", "bold");
                    } 
                }
            }
       })
       .controller("defaultCtrl", function ($scope) {
            //...
       })
</script>
```

[back to top](#top)

## jqLite API

### jqLite的DOM导航方法

名称|描述
---|---
`children()`|返回一组子元素
`eq(index)`|从一个元素集合中返回对应索引的元素
`find(tag)`|按照指定的标签名定位所有后代元素
`next()`|获得下一个兄弟元素
`parent()`|返回父元素

### jqLite修改元素（支持的jquery方法列表）

名称|描述
---|---
addClass()|为每个匹配的元素添加指定的样式类名 
after() |在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点 
append() |在每个匹配元素里面的末尾处插入参数内容 
attr()|获取匹配的元素集合中的第一个元素的属性的值 
bind()|为一个元素绑定一个事件处理程序 
children()|获得匹配元素集合中每个元素的子元素，选择器选择性筛选 
clone() |创建一个匹配的元素集合的深度拷贝副本 
contents() |获得匹配元素集合中每个元素的子元素，包括文字和注释节点 
css() |获取匹配元素集合中的第一个元素的样式属性的值 
data()|在匹配元素上存储任意相关数据 
detach() |从DOM中去掉所有匹配的元素 
empty() |从DOM中移除集合中匹配元素的所有子节点 
eq() |减少匹配元素的集合为指定的索引的哪一个元素 
find() |通过一个选择器，jQuery对象，或元素过滤，得到当前匹配的元素集合中每个元素的后代 
hasClass() |确定任何一个匹配元素是否有被分配给定的（样式）类 
html() |获取集合中第一个匹配元素的HTML内容 
next() |取得匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。如果提供一个选择器，那么只有紧跟着的兄弟元素满足选择器时，才会返回此元素 
on() |在选定的元素上绑定一个或多个事件处理函数 
off() |移除一个事件处理函数 
one() |为元素的事件添加处理函数。处理函数在每个元素上每种事件类型最多执行一次 
parent() |取得匹配元素集合中，每个元素的父元素，可以提供一个可选的选择器 
prepend() |将参数内容插入到每个匹配元素的前面（元素内部） 
prop() |获取匹配的元素集中第一个元素的属性（property）值 
ready() |当DOM准备就绪时，指定一个函数来执行 
remove() |将匹配元素集合从DOM中删除。（同时移除元素上的事件及 jQuery 数据。） 
removeAttr() |为匹配的元素集合中的每个元素中移除一个属性（attribute） 
removeClass() |移除集合中每个匹配元素上一个，多个或全部样式 
removeData() |在元素上移除绑定的数据 
replaceWith() |用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合 
text() |得到匹配元素集合中每个元素的合并文本，包括他们的后代 
toggleClass() |在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或值切换属性。即：如果存在（不存在）就删除（添加）一个类 
triggerHandler() |为一个事件执行附加到元素的所有处理程序 
unbind() |从元素上删除一个以前附加事件处理程序 
val() |获取匹配的元素集合中第一个元素的当前值 
wrap() |在每个匹配的元素外层包上一个html元素

### jqLite事件处理

名称|描述
---|---
`on(events,handler)`|为指定元素发生的事件添加处理函数
`off(events,handler)`|为指定元素发生的事件移除之前添加的处理函数
`tiggerHandler()`|为指定元素的事件添加处理函数

### 使用jqLite访问angularjs

名称|描述
---|---
`controller(name)`|获取当前元素的控制器（name选填）
`injector()`|获取当前元素（或其父元素）相关联的注入器
`isolateScope()`|返回该元素独立的作用域（没有则返回空）
`scope()`|返回该元素(或其父元素)作用域
`inheritedData()`|等同于data(), 但是会遍历DOM直到找到一个值或到达最顶部父元素

[back to top](#top)

## 案例

### 案例1： 三级的树形菜单

```html
<li two-menu>一级
	<!-------子菜单消除点击冒泡事件，防止点击子菜单时子菜单隐藏了自身--------->　
	<ul class="secondMenu" ng-click="$event.stopPropagation()">
		<li two-menu>二级
			<ul class="thirdMenu" ng-click="$event.stopPropagation()">
				<li>三级</li> 
				<li>三级</li> 
		    </ul>
		</li> 
		<li>二级</li> 
	</ul>
</li>
<script>
angular.module('test',[]).controller('testController',function($scope){
    
}).directive('twoMenu',function(){
    return {
	    link:function(scope,element,attrs){
			  element.on("click",function(event){ 
				event.stopPropagation();  //消除冒泡
				if(element.find("ul").eq(0).css("display")=="block"){  //如果子级菜单显示，则隐藏
				    element.find("ul").eq(0).css("display","none");
				}
				else{
				    element.find("ul").eq(0).css("display","block");   //如果子级菜单隐藏，则显示
				}
			  });
		  }
	}
});
</script>
```

### 案例2： 计算ng-repeat中的div高度

```html
<body ng-app="myApp" ng-controller="myController">
    <div class="border_box"></div>
    <div id="MainDiv">
        <div id="ObjAccordian" ng-repeat="guide in GuideDetails" init="refresh();">
            <input type="text" />
        </div>
    </div>
</body>
<script>
var myApp = angular.module('myApp', []);
myApp.controller('myController', ['$scope', function ($scope) {
    $scope.GuideDetails = [1, 2, 3, 4, 5];
    angular.element(document).ready(function () {
        $('.border_box').css('height', $('#MainDiv').height());
        $scope.$apply();
    });
}]);
</script>
```

[back to top](#top)

## 小坑

### 查找某个dom元素的子级元素只能使用find('子级tagName')

使用`children（''）`括号里不管传递什么参数都会把所有子级选中

```html
<div nav="今日一刻" ></div>
<script>
angular.module('app').directive('nav',function () {
    return{
        restrict:"A",
        templateUrl:'../view/tpl/nav_tpl.html',
        replace:true,
        link:function (scope,element,attrs) {
             element.find('span').html(attrs.nav);
            }
        }
    }
});   
</script>
```

### 在标签身上自定义属性的时候的，命名不能出现大写，就算写了最后都会转成小写形式

`<div nav="今日一刻" ishidden="true"></div>`

[back to top](#top)
