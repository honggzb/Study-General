[JavaScript 高级](#top)

- [JavaScript概述](#JavaScript概述)
  - [JavaScript是什么](#JavaScript是什么)
  - [JavaScript与浏览器的关系](#JavaScript与浏览器的关系)
- [JavaScript基本概念](#JavaScript基本概念)
  - [JavaScript中的数据类型](#JavaScript中的数据类型)
  - [JavaScript执行过程](#JavaScript执行过程)
- [JavaScript面向对象编程](https://github.com/honggzb/Study-General/blob/master/Javascript/Advanced-JavaScript-Study/02-JavaScript%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B.md)

----------

[JavaScript 高级](http://naotu.baidu.com/file/5bcd79bc4f1eaf83f96d1ad23baab345?token=d22135c63546f5ee)

----------


## JavaScript概述

### JavaScript是什么

- 解析执行：轻量级解释型的，或是 JIT 编译型的程序设计语言
- 语言特点：动态，头等函数 (First-class Function)
  + 又称函数是 JavaScript 中的一等公民
- 执行环境：在宿主环境（host environment）下运行，浏览器是最常见的 JavaScript 宿主环境
  + 但是在很多非浏览器环境中也使用 JavaScript ，例如 node.js
- 编程范式：基于原型、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如：函数式编程）编程风格

### JavaScript与浏览器的关系

<img src="media/browser-js.png" alt="">

### JavaScript 的组成

| 组成部分       | 说明                |
| ---------- | ----------------- |
| Ecmascript标准 | 描述了该语言的语法和基本对象（基础语法） |
| DOM(Document Object Model)| 文档对象模型- 描述了处理网页内容的方法和接口   |
| BOM(Browser Object Model)| 浏览器对象模型- 描述了与浏览器进行交互的方法和接口 |

![](https://i.imgur.com/gFBlXME.png)

- [知乎 - JavaScript 能做什么，该做什么？](https://www.zhihu.com/question/20796866)
- [最流行的编程语言 JavaScript 能做什么？](https://github.com/phodal/articles/issues/1)

## JavaScript基本概念

- 语法
  + 区分大小写
  + 标识符
  + 注释
  + 严格模式
  + 语句
- 关键字和保留字
- 变量
- 数据类型
  + typeof 操作符
  + Undefined
  + Null
  + Boolean
  + Number
  + String
  + Object
- 操作符
- 流程控制语句
- 函数

### JavaScript中的数据类型

JavaScript 有 5 种简单数据类型：`Undefined、Null、Boolean、Number、String` 和 1 种复杂数据类型 `Object` 。

#### 基本类型（值类型）

- Undefined
- Null
- Boolean
- Number
- String

#### 复杂类型（引用类型）

- Object
- Array
- Date
- RegExp
- Function
- 基本包装类型
  + Boolean
  + Number
  + String
- 单体内置对象
  + Global
  + Math

#### 类型检测

- `typeof`
- `instanceof`
- `Object.prototype.toString.call()`

#### 值类型和引用类型在内存中的存储方式（画图说明）

- 值类型按值存储
- 引用类型按引用存储

#### 值类型复制和引用类型复制（画图说明）

- 值类型按值复制
- 引用类型按引用复制

#### 值类型和引用类型参数传递（画图说明）

- 值类型按值传递
- 引用类型按引用传递

#### 值类型与引用类型的差别

- 基本类型在内存中占据固定大小的空间，因此被保存在栈内存中
- 从一个变量向另一个变量复制基本类型的值，复制的是值的副本
- 引用类型的值是对象，保存在堆内存
- 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针
- 从一个变量向另一个变量复制引用类型的值的时候，复制是引用指针，因此两个变量最终都指向同一个对象

#### 小结

- 类型检测方式
- 值类型和引用类型的存储方式
- 值类型复制和引用类型复制
- 方法参数中 值类型数据传递 和 引用类型数据传递

### JavaScript执行过程

JavaScript运行分为两个阶段：

- 预解析
  + 全局预解析（所有变量和函数声明都会提前；同名的函数和变量函数的优先级高）
  + 函数内部预解析（所有的变量、函数和形参都会参与预解析）
    * 函数
    * 形参
    * 普通变量
- 执行

先预解析全局作用域，然后执行全局作用域中的代码，
在执行全局代码的过程中遇到函数调用就会先进行函数预解析，然后再执行函数内代码。


## [JavaScript面向对象编程](https://github.com/honggzb/Study-General/blob/master/Javascript/Advanced-JavaScript-Study/02-JavaScript%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B.md)
