[JavaScript专题之去掉数组中的重复项](#top)

- [常规模式](#常规模式)
  - [方式一: 常规模式(优化遍历数组法)(双重循环)](#方式一-常规模式优化遍历数组法双重循环)
  - [常规模式补充1 (优化遍历数组法)(双重循环)](#常规模式补充1-优化遍历数组法双重循环)
  - [方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序](#方式二-使用了默认js数组sort默认排序是按ascii进行排序)
  - [方式三: 利用json对象是否有属性值\[推荐\]](#方式三-利用json对象是否有属性值推荐)
  - [方式四: 利用indexOf以及forEach](#方式四-利用indexof以及foreach)
  - [方式五: 对象键值对法](#方式五-对象键值对法)
  - [方式六: 利用ES5的filter和map\<](#方式六-利用es5的filter和map)
  - [方式八: 利用对象的属性不能相同的特点进行去重](#方式八-利用对象的属性不能相同的特点进行去重)
  - [补充：合并数组并去重的方法](#补充合并数组并去重的方法)
    - [concat()方法](#concat方法)
    - [Array.prototype.push.apply()](#arrayprototypepushapply)
- [对象组成的数组去重](#对象组成的数组去重)
  - [reduce方法](#reduce方法)
  - [Map方法](#map方法)
- [forEach在js array和angular中的定义](#foreach在js-array和angular中的定义)

---------------------------------------------------------

![](https://i.imgur.com/yDb3kLD.png)

## 常规模式 

### 方式一: 常规模式(优化遍历数组法)(双重循环)

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

[⬆ back to top](#top)

### 常规模式补充1 (优化遍历数组法)(双重循环)

- 双层循环，外层循环元素，内层循环时比较值
- 如果有相同的值则跳过，不相同则push进数组

```javascript
Array.prototype.distinct = function(){
 var arr = this, result = [], len = arr.length;
 for(var i = 0; i < len; i++){
  for(var j = i + 1; j < len; j++){   //j从i+1开始
   if(arr[i] === arr[j]){
    j = ++i;         //改变j
   }
  }
  result.push(arr[i]);
 }
 return result;
}
var arra = [1,2,3,4,4,1,1,2,1,1,1];
arra.distinct();    //返回[3,4,2,1]
```

[⬆ back to top](#top)

### 方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序

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

[⬆ back to top](#top)

### 方式三: 利用json对象是否有属性值[推荐]

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

[⬆ back to top](#top)

### 方式四: 利用indexOf以及forEach

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
// forEach
Array.prototype.distinct = function (){
 var arr = this,result = [], len = arr.length;
 arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
  var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
  if(bool === -1){
   result.push(v);
  }
 })
 return result;
};
var a = [1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,2,3,3,2,2,1,23,1,23,2,3,2,3,2,3];
var b = a.distinct();
console.log(b.toString()); //1,23,2,3
```

[⬆ back to top](#top)

### 方式五: 对象键值对法

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

[⬆ back to top](#top)

### 方式六: 利用ES5的filter和map<

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

[⬆ back to top](#top)

### 方式八: 利用对象的属性不能相同的特点进行去重

```javascript
Array.prototype.distinct = function (){
 var arr = this,obj = {},result = [], len = arr.length;
 for(var i = 0; i< arr.length; i++){
  if(!obj[arr[i]]){                     //如果能查找到，证明数组元素重复了
   obj[arr[i]] = 1;
   result.push(arr[i]);
  }
 }
 return result;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56
```

[⬆ back to top](#top)

### 补充：合并数组并去重的方法

#### concat()方法 

concat() 方法将传入的数组或非数组值与原数组合并,组成一个新的数组并返回。该方法会产生一个新的数组。

```javascript
function concatArr(arr1, arr2){
  var arr = arr1.concat(arr2);
  arr = unique1(arr);             //再引用上面的任意一个去重方法
  return arr;
}
```

#### Array.prototype.push.apply()

该方法优点是不会产生一个新的数组

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];
Array.prototype.push.apply(a, b);//a=[1,2,3,4,5,6]
//等效于:a.push.apply(a, b);
//也等效于[].push.apply(a, b); 
function concatArray(arr1,arr2){
  Array.prototype.push.apply(arr1, arr2);
  arr1 = unique1(arr1);
  return arr1;
}
```

[⬆ back to top](#top)

## 对象组成的数组去重

### reduce方法

采用数组中的reduce方法，遍历数组，也是通过对象访问属性的方法, reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值

```javascript
//一般简单数组去重

arr = arr.sort().reduce(function(accumulator, currentValue)
{
	if(accumulator.length===0 ||accumulator[accumulator.length-1]!=currentValue){
		accumulator.push(currentValue)
	}; 
	return accumulator;
}, []);
//对象组成的数组去重
var arr = [{
    "name": "ZYTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "AAAAAA.doc"
}, {
    "name": "ZYTA",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "BBBBBB.doc"
}, {
    "name": "ZDTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "CCCCCC.doc"
}, {
    "name": "ZYTX",
    "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    "gender": "AAAAAA.doc"
}];
var hash = {};             //arr是要去重的对象数组
arr = arr.reduce(function(item, next) {
    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
    return item;
}, [])
console.log(arr);
```

### Map方法

- `has()`:  判断Map对象中是否存在指定元素
- `set()`:  向Map对象中添加新元素
- `values()`:  返回Map对象值的遍历器对象

```js
const map = new Map();
const arr = arr.filter(item => !map.has(item.name) && map.set(item.name, item));
```

https://segmentfault.com/q/1010000006954351


[⬆ back to top](#top)

## forEach在js array和angular中的定义

```javascript
var str1 = [
    { key: '01', value: '哈哈' },
    { key: '04', value: '皮皮' },
    { key: '02', value: '旺旺' },
    { key: '03', value: '娃娃' },
    { key: '04', value: '皮皮'},
    { key: '05', value: '波波'}
];
var str2 = [], tmp = {};
str1.forEach(function(data){
    if(!tmp[data.key]){
        str1.push(data.key);
        tmp[data.key] = true;
    }
})
console.log(str2);
angular.forEach(array , function(data, index, array){
    console.log(data == array[index]); //true
})
array.forEach(function(data, index, array){
    console.log(data == array[index]);      //true
})
```

参数

- data:  第一个是value, 遍历时当前的数据(数组中的每一项)
- index:  第二个是下标（index）遍历时当前索引
- array：第三个是需要遍历的集合

[back to top](#top)

<h2 id="特殊类型比较的不同">补充： 特殊类型比较的不同</h2>

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
- [JavaScript专题之数组去重](https://github.com/mqyqingfeng/Blog/issues/27)
- [JS实现数组去重方法总结(六种方法)](https://www.jb51.net/article/118657.htm)

