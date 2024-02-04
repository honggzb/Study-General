[使用Spread运算符的八种方法总结](#top)

- [1. 复制数组](#1-复制数组)
- [2. 合并数组,对象](#2-合并数组对象)
- [3. 字符串转为数组](#3-字符串转为数组)
- [4. 数组转为函数参数](#4-数组转为函数参数)
- [5. 函数剩余参数](#5-函数剩余参数)
- [6. 复制对象](#6-复制对象)
- [8. 数组解构赋值](#8-数组解构赋值)

-----------------------------------------------------------

## 1. 复制数组

```ts
const oldArray = [1, 2, 3];
const newArray = [...oldArray];
```

[⬆ back to top](#top)

## 2. 合并数组,对象

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
const newArray = [...arr1, ...arr2, ...arr3];
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };
const newObj = { ...obj1, ...obj2, ...obj3 };
```

[⬆ back to top](#top)

## 3. 字符串转为数组

```ts
const str = 'hello';
const newArray = [...str];   //['h', 'e', 'l', 'l', 'o']
```

[⬆ back to top](#top)

## 4. 数组转为函数参数

```ts
function myFunction(x, y, z) {
  console.log(x, y, z);
}
const args = [1, 2, 3];
myFunction(...args); // 1 2 3
```

[⬆ back to top](#top)

## 5. 函数剩余参数

```ts
function myFunction(...args) {
  console.log(args);
}
myFunction(1, 2, 3); // [1, 2, 3]
```

[⬆ back to top](#top)

## 6. 复制对象

```ts
const oldObject = { a: 1, b: 2 };
const newObject = { ...oldObject };
console.log(newObject); // {a: 1, b: 2}
console.log(newObject === oldObject); // false
```

[⬆ back to top](#top)

## 8. 数组解构赋值

```ts
const [first, second, ...others] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(others); // [3, 4, 5]
```

[⬆ back to top](#top)
