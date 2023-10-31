##Javascript中bind()方法的使用与实现

[top](#top)

- [General](#General)
- [bind()方法的使用1 - 绑定函数](#方法的使用1)
- [bind()方法的使用2 - 偏函数（Partial Functions）](#方法的使用2)
- [bind()方法的使用3- 和setTimeout,setInterval一起使用](#方法的使用3)
- [bind()方法的使用4- 绑定函数作为构造函数](#方法的使用4)

<h3 id="General">General</h3>

`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

```javascript
var altwrite = document.write;
altwrite("hello");
//1.以上代码有什么问题    2.正确操作是怎样的
//答案: 主要考点就是this指向的问题，altwrite()函数改变this的指向global或window对象，导致执行时提示非法调用异常, 正确的方案就是使用bind()方法, 当然也可以使用call()方法
altwrite.bind(document)("hello")
altwrite.call(document, "hello")
```

bind主要是为了改变函数内部的this指向，这个是在ECMA5以后加入的，所以IE8以下的浏览器不支持

```javascript
var context = { foo: "bar" };    //设立一个简单地对象作为“上下文”
function returnFoo () {   //一个在this上下文中指向foo变量的函数
  return this.foo;    
}
returnFoo(); // => undefined, 变量在作用域中不存在，因此显示undefined
var bound = returnFoo.bind(context);    // 如果我们把它绑定在context上下文中
// 现在的作用域中有这个变量了
bound(); // => "bar"
// 有许多方法将函数绑定在一个上下文中
// Call和Apply让你能在上下文中调用函数
returnFoo.call(context); // => bar
returnFoo.apply(context); // => bar
// 将函数添加到对象中
context.returnFoo = returnFoo;
context.returnFoo(); // => bar
```

[back to top](#top)

<h3 id="方法的使用1">bind()方法的使用1 - 绑定函数</h3>

```javascript
this.num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { return this.num; }
};
mymodule.getNum(); // 81
var getNum = module.getNum;
getNum();        // 9, 因为在这个例子中，"this"指向全局对象
// 创建一个'this'绑定到module的函数
var boundGetNum = getNum.bind(module);
boundGetNum();    // 81
```

绑定事件处理函数, 就是绑定事件后的那个callback

```javascript
var logger = {
    x: 0,       
    updateCount: function(){
        this.x++;
        console.log(this.x);
    }
}
document.querySelector('button').addEventListener('click', logger.updateCount.bind(logger));
// 相当于
document.querySelector('button').addEventListener('click', function(){
    logger.updateCount();
});
```

Ajax的回调中,如何保持this:

```javascript
$.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: {'info': info}
    })
    .done((function(data) {
      if(data.status){
        this._data.process_type = info.process_type;   // 这里this指向的是外层bind进来的this
      }else{
        uUnique.noticeBox.showWarning(data.message);
      }
}).bind(this));
```
[back to top](#top)

<h3 id="方法的使用2">bind()方法的使用2 - 偏函数（Partial Functions）</h3>

Partial application can be described as taking a function that accepts some number of arguments, binding values to one or more of those arguments, and returning a new function that only accepts the remaining, un-bound arguments.利用partial function，使用bind()可设定函数的预定义参数，然后调用的时候传入其他参数即可：

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3);        // [1, 2, 3]
// 预定义参数37
var leadingThirtysevenList = list.bind(undefined, 37);
var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

[back to top](#top)

<h3 id="方法的使用3">bind()方法的使用3- 和setTimeout,setInterval一起使用</h3>

一般情况下setTimeout()的this指向window或global对象。当使用类的方法时需要this指向类实例，就可以使用bind()将this绑定到回调函数来管理实例

```javascript
function Bloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}
Bloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);   // 1秒后调用declare函数
};
Bloomer.prototype.declare = function() {
  console.log('我有 ' + this.petalCount + ' 朵花瓣!');
};
var flower = new Bloomer();
flower.bloom();    // 我有6朵花瓣!
```

this指向的是settimeout函数内部，而非之前的html元素

```javascript
//方法一  that+闭包
$('#myElement').click(function() {
  var that = this;   //设置一个变量，指向这个需要的this
   setTimeout(function() {
    // 这个this指向的是settimeout函数内部，而非之前的html元素
     $(that).addClass('aNewClass');
    }, 1000);
});
function Foo() {
    this.value = 42;
    var that = this;
    this.method = function() {  // this refers to the new instance
        console.log(that.value); // 42
        console.log(that === b); // true
    };
    setTimeout(this.method, 500);
}
var b = new Foo();
//或者用bind, Function.prototype.bind方法是ES5新增的标准，测试了IE系列发现IE6-8都不支持，只有IE9+可以使用
function Foo() {
    this.value = 42;
    this.method = (function method() {
        console.log(this.value); // 42
        console.log(this === b); // true
    }).bind(this);
    setTimeout(this.method, 500);
}
var b = new Foo();
function obj() { 
  this.fn = function() { 
    alert("ok"); 
    console.log(this); 
    setTimeout(this.fn.bind(this), 1000);//通过Function.prototype.bind 绑定当前对象 
  } 
} 
var o = new obj(); 
o.fn(); 
//二、方法二
$('#myElement').click(function() {
    setTimeout($.proxy(function() {
        $(this).addClass('aNewClass');  
    }, this), 1000);
});
//通过一个自执行匿名函数传当前对象和对象方法进去，也就是里面的参数a和b，再返回一个闭包，通过call方法使this指向正确
function obj() { 
this.fn = function() { 
  var that = this;//保存当前对象this 
  alert("ok"); 
  setTimeout(function(){ 
    that.fn(); 
  }, 1000);//通过闭包得到当前作用域，好访问保存好的对象that 
  } 
} 
var o = new obj(); 
o.fn(); 
```

[back to top](#top)

<h3 id="方法的使用4">bind()方法的使用4- 绑定函数作为构造函数</h4>

绑定函数也适用于使用new操作符来构造目标函数的实例。当使用绑定函数来构造实例，**注意：this会被忽略**，但是传入的参数仍然可用

```javascript
function Point(x, y) {
  this.x = x;  this.y = y;
}
Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};
var p = new Point(1, 2);
p.toString(); // '1,2'
var YAxisPoint = Point.bind(null, 0/*x*/);  // Point和YAxisPoint共享原型
var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'
axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true
```

[back to top](#top)

> Reference

- [Javascript通过bind()掌控this](https://my.oschina.net/blogshi/blog/265415)
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [Javascript中bind()方法的使用与实现](https://my.oschina.net/blogshi/blog/265415)
- [Bind, Call and Apply in JavaScript](https://variadic.me/posts/2013-10-22-bind-call-and-apply-in-javascript.html)
