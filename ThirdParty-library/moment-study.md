[moment.js 日期包装类 （说明示例）](#top)

- [日期格式表](#%E6%97%A5%E6%9C%9F%E6%A0%BC%E5%BC%8F%E8%A1%A8)
- [创建时间对象](#%E5%88%9B%E5%BB%BA%E6%97%B6%E9%97%B4%E5%AF%B9%E8%B1%A1)
- [修改时间对象](#%E4%BF%AE%E6%94%B9%E6%97%B6%E9%97%B4%E5%AF%B9%E8%B1%A1)
- [格式化输出](#%E6%A0%BC%E5%BC%8F%E5%8C%96%E8%BE%93%E5%87%BA)
- [比较](#%E6%AF%94%E8%BE%83)
- [获取/设置时间信息](#%E8%8E%B7%E5%8F%96%E8%AE%BE%E7%BD%AE%E6%97%B6%E9%97%B4%E4%BF%A1%E6%81%AF)
- [查询](#%E6%9F%A5%E8%AF%A2)
- [汉化](#%E6%B1%89%E5%8C%96)

## 日期格式表

https://momentjs.com/docs/#/displaying/

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

## 获取/设置时间信息

```javascript
moment().second() //获得 秒
moment().second(Number) //设置 秒。0 到 59
moment().minute() //获得 分
moment().minute(Number) //设置 分。0 到 59
// 类似的用法
moment().hour() // 小时
moment().date() // 一个月里的第几天
moment().day() // 星期几
moment().dayOfYear() // 一年里的第几天
moment().week() // 一年里的第几周
moment().month() // 第几个月
moment().quarter() // 一年里的第几个季度
moment().year() // 年
moment().daysInMonth() // 当前月有多少天
```

## 查询

```javascript
// 早于
moment('2010-10-20').isBefore('2010-10-21') // true
moment('2010-10-20').isBefore('2010-12-31', 'year') // false
moment('2010-10-20').isBefore('2011-01-01', 'year') // true
// 是否相等
moment('2010-10-20').isSame('2010-10-20') // true
moment('2010-10-20').isSame('2009-12-31', 'year')  // false
moment('2010-10-20').isSame('2010-01-01', 'year')  // true
// 晚于
moment('2010-10-20').isAfter('2010-10-19') // true
moment('2010-10-20').isAfter('2010-01-01', 'year') // false
moment('2010-10-20').isAfter('2009-12-31', 'year') // true
// 是否在时间范围内
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25') // true
moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year') // false
moment('2010-10-20').isBetween('2009-12-31', '2012-01-01', 'year') // true

moment().isLeapYear() // 是否是闰年
````

## 汉化

把代码复制到moment.js中，位置在最后一句 `“return _moment;”` 的前面

```javascript
_moment.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'Ah点mm分',
            LTS : 'Ah点m分s秒',
            L : 'YYYY-MM-DD',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日Ah点mm分',
            LLLL : 'YYYY年MMMD日ddddAh点mm分',
            l : 'YYYY-MM-DD',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日Ah点mm分',
            llll : 'YYYY年MMMD日ddddAh点mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : function () {
                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
            },
            nextDay : function () {
                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
            },
            lastDay : function () {
                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
            },
            nextWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            lastWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            sameElse : 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
//....
return _moment;
```

[moment.js 添加中文语言（汉化）](https://blog.csdn.net/zhouyingge1104/article/details/50596420)

> reference
- [官方文档](http://momentjs.com/docs)
- [moment.js 日期包装类 （说明示例）](https://www.cnblogs.com/geniusxjq/p/4287158.html)
- [使用moment.js轻松管理日期和时间](https://blog.csdn.net/wulex/article/details/80402036)
