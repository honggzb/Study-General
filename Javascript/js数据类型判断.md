<h2 id="top">js数据类型判断</h2>

- [1. js六大数据类型](#data-types)
- [2. 数据类型判断之typeof](#typeof)
- [3. js判断数组类型的方法](#array)
  - [3.1 instanceof](#instanceof)
  - [3.2 constructor](#constructor)
  - [3.3 特性判断数组](#isArray)
  - [3.4 Object.prototype.toString.call](#Object-prototype-toString-call)

<h3 id="data-types">1. js六大数据类型</h3>

数据类型|说明
---|---
number|数字，整数、浮点数等等
string|单引号或者双引号来说明
Boolean|返回true和false，这两个值不一定对应1和0
object|对象，可以执行new操作符后跟要创建的对象类型的名称来创建
null|只有一个值得数据类型，逻辑上讲，null值表示一个空对象指针
undefined|未定义，使用var声明变量但未对其初始化时，变量的值就是undefined

[back to top](#top)

<h3 id="typeof">2. 数据类型判断之typeof</h3>

```javascript
var num = 3;
if(typeof num=='number') {
    return true;
}
var a = function(){}; console.log(typeof a)    //function
//function除了可以判断数据类型还可以判断function类型
```

- 除了string、number、boolean、undefined这四个类型外，null、object、array返回的都是object类型！！！
- 对于函数类型返回的则是function，再比如typeof(Date)，typeof(eval)等

[back to top](#top)

<h3 id="array">3. js判断数组类型的方法</h3>

<h4 id="instanceof">3.1 instanceof</h4>

instanceof 用于判断一个变量是否某个对象的实例，是一个三目运算式

```javascript
a instanceof b?alert("true"):alert("false")  
//注意b值是你想要判断的那种数据类型，是不是一个字符串，比如Array
var arr = [1,2,3,1]; 
alert(arr instanceof Array); // true 
```

[back to top](#top)

<h4 id="constructor">3.2 constructor</h4>

在W3C定义中的定义： **constructor 属性返回对创建此对象的数组函数的引用**

```javascript
console.log("string".constructor == String);
console.log((123).constructor == Number);
console.log(false.constructor == Boolean);
console.log([].constructor == Array);
console.log({}.constructor == Object);
//通用的方法
function isArray(object){
    return object && typeof object==='object' && Array == object.constructor;
}
```

[back to top](#top)

<h4 id="isArray">3.3 特性判断数组</h4>

`object.isArray()`来判断，目的就是准确地检测一个值是否为数组。IE9+、 Firefox 4+、Safari 5+、Opera 10.5+和Chrome都实现了这个方法。但是在IE8之前的版本是不支持的。

```javascript
function isArray(object){
    return  object && typeof object==='object' &&    
                      typeof object.length==='number' &&  
                      typeof object.splice==='function' &&    
                      !(object.propertyIsEnumerable('length'));    //判断length属性是否是可枚举的 对于数组将得到false  
}
```

[back to top](#top)

<h4 id="Object-prototype-toString-call">3.4 Object.prototype.toString.call</h4>

```javascript
Object.prototype.toString.call(value) == '[object Array]'
Object.prototype.toString.call(value) == '[object Object]'   //判断是否为Object数组
```
[back to top](#top)
