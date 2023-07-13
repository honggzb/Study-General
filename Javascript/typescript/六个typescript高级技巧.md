## [Typescript advanced skill](top)

- [Advanced Types](#advanced-types)
  - [1. 映射类型](#1-映射类型)
  - [2. 条件类型](#2-条件类型)
- [装饰器Decorator](#装饰器decorator)
  - [1. 类装饰器](#1-类装饰器)
  - [2. 方法装饰器](#2-方法装饰器)
  - [3. 属性装饰器](#3-属性装饰器)
  - [4. 参数装饰器](#4-参数装饰器)
- [命名空间Namespaces](#命名空间namespaces)
  - [1. defination of Namespace](#1-defination-of-namespace)
  - [2. using Namespace](#2-using-namespace)
  - [3. 嵌套命名空间](#3-嵌套命名空间)
- [混入Mixins](#混入mixins)
  - [1. defination of mixins](#1-defination-of-mixins)
  - [2. using mixins](#2-using-mixins)
- [类型保护函数](#类型保护函数)
  - [1. 定义](#1-定义)
  - [2. using](#2-using)
- [使用类型Utility Types](#使用类型utility-types)


## Advanced Types

### 1. 映射类型

```javascript
// 定义一个映射类型Readonly，以类型T为泛型参数
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
interface Point {
  x: number;
  y: number;
}
// 定义一个ReadonlyPoint类型，基于Point接口
type ReadonlyPoint = Readonly<Point>;
const regularPoint: Point = {
  x: 5, y: 10
};
const readonlyPoint: ReadonlyPoint = {
  x: 20, y: 30
};
regularPoint.x =15;
readonlyPoint.x = 25;  // Error: Cannot assign to 'x' ...
function movePoint(p: Point, dx: number, dy: number): Point {
  return {x: p.x + dx, y: p.y + dy};
}
const moveRegularPoint = movePoint(readonlyPoint, 3. 4);
```

### 2. 条件类型

- 容许根据条件创建新类型，语法类似三元运算符，使用extends作为类型约束
- `type NonNullable<T> = T extencs null | undefined ? never : T;`
  - 取一个类型T并检查是否扩展了null或undefined，如扩展了，结果类型为never，否则为原始类型T

[back to top](#top)

## 装饰器Decorator

- 装饰器容许添加元数据，修改或扩展类、方法、属性和参数
- 是高阶函数，可以用于观察、修改或替换类定义、方法定义、访问器定义、属性定义或参数定义

### 1. 类装饰器

- 用于类的构造函数，可用于修改或扩展类定义

```javascript
// 定义一个名为LogClass的类装饰器
function LogClass(target: Function) {
  console.log(`Class ${target.name} was defined.`);
}
// 使用@语法应用于MyClass类
@LogClass
class MyClass {
  constructor() {}
}
```

### 2. 方法装饰器

- 用于类的方法，可用于修改或扩展方法定义

```javascript
// 定义一个名为LogMethod的方法装饰器
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(`Method ${key} was defined.`);
}
// 使用@语法应用于MyClass类的myMethod方法
class MyClass {
  @LogMethod
  myMethod() {
  console.log("Inside myMethod");
  }
}
const instance = new MyClass();
instance.myMethod();
```

### 3. 属性装饰器

- 用于类的属性，可用于修改或扩展属性定义

```javascript
// 定义一个名为DefaultValue的属性装饰器
function DefaultValue(value: any) {
  return (target: any, key: string) => {
    target[key] = value;
  };
}
// 使用@语法应用于MyClass类的DefaultValue属性
class MyClass {
  @DefaultValue(42)
  myProperty: number;
}
const instance = new MyClass();
console.log(instance.myProperty);    //42
```

### 4. 参数装饰器

- 用于类的参数，可用于修改或扩展参数定义

```javascript
// 定义一个名为LogParameter的参数装饰器, 在方法调用时记录装饰参数的索引和名称
function LogParameter(target: any, key: string, parameterIndex: number) {
  console.log(`方法 ${key} 的参数 ${parameterIndex} 被调用了`);
}
// 使用@语法将装饰器应用于MyClass累的myMethod方法的value参数
class MyClass {
  myMethod(@LogParameter value: number) {
    console.log(`在myMethod方法内，使用 ${value}`);
  }
}
const instance = new MyClass();
instance.myMethod(5);
```

[back to top](#top)

## 命名空间Namespaces

- 组织和分组代码的方式，促进模块化
- 命名空间可以包含类、接口、函数、变量和其他命名空间

### 1. defination of Namespace

```javascript
namespace MyNamespace {
  export class MyClass {
    constructor(public value: number) {}
    displayValue() {
      console.log(`The value is: ${this.value)}`);
    }
  }
}
```

### 2. using Namespace

```javascript
//1. 使用完全限定的名称
const instance1 = new MyNamespace.MyClass(5);
instance1.displayValue();    //5
//2. 使用命名空间导入
import MyClass = MyNamespace.MyClass;
const instance2 = new MyClass(5);
instance2.displayValue();   //5
```

### 3. 嵌套命名空间

```javascript
namespace OuterNamespace {
  export namespace InnerNamespace {
    export class MyClass {
      constructor(public value: number) {}
      displayValue() {
        console.log(`The value is: ${this.value)}`);
      }
    }
  }
}
//使用完全限定的名称
const instance = new OuterNamespace.InnerNamespace.MyNamespace.MyClass(5);
instance1.displayValue();   //5
```

[back to top](#top)

## 混入Mixins

- typscript中将类组合起来的方式，由多个较小的部分（mixin classes）组成
- 容许在不同的类之间重用和共享，促进模块化和代码可重用性

### 1. defination of mixins

- 创建一个混入类，该类使用构造函数签名扩展泛型类型参数TBase扩展，以容许它和其他类组合

```javascript
class TimestampMixin<TBase extends new(...args: any[]) => any>(Base: TBase) {
  constructor(...args: any[]) {
    super(...args);
  }
  getTimestamp() {
    return new Date();
  }
}
```

### 2. using mixins

```javascript
class MyBaseClass {
  constructor(public value: number) {}
  displayValue() {
    console.log(`The value is: ${this.value)}`);
  }
}
class MyMixedClass extends TimestampMixin(MyBaseClass) {   //创建新类，使用extend将TimestampMixin混合类应用于它
  constructor(value: number) {
    super(value);
  }
}
const instance = new MyMixedClass(42);
instance.displayValue();  // 42
const timestamp = instance.getTimestamp();
console.log(`The timestamp is: ${timestamp}`); 
```

[back to top](#top)

## 类型保护函数

- 是一种在特定代码块内缩小变量或参数类型范围的方式
- 容许区分不同类型，并访问特定于这些类型的属性或方法，促进类型安全并减少运行时错误的可能性

### 1. 定义

- 创建一个函数，该函数接受一个变量或参数并返回一个类型谓词
- 类型谓词是一个布尔表达式，可在函数范围内缩小参数的类型

```javascript
function isString(value: any): value is string { // 类型谓词value is string
  return typeof value === 'string';
}
```

### 2. using 

```javascript
function processValue(value: string | number) {
  if(isString(value)) {
    console.log(`The length of the string is: ${value.length}`);
  } else {
    console.log(`The square of the number is: ${value * value}`);
  }
}
processValue('Hello');  //5
processValue(42)        //1764
//类型保护函数isString确保为每种类型执行适当的代码块，容许范围特定于类型的属性和方法，而不会产生任何类型错误
```

[back to top](#top)

## 使用类型Utility Types

- 提供一种方便的方法，将现有类型转换为新类型
- 容许创建更复杂和灵活的类型，而无需从头定义，促进代码的可重用性和类型的安全性

```javascript
//1. defination
interface Person {
  name: string;
  age: number;
  email: string;
}
type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type NameAndAge = Pick<Person, 'name' | 'age'>;
type WithoutEmail = Omit<Person, 'email'>;
//2. using
const partialPerson: PartialPerson = {
  name: 'John Doe';
}
const readonlyPerson: ReadonlyPerson = {
  name: 'John Doe',
  age: 30,
  email: 'jane@example.com',
}
readonlyPerson.age = 31; // error
const nameAndAge: NameAndAge = {
  name: 'John Doe',
  age: 25,
}
nameAndAge.email;  //error
```

> 前端大学公众号
