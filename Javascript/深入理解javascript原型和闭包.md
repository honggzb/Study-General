[深入理解javascript原型和闭包](#top)

- [闭包](#闭包)
  - [1. 闭包的类型](#闭包的类型)
  - [2. 闭包的经典用法](#闭包的经典用法)
- [javascript原型](#javascript原型)
  - [1. 函数和对象的关系  - typeof](#函数和对象的关系)
  - [2. prototype原型](#prototype原型)
- [上下文和作用域](#上下文和作用域)

<h2 id="闭包">闭包</h2>

<h3 id="闭包的类型">1. 闭包的类型</h3>

闭包是指有权限访问另一个函数作用域的变量的函数, 两种写法

- 函数模式的闭包: 函数作为返回值
- 对象模式的闭包： 函数中有一个对象

```javascript
//函数模式的闭包
function f1(){
  var num = 10;
  return function(){   //函数的声明
    num++;
    return num;
  }
}
var ff = f1();
ff();   //11
ff();   //12
//对象模式的闭包： 函数中有一个对象
function f3(){
  var num = 10;
  var obj = {
    age : num
  }
  console.log(obj.num);
}
f3();
```

- 虽然ff不直接处于f1的内部作用域，但ff还是能访问num
- 由于num仍存在于ff闭包的内部，所以它还是会自加1，而且每次调用时都会自加1


- 函数作为参数传递

```javascript
var max = 10;
var fn = function(x){
   if(x>max) { console.log(x); }
};
(function(f){
   var max = 100;
   f(15);
})(fn);      //15
```

[back to top](#top)

<h3 id="闭包的经典用法">2. 闭包的经典用法</h3>

**2.1 这样每次alert出的值都是不同是值**

```javascript
	var spans2 = $("#divTest2 span");
  $(document).ready(function() {
      for (var i = 0; i < spans2.length; i++) {
          (function(num) {
              spans2[i].onclick = function() {
                  alert(num);
              }
          })(i);
      }
  });
```

**2.2 产生相同的随机数**

```javascript
function f1(){
  var num = parseInt(Math.random()*10+1);
  return function(){
    console.log(num);;
  }
}
var ff = f1();
ff();
ff();
```

[back to top](#top)

<h2 id="javascript原型">javascript原型</h2>

<h3 id="函数和对象的关系">1. 函数和对象的关系  - typeof</h3>

- 函数就是对象的一种，因为通过instanceof函数可以判断
- 对象是函数创建的，而函数却又是一种对象

```javascript
var fn = function () { };
console.log(fn instanceof Object);  // true
console.log(typeof (Object));  // function
console.log(typeof (Array));  // function
```

[back to top](#top)

<h3 id="prototype原型">2. prototype原型</h3> 

- 每个函数都有一个属性叫做prototype。
- 这个prototype的属性值是一个对象，默认的只有一个叫做constructor的属性，指向这个函数本身

![](http://i.imgur.com/DsTB7IF.png)

```javascript
    function Fn() { }
    Fn.prototype.name = '王福朋';
    Fn.prototype.getYear = function () {
       return 1988;
    };
```

![](http://i.imgur.com/JRZSbZt.png)

### 隐式原型  `__proto__`

- 每个**函数**`function`都有一个prototype，即原型
- 每个**对象**`Object`都有一个`__proto__`属性，指向创建该对象的函数的prototype，即隐式原型

	**`Object.__proto__ === Function.prototype`**

- 这个`__proto__`是一个隐藏的属性，javascript不希望开发者用到这个属性值

![](http://i.imgur.com/4He2nkD.png)

- Object.prototype确实是一个特例——它的`__proto__`指向的是null，切记切记！

![](http://i.imgur.com/G5COZpv.png)

### instanceof

instanceof表示的就是一种继承关系，或者原型链的结构
```javascript
	function Foo(){}
	var f1 = new Foo();
	console.log(f1 instanceof Foo);   // true
	console.log(f1 instanceof Object);  // true
```
![](http://i.imgur.com/WRHuZyi.png)
```javascript
    console.log(Object instanceof Function);   // true
	console.log(Function instanceof Function);   // true
```
### 继承

javascript中的继承是通过原型链来体现的
```javascript
    function Foo(){}
	var f1 = new Foo();
	f1.a = 10;
	Foo.prototype.a = 100;
	Foo.protype.b =200;
	console.log(f1.a);   //10
	console.log(f1.b);   //200
```
![](http://i.imgur.com/9PBjupZ.png)

区分一个属性到底是基本的还是从原型中找到的呢？——**hasOwnProperty**，特别是在`for…in…`循环中，一定要注意。

![](http://i.imgur.com/Lxbj54V.png)

hasOwnProperty方法是从Object.prototype中来的，请看图：

![](http://i.imgur.com/apwRAay.png)

[back to top](#top)

<h2 id="上下文和作用域">上下文和作用域</h2>

### 执行上下文栈

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。

其实这是一个压栈出栈的过程——执行上下文栈。如下图：

![](http://i.imgur.com/49NP4IJ.png)

根据以下代码来详细介绍上下文栈的压栈、出栈过程。

![](http://i.imgur.com/79BWAD3.png)

![](http://i.imgur.com/rq3tsJa.png)

### 作用域

- 作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。所以，作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。

- 如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。

![](http://i.imgur.com/oLRL4bm.png)
