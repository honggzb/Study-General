[JavaScript专题之es6数组处理](#top)

- [Find a single value given a condition](#find-a-single-value-given-a-condition)
- [Summing up array elements](#summing-up-array-elements)
  - [Syntax](#syntax)
  - [Demo 1- basic](#demo-1--basic)
  - [Demo 2- Sum of values in an object array](#demo-2--sum-of-values-in-an-object-array)
  - [Demo 3- Flatten an array of arrays](#demo-3--flatten-an-array-of-arrays)
  - [Demo 4- Counting instances of values in an object](#demo-4--counting-instances-of-values-in-an-object)
  - [Demo 5- Remove duplicate items in an array](#demo-5--remove-duplicate-items-in-an-array)
  - [Demo 6- Replace .filter().map() with .reduce()](#demo-6--replace-filtermap-with-reduce)
  - [Demo 7- Running Promises in Sequence(chained manner)](#demo-7--running-promises-in-sequencechained-manner)
- [Performing the same operation on each element](#performing-the-same-operation-on-each-element)
  - [Syntax](#syntax-1)
  - [Demo](#demo)

ES6 ships with several array methods that enable one to perform operations such as:

1. Find a single value given a condition- Filtering values (`find`, `filter`)
2. Summing up array elements (`reduce`)
3. Performing the same operation on each element (`map`)

## 遍历查找: 方法内部机制都有一个遍历过程

|方法|说明|	返回值|	例子|
|---|---|---|---|
|`forEach`|仅仅只是遍历数组|无返回值|常用于注册组件、指令等|
|`map`|可简单的理解为映射|返回一个新数组|不改变原数组|
|`filter`|过滤掉数组中不满足条件的值|返回一个新数组，不改变原数组的值|
|`find`|参数n代表数组里的每一项，然后内部通过遍历数组里的每一项，找到满足条件的项|返回第一个满足条件的元素，没有找到返回-1|`[1, 4, -5, 10].find((n) => n < 0) // -5`|
|`findIndex`|findIndex的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组|返回第一个满足条件的索引，没有找到返回-1	|`[1, 4, -5, 10].findIndex((value,index,arr) => value < 0) // 2`|

## 查找

|方法|说明|	返回值|	
|---|---|---|
|`some`|只要其中一个为true就会停止遍历并返回true	返回true、false|不改变原数组	|
|`every`	|遍历数组每一项，只有所有都返回true才会返回true，哪怕有一个false，就会返回false	返回true、false|不改变原数组	|
|`reduce`	|让数组的前后两项进行某种计算。然后返回其值，并继续计算	|不改变原数组，返回计算的最终结果，从数组的第二项开始遍历|

every和some目的：确定数组的所有成员是否满足指定的测试	返回true、false

## 静态方法
|||
|---|---|
|Array.from	|让类数组对象变成数组|		
|Array.of|将一组值转换为数组|	

[⬆ back to top](#top)

```javascript
/*注意拷贝的数组是浅拷贝 */
let arrLike = {
    0: 10,
    1: 20,
    2: 30,
    length: 3
}
//传统做法
let arr = Array.prototype.slice.call(arrLike);   //[10, 20, 30]
let arr = Array.from(arrLike);   //[10, 20, 30]
//将数组空位转换为undefined
let arr = Array.from([10, , 30]);   //[10, undefined, 30]
//额外的参数, 用于对元素进行处理 
let arr = Array.from(arrLike,function(x){
    return x*x;     //[100, 400, 900]
});
/* */
let arr1 = Array.of(3);   //[3]
let arr2 = Array.of(1, 2, 3);  //[1, 2, 3]
let arr3 = Array.of();    //[]
let arr4 = Array.of(undefined);  //[undefined]
let arr5 = Array.of(null);   //[null]
```

[back to top](#top)

## Find a single value given a condition

- `filter`: return a array, could have multiple item
- `find`:   return a object, just one item

```javascript
const users = [
  {
    name: "Alice",
    age: 19,
    id: 1
  },
  {
    name: "Bob",
    age: 24,
    id: 2
  },
];
const user1 = users.find((user) => user.id === 2)
// returns {name: "Bob", age: 24, id: 2}
const user2 = users.filter((user) => user.id === 2);
// returns [{name: "Bob", age: 24, id: 2}]
const user3 = users.find((user) => user.age > 15 )
// returns {name: 'Alice', age: 19, id: 1}
const user4 = users.filter((user) => user.age > 15);
// returns [{name: 'Alice', age: 19, id: 1},{name: "Bob", age: 24, id: 2}]
```

[back to top](#top)

## Summing up array elements

### Syntax

```javascript
// Arrow function
reduce((previousValue, currentValue) => { ... } )
reduce((previousValue, currentValue, currentIndex) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)
// Callback function
reduce(callbackFn)
reduce(callbackFn, initialValue)
// Inline callback function
reduce(function(previousValue, currentValue) { ... })
reduce(function(previousValue, currentValue, currentIndex) { ... })
reduce(function(previousValue, currentValue, currentIndex, array) { ... })
reduce(function(previousValue, currentValue, currentIndex, array) { ... }, initialValue)
```

###  Demo 1- basic

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;
// 1 + 2 + 3 + 4 = 10
console.log(array1.reduce(reducer));
// expected output: 10
// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
[1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
    return previousValue + currentValue
})
// 10
[1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
    return previousValue + currentValue
}, 10)
// 20
```

### Demo 2- Sum of values in an object array

```javascript
[{x: 1}, {x: 2}, {x: 3}].reduce((previousValue, currentValue) => {
    return previousValue + currentValue.x
}, 0)
// 6
```

### Demo 3- Flatten an array of arrays

```javascript
[[0, 1], [2, 3], [4, 5]].reduce((previousValue, currentValue) => {
    return previousValue.concat(currentValue)
  }, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

### Demo 4- Counting instances of values in an object

```javascript
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
let countedNames = names.reduce( (allNames, name) => {
  if (name in allNames) {
    allNames[name]++;
  }else {
    allNames[name] = 1;
  }
  return allNames
}, {})
// countedNames is:  { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

### Demo 5- Remove duplicate items in an array

```javascript
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let myArrayWithNoDuplicates = myArray.reduce( (previousValue, currentValue) => {
  if (previousValue.indexOf(currentValue) === -1) {
    previousValue.push(currentValue)
  }
  return previousValue
}, [])
console.log(myArrayWithNoDuplicates);  // ['a', 'b', 'c', 'e', 'd']
```

### Demo 6- Replace .filter().map() with .reduce()

```javascript
const numbers = [-5, 6, 2, 0,];
const doubledPositiveNumbers = numbers.reduce((previousValue, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    previousValue.push(doubled);
  }
  return previousValue;
}, []);
console.log(doubledPositiveNumbers); // [12, 4]
```

### Demo 7- Running Promises in Sequence(chained manner)

```javascript
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  )
}
// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5)
  })
}
// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}
// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3
}
// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4)
  })
}
const promiseArr = [p1, p2, f3, p4]
runPromiseInSequence(promiseArr, 10).then(console.log)   // 1200
```

> [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

[back to top](#top)

## Performing the same operation on each element

- **creates a new array** populated with the results of calling a provided function on every element in the calling array

### Syntax

```javascript
map((element) => { ... })
map((element, index) => { ... })
map((element, index, array) => { ... })
// Callback function
map(callbackFn)   //Each time callbackFn executes, the returned value is added to newArray
map(callbackFn, thisArg)
// Inline callback function
map(function(element) { ... })
map(function(element, index) { ... })
map(function(element, index, array){ ... })
map(function(element, index, array) { ... }, thisArg)
```

- `element`: The current element being processed in the array
- `index`(Optional): The index of the current element being processed in the array
- `array`(Optional): The array map was called upon
- shouldn't be using map if:
  - not using the array it returns; and/or
  - not returning a value from the callback

### Demo

```javascript
let numbers = [1, 4, 9]
let roots = numbers.map(function(num) {
    return Math.sqrt(num)
})
// roots is now     [1, 2, 3]
// numbers is still [1, 4, 9]
// Using map to reformat objects in an array
let kvArray = [{key: 1, value: 10},
               {key: 2, value: 20},
               {key: 3, value: 30}];
let reformattedArray = kvArray.map(obj => {
   let rObj = {}
   rObj[obj.key] = obj.value
   return rObj;
})
// reformattedArray is now [{1: 10}, {2: 20}, {3: 30}],
```

> [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

[back to top](#top)


