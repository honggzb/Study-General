[目录](#top)

- [方式一: 常规模式](#方式一)
- [方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序](#方式二)
- [方式三: 利用json对象是否有属性值- **推荐**](#方式三)
- [方式四: 利用indexOf](#方式四)
- [方式五: 对象键值对法](#方式五)
- [方式六: 利用ES5的filter和map](#方式六)
- 方式七: 一行代码实现数组去重: `[...new Set([1,2,2,3,1,'a',3,'a',3])]`
- [补充： 特殊类型比较的不同](#特殊类型比较的不同)

<h3 id="方式一">方式一: 常规模式(优化遍历数组法)</h3>

1. 构建一个新的临时数组存放结果
2. for循环中每次从原数组中取出一个元素，用这个元素循环与临时数组对比
3. 若临时数组中没有该元素，则存到临时数组中

```javascript
Array.prototype.unique1 = function(){
  var newArr=[this[0]];
  for(var i=1,len=this.length;i<len;i++){
    var repeat = false;
	  for(var j=0,len2=newArr.length;j<len2;j++){
			if(this[i] == newArr[j]){
					repeat=true;
					break;
			}
	  }
	if(!repeat)
			newArr.push(this[i]);
  }
  return newArr;
};
//优化: 排序后去重- 先将要去重的数组使用sort方法排序后，相同的值就会被排在一起，然后就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进newArr
Array.prototype.unique1 = function(){
  var newArr = [];
  var sortedArray=[this[0]].concat().sort();
  var seen;
  for(var i=0,len=sortedArray.length;i<len;i++){
			if(!i || seen !== sortedArray[i]){   // 如果是第一个元素或者相邻的元素不相同
					 newArr.push(sortedArray[i]);
			}
      newArr = sortedArray[i];
	  }
  return newArr;
};
```

[back to top](#top)

<h3 id="方式二">方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序</h3>

1. 先将当前数组进行排序
2. 检查当前中的第i个元素 与 临时数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置
3. 如果不相同，则将该元素存入结果数组中

```javascript
Array.prototype.unique2 = function(){
  this.sort();
  var newArr=[this[0]];
  for(var i=0,len2=this.length;i<len2;i++){
    if(this[i]!==newArr[newArr.length-1]){
    	newArr.push(this[i]);
    }
  }
  return newArr;
};
```

[back to top](#top)

<h3 id="方式三">方式三: 利用json对象是否有属性值[推荐]</h3>

1. 创建一个新的数组存放结果
2. 创建一个空对象json
3. for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。

```javascript
Array.prototype.unique3 = function(){
  var res = [], json = {};
  for(var i=0;i<this.length;i++){
    if(!json[this[i]]){
    	res.push(this[i]);
	json[this[i]] = 1;
    }
  }
  return res;
};
```

[back to top](#top)

<h3 id="方式四">方式四: 利用indexOf</h3>

> indexOf 为ecmaScript5新方法 IE8以下（包括IE8， IE8只支持部分ecma5）不支持

```javascript
// 最简单数组去重法
Array.prototype.unique4 = function(){
  var n = []; //一个新的临时数组
  for(var i = 0; i < this.length; i++){
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (n.indexOf(this[i]) == -1) n.push(this[i]);
  }
  return n;
}
// 判断浏览器是否支持indexOf ，indexOf 为ecmaScript5新方法 IE8以下（包括IE8， IE8只支持部分ecma5）不支持
if (!Array.prototype.indexOf){
  // 新增indexOf方法
  Array.prototype.indexOf = function(item){
    var result = -1, a_item = null;
    if (this.length == 0){
      return result;
    }
    for(var i = 0, len = this.length; i < len; i++){
      a_item = this[i];
      if (a_item === item){
        result = i;
        break;
      }  
    }
    return result;
  }
}
```

[back to top](#top)

<h3 id="方式五">方式五: 对象键值对法</h3>

该方法执行的速度比其他任何方法都快， 就是占用的内存大一些；

实现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，不是的话给对象新增该键并放入新数组。注意点： 判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样；例如： a[1]、a["1"] 。解决上述问题还是得调用“indexOf”。

```javascript
// 速度最快， 占空间最多（空间换时间）
Array.prototype.unique5 = function(){
  var n = {}, r = [], len = this.length, val, type;
    for (var i = 0; i < this.length; i++) {
        val = this[i];
        type = typeof val;
        if (!n[val]) {
            n[val] = [type];
            r.push(val);
        } else if (n[val].indexOf(type) < 0) {
            n[val].push(type);
            r.push(val);
        }
    }
    return r;
}
```

[back to top](#top)

<h3 id="方式六">方式六: 利用ES5的filter和map</h3>

```javascript
//ES5提供了filter方法，我们可以用来简化外层循环
//不兼容IE7
Array.prototype.unique6 = function(){
	return this.filter(function(el, index, arr) { 
		return index == arr.indexOf(el);
	}); 	
}
//优化:  排序去重的方法：
Array.prototype.unique6 = function(){
	return this.concat().sort().filter(function(el, index, arr) { 
		return !index || el !== arr[index - 1]
	}); 	
}
//兼容IE7
function getNoRepeat(s) { 
  return s.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(","); 
} 
//利用map原理和json的键值去除重复值
Array.prototype.unique7 = function(){
	var json = {};    //利用json的键值去除重复值
	for(var i = 0; i < this.length; i++){ 
	  json[this[i]] = this[i];
	} 
	var arr = new Array(); 
	for(var key in json){ 
	  arr.push(key); 
	} 
	return arr;
}
```

[back to top](#top)

<h3 id="特殊类型比较的不同">补充： 特殊类型比较的不同</h3>

- 要去重的元素类型可能是多种多样，除了例子中简单的 1 和 '1' 之外，其实还有 null、undefined、NaN、对象等，那么对于这些元素，之前的这些方法的去重结果又是怎样呢？

```javascript
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
```

方法|结果|说明
---|---|---
for循环|`[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]`|对象和 NaN 不去重
indexOf|`[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]`|对象和 NaN 不去重
sort|`[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]`|对象和 NaN 不去重 数字 1 也不去重
filter + indexOf|`[1, "1", null, undefined, String, String, /a/, /a/]`|对象不去重 NaN 会被忽略掉
filter + sort|`[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]`|对象和 NaN 不去重 数字 1 不去重
优化后的键值对方法|`[1, "1", null, undefined, String, /a/, NaN]`|全部去重
Set|`[1, "1", null, undefined, String, String, /a/, /a/, NaN]`|对象不去重 NaN 去重

[back to top](#top)

- [如何高效率去掉js数组中的重复项](http://www.jb51.net/article/82293.htm)
- [JavaScript删除数组重复元素的5个高效算法](http://www.cnblogs.com/Allen-node/p/5511507.html)
- [详解JavaScript数组和字符串中去除重复值的方法](http://www.jb51.net/article/80600.htm)


