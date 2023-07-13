[Table of Contents](#top)

- [一、Module（模块）模式](#1)
- [二、Singleton（单例）模式](#2)
- [三、problem/bug 常见错误](#3)
- [四、命令(Command)模式](#4)

<h3><a href="#1">一、Module（模块）模式</a></h3>

Module（模块）模式可看成单例模式的一个特例， JavaScript中用于实现模块的方法

- 对象字面量
- Module模式
- AMD模块
- CommonJS模块
- ECMAScript Harmony模块

**1.1 Module模式的实现**

```javascript
var basketModule= (function() {   //Module实现购物车 
  //私有
  var basket = [];                  //私有变量，存放商品
  function doSomethingPrivate () {  //私有方法
      // do something
  }
  return {           //basketModule 返回了一个拥有公用API的对象
      addItem: function (item) {  //closure, 添加item到购物车
          basket.push(item);      //公共方法访问私有变量
      }, 
      getItemCount: function () {  //获取购物车里item的数量
          return basket.length;    //公共方法访问私有变量
      },
      getTotalMoney: function () {  //获取购物车里item的总价格
          var itemCount = this.getItemCount();
          var total = 0;
          for(var i = 0; i < itemCount; i ++) {
              total += basket[i].price;   //公共方法访问私有变量
          }
          return total;
      }
  };
})();
basketModule.addItem({
        item : "bread",
        price: 0.5
    });
basketModule.addItem({
        item : "egg",
        price: 1.0
    });
var totalMoney = basketModule.getTotalMoney();
console.log(totalMoney);//1.5
```

- 优点：有一定的封装思想，支持私有数据 
- 缺点：由于访问公有和私有成员的方式不同，当想改变可见性时，必须要修改每一个曾经使用过该成员的地方

[back to top](#top)

**1.2 Revealing Module模式** - 能够在私有范围内简单定义所有的函数和方法，并返回一个匿名对象，它拥有指向私有函数的引用

```javascript
var myRevealingModule = function(){
    var privateVar = "Vicky";
    var publicVar = "Hello";
    function privateFunction(){
      console.log("Name: "+privateVar);
    }
    function publicSetName(strName) {
      privateVar = strName;
    }
    function publicGetName() {
      privateFunction();
    }
    // 返回公有指针指向私有函数和属性
    return{
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
    };
}();
myRevealingModule.setName("jay");
myRevealingModule.getName();
console.log(myRevealingModule.greeting);
```

- 优点：很容易在模块底部看出哪些函数和变量可以被公开访问，改善了可读性 
- 缺点：脆弱，谨慎使用

[back to top](#top)

<h3 href="#2">二、Singleton（单例）模式</h3> -

- Singleton单例模式： 限制了类的实例化次数只能一次，在实例不存在的情况下，通过调用方法创建一个类来实现新实例的创建，若实例已经存在，则返回该对象的引用 
- 在JavaScript有多种用途，最常用Singleton充当共享资源命名空间，从全局命名空间中隔离出代码实现，从而为函数提供单一访问点, 可以减少网页中全局变量的数量(在网页中使用全局变量有风险)；可以在多人开发时避免代码的冲突(使用合理的命名空间)等等。在中小型项目或者功能中，单体可以用作命名空间把自己的代码组织在一个全局变量名下；在稍大或者复杂的功能中，单体可以用来把相关代码组织在一起以便日后好维护
- 适用性： 当类只能有一个实例而客户可以从一个众所周知的访问点访问它时

```javascript
//使用单体的方法就是用一个命名空间包含自己的所有代码的全局对象
var functionGroup = {
　　　　name:'Darren',
　　　　method1:function(){
　　　　　　//code
　　　　},
　　　　init:function(){
　　　　　　//code
　　　　}
　　}
//
var SingletonTester = (function(){   //()(); 保证只有在使用的时候才初始化
  function Singleton(options) {      //参数：传递给单例的一个参数集合
    options = options || {};
    this.name = options.name || "SingletonTester";
    this.pointX = options.pointX || 5;
    this.pointY = options.pointY || 10;
  }
  var instance;    //实例容器
  var _static = {   
    name: "SingletonTester",
    getInstance: function(options){   //获取实例的方法, 返回Singleton的实例
      if(instance === undefined){
        instance = new Singleton(options);
      }
      return instance;
    }
  };
  return _static;
})();
var singletonTest = SingletonTester.getInstance({
    name  : "vicky",
    pointX: 20
});
console.log(singletonTest);
```

[back to top](#top)

<h3><a href="#3">三、工厂（Factory）模式</a></h3>

- 工厂模式创建对象（视为工厂里的产品）时无需指定创建对象的具体类, 提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们具体的类
- 工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。
- 工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合(就是相互影响)。通过使用工厂方法而不是new关键字及具体类，可以把所有实例化的代码都集中在一个位置，有助于创建模块化的代码，这才是工厂模式的目的和优势。

假如我们想在网页面里插入一些元素，而这些元素类型不固定，可能是图片，也有可能是连接，甚至可能是文本，根据工厂模式的定义需要定义工厂类和相应的子类, 先来定义子类的具体实现

```javascript
page.dom.factory = function (type) {
    return new page.dom[type];
}
var page = page || {};
page.dom = page.dom || {};
//子函数1：处理文本
page.dom.Text = function () {
    this.insert = function (where) {
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    };
};
//子函数2：处理链接
page.dom.Link = function () {
    this.insert = function (where) {
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    };
};
//子函数3：处理图片
page.dom.Image = function () {
    this.insert = function (where) {
        var im = document.createElement('img');
        im.src = this.url;
        where.appendChild(im);
    };
};
// 使用方式如下：
var o = page.dom.factory('Link');
o.url = 'http://www.cnblogs.com';
o.insert(document.body);
```

举个例子：你有一个大的功能要做，其中有一部分是要考虑扩展性的，那么这部分代码就可以考虑抽象出来，当做一个全新的对象做处理。好处就是将来扩展的时候容易维护 - 只需要操作这个对象内部方法和属性，达到了动态实现的目的。非常有名的一个示例 - XHR工厂

```javascript
//1 简单工厂模式
var XMLHttpFactory =function(){};　　　　　　//定义工厂
XMLHttpFactory.createXMLHttp =function(){   //这个方法根据当前环境的具体情况返回一个XHR对象
　　 var XMLHttp = null;
　　 if (window.XMLHttpRequest){
　　　　　XMLHttp = new XMLHttpRequest()
　　 }elseif(window.ActiveXObject){
　　　　　XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")
　　　}
　　return XMLHttp;
}
var AjaxHander =function(){
　　　var XMLHttp = XMLHttpFactory.createXMLHttp();
　　　...
}
//2 抽象工厂模式: 先设计一个抽象类，这个类不能被实例化，只能用来派生子类，最后通过对子类的扩展实现工厂方法。
var XMLHttpFactory =function(){};
XMLHttpFactory.prototype = {
   　　createFactory:function(){  //如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类
      　　thrownew Error('This is an abstract class');
   　　}
}
//派生子类
var XHRHandler =function(){
   　　XMLHttpFactory.call(this);
};
XHRHandler.prototype =new XMLHttpFactory();
XHRHandler.prototype.constructor = XHRHandler;
XHRHandler.prototype.createFactory =function(){  //重新定义createFactory方法
   　　var XMLHttp =null;
   　　if (window.XMLHttpRequest){
      　　XMLHttp =new XMLHttpRequest()
   　　}elseif (window.ActiveXObject){
      　　XMLHttp =new ActiveXObject("Microsoft.XMLHTTP")
   　　}
   　　return XMLHttp;
}
```

以下几种情景下工厂模式特别有用：

- 对象的构建十分复杂
- 需要依赖具体环境创建不同实例
- 处理大量具有相同属性的小对象

[back to top](#top)

<h3><a href="#4">四、命令(Command)模式</a></h3>

用于将一个请求封装成一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或者记录请求日志，以及执行可撤销的操作。也就是说改模式旨在将函数的调用、请求和操作封装成一个单一的对象，然后对这个对象进行一系列的处理。此外，可以通过调用实现具体函数的对象来解耦命令对象与接收对象

Command模式旨在将方法调用/请求或操作封装到单一对象中，从而根据我们不的请求对客户进行参数化和传递可供执行的方法调用。个人理解，就是多了一个execute方法，能够按需调用

```javascript
$(function () {
    var CarManager = {
        requestInfo: function (model, id) {   // 请求信息
            return 'The information for ' + model + ' with ID ' + id + ' is foobar';
        },
        buyCar: function (model, id) {   // 购买汽车
            return 'You have successfully purchased Item '+ id + ', a ' + model;
        },
        arrangeView: function (model, id) {  // 组织view
            return 'You have successfully booked a viewing of '+ model + ' ( ' + id + ' ) ';
        }
    };
    CarManager.execute = function(command) {   //execute()使得我们可以调用任意方法，并且可以传递参数。
      return CarManager[command.request](command.model, command.carID);
    }
    var a = CarManager.execute({ request: "buyCar", model: 'Ferrari', carID: '145523' });
    console.log(a);
})();
```
命令模式比较容易设计一个命令队列，在需求的情况下比较容易将命令计入日志，并且允许接受请求的一方决定是否需要调用，而且可以实现对请求的撤销和重设，而且由于新增的具体类不影响其他的类，所以很容易实现。

但敏捷开发原则告诉我们，不要为代码添加基于猜测的、实际不需要的功能，如果不清楚一个系统是否需要命令模式，一般就不要着急去实现它，事实上，在需求的时通过重构实现这个模式并不困难，只有在真正需求如撤销、恢复操作等功能时，把原来的代码重构为命令模式才有意义。

[back to top](#top)

> Reference

- [汤姆大叔的博客-深入理解JavaScript系列](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)
- [【JavaScript设计模式】（一）](http://blog.csdn.net/xiaozhuxmen/article/details/51871079)
- [ES6 Promise Debugging Techniques](https://github.com/soareschen/es6-promise-debugging/blob/master/README.md)
- [JavaScript Promise迷你书（中文版）](http://liubin.github.io/promises-book/)
