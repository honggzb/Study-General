### ts之interface和type的区别

|区别|interface|type|
|---|---|---|
|定义类型范围|只能定义对象类型|可以声明任何类型，基础类型、联合类型、交叉类型|
|合并声明|同名的interface会合并|定义两个同名的type回报异常|
|扩展性|继承 -> 可以使用extends和implements进行扩展|合并 -> 可以使用交叉类型`&`进行合并|
|高级类型操作‌||type 支持映射类型、条件类型等复杂操作<br>`type Partial<T> = { [P in keyof T]?: T[P] };`|
|‌优先适用场景|定义对象结构（如API响应格式<br>需要类实现接口约束（implements<br>通过声明合并扩展第三方库类型|定义联合类型,如`type Status = 'success' / 'error'`<br>创建元组或函数类型别名<br>需要组合复杂映射类型|


```typescript
//type定义类型范围
type Animal = Dog | Cat;  // 定义为元祖（指定某个位置具体是什么类型）
type Animal = [Dog, Cat];
type Animal = Dog & Cat;  // 定义为交叉类型（多种类型的集合）
//type扩展性
type Dog = { name:string };
type Cat = { age:number } & Dog;
// type & interface
interface Dog {
    name:string;
}
type Cat = { age:number } & interface;
// 继承方式来实现抽象定义实现
type Animal {
  name: string;
  say(): void;
}
// 面向协议编程
type Dog = Animal & {
  age: number;   //扩展
}
// ✅ 使用 type 定义复杂类型
type ApiResponse<T> = {
  data: T;
  error: string | null;
};
```
