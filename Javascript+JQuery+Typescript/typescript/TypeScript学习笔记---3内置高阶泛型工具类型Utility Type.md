[TypeScript学习笔记---内置高阶泛型工具类型Utility Type](#top)

- [概念](#概念)
- [Awaited](#awaited)
- [Partial](#partial)
- [Required](#Required)
- [Readonly](#readonly)
- [Record\<Keys, Type\>](#recordkeys-type)
- [Pick\<Type, Keys\>](#picktype-keys)
- [Omit\<Type, Keys\>](#omittype-keys)
- [Exclude\<UnionType, ExcludedMembers\>](#excludeuniontype-excludedmembers)
- [Extract\<Type, Union\>](#extracttype-union)
- [NonNullable](#nonnullable)
- [Parameters](#parameters)
- [ConstructorParameters](#constructorparameters)
- [ReturnType](#returntype)
- [InstanceType](#instancetype)
- [ThisParameterType](#thisparametertype)
- [OmitThisParameter](#omitthisparameter)
- [ThisType](#thistype)
- [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)

-------------------------------------------------------

## 概念

- TypeScript provides several utility types to facilitate **common type transformations**. These utilities are available **globally**
- utility types是ts的工具类型，它们是用泛型实现的，是泛型用法的体现
- utility types是TS 内置的 实用类型，用于类型转换

## Awaited<Type>

- model operations like `await` in async functions, or the `.then()` method on Promises - specifically, the way that they recursively unwrap `Promises`
- release 4.5

```typescript
type A = Awaited<Promise<string>>;             //type A = string
type B = Awaited<Promise<Promise<number>>>;    //type B = number
type C = Awaited<boolean | Promise<number>>;   //type C = number | boolean
```

[⬆ back to top](#top)

## Partial<Type>

- Constructs a type with all properties of Type set to optional (构造一个 Type 的所有属性都设置为 optional 的类型)
- return a type that represents all subsets of a given type()返回表示给定类型的所有子集的类型
- release 2.1

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Partial<T> = {
    [P in keyof T]?: T[P]
}
// examples
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## Required<Type>

- Constructs a type consisting of all properties of Type set to required. 
- The opposite of `Partial`.
- release 2.8

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Required<T> = {
  [P in keyof T]-?: T[P]
}
// examples
interface Props {
  a?: number;
  b?: string;
}
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 };
//Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

[⬆ back to top](#top)

## Readonly<Type>

- Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
- release 2.8

```typescript
// 实现原理：把 传入类型Type 的 key 变为 只读的
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
// examples
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello";    // Cannot assign to 'title' because it is a read-only property.
```

[⬆ back to top](#top)

## Record<Keys, Type>

- Constructs **an object type** whose property keys are Keys and whose property values are Type
- This utility can be used to map the properties of a type to another type 可用于将一个类型的属性映射到另一个类型
- release 2.1

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
// examples
interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
cats.boris;    //
//例子2：数据扁平化：将数组变成对象
const goodSymid = Symbol('goodid')
interface Goods {
    [goodSymid]: number
    name: string
    price: number
}
const goodList: Goods[] = [
    { [goodSymid]: 101, name: '食物种子', price: 5 },
    { [goodSymid]: 102, name: '蚂蚁城堡', price: 88 },
    { [goodSymid]: 103, name: '工匠收获蚁', price: 20 },
]
let goodResult: Record<number, Goods> = {}     //
goodList.forEach((good) => {
    goodResult[good[goodSymid]] = good
})
console.log(goodResult);
for (let goodid in goodResult) {
    console.log(goodResult[goodid])
}
/* 输出为
{ name: '食物种子', price: 5, [Symbol(goodid)]: 101 }
{ name: '蚂蚁城堡', price: 88, [Symbol(goodid)]: 102 }
{ name: '工匠收获蚁', price: 20, [Symbol(goodid)]: 103 }
*/
```

[⬆ back to top](#top)

## Pick<Type, Keys>

- Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type
- release 2.1

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Pick<K extends keyof any, T> = {
    [P in K]: T;
};
// examples
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

[⬆ back to top](#top)

## Omit<Type, Keys>

- Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
- The opposite of Pick
- release 3.5

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
// examples
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
```

[⬆ back to top](#top)

## Exclude<UnionType, ExcludedMembers>

- Constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`
- release 2.8

```typescript
// examples
type T0 = Exclude<"a" | "b" | "c", "a">;     // type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;    //type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;    // type T2 = string | number
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
type T3 = Exclude<Shape, { kind: "circle" }>
```

[⬆ back to top](#top)

## Extract<Type, Union>

- Constructs a type by extracting from `Type` all union members that are assignable to `Union`
- release 2.8

```typescript
// examples
type T0 = Extract<"a" | "b" | "c", "a" | "f">;                 //type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;   //type T1 = () => void
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
type T2 = Extract<Shape, { kind: "circle" }>  
/*type T2 = {
    kind: "circle";
    radius: number;
}*/
```

[⬆ back to top](#top)

## NonNullable<Type>

- Constructs a type by excluding `null` and `undefined` from Type.
- release 2.8

```typescript
// examples
type T0 = NonNullable<string | number | undefined>;     // type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>;     // type T1 = string[]
```

[⬆ back to top](#top)

## Parameters<Type>

- Constructs a tuple type from the types used in the parameters of a function type Type.
- For overloaded functions, this will be the parameters of the last signature
- release 3.1

```typescript
// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
// examples
declare function f1(arg: { a: number; b: string }): void;
type T0 = Parameters<() => string>;         // type T0 = []
type T1 = Parameters<(s: string) => void>;  // type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>;     // type T2 = [arg: unknown]
type T3 = Parameters<typeof f1>;
/*
type T3 = [arg: {
    a: number;
    b: string;
}] */
type T4 = Parameters<any>;    //type T4 = unknown[]
type T5 = Parameters<never>;  // type T5 = never
type T6 = Parameters<string>; //Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = never
type T7 = Parameters<Function>;
//Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//Type 'Function' provides no match for the signature '(...args: any): any'.
//type T7 = never
```

[⬆ back to top](#top)

## ConstructorParameters<Type>

- Constructs a type consisting of the return type of function Type.
- For overloaded functions, this will be the return type of the last signature
- release 3.1

```typescript
// examples
type T0 = ConstructorParameters<ErrorConstructor>;    // type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>; // type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;   // type T2 = [pattern: string | RegExp, flags?: string]
class C {
  constructor(a: number, b: string) {}
}
type T3 = ConstructorParameters<typeof C>;         // type T3 = [a: number, b: string]
type T4 = ConstructorParameters<any>;              // type T4 = unknown[]
type T5 = ConstructorParameters<Function>;
//Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//  Type 'Function' provides no match for the signature 'new (...args: any): any'.
//type T5 = never
```

[⬆ back to top](#top)

## ReturnType<Type>

- Constructs a type consisting of the return type of function Type
- For overloaded functions, this will be the return type of the last signature
- release 2.8

```typescript
// examples
declare function f1(): { a: number; b: string };
type T0 = ReturnType<() => string>;         //type T0 = string
type T1 = ReturnType<(s: string) => void>;  // type T1 = void
type T2 = ReturnType<<T>() => T>;           // type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;  // type T3 = number[]
type T4 = ReturnType<typeof f1>;
/* type T4 = {
    a: number;
    b: string;
}*/
type T5 = ReturnType<any>;   // type T5 = any
type T6 = ReturnType<never>; // type T6 = never
type T7 = ReturnType<string>;
//Type 'string' does not satisfy the constraint '(...args: any) => any'.
//type T7 = any
type T8 = ReturnType<Function>;
//Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//  Type 'Function' provides no match for the signature '(...args: any): any'.
//type T8 = any
```

[⬆ back to top](#top)

## InstanceType<Type>

- Constructs a type consisting of the instance type of a constructor function in Type
- release 2.8

```typescript
// examples
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof C>;    // type T0 = C
type T1 = InstanceType<any>;         //type T1 = any
type T2 = InstanceType<never>;       //type T2 = never
type T3 = InstanceType<string>;
// Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'
// type T3 = any
type T4 = InstanceType<Function>;
//Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//  Type 'Function' provides no match for the signature 'new (...args: any): any'.
//type T4 = any
```

[⬆ back to top](#top)

## ThisParameterType<Type>

- Extracts the type of the `this` parameter for a function type, or unknown if the function type has no `this` parameter
- released 3.3

```typescript
// examples
function toHex(this: Number) {
  return this.toString(16);
}
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

[⬆ back to top](#top)

## OmitThisParameter<Type>

- Removes the `this` parameter from Type. If Type has no explicitly declared `this` parameter, the result is simply Type. Otherwise, a new function type with no `this` parameter is created from Type.
- Generics are erased and only the last overload signature is propagated into the new function type
- released 3.3

```typescript
// examples
function toHex(this: Number) {
  return this.toString(16);
}
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());
```

[⬆ back to top](#top)

## ThisType<Type>

- This utility does not return a transformed type. Instead, it serves as a marker for a contextual `this` type. 
- Note that the `noImplicitThis` flag must be enabled to use this utility
- released 2.3

```typescript
// examples
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;   // Type of 'this' in methods is D & M
};
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

[⬆ back to top](#top)

## Intrinsic String Manipulation Types

- To help with string manipulation around [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- `Uppercase<StringType>`
- `Lowercase<StringType>`
- `Capitalize<StringType>`
- `Uncapitalize<StringType>`

[⬆ back to top](#top)

> references
- [typescript （TS）进阶篇 --- 内置高阶泛型工具类型（Utility Type）](https://blog.csdn.net/m0_52409770/article/details/123049461)
- [TypeScript官网](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript 的 Utility Types，你真的懂吗？](https://zhuanlan.zhihu.com/p/488232655)
- [typescript （TS）进阶篇 --- 内置高阶泛型工具类型（Utility Type）](https://blog.csdn.net/m0_52409770/article/details/123049461)
- [TypeScript 工具类型 - Utility Types](https://blog.csdn.net/i042416/article/details/118386007)
