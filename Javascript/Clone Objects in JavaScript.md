[Clone Objects in JavaScript](#top)

`const obj = {one: 1, two: 2};`

```javascript
           =                     |  spread ...                     | Object.assign()                       | JSON.parse()
---------------------------------|---------------------------------|---------------------------------------|-----------------------------------------------
const obj1 = obj;                | const obj2 = { ...obj };        | const obj3 = Object.assign({}, obj);  | const obj4 = JSON.parse(JSON.stringify(obj));
obj1.three = 3;                  | obj2.three = 3;                 | obj3.three = 3;                       | obj4.three = 3;
obj   {one:1, two: 2, three: 3}  | obj {one:1, two: 2 }            | obj {one:1, two: 2 }                  | obj {one:1, two: 2 }
obj1  {one:1, two: 2, three: 3}  | obj2 {one:1, two: 2, three: 3}  | obj3 {one:1, two: 2, three: 3}        | obj4 {one:1, two: 2, three: 3}
```

note: 
 
- Shallow copy: if the array is nested or multi-dimensional, shallow copy did not work
  - `Object.assign` is in the official released and also create a shallow copy of the object
  - spread is a shallow copy
- Deep copy: is a true copy for nested objects
  - `JSON.stringify/parse` only work with Number and String and Object literal without function or Symbol properties
  - `deepClone` work with all types, function and Symbol are copied by reference
- `Object.assign` is a lot faster than `JSON`
- [Performance Test](https://jsperf.com/3-ways-to-clone-object/1)
