## 十大JavaScript对象方法

```ts
const car = {  
  brand: 'Toyota',  
  model: 'Camry',  
  year: 2023,
};
const entries = [  
  ['name', 'Datta'],  
  ['age', 25], 
  ['country', 'India'],
];
```

|对象方法||sample|
|---|---|---|
|`Object.hasOwn()`|安全地检查属性|`Object.hasOwn(user, 'name')`|
|`Object.groupBy()`|将数组数据分组为对象|`const groupedByCategory = Object.groupBy(products, (product) => {  return product.category;});`|
|`Object.create()`|在不使用构造函数的情况下创建对象||
|`Object.keys()`|遍历对象属性, such as 校验对象是否为空 |`const keys = Object.keys(car) // ["brand", "model", "year"]`|
|`Object.values()`|遍历对象属性, such as从 API 数据中提取值|`const values= Object.values(car); // ["Toyota", "Camry", 2023]`|
|`Object.entries()`|将对象转换为 Map|`const data = Object.entries(car) // [["brand", "Toyota"], ["model", "Camry"], ["year", 2023]]`|
|`Object.fromEntries()`|将键值对重新转换为对象|`const user = Object.fromEntries(entries);` // { name: "Datta", age: 25, country: "India" }|
|`Object.assign()`|合并对象, 创建浅拷贝|`const returnedTarget = Object.assign(target, source);`<br>`const clone = Object.assign({}, obj);  //shallow copy `|
|`Object.seal()`|当对象结构必须保持不变时使用<br>防止意外删除属性|`Object.seal(person); //Seal the object: no new properties, no deletions allowed `|
|`Object.freeze()`|防止意外修改, 常用于状态管理|``|
