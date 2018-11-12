[AngularJS+angularjs作用域的生命周期](#top)

- [AngularJs的生命周期](#angularjs%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
- [编译阶段](#%E7%BC%96%E8%AF%91%E9%98%B6%E6%AE%B5)
- [Compile（对象或函数）](#compile%E5%AF%B9%E8%B1%A1%E6%88%96%E5%87%BD%E6%95%B0)
- [link](#link)
- [AngularJS的延迟处理](#angularjs%E7%9A%84%E5%BB%B6%E8%BF%9F%E5%A4%84%E7%90%86)
- [angularjs作用域生命周期](#angularjs%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

## AngularJs的生命周期

**AngularJs的生命周期分为六个阶段**

阶段|说明
---|---
编译|AngularJs会遍历浏览器提供的dom树，尝试参照已注册的指令集来匹配每个元素、属性、注释和css类。<br>每当匹配一个指令时，ag就会调用该指令的编译函数，该函数返回一个连接函数，ag会收集所有的连接函数
链接|一旦所有指令被编译完成，AngularJs就会创建作用域，然后通过调用每个指令对应的链接函数将指令和作用域连接起来
注册监视|作用域一旦生成，指令就会在它身上注册一个监视，就是我们平时用到的`$scope.$watch()`，顾名思义监视数据有没有变化
模型变化|这个时候一旦模型发生了变化，会执行用户自己定义的回调函数。其中关键的是，<br>在模型发生变化时，如何从浏览器的js环境进入到angular的环境中操作在ag模型上的数据，<br>此时，ag会调用一个内置指令$scope.$apply，这样就能进去ag的环境
观察|在这个阶段会启动脏检测机制，先检测根scope，然后传播到所有的子作用域上，这个时候检测到变化就会执行监听函数$watch的回调函数
摧毁|当不需要一个作用域，需要将它移除掉。原则是谁创建的谁摧毁，使用的方法是$scope.$destroy()

## 编译阶段

-第一个阶段是编译阶段。在编译阶段， AngularJS会遍历整个HTML文档并根据JavaScript中的指令定义来处理页面上声明的指令。
-一旦对指令和其中的子模板进行遍历或编译，编译后的模板会返回一个叫做模板函数的函数。我们有机会在指令的模板函数被返回前，对编译后的DOM树进行修改。
-在这个时间点DOM树还没有进行数据绑定，意味着如果此时对DOM树进行操作只会有很少的性能开销。基于此点，ng-repeat和ng-transclude等内置指令会在这个时候，也就是还未与任何作用域数据进行绑定时对DOM进行操作。

## Compile（对象或函数）

-compile选项可以返回一个对象或函数
-compile选项本身并不会被频繁使用，但是link函数则会被经常使用。本质上，当我们设置了link选项，实际上是创建了一个postLink()链接函数，以便compile()函数可以定义链接函数
-通常情况下，如果设置了compile函数，说明我们希望在指令和实时数据被放到DOM中之前进行DOM操作，在这个函数中进行诸如添加和删除节点等DOM操作是安全的
-注：
-**compile和link选项是互斥的**。如果同时设置了这两个选项，那么会把compile所返回的函数当作链接函数，而link选项本身则会被忽略
-**编译函数负责对模板DOM进行转换**
-**链接函数负责将作用域和DOM进行链接**
-不要进行DOM事件监听器的注册：这个操作应该在链接函数中完成。

## link

-用link函数创建可以操作DOM的指令
-链接函数是可选的。如果定义了编译函数，它会返回链接函数，因此当两个函数都定义了时，编译函数会重载链接函数。如果我们的指令很简单，并且不需要额外的设置，可以从工厂函数（回调函数）返回一个函数来代替对象。如果这样做了，这个函数就是链接函数

```javascript
//下面两种定义指令的方式在功能上是完全一样的：
angular.module('myApp',[])
.directive('myDirective',function(){
  return{
    pre:function(tElement,tAttrs,transclude){
      //在子元素被链接之前执行
       //在这里进行Don转换不安全
       //之后调用'lihk'h函数将无法定位要链接的元素
    },
     post:function(scope,iElement,iAttrs,controller){
      //在子元素被链接之后执行
      //如果在这里省略掉编译选项
      //在这里执行DOM转换和链接函数一样安全吗
    }
  };
});
angular.module('myApp',[])
.directive('myDirective',function(){
  return{
    link:function(scope,ele,attrs){
      return{
        pre:function(tElement,tAttrs,transclude){
           //在子元素被链接之前执行
          //在这里进行Don转换不安全
          //之后调用'lihk'h函数将无法定位要链接的元素
        },
        post:function(scope,iElement,iAttrs,controller){
          //在子元素被链接之后执行
          //如果在这里省略掉编译选项
          //在这里执行DOM转换和链接函数一样安全吗
      }
    }
  }
});
```

链接函数中的参数|说明
---|---
scope|指令用来在其内部注册监听器的作用域
iElement|iElement参数代表实例元素，指使用此指令的元素。在postLink函数中我们应该只操作此元素的子元素，因为子元素已经被链接过了
iAttrs|iAttrs参数代表实例属性，是一个由定义在元素上的属性组成的标准化列表，可以在所有指令的链接函数间共享。会以JavaScript对象的形式进行传递
controller|controller参数指向require选项定义的控制器。如果没有设置require选项，那么controller参数的值为undefined

**控制器在所有的指令间共享**，因此指令可以将控制器当作通信通道（公共API）。如果设置了多个require，那么这个参数会是一个由控制器实例组成的数组，而不只是一个单独的控制器。

[back to top](#top)

## AngularJS的延迟处理

- 常用的高级的控制反转容器(Inversion of Control containers)
- 延迟加载(lazy-loading)
- 生命周期管理(lifetime management)
- 延迟的创建/处理(deferred creation/resolution)

[浅析AngularJS中的生命周期和延迟处理](https://www.jb51.net/article/68103.htm)

## angularjs作用域生命周期

**作用域中页面渲染时查找取值的顺序**

1. 在该表达式当前所在的DOM节点所对应的作用域中
2. 往上一层的父级作用域中去查找
3. $rootScope（相当于全局属性）中查找

说白了就是类似于js的原型继承机制，一级一级向上查找取值，找到了就再不向下查找了，否则继续。

**基于作用域的事件传播**

- broadcasted ：从父级作用域广播至子级 scope
- emitted ：从子级作用域往上发射到父级作用域(相当于冒泡)
- $emit 和$broadcast在$scope中内置存在可直接使用
  
**作用域生命周期**

作用域生命周期|说明
---|---
创建期|root scope 是在应用程序启动时由 `$injector` 创建的。<br>另外，在指令的模版链接阶段（template linking），指令会创建一些新的子级scope。
注册$watch|在模版链接阶段（template linking），指令会往作用域中注册 监听器(watch)，而且不止一个。<br>这些 `$watch` 用来监测数据模型的更新并将更新值传给DOM。
数据模型变化|在把数据变化 `$apply` 进来之后，Angular开始进入`$digest`轮循（就是调用`$digest()` 方法）, <br>首先是rootscope进入`$digest` ，然后由其把各个监听表达式或是函数的任务传播分配给所有的子级作用域，<br>那样各个作用域就各司其职了，如果监听到自己负责的数据模型有变化，马上就调用 `$watch`。
销毁作用域|1. 子级作用域不再需要的时候，这时候创建它们的就会负责把它们回收或是销毁.<br>2. 指令的创建与销毁都可以是隐式也可以是显式的，销毁是通过`scope.$destroy()`


[back to top](#top)

>Reference

- [angularjs作用域及其生命周期](https://blog.csdn.net/momDIY/article/details/78867198)
- [AngularJS的生命周期：complie和link](https://blog.csdn.net/u012527802/article/details/50559525)
- [AngularJS面面观系列](https://blog.csdn.net/dm_vincent/article/category/2496171)
