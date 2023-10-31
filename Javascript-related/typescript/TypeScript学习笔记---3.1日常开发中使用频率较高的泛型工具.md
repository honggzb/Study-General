## TypeScript学习笔记---3.1日常开发中使用频率较高的泛型工具

```javascript
/**
 * 获取函数第二个参数类型
 */
export type GetSecondArgs<T> = T extends (_: any, arg: infer R) => any ? R : any;

/**
 * 根据type类型控制Args类型是否为必传
 * 若type符合OtherType类型，则返回必传的Args类型，否则返回Args类型
 */
export type IsRequiredText<T, OtherType, Args> = 'type' extends keyof T
    ? T['type'] extends OtherType
        ? Required<Args>
        : Args
    : never;

/**
 * 将传入的 T 对象里的key替换成自定义驼峰
 * 'login' => 'PrefixLogin'
 */
export type AddPrefixKeyToObject<T, Prefix extends string = ''> = {
    [P in keyof T as P extends string ? `${Prefix}${Capitalize<P>}` : P]: T[P];
};

/**
 * 联合类型转交叉类型
 */
export type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => any) ? I : never;

/**
 * 获取联合类型最后的值
 */
export type GetUnionLastValue<T> = UnionToIntersection<(T extends any ? () => T : never)> extends (() => infer R) ? R : never;

/**
 * 数组后位加类型 
 */
export type Push<T extends any[], U> = [...T, U];

/**
 * 获取联合类型的长度
 * type Example = {
 *     a: '1';
 *     b: '2';
 *     c: '3';
 * };
 * 'GetUnionLength<typeof Example>'  ==> return '3' ;
 */
export type GetUnionLength<T, C extends any[] = [], K = GetUnionLastValue<T>> = [T] extends [never]
    ? C['length']
    : GetUnionLength<Exclude<T, K>, [K, ...C]>;

/**
 * 添加key-value类型到指定对象中
 */
export type AppendToObject<T, U extends keyof any, V> = {
    [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

/**
 * 指定对象里的某个key值必选
 */
export type RequiredSomeKey<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: T[P];
};

/**
 * 计算字符串长度
 */
export type LengthOfString<T extends string, K extends String[] = []> = T extends `${infer F}${infer R}`
    ? LengthOfString<R, [F, ...K]>
    : K['length'];

export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

// 联合类型转数组
export type UnionToArray<T, U extends NonEmptyArray<T> = NonEmptyArray<T>> = MustInclude<T, U>

/**
 * 联合类型转元组
 */
export type Union2Tuple<T, ArrayType = T, A extends any[] = [], L = GetUnionLength<T>> = A['length'] extends L
    ? A
    : Union2Tuple<T, ArrayType, Push<A, ArrayType>>;

/**
 * 合并两个对象key value，若key重复，则保留F类型的value
 */
export type Merge<F, S> = {
    [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never;
};

/**
 * 联合类型的key value合并到一个对象中
 */
export type UnionObjectKeysToObject<
    T,
    A extends any[] = [],
    O = {},
    L = GetUnionLength<T>,
    V = GetUnionLastValue<T>
> = A['length'] extends L ? O : UnionObjectKeysToObject<Exclude<T, V>, Push<A, V>, Merge<O, V>, L>;

/**
 *	路由参数key value获取
 *	a=1&b=2&c=3 ⇒ { a:1, b:2, c:3 }
 */
export type ParseQueryStr<T extends string, O = {}> = T extends `${infer K}=${infer R}`
  ? R extends `${infer V}&${infer AR}`
    ? ParseQueryStr<AR, AppendToObject<O, K, V>>
    : R extends `${infer V}`
      ? AppendToObject<O, K, V>
      : O
  : never
```

> [日常开发中使用频率较高的泛型工具](https://blog.csdn.net/m0_52409770/article/details/127840067)
