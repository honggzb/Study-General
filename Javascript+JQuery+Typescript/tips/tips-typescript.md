## Array常用操作

- [remove item from array using filter](#remove-item-from-array-using-filter)
- [move item to end of array using spread](#move-item-to-end-of-array-using-spread)

```ts
const tt = [
  { id: 3, name: 'aa'},
  { id: 1, name: 'aa11'},
  { id: 4, name: 'aa44'},
  { id: 7, name: 'aa77'},
 ];
```

|function|operator|code|
|---|---|---|
|[remove item from array]((#1-remove-item-from-array-using-filter))|filter|`tt.filter(t => t.id !== 4)`|
|[move item to end of array](#2-move-item-to-end-of-array-using-spread)|filter, spread|`const aa = tt.filter(t => t.id === 4);`<br>`const bb =[...tt.filter(t => t.id !== 4), ...aa]`|
|数组中查找某个值|find|`pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');`|
|解构赋值简写||`const { store, form, loading, errors, entity:contact } = this.props;`|
|字符串转换为数字||`console.log(+('str'))`|

[⬆ back to top](#top)

## 对象数组转字符串

|数组对象|operator|code|
|---|---|---|
|转为普通字符串|`join()` and `toString()`|`[1, 2, 3].join();//"1,2,3" `<br>`[1, 2, 3].toString();`|
|转为JSON字符串|`JSON.stringify()`|`JSON.stringify([{name: "Jack", age: 18}, {name: "Peter", age: 20}]);`<br>`//"[{\"name\":\"Jack\",\"age\":18},{\"name\":\"Peter\",\"age\":20}]" `|
|转为HTML字符串|模板字符串和`map()`方法|`const arr = [{name: "Jack", age: 18}, {name: "Peter", age: 20}];`<br>`const htmlStr = arr.map(item => <li>${item.name}: ${item.age}</li>).join("");`<br>`"<li>Jack: 18</li><li>Peter: 20</li>"`|
|转为CSV字符串|模板字符串和`reduce()`方法|`const arr = [{name: "Jack", age: 18}, {name: "Peter", age: 20}];`<br>`const csvStr = arr.reduce((prev, cur) => prev+cur.name+","+cur.age+"\n", "name,age\n");`<br>`//"name,age\nJack,18\nPeter,20\n"`|
|转为URL参数字符串|`URLSearchParams`对象的实例||

```ts
const arr = [{name: "Jack", age: 18}, {name: "Peter", age: 20}];
const urlParams = new URLSearchParams();
for(let i=0; i<arr.length; i++){
  urlParams.append("name",arr[i].name);
  urlParams.append("age",arr[i].age);
}
console.log(urlParams.toString()); //name=Jack&age=18&name=Peter&age=20
//注意，如果数组元素中存在重复的属性名，通过URLSearchParams对象转换的参数字符串也会重复，需要根据实际需求进行处理
```

[⬆ back to top](#top)

## 对象,字符串相互转化

|数组对象|operator|code|
|---|---|---|
|json对象转字符串|`JSON.stringify()`|`JSON.stringify({name: "Jack", age: 18})`<br>`//'{"name":"Jack","age":18}'`|
|json字符串转对象|`JSON.parse()`|`JSON.parse('{"id":0,"name":"张三","age":12}')`|

[⬆ back to top](#top)

