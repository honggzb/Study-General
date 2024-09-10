[Top](#top)
- [forEach、map和filter的区别](#foreachmap和filter的区别)
- [js基本数据类型](#js基本数据类型)
- [js的内置对象](#js的内置对象)
- [js基本规范](#js基本规范)
- [js原型，原型链及其特点](#js原型原型链及其特点)
- [Javascript有几种类型的值？及关于他们的内存图](#javascript有几种类型的值及关于他们的内存图)
- [将字符串转换为数字？](#将字符串转换为数字)
- [Javascript如何实现继承？](#javascript如何实现继承)
- [javascript创建对象的几种方法](#javascript创建对象的几种方法)
- [this的理解](#this的理解)
- [null和undefined的区别](#null和undefined的区别)
- [事件是什么？火狐和IE事件机制的区别？以及如何阻止冒泡事件](#事件是什么火狐和ie事件机制的区别以及如何阻止冒泡事件)
- [什么是闭包？为什么要用它](#什么是闭包为什么要用它)
- [Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？](#javascript中有一个函数执行时对象查找时永远不会去查找原型这个函数是)
- [Ajax 解决浏览器缓存问题？](#ajax-解决浏览器缓存问题)
- [如何解决跨域问题?](#如何解决跨域问题)
- [面试题](#面试题)
  - [如何将浮点数小数点左边的每三位添加一个逗号](#如何将浮点数小数点左边的每三位添加一个逗号)
  - [如何实现数组的随机排序？var arr = \[1,2,3,4,5,6,7,8\]](#如何实现数组的随机排序var-arr--12345678)

---------------------------------------

`[...state.products, action.payload]` ===  `Object.assign(Object1, Object2)`

## forEach、map和filter的区别

- `forEach(callbackFn(currentValue, index, array))`
  - 对数组的每个元素执行一次给定的函数
  - currentValue: 当前处理元素
  - index: 可选，当前处理元素的索引
  - array: 可选，当前处理的数组
  - note:
    - forEach 不支持return、break、continue等，break和continue会直接报错，return会返回 undefined
    - 不能中断循环
- `map(callbackFn(element, index, array), thisArg)`
  - 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
  - element: 当前处理元素
  - index: 可选，当前处理元素的索引
  - array: 可选，当前处理的数组
  - thisArg: 可选， 表示在执行回调函数时使用的this值，如省略，或传入null，undefined，那么this为全局对象
- `filter(callbackFn(curentValue, index, array), thisArg)`
  - 创建一个新数组，新数组中的元素是通过检查指定数组中符合条件(筛选)的所有元素
  - currentValue: 当前处理元素
  - index: 可选，当前处理元素的索引
  - array: 可选，当前处理的数组
  - thisArg: 可选， 表示在执行回调函数时使用的this值，如省略，或传入null，undefined，那么this为全局对象
  - note：
    - filter()方法不会对空数组进行检测
    - filter()函数不会改变原始数组，它形成的是一个新的数组;
- **区别**
  1. forEach不会返回新数组，map和filter返回新数组
     - map根据当前数组映射一个新的数组，返回新的被改变后的数组，需要return
     - filter返回新的数组，在循环的时候判断true还是false，是true才会return
  2. forEach,map和filter不会对原数组产生影响

| method |是否修改原数组 |返回值|是否需要回调函数|是否可以中断循环|
|---|---|---|---|---|
| for |yes | 无返回值| yes | yes|
| forEach |No | 无返回值| yes | no|
| map |No | 新数组| yes | no|
| filter |No | 过滤后的新数组| yes | no|

[back to top](#top)

## js基本数据类型

- Undefined、Null、Boolean、Number、String
- ECMAScript2015新增了Symbol（创建后独一无二的数据类型）

## js的内置对象

- 数据封装对象：Object,Array,Boolean,Number,String
- 其他对象：Function,Arguments,Math,Date,RegExp,Error

## js基本规范

1. 不要在同一行声明多个变量
2. 请使用===／!==来比较Boolean或者数值
3. 生成数组变量时，尽量使用[]代替new Array
4. 拒绝全局函数, 使用IIEF
5. Switch语句必须带有default分支

## js原型，原型链及其特点

每个对象都会有一个内部初始化的属性，就是原型（prototype），当我们寻找一个对象的属性，如果内部属性本身不存在，就到对象的原型里面去找，这个原型又会有自己的原型，就这样一步步地找下去，这就是所谓的原型链。

[back to top](#top)

## Javascript有几种类型的值？及关于他们的内存图

- 栈：原始数据类型（基本数据类型）
- 堆：引用数据类型（对象，数组，函数）
- 两种类型的区别：储存的位置不同

## 将字符串转换为数字？

1. `parseFloat('12.3b');   //解析成浮点数`
2. `parseInt('12b');      //解析成整数`

## Javascript如何实现继承？

1. 构造继承
2. 原型继承
3. 实力继承
4. 拷贝继承

前两种比较简单，建议用前两种的组合方式

```javascript
// 1.构造函数实现继承就是借助call或者apply把父类中的函数通过this指复制到子类创建的实例中。
function Parent() {
  this.colors = ["black","white"];
}
function Child() {
  Parent.call(this);
}
var child1 = new Child();
alert(child1.colors);//"black,white"
// 2.原型函数实现继承
function Parent(){
    this.name = 'liuwen';
}
function Child(){
    this.age = 28;
}
Child.prototype = new Parent();//继承了Parent，通过原型
var demo = new Child();
alert(demo.age);
alert(demo.name);//得到被继承的属性
```

## javascript创建对象的几种方法

1. 使用对象字面量
2. 用function来模拟无参的构造函数
3. 用function来模拟有参构造函数（拓展性强，推荐使用）
4. 用工厂模式来创建（内置对象Object）
5. 用原型方式来创建
6. 用混合模式创建

```javascript

 var Cat  = {};//JSON
 Cat.name="kity";//添加属性并赋值
 Cat.age=2;
 Cat.sayHello=function(){
  alert("hello "+Cat.name+",今年"+Cat["age"]+"岁了");//可以使用“.”的方式访问属性，也可以使用HashMap的方式访问
 }
 Cat.sayHello();//调用对象的（方法）函数
//2.用function来模拟无参的构造函数
function Person(){
   }
   var personOne=new Person();//定义一个function，如果有new关键字去"实例化",那么该function可以看作是一个类
   personOne.name="liuwen";
   personOne.hobby="coding";
   personOne.work=function(){
   alert(personOne.name+" is coding now...");
   }
   personOne.work();
//3.用function来模拟有参构造函数（拓展性强，推荐使用）
function Pet(name,age,hobby){
  this.name=name;//this作用域：当前对象
  this.age=age;
  this.hobby=hobby;
  this.eat=function(){
     alert("我叫"+this.name+",我喜欢"+this.hobby+",也是个吃货");
  }
   }
   var maidou =new Pet("麦兜",5,"睡觉");//实例化/创建对象
maidou.eat();//调用eat方法(函数)
//4.用工厂模式来创建（内置对象Object）
var liuWen = new Object();
liuWen.name = "刘雯";
liuWen.age = 21;
liuWen.work = function() {
  alert("i am" + liuWen.name);
}
liuWen.work();
//5.用原型方式来创建
function Dog(){

}
Dog.prototype.name="旺财";
Dog.prototype.eat=function(){
alert(this.name+"是个吃货");
}
var liuwen =new Dog();
liuwen.eat();
//6.用混合模式创建
function Car(name,price){
 this.name=name;
 this.price=price;
   }
Car.prototype.sell=function(){
  alert("我是"+this.name+"，我现在卖"+this.price+"万元");
 }
   var camry =new Car("liuwen",27);
   camry.sell();
```

[back to top](#top)

## this的理解

- this指的是函数的直接调用者
- this指的是new出来的实例对象
- this指的是事件中触发事件的对象
- 特殊的，在IE的attachEvent中，this总是指全局对象window

## null和undefined的区别

- null是一个空值，表示一个对象为空值（我是空的）
- undefined表示一个声明过的变量没有赋予值（不知道我是谁）
- typeOf undefined;//"undefined"
- typeOf null; //"object"
- 区别null和undefined用===；

## 事件是什么？火狐和IE事件机制的区别？以及如何阻止冒泡事件

- 事件是在网页中的某个操作，类似于（点击，键盘）
- IE是事件冒泡，火狐事件捕获，事件冒泡都支持（事件冒泡是由子节点到父节点层层向外，捕获刚好相反）；
- 阻止冒泡事件 event.stopPropagation();

## 什么是闭包？为什么要用它

闭包就是有权访问另一个函数作用域的函数，简单来做就是在一个函数的内部创建另外一个函数，通过这个内部函数访问外部函数的局部变量，将外部函数内部的方法变量传递到外部。闭包的特性：

1. 内部函数有权访问外部函数的作用域，变量及函数
2. 函数内再嵌套函数
3. 变量和函数不会被垃圾回收制回收

```html
//li节点的onclick事件都能正确的弹出当前被点击的li索引
<ul id="testUL">
   <li> index = 0</li>
   <li> index = 1</li>
   <li> index = 2</li>
   <li> index = 3</li>
</ul>
<script type="text/javascript">
   var nodes = document.getElementsByTagName("li");
   for(i = 0;i<nodes.length;i+= 1){
nodes[i].onclick = (function(i){
          return function() {
             console.log(i);
          } //不用闭包的话，值每次都是4
        })(i);
   }
</script>
```

执行say667()后,say667()闭包内部变量会存在,而闭包内部函数的内部变量不会存在
使得Javascript的垃圾回收机制GC不会收回say667()所占用的资源
因为say667()的内部函数的执行需要依赖say667()中的变量
这是对闭包作用的非常直白的描述

```javascript
 function say667() {
   // Local variable that ends up within closure
   var num = 666;
   var sayAlert = function() {
alert(num);
   }
   num++;
   return sayAlert;
}
var sayAlert = say667();
sayAlert()//执行结果应该弹出的667
```

## Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

```
hasOwnProperty
   javascript的hasOwnProperty返回的是一个布尔值，它可以检测到这个对象本身具有属性，不能检测到原型链上。
   object.hasOwnProperty(proName)
   其中参数object是必选项。一个对象的实例。
   proName是必选项。一个属性名称的字符串值。
```

## Ajax 解决浏览器缓存问题？

1. 在ajax发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since","0")`
2. 在ajax发送请求前加上 `anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`
3. 在URL后面加上一个随机数： `"fresh=" + Math.random();`
4. 在URL后面加上时间搓：`"nowtime=" + new Date().getTime();`
5. 如果是使用jQuery，直接这样就可以了 `$.ajaxSetup({cache:false})`。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录

[back to top](#top)

## 如何解决跨域问题?

jsonp、iframe、window.name、window.postMessage、服务器上设置代理页面

## 面试题

### 如何将浮点数小数点左边的每三位添加一个逗号

```javascript
function commafy(num){
    return num && num.toString()
                     .replace(/(\d)(?=(\d{3})+\./g,function($1, $2){
                        return $2 + ',';
                     });
}
```

### 如何实现数组的随机排序？var arr = [1,2,3,4,5,6,7,8]

```javascript
//方法一
function RandomSort(arr){
    for (var i = 0,len = arr.length;i < len;i++){
       var rand = parseInt(Math.random() * len);
        var a;
        a = arr[rand];
        arr[rand]  = arr[i];
        arr[i] = a;
    }
     return arr;
}
//方法二
function RandomSort2(arr){
    var a = [];
    while(arr.length > 0){
    var rand = parseInt(Math.random() * arr.length);
    a.push(arr[rand]);
    arr.splice(rand,1);
    }
     return a;
}
//方法三
function RandomSort3(arr){
     function sortBy(){
         return Math.random() - 0.5;
     }
     arr.sort(sortBy());
}
```

[back to top](#top)

- [前端面试基本知识点——javascript](https://segmentfault.com/a/1190000008574674)
