## javascript判断数组中是否包含指定元素

- [数组的indexOf方法](#数组的indexOf方法)
- [数组的search方法](#数组的search方法)
- [自定义contains方法](#自定义contains方法)
- [RegExp的test和exec方法和match方法](#RegExp的test和exec方法和match方法)

### 数组的indexOf方法

可以使用数组的indexOf()方法，如果返回值为-1则说明不存在，如果返回值为大于-1的整数，则说明存在。

`strObj.indexOf(subString[, startIndex])`

- subString: 必选项。要在String对象中查找的子字符串
- starIndex: 可选项。该整数值指出在String对象内开始查找的索引。如果省略，则从字符串的开始处查找
- 返回一个整数值, 指出String对象内子字符串的开始位置。如果没有找到子字符串，则返回-1

```javascript
a = [1,2,3] ; 
console.log(a.indexOf(3))
// 如果是字符串数组
var arr=["A","B","C"]; 
if(arr.toString().indexOf("B")>-1) 
    return true;//存在
else
    return false; //不存在
//jquery
var arr = [ "xml", "html", "css", "js" ]; 
$.inArray("js", arr);     //返回 3,
```

### 数组的search方法

检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回 -1

```javascript
var str = "where_status_in=1002,1003,1001";
console.log(str.search("1003") != -1);    // true
console.log(str.search("13") != -1);    //false
```

### 自定义contains方法

通过prototype定义数组方法，这样就可以在任意数组调用contains方法

```javascript
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
var x = Array();
if (x.contains('foo')) {
  // do something special
```

### RegExp的test和exec方法和match方法

- test() 方法用于检索字符串中指定的值。返回 true 或 false
- exec() 方法用于检索字符串中的正则表达式的匹配。返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null
- match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配

```javascript
var str = "where_status_in=1002,1003,1001";
var reg1 = RegExp(/1003/);
var reg2 = RegExp(/13/);
reg1.test(str);   //true
reg2.test(str);   //false
reg1.exec(str);   //["1003", index: 21, input: "where_status_in=1002,1003,1001", groups: undefined]
reg2.exec(str);   //null
str.match(reg1);  //["1003", index: 21, input: "where_status_in=1002,1003,1001", groups: undefined]
str.match(reg2);  //null
```
