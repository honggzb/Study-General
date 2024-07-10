[ES6基础语法之Map和Set对象](#top)

- [Map- 键值对](#map--键值对)
  - [Map与Array的转换](#map与array的转换)
  - [遍历方法：](#遍历方法)
  - [Map的克隆,合并](#map的克隆合并)
- [Set](#set)
  - [四个遍历方法: Set的遍历顺序就是插入顺序](#四个遍历方法-set的遍历顺序就是插入顺序)
  - [把类似数组结构的模型转化为数组- Array.from](#把类似数组结构的模型转化为数组--arrayfrom)
  - [Set 对象作用](#set-对象作用)
- [Map和Set区别](#map和set区别)
- [对象数组去重](#对象数组去重)

---------------------------------------------------------

## Map- 键值对

- 官网解释：
  - Map 对象保存**键值对**，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值
- 特点总结：
  - `Map` 对象这种数据结构和和对象类型，都已键值对的形式存储数据，即 **key-vlue** 形式
  - `Map` 对象存储的数据是**有序**的，而我们平常使用的对象是无序的，所以通常当需要使用对象形式（键值对）存储数据且需要有序时，采用 Map 对象进行存储
  - `Map` 对象的**键值可以是任意类型**，对象只能使用字符串作为键
- 四个操作方法
  - `add(value)`：添加某个值，返回Set结构本身
  - `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功
  - `has(value)`：返回一个布尔值，表示该值是否为Set的成员
  - `clear()`：清除所有成员，没有返回值

### Map与Array的转换

- **Map结构转为数组结构**，
  - 比较快速的方法是使用扩展运算符（`...`）
    - `const map = new Map([[1, 'class'], ['name', 'pig'], [{}, 'zhihu']])`
    - `[...map.keys()]     // 1, 'name', {}`
    - `[...map.values()]   // 'class', 'pig', 'zhihu'`
    - `[...map.entries()]  // [1, 'class'], ['name', 'pig'], [{}, 'zhihu']`
    - `[...map]            // [[1, 'class'], ['name', 'pig'], [{}, 'zhihu']]`
  - JSON字符串要转换成Map可以先利用JSON.parse()转换成数组或者对象，然后再转换即可
- 数组结构转为Map结构: 
  - `const arr = Array.from(myMap)`

[⬆ back to top](#top)

### 遍历方法：
    
- `keys()`、`values()`、`entries()`、`forEach()`
- Map 本身没有`map`和`filter`方法

```js
let myMap = new Map();
myMap.set("23","乔丹");
myMap.set("33","皮蓬");
myMap.set("99","罗德曼");
//循环键
for (let key of myMap.keys()) {
  console.log(key);    // 23, 33,99
}       
//循环值
for (let value of myMap.values()) {
  console.log(value);  // 乔丹, 皮蓬, 罗德曼
}           
//循环键和值
for (let [key, value] of myMap) {
  console.log(key + " = " + value);   //23 = 乔丹, 33 = 皮蓬, 99 = 罗德曼
}    
//或
for (let [key, value] of myMap.entries()) {
  console.log(key + " = " + value);  //23 = 乔丹, 33 = 皮蓬, 99 = 罗德曼
}         
//使用forEach循环
myMap.forEach(function(value,key){
    console.log(key + "=" + value);  //23 = 乔丹, 33 = 皮蓬, 99 = 罗德曼
}, myMap);
```

[⬆ back to top](#top)

### Map的克隆,合并

```js
// Map的克隆
let myMap1 = new Map([[23,"乔丹"],[33,"皮蓬"],[99,"罗德曼"]]);
let myMap2 = new Map(myMap1);
//Map的合并(合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的)
let myMap1 = new Map([[23,"乔丹"],[33,"皮蓬"],[99,"罗德曼"]]);
let myMap2 = new Map([[23,"詹姆斯"],[24,"科比"],[11,"姚明"]]);
let myMap = new Map([...myMap1,...myMap2]); //合并之后詹姆斯会替换乔丹
```

[⬆ back to top](#top)

## Set

- 官网解释：
  - Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
- 特点总结：
  - Set 对象是一个类数组对象
  - Set 对象存储的值是**不重复的**，所以通常使用它来实现数组去重
  - Set 对象存储的数据不是键值对的形式，而且它可以**存储任何类型的数据**
- 四个操作方法
  - `add(value)`：添加某个值，返回 Set 结构本身(可以链式调用)
  - `delete(value)`：删除某个值，删除成功返回true，否则返回false
  - `has(value)`：返回一个布尔值，表示该值是否为Set的成员
  - `clear()`：清除所有成员，没有返回值

### 四个遍历方法: Set的遍历顺序就是插入顺序

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

```js
let st = new Set(['xxx', 'yyyy', 'yyyy', 'John']);
console.log(st.size); // 3
for(let k of st.keys()) {
   console.log(k); // 依次输出 xxx yyyy John
}
for(let v of st.values()) {
   console.log(v); // 依次输出 xxx yyyy John
}
for(let v of st.entries()) {
   console.log(v); // 依次输出 ['xxx', 'xxx'], ['yyyy', 'yyyy'], ['John', 'John'] 
}
```

### 把类似数组结构的模型转化为数组- Array.from

```js
let arr = ['xxx', 'yyyy', 'yyyy'];
let newArr = Array.from(new Set(arr));
console.log(Array.isArray(newArr)); // true
console.log(newArr); // ["xxx", "yyyy"]
```

### Set 对象作用

```js
// 数组去重(利用扩展运算符)
const mySet = new Set([1, 2, 3, 4, 4])
[...mySet] // [1, 2, 3, 4]
//合并两个set对象
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let union = new Set([...a, ...b]) // {1, 2, 3, 4}
//交集
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let intersect = new Set([...a].filter(x => b.has(x))) // {2, 3} 利用数组的filter方法
//差集
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let difference = new Set([...a].filter(x => !b.has(x))) // {1}
```

[⬆ back to top](#top)

## Map和Set区别

- Map和Set查找速度都非常快，时间复杂度为O(1)，而数组查找的时间复杂度为O(n)
- Map对象初始化的值为一个**二维数组**，Set对象初始化的值为**一维数组**
- Map对象和Set对象都不允许键重复（可以将Set对象的键想象成值）
- Map对象的键是不能改的，但是值能改，Set对象只能通过迭代器来更改值

[⬆ back to top](#top)

## 对象数组去重

```js
//1) using Map
const map = new Map();
arr = arr.filter(v => !map.has(v.name) && map.set(v.name, v))
//2) using reduce and {}
var hash = {};
arr = arr.reduce(function(item, next) {
    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
    return item;
}, [])]
```

[⬆ back to top](#top)
