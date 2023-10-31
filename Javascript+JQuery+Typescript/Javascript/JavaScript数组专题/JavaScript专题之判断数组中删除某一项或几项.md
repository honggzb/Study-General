[JavaScript专题之数组中删除某一项或几项](#top)

- [方式一: javascript中的splice方法)](#方式一)
- [方式二: javascript中的delete方法](#方式二)
- [自己扩展数组remove方法](#自己扩展数组remove方法)

<h2 id="方式一">方式一: javascript中的splice方法</h2>

- `splice(index,len,[item])`
  - **注释：该方法会改变原始数组**
- 有3个参数，它也可以用来替换/删除/添加数组内某一个或者几个值
  - index:数组开始下标
  - len: 替换/删除的长度 
  - item:替换的值，删除操作的话 item为空

```JavaScript
var arr = ['a','b','c','d'];
//1) 删除 ----  item不设置
arr.splice(1,1)   //['a','c','d']         删除起始下标为1，长度为1的一个值，len设置的1，如果为0，则数组不变
arr.splice(1,2)   //['a','d']          删除起始下标为1，长度为2的一个值，len设置的2
//2) 替换 ---- item为替换的值
arr.splice(1,1,'ttt')        //['a','ttt','c','d']         替换起始下标为1，长度为1的一个值为‘ttt’，len设置的1
arr.splice(1,2,'ttt')        //['a','ttt','d']         替换起始下标为1，长度为2的两个值为‘ttt’，len设置的1
//3) 添加 ----  len设置为0，item为添加的值
arr.splice(1,0,'ttt')        //['a','ttt','b','c','d']         表示在下标为1处添加一项‘ttt’
//4) 清空数组
arr.splice(0, arr.length)
```

[back to top](#top)

<h2 id="方式二">方式二: javascript中的delete方法</h2>

- **这种方式数组长度不变**, 此时arr[1]变为undefined了, 但是也有好处原来数组的索引也保持不变, 此时要遍历数组元素可以才用
- 跳过其中undefined的元素

```JavaScript
var arr= ['a','b','c','d'];
delete arr[1];    // ["a", undefined, "c", "d"]  
```

[back to top](#top)

<h2 id="自己扩展数组remove方法">自己扩展数组remove方法</h2>

```javascript
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx > this.length) { return false; }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
}
arr = ['a','b','c','d'];
arr.remove(1);   // ["a", "c", "d"]
```

- [记录：js删除数组中某一项或几项的几种方法](https://www.cnblogs.com/Joans/p/3981122.html)
