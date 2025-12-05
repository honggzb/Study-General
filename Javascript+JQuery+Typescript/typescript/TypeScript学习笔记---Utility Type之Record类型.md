## [TypeScript学习笔记---Utility Type之Record类型](#top)

- [引言](#引言)
- [Record类型的基本用法](#record类型的基本用法)
  - [用例1：强制穷尽性案例处理](#用例1强制穷尽性案例处理)
  - [用例2：使用泛型强制应用程序中的类型检查](#用例2使用泛型强制应用程序中的类型检查)
  - [用例3：将枚举映射到数据](#用例3将枚举映射到数据)
  - [用例4：创建查找表](#用例4创建查找表)


## 引言

- Record类型是一种实用类型，允许创建具有指定键和统一值类型的对象类型。这种类型特别适用于定义映射并确保对象中的所有值都符合单一类型
- Record类型的定义: `Record<Keys, Type>`
  - **Keys**表示记录中的键集，可以是字符串字面量的联合或从联合派生的类型
  - **Type**是与这些键关联的值的类型
- 例如，`Record<string, number>`定义了一个对象，其中每个键都是字符串，每个值都是数字。这种类型确保对象的所有属性都具有相同的值类型，<mark>但键可以变化</mark>


## Record类型的基本用法

```ts
// ‌1. 使用字符串字面量联合类型作为键
// 特定的管理员角色作为键，它们的描述作为值
// 定义可能的用户角色
ype UserRole = 'admin' | 'blogAdmin' | 'docsAdmin';
type UserRoles = Record<UserRole, string>;
const roles: UserRoles = {
  admin: 'General Administrator with access to all areas.',
  blogAdmin: 'Administrator with access to blog content.',
  docsAdmin: 'Administrator with access to documentation.'
};
// ‌2. 与泛型结合使用
function createRecord<K extends string, T>(keys: K[], value: T): Record<K, T> {
  const record: Record<K, T> = {} as Record<K, T>;
  keys.forEach(key => {
    record[key] = value;
  });
  return record;
}
// 使用示例
const statuses = createRecord(['active', 'inactive', 'pending'], false);
// 类型推断为: Record<'active' | 'inactive' | 'pending', boolean>
```

[⬆ back to top](#top)

**Record 与 Tuple 的区别**

|特性	|Record	|Tuple|
|---|---|---|
|‌成员标识‌	|通过‌名称‌（键）标识|	通过‌位置‌标识|
|‌用途‌	|描述具有命名字段的对象（如配置、映射）	|描述有固定顺序和数量的集合（如坐标、RGB颜色值）|
|‌灵活性‌	|字段顺序无关，可通过任意键访问	|元素顺序固定，必须通过位置访问|

```ts
// Record: 通过名称访问
type PersonRecord = Record<'name' | 'age', string | number>;
const person1: PersonRecord = { name: "Alice", age: 30 };
// Tuple: 通过位置访问
type PersonTuple = [string, number];
const person2: PersonTuple = ["Alice", 30];
// 访问名字: person2, 访问年龄: person2‌:ml-citation{ref="1" data="citationList"}
```

[⬆ back to top](#top)

### 用例1：强制穷尽性案例处理

```ts
type Status = 'pending' | 'completed' | 'failed';
interface StatusInfo {
  message: string;
  severity: 'low' | 'medium' | 'high';
  retryable: boolean;
}
const statusMessages: Record<Status, StatusInfo> = {
  pending: {
    message: 'Your request is pending.',
    severity: 'medium',
    retryable: true,
  },
  completed: {
    message: 'Your request has been completed.',
    severity: 'low',
    retryable: false,
  },
  failed: {
    message: 'Your request has failed.',
    severity: 'high',
    retryable: true,
  },
};
function getStatusMessage(status: Status): string {
  const info = statusMessages[status];
  return `${info.message} Severity: ${info.severity}, Retryable: ${info.retryable}`;
}
// 请求成功的情况。
console.log(getStatusMessage('completed')); // Your request has been completed. Severity: low, Retryable: false
```

[⬆ back to top](#top)

### 用例2：使用泛型强制应用程序中的类型检查

- TypeScript中的泛型允许灵活和可重用的代码。当与Record结合时，泛型可以帮助强制类型检查并确保对象符合特定结构
- 通过将泛型与Record一起使用，我们可以创建具有特定键集和一致值类型的函数或实用程序来生成对象。这种方法增强了我们代码库中的类型安全性和可重用性
- 在下面的示例中，createRecord函数接受一个键数组和一个值，并返回一个Record，其中每个键映射到提供的值。此函数使用泛型（K表示键，T表示值类型）来确保生成的Record具有正确的结构

```ts
function createRecord<K extends string, T>(keys: K[], value: T): Record<K, T> {
  const record: Partial<Record<K, T>> = {};
  keys.forEach(key => record[key] = value);
  return record as Record<K, T>;
}
interface RoleInfo {
  description: string;
  permissions: string[];
}
const userRoles = createRecord(['admin', 'editor', 'viewer'], {
  description: 'Default role',
  permissions: ['read'],
});
console.log(userRoles);
/*
//输出:
{
  admin: { description: 'Default role', permissions: ['read'] },
  editor: { description: 'Default role', permissions: ['read'] },
  viewer: { description: 'Default role', permissions: ['read'] }
}
*/
```

[⬆ back to top](#top)

### 用例3：将枚举映射到数据

```ts
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
  Yellow = 'YELLOW'
}
interface ColorInfo {
  hex: string;
  rgb: string;
  complementary: string;
}
// 一种清晰且类型安全的方式来处理基于枚举值的颜色相关数据
const colorHex: Record<Color, ColorInfo> = {
  [Color.Red]: {
    hex: '#FF0000',
    rgb: 'rgb(255, 0, 0)',
    complementary: '#00FFFF',
  },
  [Color.Green]: {
    hex: '#00FF00',
    rgb: 'rgb(0, 255, 0)',
    complementary: '#FF00FF',
  },
  [Color.Blue]: {
    hex: '#0000FF',
    rgb: 'rgb(0, 0, 255)',
    complementary: '#FFFF00',
  },
};
console.log(colorHex[Color.Green]); //输出: { hex: '#00FF00', rgb: 'rgb(0, 255, 0)', complementary: '#FF00FF' }
```

[⬆ back to top](#top)

### 用例4：创建查找表

```ts
type CountryCode = "US" | "CA" | "MX" | "JP";
interface CountryInfo {
  name: string;
  population: number;
  capital: string;
  continent: string;
}
const countryLookup: Record<CountryCode, CountryInfo> = {
  US: {
    name: "United States",
    population: 331000000,
    capital: "Washington D.C.",
    continent: "North America",
  },
  CA: {
    name: "Canada",
    population: 37700000,
    capital: "Ottawa",
    continent: "North America",
  },
  MX: {
    name: "Mexico",
    population: 128000000,
    capital: "Mexico City",
    continent: "North America",
  },
  JP: {
    name: "Japan",
    population: 126300000,
    capital: "Tokyo",
    continent: "Asia",
  },
};
console.log(countryLookup.US);
/*
//输出:
{
  name: "United States",
  population: 331000000,
  capital: "Washington D.C.",
  continent: "North America"
}
*/
console.log(countryLookup.US.population);//输出: 331000000,
```

[⬆ back to top](#top)

> [TypeScript Record类型完全指南：从基础到高级应用](https://cloud.tencent.com/developer/article/2557811)
