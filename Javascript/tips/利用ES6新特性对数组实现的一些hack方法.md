[利用ES6新特性对数组实现的一些hack方法](#top)

- [1. 利用Set数据结构去重一个数组](#利用Set数据结构去重一个数组)- `...new Set([1,2,2,3,1,'a',3,'a',3])`
- [2. Object.assign()用于对象的合并拷贝](#对象的合并拷贝)
- [3. 利用map()对数组的每一项进行操作并生成一个新的数组](#数组的每一项进行操作并生成一个新的数组)
- [4. 利用filter()去重](#保留或移除当前项)
- [41. 利用Set()和filter()获取满足条件的元素](#获取满足条件的元素)
- [5. 利用some()遍历数组进行 || 比较](#遍历数组进行)
- [6. 利用every()遍历数组进行 && 比较](#every遍历数组进行)
- [7. 利用`~~`运算符巧妙的去掉小数部分](#巧妙的去掉小数部分)
- [8. 解构运算符的妙用](#解构运算符的妙用)
    - [8.1 利用`...`运算符速获取数组的参数](#速获取数组的参数)
    - [8.7 用对象解构的语法来获取数组的元素](#用对象解构的语法来获取数组的元素)
    - [8.2 利用`...`合并数组](#合并数组)
    - [8.3 利用`...`函数返回多个值](#函数返回多个值)
    - [8.4 利用`...`实现了 Iterator 接口的对象](#实现了Iterator接口的对象)
    - [8.5 寻找数组中的最大值](#寻找数组中的最大值)
    - [8.6 实现数组和对象的浅拷贝](实现数组和对象的浅拷贝)
- [9. 使用对象解构（object destructuring）来模拟命名参数和默认值](#使用对象解构)
- [10. 使用 Spread平铺多维数组](#平铺多维数组)

<h3 id="利用Set数据结构去重一个数组">1. 利用Set数据结构去重一个数组</h3>

```javascript
let arr = [1, 2, 2, 3];
let set = new Set(arr);
let newArr = Array.from(set); // Array.from方法可以将 Set 结构转为数组。[1, 2, 3]
//更便捷的方法
[...new Set([1,2,2,3,1,'a',3,'a',3])]
```

[back to top](#top)

<h3 id="对象的合并拷贝">2. Object.assign()用于对象的合并拷贝</h3>

```javascript
let obj1 = {a: 1};
let obj2 = {b: 2};
let obj3 = Object.assign({}, obj1, obj2);    //{a: 1, b: 2}
```

[back to top](#top)

<h3 id="数组的每一项进行操作并生成一个新的数组">3. 利用map()对数组的每一项进行操作并生成一个新的数组</h3>

```javascript
let arr3 = [1, 2, 3, 4, 5];
let newArr3 = arr3.map((e, i) => e * 10); // 给数组每一项乘以10, [10, 20, 30, 40, 50]
```

[back to top](#top)

<h3 id="保留或移除当前项">4. 利用filter()去重</h3>

```javascript
var r,arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r=arr.filter(function(element,index,self){
    return self.indexOf(element) == index;     //indexOf只返回元素在数组中第一次出现的位置，如果与元素位置不一致，说明该元素在前面已经出现过，是重复元素
})
console.log(r.toString());
```

[back to top](#top)

<h3 id="获取满足条件的元素">41. 利用Set()和filter()获取满足条件的元素</h3>

```javascript
let mySet = new Set([1,2,3,5,6,7]);
var filtered = [...mySet].filter(x => x>3);
console.log(filtered);    //5,6,7
```

[back to top](#top)

<h3 id="遍历数组进行">5. 利用some()遍历数组进行 || 比较</h3>

```javascript
let arr5 = [{result: true}, {result: false}];
let newArr5 = arr5.some((e, i) => e.result); // 只要一个为true，即为true
console.log(newArr5); // true
```

[back to top](#top)

<h3 id="every遍历数组进行">6. 利用every()遍历数组进行 && 比较</h3>

```javascript
let arr6 = [{result: true}, {result: false}];
let newArr6 = arr6.every((e, i) => e.result); // 只要一个为false，即为false
console.log(newArr6); // false
```

[back to top](#top)

<h3 id="巧妙的去掉小数部分">7. 利用`~~`运算符巧妙的去掉小数部分</h3>

- `~~`即是取反两次，而位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数，可以巧妙的去掉小数部分，类似于`parseInt`

```javascript
let a = 1.23;
let b = -1.23;
console.log(~~a); // 1
console.log(~~b); // -1
```

[back to top](#top)

<h2 id="解构运算符的妙用">8. 解构运算符的妙用</h2>

<h3 id="速获取数组的参数">8.1 利用`...`运算符速获取数组的参数</h3>

`...`运算符是ES6中用于解构数组的方法，可以用于快速获取数组的参数

```javascript
let [num1, ...nums] = [1, 2, 3];
console.log(num1); // 1
console.log(nums); // [2, 3]
```

<h3 id="用对象解构的语法来获取数组的元素">8.7 用对象解构的语法来获取数组的元素</h3>

```javascript
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');     //  {2: "US", 4: "New York"}
```

[back to top](#top)

<h3 id="合并数组">8.2 利用`...`合并数组</h3>

```javascript
// ES5  
[1, 2].concat(more)  
// ES6  
[1, 2, ...more]  
var arr1 = ['a', 'b'], arr2 = ['c'], arr3 = ['d', 'e'];  
// ES5 的合并数组  
arr1.concat(arr2, arr3);  
// [ 'a', 'b', 'c', 'd', 'e' ]  
// ES6 的合并数组  
[...arr1, ...arr2, ...arr3]  
// [ 'a', 'b', 'c', 'd', 'e' ] 
//将字符串转为真正的数组
[...'hello']  
// [ "h", "e", "l", "l", "o" ] 
```

[back to top](#top)

<h3 id="函数返回多个值">8.3 利用`...`函数返回多个值</h3>

```javascript
var dateFields = readDateFields(database);  
var d = new Date(...dateFields);  
// 从post中获取一个帖子，在comments中获取相关评论
async function getFullPost(){
  return await Promise.all([
    fetch('/post'),
    fetch('/comments')
  ]);
}
const [post, comments] = getFullPost();
```

[back to top](#top)

<h3 id="实现了Iterator接口的对象">8.4 利用`...`实现了 Iterator 接口的对象</h3>

```javascript
var nodeList = document.querySelectorAll('div');    //返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象
var array = [...nodeList];  //将其转为真正的数组
```

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如Map和Set结构, 对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```javascript
let map = new Map([  
  [1, 'one'],  
  [2, 'two'],  
  [3, 'three'],  
]);  
let arr = [...map.keys()]; // [1, 2, 3] - 将其转为真正的数组
//Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
var go = function*(){  
  yield 1;  
  yield 2;  
  yield 3;  
};  
[...go()] // [1, 2, 3]     //将其转为真正的数组
var obj = {a: 1, b: 2};  
let arr = [...obj];   // TypeError: Cannot spread non-iterable object  -没有iterator接口的对象，使用扩展运算符，将会报错
```

[back to top](#top)

<h3 id="寻找数组中的最大值">8.5 寻找数组中的最大值</h3>

```javascript
const max = (arr) => Math.max(...arr);
max([123, 321, 32]) // outputs: 321  
```

[back to top](#top)

<h3 id="实现数组和对象的浅拷贝">8.6 实现数组和对象的浅拷贝</h3>

```javascript
const obj = { ...oldObj }
const arr = [ ...oldArr ]
```

[back to top](#top)

<h2 id="使用对象解构">9. 使用对象解构（object destructuring）来模拟命名参数和默认值</h2>

```javascript
//比较老的方法了，它模拟了 JavaScript 中的命名参数
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
  // ...
}
//在ES 2015中，可以直接使用对象解构
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}
//让参数可选也很简单：
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}
```

[back to top](#top)

<h2 id="平铺多维数组">10. 使用 Spread平铺多维数组</h2>

```javascript
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr);        //=> [11, 22, 33, 44, 55, 66]
//通过递归，就可以平铺任意维度的嵌套数组
function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ?
    flattenArray(flattened) : flattened;
}
const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr);      //=> [11, 22, 33, 44, 55, 66, 77, 88, 99]
```

[back to top](#top)

> Reference

- [JavaScript 巧学巧用](http://www.open-open.com/lib/view/open1493174129086.html#articleHeader1)
- [es6 扩展运算符 三个点（...）](http://blog.csdn.net/qq_30100043/article/details/53391308)
- [5 分钟掌握 JavaScript 实用窍门](https://zhuanlan.zhihu.com/p/37493249)
