## javascript判断数组中是否包含指定元素

- [数组的indexOf方法)(#数组的indexOf方法)
- [自定义contains方法](#自定义contains方法)
- [RegExp方法](#RegExp方法)

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

### RegExp方法

```javascript
var str = "where_status_in=1002,1003,1001";
var reg = RegExp(/1003/);
reg.test(str);   //true
```
