[Underscore学习](#top)

- [数组相关方法](#%E6%95%B0%E7%BB%84%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)
- [对象相关方法](#%E5%AF%B9%E8%B1%A1%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)
- [对象/数组互动相关方法](#%E5%AF%B9%E8%B1%A1%E6%95%B0%E7%BB%84%E4%BA%92%E5%8A%A8%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)
- [函数相关的方法](#%E5%87%BD%E6%95%B0%E7%9B%B8%E5%85%B3%E7%9A%84%E6%96%B9%E6%B3%95)
  - [绑定运行环境和参数](#%E7%BB%91%E5%AE%9A%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%92%8C%E5%8F%82%E6%95%B0)
  - [函数运行控制](#%E5%87%BD%E6%95%B0%E8%BF%90%E8%A1%8C%E6%8E%A7%E5%88%B6)
- [工具方法](#%E5%B7%A5%E5%85%B7%E6%96%B9%E6%B3%95)

Underscore一个JavaScript实用库，提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象. 它提供了几十种函数式编程的方法，弥补了标准库的不足，大大方便了javaScript的编程。

## 数组相关方法

**数组处理**

|方法|说明|是否有返回值|样例|
|---|---|---|---|
|map|对集合的每个成员依次进行某种操作|返回的值存入一个新的数组|`_.map({one : 1, two : 2, three : 3}, function(num, key){ return num * 3; });  //[3,6,9]`|
|each|依次对数组所有元素进行某种操作|不返回任何值|`_.each({one : 1, two : 2, three : 3}, alert);`|
|reduce|依次对集合的每个成员进行某种操作，然后将操作结果累计在某一个初始值之上|返回累计的值<br>第一个参数是被处理的集合<br>第二个参数是对每个成员进行操作的函数<br>第三个参数是累计用的变量|`_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);  //6`|
|shuffle|用洗牌算法随机打乱一个集合|返回一个打乱次序的集合|`_.shuffle([1, 2, 3, 4, 5, 6]);`|
|sample|随机选择一个或多个元素||`_.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]`|
|range|快速生成一个序列||`_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] //从0开始小于10`<br>`_.range(0, 30, 5); // [0, 5, 10, 15, 20, 25] //`从0开始小于30，步长5,步长可以为负值|

**数组特征的操作**

|方法|说明|是否有返回值|样例|
|---|---|---|---|
|every|判断数组的所有元素是否都满足某个条件|如果都满足则返回true，否则返回false|`_.every([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //false`|
|some|判断数组的元素是否都满足某个条件|只要有一个元素满足，就返回true，否则返回false|`_.some([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //true`|
|size||返回集合的成员数量|`_.sample([1, 2, 3, 4, 5, 6]); // 2`<br>`_.size({one : 1, two : 2, three : 3}); //[6, 1, 4]`|
|max/min|空集合会返回-Infinity和Infinity，所以要先判断集合不为空<br>如果集合是Object，max()和min()只作用于value，忽略掉key|返回集合中最大和最小的数|`_.max([3, 5, 7, 9])`|
|first/last|||`_.first([2, 4, 6, 8]); // 2`|

**数组过滤: 用于过滤数组，找到符合要求的成员**

|方法|说明|是否有返回值|样例|
|---|---|---|---|
|filter|依次对集合的每个成员进行某种操作|只返回操作结果为true的成员|`_.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //[2,4,6]`|
|reject|依次对集合的每个成员进行某种操作|只返回操作结果为false的成员|`_.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //[1,3,5]`|
|find|依次对集合的每个成员进行某种操作|返回第一个操作结果为true的成员。如果所有成员的操作结果都为false，则返回undefined|`_.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //2`|
|contains||如果某个值在数组内，则返回true，否则返回false|`_.contains([1, 2, 3], 3);  //true`|
|countby|依次对集合的每个成员进行某种操作，将操作结果相同的成员算作一类|返回一个对象，表明每种操作结果对应的成员数量|`_.countBy([1, 2, 3, 4, 5], function(num) { return num % 2 == 0 ? 'even' : 'odd';});  //{odd: 3, even: 2}`|
|groupBy|把集合的元素按照key归类，key由传入的函数返回|返回操作后的结果|||

> note: underscore为集合类对象提供了一致的接口。集合类是指Array和Object，暂不支持Map和Set

```javascript
_.groupBy([20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99], function (x) {
    if (x < 60) {
        return 'C';
    } else if (x < 80) {
        return 'B';
    } else {
        return 'A';
    }
});
// {
//   A: [81, 91, 88, 99],
//   B: [75, 77, 66, 72],
//   C: [20, 40, 59]
// }
```

[back to top](#top)

## 对象相关方法

|方法|说明|典型应用|样例|
|---|---|---|---|
|toArray|将对象转为数组，只包含对象成员的值|将对类似数组的对象转为真正的数组|`_.toArray({a:0,b:1,c:2});  //[0,1,2]`|
|pluck|将多个对象的某一个属性的值，提取成一个数组||`var stooges = [{name : 'moe', age : 40}, {name : 'larry', age : 50}, {name : 'curly', age : 60}]; _.pluck(stooges, 'name'); //["moe", "larry", "curly"]`|

[back to top](#top)

## 对象/数组互动相关方法

- flatten: 接收一个Array，无论这个Array里面嵌套了多少个Array，flatten()最后都把它们变成一个一维数组
- zip/unzip: zip把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组。unzip()则是反过来
- object: 把两个或多个数组的所有元素按索引对齐，然后按索引合并成Object
- chunk: 将array分成多个Array
- uniq: 按条件去重

```javascript
_.flatten([1, [2], [3, [[4], [5]]]]); // [1, 2, 3, 4, 5]
// ----
var names = ['Adam', 'Lisa', 'Bart'];
var scores = [85, 92, 59];
_.zip(names, scores);
// [['Adam', 85], ['Lisa', 92], ['Bart', 59]]
_.object(names, scores);
// {Adam: 85, Lisa: 92, Bart: 59}
// ----
var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
_.unzip(namesAndScores);
// [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
//---对数组元素进行不区分大小写去重
 _.uniq(['Apple', 'orange', 'banana', 'ORANGE', 'apple', 'PEAR'],false,function(value){
    return value.toUpperCase();
})
//["Apple", "orange", "banana", "PEAR"]
```

[back to top](#top)

## 函数相关的方法

### 绑定运行环境和参数

在不同的运行环境下，javaScript函数内部的变量所在的上下文是不同的。这种特性会给程序带来不确定性，为了解决这个问题，Underscore.js提供了两个方法，用来给函数绑定上下文

- bind方法: 绑定函数运行时的上下文，返回一个新函数
- bindall方法: 一次将多个方法，绑定在某个对象上面
- partial方法: 将函数与某个参数绑定，然后作为一个新函数返回- 除了绑定上下文，Underscore.js还允许绑定参数
- wrap方法:  将一个函数作为参数，传入另一个函数，最终返回前者的一个新版本
- compose方法: 接受一系列函数作为参数，由后向前依次运行，上一个函数的运行结果，作为后一个函数的运行参数。也就是说，将f(g(),h())的形式转化为f(g(h()))

```javascript
var o = {
  p: 2,
  m: function (){console.log(this.p);}
};
o.m()   // 2
_.bind(o.m,{p:1})()  // 1
//bind方法还可以接受更多参数，它们表示函数方法运行时所需的参数
var add = function(n1,n2,n3) {
  console.log(this.sum + n1 + n2 + n3);
};
_.bind(add, {sum:1}, 1, 1, 1)()   // 4, 最后那三个是给定add方法的运行参数
/* bindAll  一次将多个方法，绑定在某个对象上面 */
var o = {
  p1 : '123',
  p2 : '456',
  m1 : function() { console.log(this.p1); },
  m2 : function() { console.log(this.p2); },
};
_.bindAll(o, 'm1', 'm2');   //
/* partial 将一个函数作为参数，传入另一个函数，最终返回前者的一个新版本 */
var add = function(a, b) { return a + b; };
add5 = _.partial(add, 5);
add5(10);   //15
/* wrap  将一个函数作为参数，传入另一个函数，最终返回前者的一个新版本*/
var hello = function(name) { return "hello: " + name; };
hello = _.wrap(hello, function(func) {
  return "before, " + func("moe") + ", after";
});
hello();
// 'before, hello: moe, after'
/* compose  接受一系列函数作为参数，由后向前依次运行，上一个函数的运行结果，作为后一个函数的运行参数 */
// 将f(g(),h())的形式转化为f(g(h())) 
var greet = function(name){ return "hi: " + name; };
var exclaim = function(statement){ return statement + "!"; };
var welcome = _.compose(exclaim, greet);
welcome('moe');   // 'hi: moe!'
// 先运行greet函数，再运行exclaim函数。并且，greet函数的运行结果是exclaim函数运行时的参数
```

[back to top](#top)

### 函数运行控制

- memoize方法: 缓存一个函数针对某个参数的运行结果
- delay方法: 可以将函数推迟指定的时间再运行
- defer方法: 将函数推迟到待运行的任务数为0时再运行，类似于setTimeout推迟0秒运行的效果
- throttle方法: 返回一个函数的新版本。连续调用这个新版本的函数时，必须等待一定时间才会触发下一次执行
- debounce方法: 返回的新函数有调用的时间限制，每次调用必须与上一次调用间隔一定的时间，否则就无效。它的典型应用是防止用户双击某个按钮，导致两次提交表单
  - debounce()和throttle()两个方法非常相似都是用于函数节流，控制函数不被频繁地调用，节省客户端及服务器资源
  - debounce()方法关注函数执行的间隔，即函数两次的调用时间不能小于指定时间
  - throttle()方法更关注函数的执行频率，即在指定频率内函数只会被调用一次
- once方法: 返回一个只能运行一次的新函数。该方法主要用于对象的初始化
- after方法: 返回的新版本函数，只有在被调用一定次数后才会运行，主要用于确认一组操作全部完成后，再做出反应

```javascript
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
// 推迟1000毫秒，再运行console.log方法，并且指定参数为“logged later”。
_.defer(function(){ alert('deferred'); });
// 返回updatePosition函数的新版本
var throttled = _.throttle(updatePosition, 100);
// 新版本的函数每过100毫秒才会触发一次
$(window).scroll(throttled);
// throttled需求1：当用户拖动浏览器滚动条时，调用服务器接口检查是否有新的内容
var query = _(function() {  
        // 在这里进行查询操作  
    }).throttle(500);  
$(window).bind('scroll', query); 
// click事件发生后，调用函数submitForm的新版本。该版本的两次运行时间，必须间隔1000毫秒以上，否则第二次调用无效。
// 最后那个参数true，表示click事件发生后，立刻触发第一次submitForm函数，否则就是等1000毫秒再触发
$("button").on("click", _.debounce(submitForm, 1000, true));
// debounce需求1：当用户在文本框输入搜索条件时，自动查询匹配的关键字并提示给用户
var query = _(function() {  
        // 在这里进行查询操作  
    }).debounce(200);  
$('#search').bind('keypress', query); 

var initialize = _.once(createApplication);
initialize();
initialize();
// Application只被创造一次
var renderNotes = _.after(notes.length, render);
_.each(notes, function(note) {
  note.asyncSave({success: renderNotes});
});
// 函数renderNotes是函数render的新版本，只有调用notes.length次以后才会运行。所以，后面就可以放心地等到notes的每个成员都处理完，才会运行一次renderNotes
```

[back to top](#top)

## 工具方法

- 链式操作:  Underscore.js允许将多个操作写成链式的形式, 调用了chain()方法，Underscore会将所调用的方法封装在一个闭包内，并将返回值封装为一个Underscore对象并返回
- template: 该方法用于编译html模板。`_.template(templateString, [data], [settings])`, 它接受三个参数
  - templateString：模板字符串
    - <% %>：用于包含JavaScript代码，这些代码将在渲染数据时被执行。
    - <%= %>：用于输出数据，可以是一个变量、某个对象的属性、或函数调用（将输出函数的返回值）。
    - <%- %>：用于输出数据，同时会将数据中包含的HTML字符转换为实体形式（例如它会将双引号转换为&quot;形式），用于避免XSS攻击, 如将数据中的HTML作为文本显示出来
  - data：输入模板的数据
    - 即templateString中的所有变量，在内部都是obj对象的属性，而obj对象就是指第二个参数data对象
    - 如果要改变obj这个对象的名字，需要在第三个参数中设定
  - settings：设置

```javascript
// 链式操作
_[10, 20, 30][10, 20, 30]  
    .chain()  
    .map(function(item){ return item++; })  
    .first()  
    .value();

var txt = "<h2><%- word %></h2>";
_.template(txt, {word : "H & W"});    // <h2>H &amp; W</h2>
var list = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
_.template(list, {people : ['moe', 'curly', 'larry']});   // "<li>moe</li><li>curly</li><li>larry</li>"
// 如果template方法只有第一个参数templateString，省略第二个参数，那么会返回一个函数，以后可以向这个函数输入数据。
var t1 = _.template("Hello <%=user%>!");
t1({ user: "<Jane>" })   // 'Hello <Jane>!'
// 改变obj这个对象的名字
// 因为template在变量替换时，内部使用with语句，所以上面这样的做法，运行速度会比较快
_.template("<%if (data.title) { %>Title: <%= title %><% } %>", null, { variable: "data" });
```

[back to top](#top)

> reference

- https://underscorejs.org/
- [阮一峰 JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001450370530539bc6e0e3dc02c4d3bb79993a8cde056b5000)
- [underscore.js的一些用法](https://www.jianshu.com/p/1219ab5b16de)
- [Underscore.js 入门-常用方法介绍](https://www.cnblogs.com/fu-fu/p/7232745.html)
