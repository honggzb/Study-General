[moment.js 日期包装类 （说明示例）](#top)

- [日期格式表](#%E6%97%A5%E6%9C%9F%E6%A0%BC%E5%BC%8F%E8%A1%A8)
- [创建时间对象](#%E5%88%9B%E5%BB%BA%E6%97%B6%E9%97%B4%E5%AF%B9%E8%B1%A1)
- [修改时间对象](#%E4%BF%AE%E6%94%B9%E6%97%B6%E9%97%B4%E5%AF%B9%E8%B1%A1)
- [格式化输出](#%E6%A0%BC%E5%BC%8F%E5%8C%96%E8%BE%93%E5%87%BA)
- [比较](#%E6%AF%94%E8%BE%83)
- [汉化](#%E6%B1%89%E5%8C%96)

## 日期格式表

Input| Output
---|---
M or MM|Month Number (1 - 12)
MMM or MMMM|Month Name (In currently language set by `moment.lang()`)
D or DD|Day of month
DDD or DDDD|Day of year
d, dd, ddd, or dddd|Day of week <br>NOTE: these tokens are not used to create the date, <br>as there are 4-5 weeks in a month, <br>and it would be impossible to get the date based off the day of the week)
YY|2 digit year (if greater than 70, will return 1900's, else 2000's)
YYYY|4 digit year
a or A|AM/PM
H, HH|24 hour time
h, or hh|12 hour time (use in conjunction with a or A)
m or mm|Minutes
s or ss|Seconds
S|Deciseconds (1/10th of a second)
SS|Centiseconds (1/100th of a second)
SSS|Milliseconds (1/1000th of a second)
Z or ZZ|Timezone offset as `+0700` or `+07:30` Available in version *1.2.0*

## 创建时间对象

```javascript
moment();                                                //当前时间
moment(new Date(2020, 3, 7));                            //date 对象创建
moment(1318781876406);                                   // 时间戳创建
moment("12-25-1995", "MM-DD-YYYY");                      //日期文字+日期格式
moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
moment([year, month , date , hours , minutes , seconds , milliseconds ]);    //数组创建
moment.unix(Number)　　　　　　　　　　　　　　            //unix时间
```

## 修改时间对象

Key|Shorthand
---|---
year|y
month|M
week|w
day|d
hour|h
minutes|m
seconds|s
millisecond|ms

```javascript
// 加减
moment().add(1000)                         // 加毫秒
moment().add('days', 7)                    // 加7天
moment().subtract('days', 7);              // 减7天
moment().add({days:-7,months:1});          // 加1月，减7天
// 2.2设值
moment().seconds(30);          // year/month/date/day/minutes/seconds 方法
moment().seconds();           //  取值
//2.3 设首/尾
moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
//shortcuts
moment().startOf('year');
moment().month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
moment().startOf('hour');
moment().minutes(0).seconds(0).milliseconds(0)

moment().endOf('year');      // set the moment to 12-31 23:59:59.999 this year
```

## 格式化输出

```javascript
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("ddd, hA");                       // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD');         // "Invalid date"
```

## 比较

```javascript
//diff
moment().diff(Moment|String|Number|Date|Array);
moment().diff(Moment|String|Number|Date|Array, String);
moment().diff(Moment|String|Number|Date|Array, String, Boolean);
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1
var a = moment([2008, 9]);
var b = moment([2007, 0]);
a.diff(b, 'years');       // 12 y
a.diff(b, 'years', true); // 1.75 y
//Time from now , time to now
moment([2007, 0, 29]).fromNow(); // 4 years ago
moment([2007, 0, 29]).fromNow(true); // 4 years
moment([2007, 0, 29]).toNow();     // in 4 years
moment([2007, 0, 29]).toNow(true); // 4 years
//time from X, time to X
moment().from(Moment|String|Number|Date|Array);
moment().from(Moment|String|Number|Date|Array, Boolean);
var a = moment([2007, 0, 28]);
var b = moment([2007, 0, 29]);
a.from(b)       // 1 d,  "a day ago"
moment().to(Moment|String|Number|Date|Array);
moment().to(Moment|String|Number|Date|Array, Boolean);
var a = moment([2007, 0, 28]);
var b = moment([2007, 0, 29]);
a.to(b) // "in a day"
```

[See more discussion on the month and year diffs here](https://github.com/moment/moment/pull/571)

## 汉化

```javascript
jamoment.lang('zh-cn', {
    months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
    weekdaysMin : "日_一_二_三_四_五_六".split("_"),
    longDateFormat : {
        LT : "Ah点mm",
        L : "YYYY年MMMD日",
        LL : "YYYY年MMMD日",
        LLL : "YYYY年MMMD日LT",
        LLLL : "YYYY年MMMD日ddddLT",
        l : "YYYY年MMMD日",
        ll : "YYYY年MMMD日",
        lll : "YYYY年MMMD日LT",
        llll : "YYYY年MMMD日ddddLT"
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s内",
        past : "%s前",
        s : "几秒",
        m : "1分钟",
        mm : "%d分钟",
        h : "1小时",
        hh : "%d小时",
        d : "1天",
        dd : "%d天",
        M : "1个月",
        MM : "%d个月",
        y : "1年",
        yy : "%d年"
    }
});
```

> reference
- [官方文档](http://momentjs.com/docs)
- [moment.js 日期包装类 （说明示例）](https://www.cnblogs.com/geniusxjq/p/4287158.html)
