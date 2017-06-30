[19 个JavaScript 常用的简写技术](#top)

- [2.短路求值简写方式](#短路求值简写方式)
- [4.if存在条件简写方法](#if存在条件简写方法)
- [6.短路评价](#短路评价)
- [8.对象属性简写](#对象属性简写)
- [10.隐式返回值简写](#隐式返回值简写))
- [11.默认参数值](#默认参数值)
- [12.模板字符串](#模板字符串))
- [13.解构赋值简写方法](#解构赋值简写方法)
- [15.扩展运算符简写](#扩展运算符简写)
- [16.强制参数简写](#强制参数简写)
- [17.Array.find简写 -数组中查找某个值](#Array-find简写)
- [18.Object[key]简写- 如编写通用验证函数](#Object[key]简写)
- [19.双重非位运算简写](#双重非位运算简写)
- [补1：字符串转换为数字](#字符串转换为数字)

<h3 id="短路求值简写方式">2.短路求值简写方式</h3>

```javascript
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}
//短路求值简写
const variable2 = variable1  || 'new';
```

[back to top](#top)

<h3 id="if存在条件简写方法">4.if存在条件简写方法</h3>

```javascript
if (likeJavaScript === true)
//只有likeJavaScript是真值时，二者语句才相等
if (likeJavaScript)
```

[back to top](#top)

<h3 id="短路评价">6.短路评价</h3>

```javascript
//给一个变量分配的值是通过判断其值是否为null或undefined，则可以：
let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}
//
const dbHost = process.env.DB_HOST || 'localhost';
```

[back to top](#top)

<h3 id="对象属性简写">8.对象属性简写</h3>

```javascript
const obj = { x:x, y:y };
//
const obj = { x, y };
```

[back to top](#top)

<h3 id="隐式返回值简写">10.隐式返回值简写</h3>

```javascript
function calcCircumference(diameter) {
  return Math.PI * diameter
}
var func = function func() {
  return { foo: 1 };
};
//
calcCircumference = diameter => (
  Math.PI * diameter;
)
var func = () => ({ foo: 1 });
```

[back to top](#top)

<h3 id="默认参数值">11.默认参数值</h3>

```javascript
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}
//
volume = (l, w = 3, h = 4 ) => (l * w * h);
volume(2) //output: 24
```

[back to top](#top)

<h3 id="模板字符串">12.模板字符串</h3>

```javascript
const welcome = 'You have logged in as ' + first + ' ' + last + '.'
const db = 'http://' + host + ':' + port + '/' + database;
//
const welcome = `You have logged in as ${first} ${last}`;
const db = `http://${host}:${port}/${database}`;
```

[back to top](#top)

<h3 id="解构赋值简写方法">13.解构赋值简写方法</h3>

```javascript
//在web框架中，经常需要从组件和API之间来回传递数组或对象字面形式的数据，然后需要解构它
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');
const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;
//
import { observable, action, runInAction } from 'mobx';
const { store, form, loading, errors, entity } = this.props;
//也可以分配变量名：
const { store, form, loading, errors, entity:contact } = this.props;
//最后一个变量名为contact
```

[back to top](#top)

<h3 id="扩展运算符简写">15.扩展运算符简写</h3>

```javascript
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()
//简写：
// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
//可以使用扩展运算符来在一个数组中任意处插入另一个数组
const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];
//也可以使用扩展运算符解构：
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }
```

[back to top](#top)

<h3 id="强制参数简写">16.强制参数简写</h3>

```javascript
//JavaScript中如果没有向函数参数传递值，则参数为undefined。为了增强参数赋值，可以使用if语句来抛出异常，或使用强制参数简写方法
function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}
//简写：
mandatory = () => {
  throw new Error('Missing parameter!');
}
foo = (bar = mandatory()) => {
  return bar;
}
```

[back to top](#top)

<h3 id="Array-find简写">17.Array.find简写 -数组中查找某个值</h3>

```javascript
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]
function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}
//简写：
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```

[back to top](#top)

<h3 id="Object[key]简写">18.Object[key]简写</h3>

```javascript
//一个验证函数
function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}
console.log(validate({first:'Bruce',last:'Wayne'})); // true
//改进： 当需要不同域和规则来验证，编写一个通用函数在运行时确认, 不需要为了每个而编写自定义验证函数
// 对象验证规则
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}
// 通用验证函数
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}
console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true
```

[back to top](#top)

<h3 id="双重非位运算简写写">19.双重非位运算简写</h3>

```javascript
//用于双重非运算操作符。可以用来代替Math.floor()，其优势在于运行更快
Math.floor(4.9) === 4  //true
//简写：
~~4.9 === 4  //true
```

[back to top](#top)

<h3 id="字符串转换为数字">补1：字符串转换为数字</h3>

```javascript
//
var str = "10";
console.log(parseInt(str));
//简写：
console.log(+(str))
```

[back to top](#top)
