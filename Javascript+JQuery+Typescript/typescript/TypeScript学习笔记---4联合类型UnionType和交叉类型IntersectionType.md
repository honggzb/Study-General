[TypeScript学习笔记---4联合类型和交叉类型](#top)

- [联合类型Union type](#联合类型union-type)
- [交叉类型Intersection type](#交叉类型intersection-type)
- [联合类型和交叉类型在angular中应用](#联合类型和交叉类型在angular中应用)

------------------------------------------------

## 联合类型Union type

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

## 交叉类型Intersection type

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
// 同名的那个属性是复杂数据类型，那么交叉的结果，就是将对象成员进行合并，合并规则与类型合并相同
interface A {
  x:{d:true},
}
interface B { 
  x:{e:string},
}
interface C {  
  x:{f:number},
}
// 合并之后 类型变为 {x: {d: true,e: string,f: number}}
type ABC = A & B & C
let abc:ABC = { 
  x:{  
    d:true,  
    e:'',   
    f:666  
  }
}
```

## 联合类型和交叉类型在angular中应用

```typescript
//types.ts  \business-domain\account-maintenance\accounts\account\requests\types\interfaces.ts
export type FilterBaseType = {
  attributeName: string;
};
export type StringFilterType = {
  fromOrSingleString?: string;
} & FilterBaseType;
export type AmountFilterType = {
  fromOrSingleAmount?: number;
  toAmount?: number;
} & FilterBaseType;
export type DateFilterType = {
  fromOrSingleDate?: string;
  toDate?: string;
} & FilterBaseType;

export type FilterByAttributeType = StringFilterType | AmountFilterType | DateFilterType;

export type IRequestsFilter = {
  sortBy: string;
  sortDirection: string;
  //...
  filterByAttributeValues: FilterByAttributeType[];
  expanded?: string;
};
```

[⬆ back to top](#top)

> references
- [typescript 交叉类型](https://blog.csdn.net/qq_40340943/article/details/130053119)
- [typescript联合类型](https://blog.csdn.net/qq_40340943/article/details/127052397)
- [Typescript学习 交叉类型 函数重载](https://blog.csdn.net/aminwangaa/article/details/110131762)
