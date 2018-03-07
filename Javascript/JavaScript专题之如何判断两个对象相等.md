[目录](#top)

- [1. 简单类型相等之==和==](#方式一)
- [2. 对象相等](#对象相等)
- [3. JSON.Stringfy方法- 浏览器版本有要求](#Stringfy方法)

<h2 id="方式一">1. 简单类型相等之==和==</h2>

- **注意特殊类型比较的不同**, 除了简单的 1 和 '1' 之外，其实还有null、undefined、NaN、对象等，那么对于这些元素, 比较的不同

```javascript
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true
/* NaN */
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
/* +0和-0*/
console.log(+0 === -0); // true
console.log(+0 < -0); // false
console.log(+0 > -0); // false
console.log(1/+0 === 1/-0);   //false, 1/+0 --> Infinity, 1/-0 --> -Infinity
```

[back to top](#top)

<h2 id="对象相等">2. 对象相等</h2>

判断两个对象是否相等, 首先需要做的就是定义一下这个相等需要达到什么程度

- 引用地址相等
- 原型链是否需要一致
- 构造函数是否需要一致
- 如果要检查内容，自身属性之下的对象是判断其引用相等还是递归调用当前相等函数进行判断(两个对象的成员是否相等有点麻烦，如果只是第一层比较，很容易，但子对象里的属性可能又是一个对象，所以只能递归)
  - 判断两个对象的属性是否相同
  - 判断两个对象的属性对应的值是否相同

使用underscore的[isEqual](http://underscorejs.org/#isEqual)

```javascript
//对象的成员只有第一层比较
cmp = function( x, y ) { 
  if ( x === y ) {   // If both x and y are null or undefined and exactly the same 
   return true; 
  } 
  // If they are not strictly equal, they both need to be Objects 
  if ( !( x instanceof Object ) || !( y instanceof Object ) ) { 
   return false; 
  } 
  //They must have the exact same prototype chain,the closest we can do is
  //test the constructor. 
  if ( x.constructor !== y.constructor ) { 
    return false; 
  } 
  for ( var p in x ) { 
   //Inherited properties were tested using x.constructor === y.constructor
   if ( x.hasOwnProperty( p ) ) { 
   // Allows comparing x[ p ] and y[ p ] when set to undefined 
     if ( ! y.hasOwnProperty( p ) ) { 
      return false; 
     } 
     // If they have the same strict value or identity then they are equal 
     if ( x[ p ] === y[ p ] ) { 
      continue; 
     } 
     // Numbers, Strings, Functions, Booleans must be strictly equal 
     if ( typeof( x[ p ] ) !== "object" ) { 
      return false; 
     } 
     // Objects and Arrays must be tested recursively 
     if ( ! Object.equals( x[ p ], y[ p ] ) ) { 
      return false; 
     } 
   } 
  } 
  for ( p in y ) { 
   // allows x[ p ] to be set to undefined 
   if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) { 
   return false; 
   } 
  } 
  return true; 
};
```

[back to top](#top)

<h2 id="Stringfy方法">3. JSON.Stringfy方法- 浏览器版本有要求</h2>

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

- [JavaScript比较两个对象是否相等几个例子](https://yq.aliyun.com/ziliao/52338)
- https://segmentfault.com/q/1010000003719677
