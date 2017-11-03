[url的三个js编码函数](#top)

- [1. escape](#escape)
- [2、encodeURI](#encodeURI)
- [3、encodeURIComponent](#encodeURIComponent)

<h2 id="escape">1、escape()</h2>

- escape()是js编码函数中最古老的一个。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。
- 实际上，escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如“春节”的返回结果是%u6625%u8282，也就是说在Unicode字符集中，“春”是第6625个（十六进制）字符，“节”是第8282个（十六进制）字符。

```javascript
javascript:escape("春节");   //输出 "%u6625%u8282"
javascript:escape("hello word");  //输出 "hello%20word"
// 首先，无论网页的原始编码是什么，一旦被Javascript编码，就都变为unicode字符。也就是说，Javascipt函数的输入和输出，默认都是Unicode字符。这一点对下面两个函数也适用。
 javascript:escape("\u6625\u8282");     //输出 "%u6625%u8282"
 javascript:unescape("%u6625%u8282");   //输出 "春节"
 javascript:unescape("\u6625\u8282");   //输出 "春节"
```

> escape()不对“+”编码。但是网页在提交表单的时候，如果有空格，则会被转化为+字符。服务器处理数据的时候，会把+号处理成空格。所以，使用的时候要小心

[back to top](#top)

<h2 id="encodeURI">2、encodeURI()</h2>

- 它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号“; / ? : @ & = + $ , #”，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

[back to top](#top)

<h2 id="encodeURIComponent">3、encodeURIComponent()</h2>

- 与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。因此，“; / ? : @ & = + $ , #”，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。
- encodeURIComponent()相比encodeURI()要更加彻底。

```javascript
var test1="http://www.haorooms.com/My first/";
var nn=encodeURI(test1);
var now=decodeURI(test1);
/*
http://www.haorooms.com/My%20first/
http://www.haorooms.com/My first/
*/
var test1="http://www.haorooms.com/My first/";
var bb=encodeURIComponent(test1);
var nnow=decodeURIComponent(bb);
/*
http%3A%2F%2Fwww.haorooms.com%2FMy%20first%2F
http://www.haorooms.com/My first/
*/
```

- escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如"春节"的返回结果是%u6625%u8282，，escape()不对"+"编码 主要用于汉字编码，现在已经不提倡使用。
- encodeURI()是Javascript中真正用来对URL编码的函数。 编码整个url地址，但对特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。对应的解码函数是：decodeURI()。
- encodeURIComponent() 能编码"; / ? : @ & = + $ , #"这些特殊字符。对应的解码函数是decodeURIComponent()。假如要传递带&符号的网址，所以用encodeURIComponent()

[back to top](#top)
