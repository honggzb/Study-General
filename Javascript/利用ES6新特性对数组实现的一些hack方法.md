[利用ES6新特性对数组实现的一些hack方法](#top)

- [1. 利用Set数据结构去重一个数组](#利用Set数据结构去重一个数组)
- [2. Object.assign()用于对象的合并拷贝](#对象的合并拷贝)
- [3. 利用map()对数组的每一项进行操作并生成一个新的数组](#数组的每一项进行操作并生成一个新的数组)
- [4. 利用filter()保留或移除当前项并生成一个新的数组](#保留或移除当前项)
- [5. 利用some()遍历数组进行 || 比较](#遍历数组进行)
- [6. 利用every()遍历数组进行 && 比较](#every遍历数组进行)
- [7. 利用`~~`运算符巧妙的去掉小数部分](#巧妙的去掉小数部分)
- [8. 利用`...`运算符速获取数组的参数](#速获取数组的参数)

<h3 id="利用Set数据结构去重一个数组">1. 利用Set数据结构去重一个数组</h3>

```javascript
let arr = [1, 2, 2, 3];
let set = new Set(arr);
let newArr = Array.from(set); // Array.from方法可以将 Set 结构转为数组。[1, 2, 3]
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

<h3 id="保留或移除当前项">4. 利用filter()保留或移除当前项并生成一个新的数组</h3>

```javascript
let arr3 = [1, 2, 3, 4, 5];
let newArr3 = arr3.map((e, i) => e * 10); // 给数组每一项乘以10, [10, 20, 30, 40, 50]
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

<h3 id="速获取数组的参数">8. 利用`...`运算符速获取数组的参数</h3>

`...`运算符是ES6中用于解构数组的方法，可以用于快速获取数组的参数

```javascript
let [num1, ...nums] = [1, 2, 3];
console.log(num1); // 1
console.log(nums); // [2, 3]
```

[back to top](#top)

> Reference

- [JavaScript 巧学巧用](http://www.open-open.com/lib/view/open1493174129086.html#articleHeader1)
