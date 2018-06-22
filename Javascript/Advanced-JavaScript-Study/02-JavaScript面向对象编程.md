[JavaScript面向对象编程](#top)

- [面向对象介绍](#面向对象介绍)
  - [什么是对象](#什么是对象)
  - [什么是面向对象](#什么是面向对象)
  - [程序中面向对象的基本体现](#程序中面向对象的基本体现)
- [创建对象](#创建对象)
  - [个人总结-创建对象的三种方式](#个人总结-创建对象的三种方式)
  - [工厂模式vs自定义构造函数](#工厂模式vs自定义构造函数)
  - [简单方式](#简单方式)
  - [简单方式的改进：工厂函数](#简单方式的改进：工厂函数)
- [构造函数](#构造函数)
  - [更优雅的工厂函数：构造函数](#更优雅的工厂函数：构造函数)
  - [解析构造函数代码的执行](#解析构造函数代码的执行)
  - [构造函数和实例对象的关系](#构造函数和实例对象的关系)
  - [构造函数的问题](#构造函数的问题)
- [原型](#原型)
  - [构造函数、实例、原型三者之间的关系](#构造函数、实例、原型三者之间的关系)
  - [实例对象和构造函数的原型小结](#实例对象和构造函数的原型小结)
  - [属性成员的搜索原则：原型链](#属性成员的搜索原则：原型链)
  - [实例对象读写原型对象成员](#实例对象读写原型对象成员)
  - [更简单的原型语法](#更简单的原型语法)
  - [原生对象的原型](#原生对象的原型)
  - [原型对象的问题](#原型对象的问题)
  - [原型对象使用建议](#原型对象使用建议)

------------------

## 面向对象介绍

### 什么是对象

对象到底是什么，我们可以从两次层次来理解。

**(1) 对象是单个事物的抽象**

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**(2) 对象是一个容器，封装了属性（property）和方法（method。**

- 属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）
- 在实际开发中，对象是一个抽象的概念，可以将其简单理解为：**数据集或功能集**。
- ECMAScript-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值

> 提示：每个对象都是基于一个引用类型创建的，这些类型可以是系统内置的原生类型，也可以是开发人员自定义的类型

### 什么是面向对象

> 面向对象不是新的东西，它只是过程式代码的一种高度封装，目的在于提高代码的开发效率和可维护性

- 面向对象编程 —— Object Oriented Programming，简称 OOP，是一种编程开发思想。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。
- 在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。
因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程（procedural programming），更适合多人合作的大型软件项目。
- **面向对象 vs 面向过程**
  - 面向过程就是亲力亲为，事无巨细，面面俱到，步步紧跟，有条不紊
  - 面向对象就是找一个对象，指挥得结果
  - 面向对象将执行者转变成指挥者
  - 面向对象不是面向过程的替代，而是面向过程的封装
- **面向对象的特性**
  - 封装性
  - 继承性
  - [多态性]

扩展阅读：

- [维基百科 - 面向对象程序设计](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)
- [知乎：如何用一句话说明什么是面向对象思想？](https://www.zhihu.com/question/19854505)
- [知乎：什么是面向对象编程思想？](https://www.zhihu.com/question/31021366)

### 程序中面向对象的基本体现

- javascript中对象类型
  - 内置对象
  - 自定义对象
- 在JavaScript中，所有数据类型都可以视为对象，当然也可以自定义对象
- 自定义的对象数据类型就是面向对象中的类（Class）的概念

**案例： 打印学生的成绩**

- 如果采用面向对象的程序设计思想，我们首选思考的不是程序的执行流程，
- 而是 `Student` 这种数据类型应该被视为一个对象，这个对象拥有 `name` 和 `score` 这两个属性（Property）。
- 如果要打印一个学生的成绩，首先必须创建出这个学生对应的对象，然后，给对象发一个 `printScore` 消息，让对象自己把自己的数据打印出来。

```javascript
//1) 抽象数据行为模板（Class）
function Student (name, score) {
  this.name = name
  this.score = score
}
Student.prototype.printScore = function () {
  console.log('姓名：' + this.name + '  ' + '成绩：' + this.score)
}
//2） 根据模板创建具体实例对象（Instance）：
var std1 = new Student('Michael', 98)
var std2 = new Student('Bob', 81)
//3） 实例对象具有自己的具体行为（给对象发消息）：
std1.printScore() // => 姓名：Michael  成绩：98
std2.printScore() // => 姓名：Bob  成绩 81
```

所以，面向对象的设计思想是：

- 抽象出Class
- 根据Class创建Instance
- 指挥Instance得结果

面向对象的抽象程度又比函数要高，因为一个 Class 既包含数据，又包含操作数据的方法。

[back to top](#top)

## 创建对象

### 个人总结-创建对象的三种方式

- 创建对象的三种方式
  - 字面量方式
  - 调用系统的构造函数
  - 自定义构造函数方式

```javascript
// 字面量方式
var Per1 = {
  name:'Jackson',
  age: 20,
  readBook: function(){
    console.log("book");
  }
};
// 调用系统的构造函数
var Per2 = new Object();
person.name = 'Jackson';
person.age = 20;
person.readBook(){
  console.log("book");
}
// 说明： 上面两种方式创建的对象没有具体的数据类型，只属于Object类型
console.log(Per2 instanceof Person);   //false
console.log(Per2 instanceof Object);   //true
// 自定义构造函数方式
function Person(name, age){
  this.name = name;
  this.age = age;
  this.readBook(){
    console.log("book");
  }
}
var per = new Person("Jackson", 20);
console.log(per instanceof Person);   //true
```

### 工厂模式vs自定义构造函数

```javascript
// 工厂模式
function createObject(name, age){
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.readBook = function(){
    console.log("book");
  }
  return obj;
}
var per1 = createObject("xiao",20);
//自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.readBook(){
    console.log("book");
  }
}
var per2 = new Person("xiao",20);
```

- 共同点
  - 都是函数，都可以创建对象，都可以传入参数
- 工厂模式
  - 函数名是小写
  - 有返回值
  - new之后的对象是当前对象
  - 直接调用函数就可以创建对象
- 自定义构造函数
  - 函数名是大写
  - 没有返回值
  - this是当前对象
  - 通过new的方式创建对象
- 实例对象是通过构造函数来创建的(参见： 01构造函数和实例对象的关系.html)

[back to top](#top)

---------------------------

### 简单方式

直接通过 `new Object()` 创建：

```javascript
var person = new Object()
person.name = 'Jack'
person.age = 18
person.sayName = function () {
  console.log(this.name)
}
```

每次创建通过 `new Object()` 比较麻烦，所以可以通过它的简写形式对象字面量来创建：

```javascript
var person = {
  name: 'Jack',
  age: 18,
  sayName: function () {
    console.log(this.name)
  }
}
```

对于上面的写法固然没有问题，但是假如我们要生成两个`person`实例对象呢？

```javascript
var person1 = {
  name: 'Jack',
  age: 18,
  sayName: function () {
    console.log(this.name)
  }
}
var person2 = {
  name: 'Mike',
  age: 16,
  sayName: function () {
    console.log(this.name)
  }
}
```

通过上面的代码不难看出，这样写的代码太过冗余，重复性太高。

### 简单方式的改进：工厂函数

我们可以写一个函数，解决代码重复问题：

```javascript
function createPerson (name, age) {
  return {
    name: name,
    age: age,
    sayName: function () {
      console.log(this.name)
    }
  }
}
```

然后生成实例对象：

```javascript
var p1 = createPerson('Jack', 18)
var p2 = createPerson('Mike', 18)
```

这样封装确实爽多了，通过工厂模式我们解决了创建多个相似对象代码冗余的问题，
但却没有解决对象识别的问题（即怎样知道一个对象的类型）。

[back to top](#top)

## 构造函数

内容引导：

- 构造函数语法
- 分析构造函数
- 构造函数和实例对象的关系
  + 实例的constructor 属性
  + instanceof 操作符
- 普通函数调用和构造函数调用的区别
- 构造函数的返回值
- 构造函数的静态成员和实例成员
  + 函数也是对象
  + 实例成员
  + 静态成员
- 构造函数的问题

### 更优雅的工厂函数：构造函数

一种更优雅的工厂函数就是下面这样，构造函数：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
  this.sayName = function () {
    console.log(this.name)
  }
}
var p1 = new Person('Jack', 18)
p1.sayName() // => Jack
var p2 = new Person('Mike', 23)
p2.sayName() // => Mike
```

### 解析构造函数代码的执行

在上面的示例中，`Person()` 函数取代了 `createPerson()` 函数，但是实现效果是一样的。
这是为什么呢？

我们注意到，`Person()` 中的代码与 `createPerson()` 有以下几点不同之处：

- 没有显示的创建对象
- 直接将属性和方法赋给了 `this` 对象
- 没有 `return` 语句
- 函数名使用的是大写的 `Person`

而要创建 `Person` 实例，则必须使用 `new` 操作符。
以这种方式调用构造函数会经历以下 4 个步骤：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码
4. 返回新对象

下面是具体的伪代码：

```javascript
function Person (name, age) {
  // 当使用 new 操作符调用 Person() 的时候，实际上这里会先创建一个对象
  // var instance = {}
  // 然后让内部的 this 指向 instance 对象
  // this = instance
  // 接下来所有针对 this 的操作实际上操作的就是 instance
  this.name = name
  this.age = age
  this.sayName = function () {
    console.log(this.name)
  }
  // 在函数的结尾处会将 this 返回，也就是 instance
  // return this
}
```

### 构造函数和实例对象的关系

使用构造函数的好处不仅仅在于代码的简洁性，更重要的是我们可以识别对象的具体类型了。
在每一个实例对象中的`__proto__`中同时有一个 `constructor` 属性，该属性指向创建该实例的构造函数：

```javascript
console.log(p1.constructor === Person) // => true
console.log(p2.constructor === Person) // => true
console.log(p1.constructor === p2.constructor) // => true
```

对象的 `constructor` 属性最初是用来标识对象类型的，
但是，如果要检测对象的类型，还是使用 `instanceof` 操作符更可靠一些：

```javascript
console.log(p1 instanceof Person) // => true
console.log(p2 instanceof Person) // => true
```

总结：

- 构造函数是根据具体的事物抽象出来的抽象模板
- 实例对象是根据抽象的构造函数模板得到的具体实例对象
- 每一个实例对象都具有一个 `constructor` 属性，指向创建该实例的构造函数
  + 注意： `constructor` 是实例的属性的说法不严谨，具体后面的原型会讲到
- 可以通过实例的 `constructor` 属性判断实例和构造函数之间的关系
  + 注意：这种方式不严谨，推荐使用 `instanceof` 操作符，后面学原型会解释为什么

[back to top](#top)

### 构造函数的问题

- 使用构造函数带来的最大的好处就是创建对象更方便了，但是其本身也存在一个**浪费内存**的问题

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
  this.type = 'human'
  this.sayHello = function () {
    console.log('hello ' + this.name)
  }
}
var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)
console.log(p1.sayHello === p2.sayHello) // => false
```

- 对于每一个实例对象，`type` 和 `sayHello` 都是一模一样的内容
- 每一次生成一个实例，都必须为重复的内容，多占用一些内存，如果实例对象很多，会造成极大的内存浪费
- 对于这种问题可以把需要共享的函数定义到构造函数外部：

```javascript
function sayHello = function () {
  console.log('hello ' + this.name)
}

function Person (name, age) {
  this.name = name
  this.age = age
  this.type = 'human'
  this.sayHello = sayHello
}
var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)
console.log(p1.sayHello === p2.sayHello) // => true
```

- 这样确实可以了，但是如果有多个需要共享的函数的话就会造成全局命名空间冲突的问题
- 你肯定想到了可以把多个函数放到一个对象中用来避免全局命名空间冲突的问题：

```javascript
var fns = {
  sayHello: function () {
    console.log('hello ' + this.name)
  },
  sayAge: function () {
    console.log(this.age)
  }
}
function Person (name, age) {
  this.name = name
  this.age = age
  this.type = 'human'
  this.sayHello = fns.sayHello
  this.sayAge = fns.sayAge
}
var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)
console.log(p1.sayHello === p2.sayHello) // => true
console.log(p1.sayAge === p2.sayAge) // => true
```

至此，利用自己的方式基本上解决了构造函数的内存浪费问题。 但是代码看起来还是那么的格格不入，那有没有更好的方式呢？

### 小结

- 构造函数语法
- 分析构造函数
- 构造函数和实例对象的关系
  + 实例的 constructor 属性
  + instanceof 操作符
- 构造函数的问题

[back to top](#top)

## 原型

内容引导：

- 使用prototype原型对象解决构造函数的问题
- 分析构造函数、prototype 原型对象、实例对象 三者之间的关系
- 属性成员搜索原则：原型链
- 实例对象读写原型对象中的成员
- 原型对象的简写形式
- 原生对象的原型
  + Object
  + Array
  + String
  + ...
- 原型对象的问题
- 构造的函数和原型对象使用建议

### 更好的解决方案： `prototype`

- Javascript规定，每一个**构造函数**都有一个 `prototype` 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承
- 这也就意味着，可以把所有对象实例需要共享的属性和方法直接定义在 `prototype` 对象上

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}
console.log(Person.prototype)
Person.prototype.type = 'human'
Person.prototype.sayName = function () {
  console.log(this.name)
}
var p1 = new Person(...)
var p2 = new Person(...)
console.log(p1.sayName === p2.sayName) // => true
```

这时所有实例的 `type` 属性和 `sayName()` 方法，
其实都是同一个内存地址，指向 `prototype` 对象，因此就提高了运行效率。

### 构造函数、实例、原型三者之间的关系

![](https://i.imgur.com/oouCNB7.png)

- 任何函数都具有一个`prototype` 属性，该属性是一个对象
- 构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数
- 通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`
- **`__proto__` 是非标准属性**

```javascript
function F () {}
console.log(F.prototype) // => object
F.prototype.sayHi = function () {
  console.log('hi!')
}
console.log(F.constructor === F) // => true
var instance = new F()    //实例对象
console.log(instance.__proto__ === F.prototype) // => true
// 实例对象可以直接访问原型对象成员
instance.sayHi() // => hi!
```

总结：

- 任何函数都具有一个 `prototype` 属性，该属性是一个对象
- 构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数
- 通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`
- 所有实例都直接或间接继承了原型对象的成员

### 实例对象和构造函数的原型小结

- 实例对象中有`__proto__`这个属性,叫原型,也是一个对象,这个属性是给浏览器使用,不是标准的属性----->`__proto__`----->可以叫原型对象
- 构造函数中有`prototype`这个属性,叫原型,也是一个对象,这个属性是给程序员使用,是标准的属性------>`prototype`--->可以叫原型对象
  - 实例对象的`__proto__`和构造函数中的`prototype`相等--->true
  - 又因为实例对象是通过构造函数来创建的,构造函数中有原型对象`prototype`
  - 实例对象的`__proto__`指向了构造函数的原型对象`prototype`
- 原型: `__proto__`或者是`prototype`,都是原型对象
  - 原型的作用:  共享数据,节省内存空间

### 属性成员的搜索原则：原型链

了解了 **构造函数-实例-原型对象** 三者之间的关系后，接下来我们来解释一下为什么实例对象可以访问原型对象中的成员。

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性

- 搜索首先从对象实例本身开始
- 如果在实例中找到了具有给定名字的属性，则返回该属性的值
- 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
- 如果在原型对象中找到了这个属性，则返回该属性的值

也就是说，在我们调用 `person1.sayName()` 的时候，会先后执行两次搜索：

- 首先，解析器会问：“实例 person1 有 sayName 属性吗？”答：“没有。
- ”然后，它继续搜索，再问：“ person1 的原型有 sayName 属性吗？”答：“有。
- ”于是，它就读取那个保存在原型对象中的函数。
- 当我们调用 person2.sayName() 时，将会重现相同的搜索过程，得到相同的结果。

而这正是多个对象实例共享原型所保存的属性和方法的基本原理。

总结：

- 先在自己身上找，找到即返回
- 自己身上找不到，则沿着原型链向上查找，找到即返回
- 如果一直到原型链的末端还没有找到，则返回 `undefined`

### 实例对象读写原型对象成员

读取：

- 先在自己身上找，找到即返回
- 自己身上找不到，则沿着原型链向上查找，找到即返回
- 如果一直到原型链的末端还没有找到，则返回 `undefined`

值类型成员写入（`实例对象.值类型成员 = xx`）：

- 当实例期望重写原型对象中的某个普通数据成员时实际上会把该成员添加到自己身上
- 也就是说该行为实际上会屏蔽掉对原型对象成员的访问

引用类型成员写入（`实例对象.引用类型成员 = xx`）：

- 同上

复杂类型修改（`实例对象.成员.xx = xx`）：

- 同样会先在自己身上找该成员，如果自己身上找到则直接修改
- 如果自己身上找不到，则沿着原型链继续查找，如果找到则修改
- 如果一直到原型链的末端还没有找到该成员，则报错（`实例对象.undefined.xx = xx`）

### 更简单的原型语法

我们注意到，前面例子中每添加一个属性和方法就要敲一遍 `Person.prototype` 。
为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype = {
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

在该示例中，我们将 `Person.prototype` 重置到了一个新的对象。
这样做的好处就是为 `Person.prototype` 添加成员简单了，但是也会带来一个问题，那就是原型对象丢失了 `constructor` 成员。

所以，我们为了保持 `constructor` 的指向正确，建议的写法是：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype = {
  constructor: Person, // => 手动将 constructor 指向正确的构造函数
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

### 原生对象的原型

> 所有函数都有prototype属性对象。

- Object.prototype
- Function.prototype
- Array.prototype
- String.prototype
- Number.prototype
- Date.prototype
- ...


### 原型对象的问题

- 共享数组
- 共享对象

如果真的希望可以被实例对象之间共享和修改这些共享数据那就不是问题。但是如果不希望实例之间共享和修改这些共享数据则就是问题。

一个更好的建议是，最好不要让实例之间互相共享这些数组或者对象成员，一旦修改的话会导致数据的走向很不明确而且难以维护。

### 原型对象使用建议

- 私有成员（一般就是非函数成员）放到构造函数中
- 共享成员（一般就是函数）放到原型对象中
- 如果重置了 `prototype` 记得修正 `constructor` 的指向

[back to top](#top)

