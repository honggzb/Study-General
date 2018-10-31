[AngularJS directive详解](#top)

- [指令directive运行原理](#%E6%8C%87%E4%BB%A4directive%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86)
- [定义directive](#%E5%AE%9A%E4%B9%89directive)
- [directive参数](#directive%E5%8F%82%E6%95%B0)
  - [restrict: 指明指令在DOM里面以什么形式被声明](#restrict-%E6%8C%87%E6%98%8E%E6%8C%87%E4%BB%A4%E5%9C%A8dom%E9%87%8C%E9%9D%A2%E4%BB%A5%E4%BB%80%E4%B9%88%E5%BD%A2%E5%BC%8F%E8%A2%AB%E5%A3%B0%E6%98%8E)
  - [template and templateUrl](#template-and-templateurl)
  - [scope](#scope)
    - [scope继承隔离方法](#scope%E7%BB%A7%E6%89%BF%E9%9A%94%E7%A6%BB%E6%96%B9%E6%B3%95)
    - [scope作用域绑定策略-与外界交互](#scope%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%BB%91%E5%AE%9A%E7%AD%96%E7%95%A5-与外界交互)
    - [在directive中执行父scope定义的方法](#%E5%9C%A8directive%E4%B8%AD%E6%89%A7%E8%A1%8C%E7%88%B6scope%E5%AE%9A%E4%B9%89%E7%9A%84%E6%96%B9%E6%B3%95)
  - [controller, controllerAs, bindToController - 指令相关的](#controller-controlleras-bindtocontroller---%E6%8C%87%E4%BB%A4%E7%9B%B8%E5%85%B3%E7%9A%84)
    - [controller](#controller)
    - [controllerAs-控制器的别名](#controlleras-%E6%8E%A7%E5%88%B6%E5%99%A8%E7%9A%84%E5%88%AB%E5%90%8D)
    - [bindToController](#bindtocontroller)
    - [require-不同指令间通信用的](#require-%E4%B8%8D%E5%90%8C%E6%8C%87%E4%BB%A4%E9%97%B4%E9%80%9A%E4%BF%A1%E7%94%A8%E7%9A%84)
  - [Manipulates the DOM](#manipulates-the-dom)
    - [编译函数 Compile function](#%E7%BC%96%E8%AF%91%E5%87%BD%E6%95%B0-compile-function)
    - [链接函数 Linking function](#%E9%93%BE%E6%8E%A5%E5%87%BD%E6%95%B0-linking-function)
- [directive与controller之间的通信小结](#directive%E4%B8%8Econtroller%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1%E5%B0%8F%E7%BB%93)
- [directive与directive之间的通信](#directive%E4%B8%8Edirective%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1)
- [skills+tips](#skillstips)
- [案例-自定义directive之带参方法传递](#%E6%A1%88%E4%BE%8B-%E8%87%AA%E5%AE%9A%E4%B9%89directive%E4%B9%8B%E5%B8%A6%E5%8F%82%E6%96%B9%E6%B3%95%E4%BC%A0%E9%80%92)
- [案例-实现移动端自定义软键盘](#%E6%A1%88%E4%BE%8B-%E5%AE%9E%E7%8E%B0%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BD%AF%E9%94%AE%E7%9B%98)

## 指令directive运行原理

![](https://i.imgur.com/glioqgV.png)

1. 首先，通过浏览器的标准API，将HTML转换为DOM对象。这是很重要的一步。因为模版必须是可解析（符合规范）的HTML。这里可以跟大多数的模版系统做对比，它们一般是基于字符串的，而不是基于DOM元素的
2. 对DOM的编译（compilation）是通过调用$comple()方法完成的。这个方法遍历DOM，对directive进行匹配。如果匹配成功，那么它将与对应的DOM一起，加入到directive列表中。只要所有与指定DOM关联的directive被识别出来，他们将按照优先级排序，并按照这个顺序执行他们的compile() 函数。directive的编译函数（compile function），拥有一个修改DOM结构的机会，并负责产生link() function的解析。$compile()方法返回一个组合的linking function，是所有directive自身的compile function返回的linking function的集合
3. 通过上一步返回的linking function，将模版与scope连接起来。这反过来会调用directive自身的linking function，允许它们在元素上注册一些监听器（listener），以及与scope一起建立一些watches。这样得出的结果，是在scope与DOM之间的一个双向、即时的绑定。scope发生改变时，DOM会得到对应的响应

## 定义directive

两种定义方法

- module.directive(name, directiveFactory)
- $compileProvider.directive()

```javascript
var myModule = angular.module(...); 
myModule.directive('directiveName', function factory(injectables) { 
 var directiveDefinitionObject = { 
 　　priority: 0,                    //指令执行的优先级
 　　template: '<div></div>', 
 　　templateUrl: 'directive.html', 
 　　replace: false,                 //是否用模板替换当前元素，若为false，则append在当前元素上
 　　transclude: false,              //是否将当前元素的内容转移到模板中
 　　restrict: 'A',                  // 指令的使用方式，包括标签，属性，类，注释
 　　compile: function compile(tElement, tAttrs, transclude) { 
 　　　　return { 
 　　　　　　pre: function preLink(scope, iElement, iAttrs, controller) { ... }, 
 　　　　　　post: function postLink(scope, iElement, iAttrs, controller) { ... } 
　　　　} 
　　}, 
 　　link: function postLink(scope, iElement, iAttrs) { ... },
     scope: false,                  //指定指令的作用域
     bindToController: ,
     controller: customController,
     controllerAs: 'alias',
     link: function postLink(scope, iElement, iAttrs) {...},  //以编程的方式操作DOM，包括添加监听器等
     compile: function compile(tElement, tAttrs, transclude){ //编程的方式修改DOM模板的副本，可以返回链接函数
        return: {
        pre: function preLink(scope, iElement, iAttrs, controller){...},
        post: function postLink(scope, iElement, iAttrs, controller){...}
        }
      }
   };
 return directiveDefinitionObject; 
});
function customController($scope, $translate, $timeout) {
  //...
}
```

[back to top](#top)

## directive参数

- priority: (数字),可选参数，指明指令的优先级，若在单个DOM上有多个指令，则优先级高的先执行
- terminal:（布尔型），可选参数，若设置为true，则优先级低于此指令的其他指令则无效，不会被调用(优先级相同的还是会执行)
- replace: （布尔值），默认值为false
- transclude: 如果不想让指令内部的内容被模板替换，可以设置这个值为true
  - 如果指令使用了transclude参数，那么在控制器无法正常监听数据模型的变化了。建议在链接函数里使用$watch服务

###  restrict: 指明指令在DOM里面以什么形式被声明

restrict|含义
---|---
E(元素)|`<directiveName></directiveName> `
A(属性)|`<div directiveName='expression'></div> `
C(类)| `<div class='directiveName'></div>` 
M(注释)|`<--directive:directiveName expression--> `

[back to top](#top)

### template and templateUrl

- template: 可以是
  - 一段HTML文本
  - 一个函数，可接受两个参数tElement和tAttrs
- templateUrl（字符串或者函数），可选参数, 可以是
  - 一个代表HTML文件路径的字符串
  - 一个函数，可接受两个参数tElement和tAttrs
  - 在本地开发时候，需要运行一个服务器，不然使用templateUrl会报错CORS错误。由于加载html模板是通过异步加载的，若加载大量的模板会拖慢网站的速度，这里有个技巧，就是先缓存模板

```javascript
app.directive("helloWorld2",function(){ 
 return{ 
  restrict:'EAC', 
  template: function(tElement,tAttrs){ 
    var _html = ''; 
    _html += '<div>' +'hello '+tAttrs.title+'</div>'; 
    return _html; 
  } 
 }; 
}); 
// 缓存模板方法1: 将下列代码作为页面的一部分包含在里面
<script type='text/ng-template' id='hello.html'> 
  <div><h1>Hi 我是林炳文~~~</h1></div> 
</script> 
// 缓存模板方法2: 
app.run(["$templateCache", function($templateCache) { 
  $templateCache.put("hello.html", 
  "<div><h1>Hi 我是林炳文~~~</h1></div>"); 
}]); 
```

[back to top](#top)

### scope

#### scope继承隔离方法

- 默认值false。表示继承父作用域                        -> 继承不隔离
- true。表示继承父作用域，并创建自己的作用域（子作用域） -> 继承隔离
- {}。表示创建一个全新的隔离作用域                     -> 不继承隔离: 改变任何一方的值均不能影响另一方的值
  - **tip**：当想创建一个可重用的组件时隔离作用域是一个很好的选择，通过隔离作用域我们确保指令是‘独立'的,并可以轻松地插入到任何HTML app中，并且这种做法防止了父作用域被污染
  
#### scope作用域绑定策略-与外界交互

|策略|说明|图解|
|---|---|---|
|`@`|把当前属性作为字符串传递。<br>还可绑定来自外层scope的值，在属性值中插入{{}}即可|![](https://i.imgur.com/uDNi44v.png)|
|`=`|与父scope中的属性进行双向绑定||
|`&`|传递一个来自父scope的函数|![](https://i.imgur.com/VpHyLE4.png)|

 **隔离作用域可以通过绑定策略来访问父作用域的属性**, directive在使用隔离scope的时候，提供了三种方法同隔离之外的地方交互。这三种分别是: 
 
- `@` 绑定一个局部scope属性到当前dom节点的属性值。结果总是一个字符串，因为dom属性是字符串
  - 这种绑定是**单向的**，即父scope的绑定变化，directive中的scope的属性会同步变化，而隔离scope中的绑定变化，父scope是不知道的
  - 把当前属性作为字符串传递，还可以绑定来至外层scope的值，在属性中插入{{}}即可
- `=` 通过directive的attr属性的值在局部scope的属性和父scope属性名之间建立**双向绑定** - 与父scope中的属性进行**双向绑定**
  - **`=`双向绑定中绑定对象是无效的**， 如`<div another-param="{ thisWill: 'result in digest errors' }"></div>`将无任何传递, 这个时候使用`&`
- `&` 提供一种方式执行一个表达式在父scope的上下文中。如果没有指定attr名称，则属性名称为相同的本地名称
  - **绑定对象和函数**
  - 传递一个来着父scope的函数，稍后调用
  - 此表达式可以是一个function
  - 比如当写了一个directive，当用户点击按钮时，directive想要通知controller，controller无法知道directive中发生了什么，也许你可以通过使用angular中的event广播来做到，但是必须要在controller中增加一个事件监听方法。最好的方法就是让directive可以通过一个父scope中的function，当directive中有什么动作需要更新到父scope中的时候，可以在父scope上下文中执行一段代码或者一个函数
- `?` optional, 与上面三个组合，如 `=?`

#### 在directive中执行父scope定义的方法

```html
<div ng-controller="myController"> 
 <div>父scope： 
    <div>Say：{{name}}</div> 
 </div> 
 <div>隔离scope： 
    <div isolated-directive action="click()"></div>
 </div> 
 </div>
<script>
var app = angular.module('myApp', []); 
app.controller("myController", function ($scope) { 
 $scope.value = "hello world"; 
 $scope.click = function () { 
    $scope.value = Math.random(); 
 };
})
.directive("isolatedDirective", function () { 
 return { 
  scope: { action: "&" }, 
  template: '<input type="button" value="在directive中执行父scope定义的方法" ng-click="action()"/>' 
  }; 
}); 
</script>
```

**Isolate Scope Function Expression Binding**

```html
<div my-directive="parentScopeFunction(funcParam, secondParam)"></div>
<script>
var directiveFunction = function(){
	return {
		template: '<button ng-click="myDirective({funcParam: 'blah blah', secondParam: 'blah blah'})">It can be executed from inside the DOM too!</button>',
		scope: {
			myDirective: '&'
		},
		link: function(scope, element, attributes){
			//IMPORTANT: if scope.parentScopeFunction was not defined on the parent scope, then '&' interpolates it into a NOOP function, it is still a FUNCTION type
			//if the DOM attribute was not defined, scope.property would also still return a noop function
			//if it's defined as something other than a function, an error occurs!
			scope.myDirective({   //parameters passed into the bound function expression must be in the form of an object map
					funcParam: 'This is the value that is going to be passed in as the funcParam',
					secondParam: 'This is another param!'
			});

		}
	};
}
</script>
```

[back to top](#top)

### controller, controllerAs, bindToController - 指令相关的

#### controller

- 可以是一个字符串或者函数, 若是为字符串，则将字符串当做是控制器的名字，来查找注册在应用中的控制器的构造函数
- 还有一些特殊的服务（参数）可以注入controller
<table border="1" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
        <td valign="top" width="104"><p>$scope</p></td>
        <td valign="top" width="457"><p>与指令元素相关联的当前作用域</p></td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>$element</p></td>
        <td valign="top" width="457"><p>当前指令对应的元素</p></td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>$attrs</p></td>
        <td valign="top" width="457">
            当前元素的属性组成的对象，如：<br>
            &lt;div id=”nav” name=”Monkey”&gt;&lt;/div&gt;<br>
            属性对象为：<br>
            {<br>
            id:&nbsp; ‘nav’,<br>
            name:&nbsp; ‘Monkey’<br>
            }
        </td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>$transclude</p></td>
        <td valign="top" width="457"><p>嵌入链接函数，实际被执行用来克隆元素和操作DOM的函数</p></td>
    </tr>
    </tbody>
</table>
- 指令的控制器和link函数可以进行互换。区别在于，控制器主要是用来提供可在指令间复用的行为但link链接函数只能在当前内部指令中定义行为，且无法再指令间复用

#### controllerAs-控制器的别名

```html
<div ng-app="app" ng-controller="demoController as demo"> </div>
<script>
angular.module('myApp',[]).directive('mySite', function () { 
  return { 
    controller:'demoController', 
    controllerAs:'demo'
    //..其他配置 
  }; 
}); 
</script>
```

#### bindToController

- 用来绑定scope的属性直接赋给controller, If you want to use controllers, instead of a link function, you can use bindToController
- 默认false。可以为true或者和scope相同格式的对象
- 此外使用此属性，要设置controller的别名，通常通过"controllerAs"来设置
- 如果一个directive里同时使用了bindToController和scope，并且是object。那么bindToController会覆盖scope。

`<note message="hello"></note>`

```javascript
angular.module("app", [])
    .directive("note", function note() {
        return {
            scope: {
                message: "@" //pass in a string
            },
            bindToController: true,
            controller: "NoteCtrl as note",
            template: "<div>{{note.message}}</div>"
        };
    })
    .controller("NoteCtrl", function NoteCtrl() {
        var note = this;
    });
```

#### require-不同指令间通信用的

- 字符串代表另一个指令的名字，它将会作为link函数的第四个参数
- 假设现在要编写两个指令，两个指令中的link链接函数中存在有很多重合的方法，这时候就可以将这些重复的方法写在第三个指令的controller中然后在这两个指令中，require这个拥有controller字段的的指令（第三个指令），最后通过link链接函数的第四个参数就可以引用这些重合的方法了

```javascript
 var app = angular.module('myApp', []); 
 app.directive('outerDirective', function() { 
  return { 
    scope: {}, 
    restrict: 'AE', 
    controller: function($scope) { 
      this.say = function(someDirective) { 
        console.log('Got:' + someDirective.message); 
      }; 
    } 
  }; 
 }); 
 app.directive('innerDirective1', function() { 
  return { 
  scope: {}, 
  restrict: 'AE', 
  require: '^outerDirective', 
  link: function(scope, elem, attrs, controllerInstance) { 
          scope.message = "Hi,leifeng"; 
          controllerInstance.say(scope); 
        } 
  }; 
 }); 
 app.directive('innerDirective2', function() { 
  return { 
  scope: {}, 
  restrict: 'AE', 
  require: '^outerDirective', 
  // controllerInstance用来访问父directive的方法和属性
  link: function(scope, elem, attrs, controllerInstance) { 
          scope.message = "Hi,shushu"; 
          controllerInstance.say(scope); 
        } 
  }; 
 });
```

require的参数值加上下面的某个前缀，这会改变查找控制器的行为：

<table border="1" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
        <td valign="top" width="104"><p>没有前缀</p></td>
        <td valign="top" width="457"><p>指令会在自身提供的控制器中进行查找，如果找不到任何控制器，则会抛出一个error</p></td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>?</p></td>
        <td valign="top" width="457"><p>如果在当前的指令没有找到所需的控制器，则会将null传给link连接函数的第四个参数</p></td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>^</p></td>
        <td valign="top" width="457"><p>如果在当前的指令没有找到所需的控制器，则会查找父元素的控制器</p></td>
    </tr>
    <tr>
        <td valign="top" width="104"><p>?^</p></td>
        <td valign="top" width="457"><p>综合前面?和^</p></td>
    </tr>
    </tbody>
</table>

[back to top](#top)

### Manipulates the DOM

```javascript
phonecatDirectives.directive('exampleDirective', function() { 
 return { 
  restrict: 'E', 
  template: '<p>Hello {{number}}!</p>', 
  controller: function($scope, $element){ 
   $scope.number = $scope.number + "22222 "; 
  }, 
  link: function(scope, el, attr) { 
   scope.number = scope.number + "33333 "; 
  }, 
  compile: function(element, attributes) { 
   return { 
    pre: function preLink(scope, element, attributes) { 
     scope.number = scope.number + "44444 "; 
    }, 
    post: function postLink(scope, element, attributes) { 
     scope.number = scope.number + "55555 "; 
    } 
   }; 
  } 
 } 
}); 
dtControllers.controller('directive2',['$scope', 
 function($scope) { 
  $scope.number = '1111'; 
 } 
]); 
//html  
 <div ng-controller="directive2"> 
  <example-directive></example-directive> 
 </div> 
```

> controller先运行，compile后运行，link不运行

#### 编译函数 Compile function

编译函数是用来处理需要修改模板DOM的情况的。因为大部分指令都不需要修改模板，所以这个函数也不常用。

`function compile(tElement, tAttrs, transclude) { ... }`

- `tElement` - template element - 指令所在的元素。对这个元素及其子元素进行变形之类的操作是安全的
- `tAttrs` - template attributes - 这个元素上所有指令声明的属性，这些属性都是在编译函数里共享的
- `transclude` - 一个嵌入的链接函数function(scope, cloneLinkingFn)
- 编译函数可以返回一个对象或者函数
  - 返回函数 - 等效于在编译函数不存在时，使用配置对象的link属性注册的链接函数
  - 返回对象 - 返回一个通过pre或post属性注册了函数的对象。参考下面pre-linking和post-liking函数的解释
- **注意**：在编译函数里面不要进行任何DOM变形之外的操作。更重要的，DOM监听事件的注册应该在链接函数中做，而不是编译函数中

#### 链接函数 Linking function

链接函数负责注册DOM事件和更新DOM。它是在模板被克隆之后执行的，它也是大部分指令逻辑代码编写的地方

`function link(scope, iElement, iAttrs, controller) { ... }`

- `scope` - 指令需要监听的作用域
- `iElement` - instance element - 指令所在的元素。只有在postLink函数中对元素的子元素进行操作才是安全的，因为那时它们才已经全部链接好
- `iAttrs` - instance attributes - 实例属性，一个标准化的、所有声明在当前元素上的属性列表，这些属性在所有链接函数间是共享的
- `controller` - 控制器实例，也就是当前指令通过require请求的指令direct2内部的controller。比如：direct2指令中的`controller:function(){this.addStrength = function(){}}`，那么，在当前指令的link函数中，就可以通过`controller.addStrength`进行调用了`Pre-linking function`在子元素被链接前执行。不能用来进行DOM的变形，以防链接函数找不到正确的元素来链接`Post-linking function`所有元素都被链接后执行
- **说明**
  - compile选项本身并不会被频繁使用，但是link函数则会被经常使用
  - compile和link选项是互斥的。如果同时设置了这两个选项，那么会把compile所返回的函数当作链接函数，而link选项本身则会被忽略
  - 编译函数负责对模板DOM进行转换。链接函数负责将作用域和DOM进行链接. 在作用域同DOM链接之前可以手动操作DOM
  - 本质上，当设置了link选项，实际上是创建了一个postLink() 链接函数，以便compile() 函数可以定义链接函数, 如果设置了compile函数，说明我们希望在指令和实时数据被放到DOM中之前进行DOM操作，在这个函数中进行诸如添加和删除节点等DOM操作是安全的
  
```html
<div ng-controller="myAppCtrl">
   <loader hello howToLoad="loadData()">数据加载......</loader>
  </div>
```

```javascript
//指令与控制器之间交互
myApp.directive('loader', function(){
 return {
  restrict: 'EA',
  template: '<div ng-transclude></div>',
  transclude: true,
  replace: true,
  /*scope: {}, 独立scope*/
  link: function(scope, element, attrs){
   element.bind('mouseenter', function(){
    /*这里调用controller中的方法三种方式*/
    /*(1) scope.loadData();
      (2) scope.$apply('loadData()');
      (3) attrs.howtoload === 属性上绑定的函数名称*/
    //属性方式 注意坑！！！ howtoload 得小写
    scope.$apply(attrs.howtoload);    //从所有控制器中找到多对应的方法
   })
  }
 }
}) 
```

[back to top](#top)

## directive与controller之间的通信小结

- scope - 指令作用域
  - 通过指令作用域实现指令与html页面元素进行关联
  - 在控制器中又实现了与页面的关联
  - 通过html实现了控制器和指令之间的联系

[back to top](#top)

## directive与directive之间的通信

1. transclude
2. require

```html
<deep-drt forid="id1">
     <inner-drt forinnerid="id2"></inner-drt>
</deep-drt>
<script>
var demoDrt = angular.module('demoDrt', []);
demoDrt.directive('deepDrt', function() {
        return {
            restrict:'AE',
            replace:true,
            scope : { forid : '@' },
            //加上transclude属性true之后在template中结合ng-transclude指令就不会替换子directive，
            // 如果嵌套有自定义指令而没加transclude属性的话子directive会被父directive的template替换掉
            transclude:true,
            //如果有子directive要使用父directive中controller的值的话变量和函数的定义则要使用this来绑定，$scope绑定的话只会在当前作用域生效
            controller:['$scope', function($scope) {
                this.name = 'angular';   //这个this输出的其实就是controller对象
                this.version = '1.4.6';
            }],
            //template 上结合ng-transclude使用，如果ng-transclude放在template的父级的话，
            // 那么template里面的值会被子directive覆盖，所以我们要用一个dom并加上ng-transclude来在外层包裹子directive。
            template:'<div id="{{forid}}">deepDrt<div ng-transclude></div></div>'
        };
});
demoDrt.directive('innerDrt', function() {
       return {
           restrict:"AE",
           replace:true,
           //require主要作用是寻找父directive,'^'表示向上寻找，后面加上父directive的名字，'?'表示如果找不到的话则不会报错,
           // 一般'^?'两个结合使用当找不到父directive的时候angular不会报错
           //结合了require 则在子directive的link属性中加上reController，则可以获取父directive中controller的变量和方法
           require: '^?deepDrt',
           scope : {
               forinnerid : '@'
           },
           link : function(scope, element, attr, reController) {  //reController得到了父controller中绑定的变量和函数
               console.log(scope);
               console.log(attr);
               element.bind('click', function(e) {
                  console.log(e.target);
                   e.target.innerText = reController.name + '-' + reController.version;
               });
           },
           template : '<div id="{{forinnerid}}">innerDrt</div>'
       }
});
</script>
```

[back to top](#top)

## skills+tips

**1. set a default value in an Angular Directive Scope**

```html
<my-directive></my-directive>
<!-- <my-directive allow-something="false"></my-directive> -->
<script>
angular.module('myApp', [])
  .directive('myDirective', function() {
    return {
      scope: {
        allowSomething: '@'
      },
      controller: function($scope, $timeout) {
        $timeout(function() {
          if (angular.isUndefined($scope.allowSomething)) {
            $scope.allowSomething = true;
          }
        });
      },  
      template: '<div>allow:{{ allowSomething }}</div>'
    }; 
  }); 
</script> 
```

[back to top](#top)

## 案例-自定义directive之带参方法传递

- **功能**：点击【提交】后，将自定义指令myEmail中textarea元素的内容传递给控制器中的send()方法。
- **关键点**：模板email.html中的ng-click="sendEmail({msg:content})" 参数{msg:content}必须是一个键值对，键为：方法参数名，值为：传递的内容

```html
<!-- html调用 -->
<!-- directive中获取html页面传来的toDir, fromName参数和sendEmail函数 -->
<my-email to-dir="广东中山" from-name="海南海口" send-email="send(msg)"/> 
<!-- email.html -->
<div style="width: 100%;height: 100%;color: white;font-size: 0.8rem;">
    <label  style="width: 100%;height: 15%;" ng-bind="toDir"></label>
    <label  style="width: 100%;height: 15%;" ng-bind="fromName"></label>
    <textarea style="width: 100%;height: 25%;color: black;" ng-model="content"></textarea>
    <button style="width: 10%;height: 15%;color: black;" ng-click="sendEmail({msg:content})">提交</button>
</div>
<script>
//自定义指令 "myEmail"
grgApp.directive("myEmail",function(){
  return{
    restrict:'AE',
    scope:{
       toDir:     '@',
       fromName:  '@',
       sendEmail: '&'    //用于调用父directive或controller中send方法
    },
    templateUrl:'/htmls/main/html/custom/email.html',
  }
});
//父控制器中的方法
$scope.send=function(msg){
  alert("send email! msg: "+msg);
}
</script>
```

[back to top](#top)

## 案例-实现移动端自定义软键盘

- `<input type="text" placeholder="按价格搜索" ng-model="spaAndHairSeaInPrice" title="按价格搜索" calculator>
`
- 在获取焦点的时候directive中会获取到ng-model的值并赋给页面中的表单，这样就能实现数据联动起来，让软键盘更加完美

```javascript
angular.module('ng-calculator', []).directive('calculator', ['$compile',function($compile) {
  return {
    restrict : 'A',
    replace : true,
    transclude : true,
    template:'<input/>',
    link : function(scope, element, attrs) {
      var keylist=[1,2,3,4,5,6,7,8,9,0,'.'];
      var calculator = '<div class="ngcalculator_area"><div class="bg"></div>'
        +'<div class="calculator">'
        +'<div class="title close">'+attrs.title+'</div><div class="inputarea">'
        +'<input type="text" id="text" ng-tap="getInput()" class="'+attrs.class+'" ng-model="' +attrs.ngModel+'">'
        +'</div><div class="con">'
        +'<div class="left">';
      $.each(keylist,function(k,v){
        calculator += '<div class="keyboard num" value="'+v+'">'+v+'</div>';
      });
      calculator += '</div>'
        +'<div class="right">'
        +'<div class="keyboard blueIcon backstep"></div>'
        +'<div class="keyboard blueIcon cleanup">清空</div>'
        +'<div class="keyboard ensure ensure">确<br>定</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';
      calculator = $compile(calculator)(scope);
      //移动端设备在获取到焦点的时候会弹出软键盘, 在获取到焦点的同事失去焦点，这样就能完美的避免设备自带的键盘
      element.bind('focus',function(){
        document.body.appendChild(calculator[0]);
        document.activeElement.blur();
      });
      $(calculator[0]).find("input").focus(function(){
        document.activeElement.blur();
      });
      //关闭模态框
      $(calculator[0]).find(".close").click(function(){
        calculator[0].remove();
        var callback = attrs.callback;
        if(typeof callback!="undefined"){
          scope[callback]();
        }
      });
      $(calculator[0]).find(".bg").click(function(){
        calculator[0].remove();
      });
      //退格
      $(calculator[0]).find(".backstep").click(function(){
        if(typeof $(calculator[0]).find("input").val()=="undefined"){
          $(calculator[0]).find("input").val("");
        }
        $(calculator[0]).find("input").val($(calculator[0]).find("input").val().substring(0,$(calculator[0]).find("input").val().length-1)).trigger('change');
      });
      //清空
      $(calculator[0]).find(".cleanup").click(function(){
        $(calculator[0]).find("input").val("").trigger('change');
      });
      //点击数字
      $(calculator[0]).find(".num").click(function(){
        var val = $(calculator[0]).find("input").val();
        var filter = attrs.filter;
        if(typeof filter!="undefined"){
          val = scope[filter](val,$(this).attr("value"));
        }else{
          val = val+''+$(this).attr("value");
        }
        $(calculator[0]).find("input").val(val).trigger('change');
      });
      //确认: 点击键盘的确定按钮之后需要进行一些数据处理
      $(calculator[0]).find(".ensure").click(function(){
        calculator[0].remove();
        var callback = attrs.callback;
        if(typeof callback!="undefined"){
          scope[callback]();
        }
      });
      //点击效果, 被点击的元素添加一个class，效果带阴影效果的按钮往下移动了几像素，看起来有点击的效果
      $(calculator[0]).find(".keyboard").click(function(){
        $(this).addClass("keydown");
        var that = this;
        setTimeout(function(){
          $(that).removeClass("keydown");
        },100)
      });
      var position = {
        startX:0,
        startY:0
      };
      calculator[0].getElementsByClassName("title")[0].addEventListener('touchstart', function(e) {
        e.preventDefault();
        var transform = $(calculator[0]).find(".calculator").css("transform").match(/translate\((.*),(.*)\)/);
        if(transform==null){
          position.startX = e.targetTouches[0].clientX;
          position.startY = e.targetTouches[0].clientY;
        }else{
          position.startX = e.targetTouches[0].clientX-parseInt(transform[1]);
          position.startY = e.targetTouches[0].clientY-parseInt(transform[2]);
        }
      }, false);
      calculator[0].getElementsByClassName("title")[0].addEventListener('touchmove', function(e) {
        e.preventDefault();
        var moveX = e.targetTouches[0].clientX-position.startX;
        var moveY = e.targetTouches[0].clientY-position.startY;
        $(calculator[0]).find(".calculator").css("transform","translate("+moveX+"px,"+moveY+"px)");
      }, false);
    }
  };
}]);
```

[back to top](#top)

> References
- [学习AngularJs:Directive指令用法（完整版）](https://www.jb51.net/article/83051.htm)
- [Angular之指令Directive用法详解](https://www.jb51.net/article/107045.htm)
- [angularJS中directive与directive 之间的通信](https://www.cnblogs.com/leungUwah/p/6195906.html)
- [AngularJS Directive Attribute Binding Explanation](https://gist.github.com/CMCDragonkai/6282750)
