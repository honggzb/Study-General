[TypeScript学习笔记--- 数据类型和函数](#top)

- [类型注解](#类型注解)
- [数据类型](#数据类型)
  - [any](#any)
  - [null和undefined](#null和undefined)
  - [number 和 bigint](#number-和-bigint)
  - [Array](#array)
  - [Tuple（元组）](#tuple元组)
  - [void](#void)
  - [never](#never)
  - [unknown](#unknown)
  - [object](#object)
- [联合类型Union types](#联合类型union-types)
- [交叉类型Intersection types](#交叉类型intersection-types)
- [函数](#函数-1)
  - [基本操作](#基本操作)
  - [函数重载](#函数重载)

------------------------------------------------

## 类型注解

- TS 规定在声明变量时，需要明确变量的数据类型:  **变量: 数据类型**
- `let age: number = 18`

```typescript
let age: number = 18
// 函数名(形参1:数据类型,形参2:数据类型): 返回值的数据类型
function sum(x: number, y: number): number {
    return x + y;
}
// 多种数据类型可以用联合类型
let age: (number | string);         // age 可以是number  也可以是string
type Combinable = string | number;  // 或者声明一个type类型
let age: Combinable;
// 联合类型通常都与 null 或undefined一起使用：
const sayHello = (name: string | undefined) => {  };
sayHello("semlinker");
sayHello(undefined);
```

[⬆ back to top](#top)

## 数据类型

- TS新增了部分数据类型，总共有：any、string、number、boolean、null、undefined、object、bigint、symbol、元组、void等等
- 常用的数据类型有：any、string、number、boolean

### any

- 在TS中 **any** 类型是顶级类型，任何类型的数据都可以被归类为any，如果一个变量的类型注解设置为any类型，那么TS允许我们给该变量赋任何类型的值，不受任何约束
- ​如果一个变量在声明的时候，没有设置类型注解，那系统会默认将其设置为 any 类型
- 虽然any使用起来很方便，但使用 any 就无法使用 TS提供的大量保护机制，所以我们要尽量减少any的使用，尽量明确变量的类型

### null和undefined

- 在默认情况下，TS中的**null和undefined是所有类型的子类型**，也就是可以把null和undefined赋值给任何类型的变量
- 但如果在TS的配置文件**tsconfig.json**中设置：`"strictNullChecks":true`，那 null和undefined就只能赋值给自己的类型，以及void类型

```javascript
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined
// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined
```

[⬆ back to top](#top)

### number 和 bigint

- 两者都表示数字，但是两者并不兼容，不能互相赋值
- TS 中可以用Number表示的最大整数为'2^53 - 1'，可以写为 `Number.MAX_SAFE_INTEGER`。如果超过了这个界限，可以用 BigInt来表示，它可以表示任意大的整数

```javascript
let big: bigint =  100n;
let num: number = 6;
big = num; // 不兼容 会报错
num = big;// 不兼容 会报错
```

[⬆ back to top](#top)

### Array

- TS中定义数组的方式有两种：
  - 数组名:元素类型[]: `let arr:string[] = ["1","2"];`
  - 数组名:Array<元素类型>: `let arr2:Array<string> = ["1","2"]`
- 当数组内的元素类型不止一种时，可以定义联合类型数组，或设置数组类型为 any：
  - `let arr:(number | string)[];`
  - `let arr2:any[];`
- 可以结合接口来指定对象成员的数组

```javascript
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```

[⬆ back to top](#top)

### Tuple（元组）

- 元组是TS中特有的类型，定义方式类似于数组，就像被限制住元素个数、类型和顺序的数组
1. 元组中的元素可以通过下标访问，也可以通过解构赋值来访问元素
2. 定义元组时，我们也可以通过在元素后面加 ? 来声明可选元素
3. 定义元组时，元祖类型的最后一个元素可以表示剩余元素，以数组的形式存放多出来的元素，表示该元组是开放的，除了固定元素，可以有零个或多个额外的剩余元素
4. 可以给元组加上 readonly 关键字，使其变为只读的，不允许进行修改

```javascript
// 定义元组 类型必须顺序匹配且个数必须为2
let x: [string, number];
x = ['hello', 10]; // OK
x = ['hello', 10,10]; // 越界了 Error
x = [10, 'hello']; // 类型不匹配 Error
// 定义元祖
let employee: [number, string] = [1, "Semlinker"];
//1. 数组下标访问
let n = employee[0];
// 解构赋值来访问元组元素  按顺序一一对应
let [id, username] = employee;
// 解构赋值数量不能多于元组的元素数量
let [id, username, age] = employee; // Error
// 2. 定义元组时，我们也可以通过在元素后面加 ? 来声明可选元素
let optionalTuple: [string, boolean?];
// 赋值元组  两个元素都赋值
optionalTuple = ["Semlinker", true];
//3.  赋值元组  只赋值第一个元素  第二个可选元素不赋值
optionalTuple = ["Kakuqo"];
// 定义元组 第二个元素是剩余参数
// 这里的剩余参数只能是 string 类型  因为剩余参数数组是 string 数组
type RestTupleType = [number, ...string[]];
// 赋值元组 除了第一个值 剩下的都存放到 剩余参数数组中
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
// 4. 只读类型的元组
const point: readonly [number, number] = [10, 20];
var n = point[0]   // 可读取
point[0] = 1;      // 不允许进行修改, 会报错 Cannot assign to '0' because it is a read-only property.
```

[⬆ back to top](#top)

### void

- void 表示没有任何类型，赋值时只能赋予null 或 undefined
- 声明一个void类型的变量，没有任何意义，一般只用于当函数没有返回值时，才会用到void

### never

- never类型表示的是那些永不存在的值的类型，一般用于两种情况：
  - 函数运行时抛出了异常，那么这个函数就永远不存在返回值，就是never。
  - 当函数中出现了死循环的代码，那么这个函数页永远不存在返回值，就是never。
- never类型同null和undefined一样，也是任何类型的子类型，也可以赋值给任何类型。但是没有类型是never的子类型或可以赋值给never类型（除了never本身之外），即使any也不可以赋值给never

```javascript
let ne: never;
let nev: never;
let an: any;
ne = 123; // Error
ne = nev; // OK
ne = an; // Error
```

[⬆ back to top](#top)

### unknown

- unknown 与 any 类似，任何类型都可以赋值给它，
- 两者唯一的区别在于：any类型的值，可以赋值给任何类型的变量，而 unknown 类型的值，只能赋值给 unknown 和 any 类型


```javascript
let notSure: unknown = 4;
let uncertain: any = notSure; // OK
let notSure: any = 4;
let uncertain: unknown = notSure; // OK
let notSure: unknown = 4;
let uncertain: number = notSure; // Error
```

### object

​object 表示的是所有非基本类型的数据，也就是不能把number、string、boolean、symbol等 基本类型赋值给 object，只能接收复杂数据类型

[⬆ back to top](#top)

## 联合类型Union types

- 让变量具有多种数据类型
- 使用 `|` 来声明一个新的联合类型
  - `let a: number | string;  //变量a可以是number类型或者string类型的数据`
  - `const fn = (a:boolean | string ):[number] | any[] => [1]`
- 当不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法
- 类型缩减: 当字面量类型和原始类型进行联合，那么就会造成类型缩减

```javascript
// number类型的数据没有length属性，因此a.length会报错
function (a:number|string):number{
	return a.length
}
// number类型和string类型的数据都有toString方法，不报错
function (a:number|string):number{
	return a.toString()
}
// 类型缩减
type A = 'a' | string;      //string类型
type B = false | boolean;  //bolean 类型
type C = 1 | number;       //number类型
enum Class{        //枚举也会有类型缩减现象
   A,
   B
 }
type C = Class.A | Class;   //Class类型

```

[⬆ back to top](#top)

## 交叉类型Intersection types

- 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
- 使用`type`来声明一个新的交叉类型
- 接口的交叉类型生成一个新的接口类型，含有两者的所有属性，在使用时，也要满足新的接口的形状
- 注意事项
  1. 并不是所有类型都适合交叉类型，例如原子类型的交叉是没有意义的，string & number 是没有意义的，没有一种类型既是string也是number
  2. 对于两个接口类型的交叉类型，当两个接口含有相同的属性时，若这两个属性的类型相同，则合并为这一个类型，若不同，那么整个交叉类型返回never
- 交叉类型是既是也是，联合类型是或者

```javascript
// 使用type来声明一个新的交叉类型
interface A{
	a:number
}
interface B{
	b:string
}
type C = A & B        //C 同时拥有A和B的所有属性
// 同名基础类型属性的合并
interface X {
    c: string
    d: string
}
interface Y {
    c: string
    e: number
}
type XY = X & Y
type YX = Y & X
let p: XY
let q: YX
p = { c: "a", d: "a",  e: 5}
q = { c: "a", d: "a",  e: 5}
// 同名非基础类型属性的合并
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }
interface A { x: D; }
interface B { x: E; }
interface C { x: F; }
type ABC = A & B & C;
let abc: ABC= {x: {d: true,e: 'semlinker',f: 666  }};
console.log('abc:', abc);  // abc: { x: { d: true, e: 'semlinker', f: 666 } }
```

## 函数

### 基本操作

1. 函数声明: `函数名(形参1: 数据类型,形参2: 数据类型): 返回值的数据类型`
2. 可选参数: TS中通过在参数名后面加 ? 来标明，而且可选参数必须位于必需参数的后面
3. 参数默认值
4. 剩余参数: 如果不确定函数的参数数量，可以通过设置以**数组+扩展运算符**的方法来接收剩余参数，前面写的参数，会跟实参一一对应，剩下的参数会都会放到剩余参数数组中

```javascript
// 2. 可选参数 lastName?: string
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');  // Tom Cat
let tom = buildName('Tom'); // Tom
// 3. 参数默认值 lastName: string = 'Cat'
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat222');  // 传递lastName参数 覆盖默认值 , Tom Cat222
let tom = buildName('Tom'); // Tom Cat
// 4. 剩余参数 ...items: any[]
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);  // a 对应第一个参数array  剩余的参数都存放到 items 中
```

[⬆ back to top](#top)

### 函数重载

- 函数重载是指使用相同名称和不同参数（数量或类型不同）、不同的返回值类型创建多个函数类型定义
- 它们不会被覆盖，只是为同一个函数体提供多个函数类型定义，这样就能根据传入的参数不同，确认不同的返回值类型

```javascript
// 联合类型 type
type Combinable = number | string;
function add(a:number,b:number): number;     // 函数重载 1
function add(a: string, b: string): string;  // 函数重载 2
function add(a: string, b: number): string;  // 函数重载 3
function add(a: number, b: string): string;  // 函数重载 4

function add(a:Combinable, b:Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
// 参数是两个 string 匹配函数重载2 返回值为 string
const result = add('Semlinker', ' Kakuqo');  //Semlinker Kakuqo
console.log(add(5, 5)) // 10
console.log(add("a", "b")) // ab
console.log(add("a", 5)) // a5
console.log(add(5, "b")) // 5b
```

[⬆ back to top](#top)

> references
- [TypeScript 学习笔记（一）--- 数据类型和函数相关](https://blog.csdn.net/weixin_45092437/article/details/123236598)
- [typescript 交叉类型](https://blog.csdn.net/qq_40340943/article/details/130053119)
- [typescript联合类型](https://blog.csdn.net/qq_40340943/article/details/127052397)
- [Typescript学习 交叉类型 函数重载](https://blog.csdn.net/aminwangaa/article/details/110131762)
