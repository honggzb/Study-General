## [JavaScript Simplified](#top)

- [Destructuring, Spread And Rest Operator](#destructuring-spread-and-rest-operator)
  - [Destructuring](#destructuring)
  - [Spread And Rest Operator](#spread-and-rest-operator)
  - [Enhanced Object Literals](#enhanced-object-literals)
  - [Default parameters](#default-parameters)
- [Null Coalescing](#null-coalescing)
- [Maps](#maps)
- [Sets](#sets)
- [Symbols](#symbols)
- [Object Getters and Setters](#object-getters-and-setters)
- [Bind, Call and Apply](#bind-call-and-apply)


### Destructuring, Spread And Rest Operator

#### Destructuring

```javascript
const array = ['a', 'b', 'c', ['d', 'e']];
const person = {
  name: 'Kyle',
  age: 23,
  favoriteFood: 'rice',
  address: {
    street: '123 main st',
    city: 'somewhere',
  }
}
//1. destruction sample of array
const [first, second, third, [fourth, fifth]] = array;
function addAndMultiply(a, b) {    // function sample 1
  return [ a + b, a * b];
}
const result = addAndMultiply(2, 3);
const [sum, product] = addAndMultiply(2, 3);
function addAndMultiply(options) {  // function sample 2
  const { a, b } = options;
  return [ a + b, a * b];
}
const [sum, product] = addAndMultiply({ a: 2, b: 3 });
function addAndMultiply({ a, b = 4 }) {  // function sample 3 - default value
  return [ a + b, a * b];
}
const [sum, product] = addAndMultiply({ a: 2 });
//2.  destruction sample of object
const { name: firstName, age } = person;   // rename to a variable, firstName = 'Kyle', age = 23
const { street } = person;
const { address : { street, city } } = person;   //
const { address : { street, city, zipcode = '12345' } } = person;   // set default value
const {
  age,
  name,
  favoriteFood,
  address: { street }
} = person;
function nameToFirstAndLast(fulllName) {
  const [firstName, lastName] =  fullName.split(' ');
  return {
    firstName: firstName,
    lastName: lastName,
  };
}
const { firstName, lastName } = nameToFirstAndLast('Kyle Cool');
```

[back to top](#top)

#### Spread And Rest Operator

```javascript
const numberArray = [2, 3, 6, 7, 2];
function sum(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
console.log(sum(...numberArray));    //20
function sum(multiplier, ...numbers) {
  return multiplier * numbers.reduce((sum, number) => sum + number, 0);
}
console.log(sum(10, 2, 4));     //60
// sample 1 - clone a array, very useful
const newArray = [...numberArray];
numberArray.push(5);
console.log(newArray);       // [2, 3, 6, 7, 2]
console.log(numberArray);    // [2, 3, 6, 7, 2, 5]
// sample 2 - div operation
const divs = document.querySelectorAll('div');   // divs is a NodeList and it is not a array
divs.map(div => { console.log(div); })   // Uncaught TypeError: divs.map is not a function
// method 1
[...divs].map(div => { console.log(div); })
// method 2
const divs = [...document.querySelectorAll('div')];  // change NodeList to a array by using spread operator
divs.map(div => { console.log(div); })
```

[back to top](#top)

#### Enhanced Object Literals

```javascript

```

[back to top](#top)

#### Default parameters

```javascript
function greet(firstName, lastName, salutation = 'Hi') {
  console.log(`${salutation}, ${firstName} ${lastName}`);
}
greet('Kyle', 'Cook');               // Hi, Kyle Cook
greet('Kyle', 'Cook', undefined);    // Hi, Kyle Cook
greet('Kyle', 'Cook', null);         // null, Kyle Cook

function greet(firstName, lastName, { salutation = 'Hi', suffix = 'Mr'} = {}) {
  console.log(`${salutation}, ${firstName} ${lastName}`);
}
greet('Kyle', 'Cook');         // Hi, Mr Kyle Cook
```

[back to top](#top)

### Null Coalescing

```javascript
function greet(firstName = 'Sally', lastName) {
  lastName = lastName ?? 'Smith';
  console.log(`${firstName} ${lastName}`);
}
greet('Kyle');    // Kyle Smith
greet('Kyle', undefined);    // Kyle Smith
greet('Kyle', null);    // Kyle Smith
```

[back to top](#top)

### Maps

- key of maps can be anything
- map have `set`, `get`, `has`, `delete`, `clear` function
- Maps vs Object
  - maps have length(`map.size`), Object did not have
  - map have a order, Object did not have

```javascript
// sample 1
const CURRENCY_MAP = {      //object
  'United States': 'USD',
  'India': 'Rupee',
};
const currency = CURRENCY_MAP['India'];   // Rupee
const map = new Map([       //map
  ['United States','USD'],
  ['India','Rupee']
]);
console.log(map.get('India'));  // Rupee
map.forEach((value, key)=> {
  console.log(value, key);
});
Object.entries(CURRENCY_MAP).forEach(([key, value]) => {
  console.log(value, key);
})
const map = new Map([     // key of maps can be anything
  [{a: 1},'USD'],
  ['India','Rupee']
]);
// sample 3
const items = new Map();
items.set(1, { id: 1, name: 'Test 1', description: 'Desc 1' });
items.set(2, { id: 2, name: 'Test 1', description: 'Desc 2' });
items.set(1, { id: 1, name: 'Test 3', description: 'Desc 3' });
function getItem(id) {
  return items.get(id);
}
console.log(getItem(2));
```

[back to top](#top)

### Sets

```javascript
const uniqueList = [1,2,3,4,5];
const newNumber = 4;
if(!uniqueList.includes(newNumber)) {
  uniqueList.add(newNumber);
}
const set = new Set([1,2,3,4,5,4,4,4,4,4]);
console.log(set);   //{1,2,3,4,5}
set.add(5)
console.log(set);   //{1,2,3,4,5}
console.log(set.has(3));  //true
set.forEach(value => {
  console.log(value);
});
set.delete(3);
console.log(set.size);
set.clear();
// sample
function removeDups(array) {
  return [...new Set(array)];
}
```

[back to top](#top)

### Symbols

- Symbol is always unique
- Symbol is not accessible, it is hidden

```javascript
//1. unique
const sym1 = Symbol('Name');
const sym2 = Symbol('Name');
console.log(sym1 === sym2);   //false
// use case of using unique
const LOG_LEVEL = {
  DEBUG: Symbol('debug),
  INFO: Symbol('info),
  WARNING: Symbol('warning),
  ERROR: Symbol('error),
}
const logLevel = LOG_LEVEL.DEBUG;
if(logLevel === LOG_LEVEL.DEBUG) {
  //...
}
//2. not accessible
const sym1 = Symbol('Name');
const person = {
  age: 25,
  [sym1]: 'Kyle',
};
console.log(person);   //{age: 25, Symbol(Name): 'Kyle'}
Object.entries(person).forEach(([key,value]) => console.log(key, value));  // age 25
JSON.stringify(person);    // {"age":25}
Object.getOwnPropertySymbols(person);   // [Symbol(Name)]
```

[back to top](#top)

### Object Getters and Setters

```javascript
const person = {
  firstName: 'Kyle',
  lastName: 'Cook',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
}
person.fullName = 'Sally Smith';
console.log(person);
//
const person = {
  age: 25,
  get birthYear() {
    const date = new Date();
    return date.getFullYear() - this.age;
  }
};
console.log(person.birthYear);
```

[back to top](#top)

### Bind, Call and Apply

```javascript
//bind
function product(a, b) {
  return a * b;
}
const numbers = [1,2,3,4,5];
const newNumbers = numbers.map(product.bind(null, 2));
//const newNumbers = numbers.map(number => product(2, number));
console.log(newNumbers);  // [2, 4, 6, 8, 10]

```

[back to top](#top)

### Math solver

```javascript

```

[back to top](#top)

### Symbols

```javascript

```

[back to top](#top)
