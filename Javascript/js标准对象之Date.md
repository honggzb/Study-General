## js标准对象之Date

```javascript
var now = new Date();  // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
now.getFullYear(); // 2015, 年份
now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
now.getDate(); // 获取当前日(1-31), 24, 表示24号
now.getDay(); // 获取当前星期(0-6,0代表星期天), 3, 表示星期三
now.getHours(); // 获取当前小时数(0-23), 19,  24小时制
now.getMinutes(); // 获取当前分钟数(0-59), 49, 分钟
now.getSeconds(); // 获取当前秒数(0-59), 22, 秒
now.getMilliseconds(); // 获取当前毫秒数(0-999), 875, 毫秒数
now.getTime(); // 获取当前时间(从1970.1.1开始的毫秒数), 1435146562875, 以number形式表示的时间戳
```

日期格式化方法, 注意： 输出因浏览器而异的，没有哪一个方法能够用来在用户界面中显示一致的日期信息。

```javascript
now.toLocaleDateString();     //获取当前日期
now.toLocaleTimeString();     //获取当前时间
now.toLocaleString();        //获取日期与时间
now.toDateString();           //以特定于实现的格式化显示星期几、月、日和年；
now.toTimeString();          //以特定于实现的格式显示时、分、秒和时区；
now.toUTCString();         //—以特定于实现的格式显示完整的UTC日期。
```

### JavaScript的月份范围用整数表示是0~11，0表示一月，1表示二月……

### Date.parse(dateString)和Date.UTC()- 时间戳

- Date.parse(dateString)方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相对应日期的毫秒数， 即：Date.parse()返回的不是Date对象，而是一个时间戳（整数值）。ECMA-262没有定义Date.parse()应该支持那种日期格式，因此这个方法的行为因实现而异，而且通常是因地区而异。

```javascript
var d = Date.parse('2015-06-24T19:49:22.875+08:00'); // 1435146562875
var dd = new Date(d);  //或 new Date(1435146562875); 返回 Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
```

- Date.UTC()方法同样也返回表示日期的毫秒数，但它与Date.parse()在构建值时使用不同的信息。Date.UTC()的参数分别是年份、基于0的月份（一月是0；二月是1，以此类推）、月中的哪一天（1到31）、小时数（0到23）、分钟、秒以及毫秒数。在这些参数中，只有前两个参数（年和月）是必须的。如果没有提供月中的天数，则假设天数为1；如果省略其他参数，则统统假设为0。


日期对象及其在不同浏览器中的实现有许多奇怪的行为。其中有一种倾向是将超出范围的值替换成当前的值，以便生成输出。例如，在解析”January 32, 2007″时，有的浏览器会将其解释为”February 1, 2007″。而Opera则倾向于插入当前月份的当前日期，返回”January 当前日期， 2007″。也就是说，如果在2007年9月21日运行前面的代码，将会得到”Jannuary 21, 2007″(都是21日)。

### 时区

Date对象表示的时间总是按浏览器所在时区显示的，不过我们既可以显示本地时间，也可以显示调整后的UTC时间

- 通用时间 (UTC) 
- 格林威治标准时间 (GMT)

```javascript
var d = new Date(1435146562875);
d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
```

JavaScript中如何进行时区转换呢？实际上，只要我们传递的是一个number类型的时间戳，我们就不用关心时区转换。任何浏览器都可以把一个时间戳正确转换为本地时间。

时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。假设浏览器所在电脑的时间是准确的，那么世界上无论哪个时区的电脑，它们此刻产生的时间戳数字都是一样的，所以，时间戳可以精确地表示一个时刻，并且与时区无关。

所以，我们只需要传递时间戳，或者把时间戳从数据库里读出来，再让JavaScript自动转换为当地时间就可以了。

```javascript
//要获取当前时间戳，可以用
var oldTime = (new Date("2015/06/23 08:00:20")).getTime()/1000;
if (Date.now) {
    alert(Date.now()); // 老版本IE没有now()方法
} else {
    alert(new Date().getTime());
}
```

> Reference

- [廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499525761186acdd5ac3a44f8a50cc0ed8606139b000)
- [js中的date.parse函数](https://my.oschina.net/u/160667/blog/84817)
