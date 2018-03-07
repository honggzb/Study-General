[目录](#top)

- [方式一: 常规模式](#方式一)
- [2. JSON.Stringfy方法- 浏览器版本有要求](#Stringfy方法)

<h2 id="方式一">方式一: 常规模式(优化遍历数组法)</h2>

```javascript

```

[back to top](#top)

<h2 id="Stringfy方法">2. JSON.Stringfy方法- 浏览器版本有要求</h2>

```javascript
var o1 = [
    {a:1, b:[{c:2}]},
    {d:[{e:{f:2}}]}
];
var o2 = [
    {a:1, b:[{c:2}]},
    {d:[{e:{f:2}}]}
];
console.log(JSON.stringify(o1) === JSON.stringify(o2));    //true
//兼容浏览器的写法
function forIn(obj, handler) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            handler(i, obj[i]);
        }
    }
}
function each(arr, handler) {
    for (var i = 0, len = arr.length; i < len; i += 1) {
        handler(i, arr[i]);
    }
}
if (!JSON) {
    JSON = {};
}
if (!JSON.parse) {
    JSON.parse = function(json) {
        return eval('1,' + json)
    };
}
if (!JSON.stringify) {
    (function(JSON) {
        var arr = '[object Array]',
            obj = '[object Object]';
        JSON.stringify = function(json) {
            var t = '';
            var m = Object.prototype.toString.call(json);
            if (m == arr) {
                t = ArrPartten(json);
            } else if (m == obj) {
                t = ObjectJson(json);
            } else {
                t = json;
            }
            return t;
        }

        function ObjectParse() {
            var t = '{';
            forIn(json, function(i, ele) {
                var m = Object.prototype.toString.call(ele);
                if (m == arr) {
                    t += i + ':' + ArrPartten(ele) + ',';
                } else if (m == obj) {
                    t += i + ':' + ObjectJson(ele) + ',';
                } else {

                    t += i + ':' + ele + ',';
                }
            });
            if (t.length != 1) {
                t = t.substring(0, t.length - 1);
            }
            return t + '}';
        }
        function ArrayParse() {
            var t = '[';
            each(json, function(i, ele) {
                var m = Object.prototype.toString.call(ele);
                if (m == arr) {
                    t += ArrPartten(ele) + ',';
                } else if (m == obj) {
                    t += ObjectJson(ele) + ',';
                } else {
                    t += ele + ',';
                }
            });
            if (json.length > 0) {
                t = t.substring(0, t.length - 1);
            }
            return t + ']';
        }
    }(JSON));
}
```

[back to top](#top)

- [如何高效率去掉js数组中的重复项](http://www.jb51.net/article/82293.htm)
- https://segmentfault.com/q/1010000003719677
- [详解JavaScript数组和字符串中去除重复值的方法](http://www.jb51.net/article/80600.htm)


