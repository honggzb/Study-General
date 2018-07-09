<h2 id="top">JavaScript数据类型判断</h2>

- [1. js六大数据类型](#data-types)
- [2. 数据类型判断之typeof](#typeof)
- [3. js判断数组类型的方法](#array)
  - [3.1 instanceof](#instanceof)
  - [3.2 constructor](#constructor)
  - [3.3 特性判断数组](#isArray)
  - [3.4 Object.prototype.toString.call](#Object-prototype-toString-call)
- [4. Object.prototype.toString()详解- 用于检测出常见的数据类型](#toString)
- [5. 特殊对象类型判断- 空对象、DOM元素等](#特殊对象类型判断)
- 
<h3 id="data-types">1. js六大数据类型</h3>

数据类型|说明
---|---
number|数字，整数、浮点数等等
string|单引号或者双引号来说明
Boolean|返回true和false，这两个值不一定对应1和0
object|对象，可以执行new操作符后跟要创建的对象类型的名称来创建
null|只有一个值得数据类型，逻辑上讲，null值表示一个空对象指针
undefined|未定义，使用var声明变量但未对其初始化时，变量的值就是undefined(就是你创建一个变量后却没给它赋值~)

[back to top](#top)

<h3 id="typeof">2. 数据类型判断之typeof</h3>

typeof(数据类型)|返回值
---|---
typeof(number)|number
typeof(string)|string
typeof(Boolean)|boolean
typeof(object)|object
typeof(null)|object
typeof(undefined)|undefined
typeof(函数名)|function

```javascript
var num = 3;
if(typeof num=='number') {
    return true;
}
var a = function(){}; console.log(typeof a)    //function
//function除了可以判断数据类型还可以判断function类型
```

- typeof可以解决大部分的数据类型判断，是一个一元运算，放在一个运算值之前，其返回值为一个字符串，该字符串说明运算数的类型，所以判断某个是否为String类型，可以直接 if(typeof(你的值) == "string"){}
- 除了string、number、boolean、undefined这四个类型外，null、object、array返回的都是object类型！！！
- 对于函数类型返回的则是function，再比如typeof(Date)，typeof(eval)等

 ```javascript
 var a="string"; console.log(a); //string
var a=1; console.log(a); //number
var a=false; console.log(a); //boolean
var a; console.log(typeof a); //undfined
var a = null; console.log(typeof a); //object
var a = document; console.log(typeof a); //object
var a = []; console.log(a); //object
var a = function(){}; console.log(typeof a) //function   除了可以判断数据类型还可以判断function类型
var date = new Date();
var error = new Error();
console.log(typeof date); // object
console.log(typeof error); // object
 ```
 
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
//较为严谨并且通用的方法
function isArray(object){
    return object && typeof object==='object' && Array == object.constructor;
}
```

使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，`Array == object.constructor;`会返回`false`

1. array属于引用型数据，在传递过程中，仅仅是引用地址的传递。
2. 每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！

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

- 有length和splice并不一定是数组，因为可以为对象添加属性，而不能枚举length属性，propertyIsEnumerable才是最重要的判断因子。
- `propertyIsEnumerable(proName) // 判断指定的属性是否可列举`
  - 如果 proName 存在于 object 中且可以使用一个 For…In 循环穷举出来，那么 propertyIsEnumerable 属性返回 true。如果 object 不具有所指定的属性或者所指定的属性不是可列举的，那么 propertyIsEnumerable 属性返回 false
  - propertyIsEnumerable 属性不考虑原型链中的对象

```javascript
var a = new Array("apple", "banana", "cactus");
document.write(a.propertyIsEnumerable(1));
```

[back to top](#top)

<h4 id="Object-prototype-toString-call">3.4 Object.prototype.toString.call</h4>

```javascript
//最简单的方法
Object.prototype.toString.call(value) == '[object Array]'
Object.prototype.toString.call(value) == '[object Object]'   //判断是否为Object数组
```

[back to top](#top)

<h3 id="toString">4. Object.prototype.toString()详解</h3>

- ES5 规范地址：https://es5.github.io/#x15.2.4.2
- 可以识别至少14种类型

```javascript
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined], IE6中[object Object]
var nul = null;          // [object Null], IE6中[object Object]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

//通用类型判断函数 - 利用Object.prototype.toString()判断方法举例
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

//自定义判断函数
function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}
checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func);

/*通用类型判断函数 - 利用Object.prototype.toString()*/
var class2type = {};
// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})
function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    //在IE6中，null和undefined会被 Object.prototype.toString 识别成 [object Object]
    return typeof obj === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj;
}
//应用，判断是否为函数和数组
function isFunction(obj) {
    return type(obj) === "function";
}
// jQuery v3.0 中已经完全采用了 Array.isArray
var isArray = Array.isArray || function( obj ) {
    return type(obj) === "array";
}
//判断这个对象和传入的类型是不是同一个类型
function getFunc(type) {
   return function (obj) {
      return Object.prototype.toString.call(obj) === type;
    }
}
var ff = getFunc("[object Array]");
var result = ff([10, 20, 30]);     //true
var ff1 = getFunc("[object Object]");
var dt = new Date();
var result1 = ff1(dt);   //true
```

[back to top](#top)

<h3 id="特殊对象类型判断">5. 特殊对象类型判断</h3>

- 在开发中更加复杂的判断，比如plainObject、空对象、Window对象、DOM元素等

```javascript
/* 2. jQuery提供了 isEmptyObject 方法来判断是否是空对象 */
function isEmptyObject(obj) {   //就是判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false
        var name;
        for (name in obj) {
            return false;
        }
        return true;
}
/* 3. Window对象 */
function isWindow( obj ) {
    return !!(obj && obj === obj.window);
}
//或
console.log(Object.prototype.toString.call(window));   //[object Window], 注意： 不同的浏览器返回值不一样，特别是低版本的browser
/* 4. DOM元素 */
isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};
```

[back to top](#top)

> References

- http://blog.csdn.net/zhangw428/article/details/4171630
- http://my.oschina.net/sfm/blog/33197
- http://openxtiger.iteye.com/blog/1893378
- http://www.2fz1.com/?p=277
- http://msdn.microsoft.com/zh-tw/library/adebfyya.aspx
- http://blog.sina.com.cn/s/blog_532751d90100iv1r.html
- [JavaScript专题系列](https://github.com/mqyqingfeng/Blog)
