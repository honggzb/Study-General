[TypeScript with Record types](#top)

- [Defination](#defination)
- [Iterating over TypeScript record types](#iterating-over-typescript-record-types)
- [React use case](#react-use-case)
- [Advanced use cases](#advanced-use-cases)
  - [selective type mapping with the Pick type](#selective-type-mapping-with-the-pick-type)
  - [handle dynamic keys in TypeScript safely](#handle-dynamic-keys-in-typescript-safely)
- [Record vs Map](#record-vs-map)
- [Record vs. indexed types](#record-vs-indexed-types)


## Defination

- Record type simply allows to define **dictionary-like objects**
  - `Record<Keys, Type>` is a utility type in TypeScript that helps define objects with specific **key-value** pairs
  - it creates an object type where the property keys are of **type Keys**, and the values are of **type Type**
- `type Record<K extends string | number | symbol, T> = { [P in K]: T; }`

```ts
type Identifiershort = 'L' | 'R' | 'P' | 'V' | 'S' | 'G' | 'M' | 'T' ;
type identifierMap  = Record<Identifiershort, string>;
const identifierfull: identifierMap = {
    'L': 'Licence',
    'R': 'RIN',
    'P': 'Plate',
    'V': 'VIN',
    'S': 'Special Permit',
    'G': 'Valtag',
    'M': 'Permit',
    'T': 'TDL',
};
console.log(identifierfull['R']); // Output: RIN
// another sample
type Course = "Computer Science" | "Mathematics" | "Literature"
interface CourseInfo {
  professor: string
  cfu: number
}
const courses: Record<Course, CourseInfo> = {
  "Computer Science": {
    professor: "Mary Jane",
    cfu: 12
  },
  "Mathematics": {
    professor: "John Doe",
    cfu: 12
  },
  "Literature": {
    professor: "Frank Purple",
    cfu: 12
  }
}
console.log(courses["Computer Science"].professor); // Output: "Mary Jane"
// function sample
type Fruit = 'Apple' | 'Banana' | 'Cherry' ;
const lowerFn = (text: string) => text.toLocaleLowerCase()  //Function to lowercase an input string.
const lowercaseFruitWriter: Record<Fruit,( fn: (text: string) => string ) => string> = {
  Apple: (fn) => console.log(fn('Apple')),
  Banana: (fn) => console.log(fn('Banana')),
  Cherry: (fn) => console.log(fn('Cherry'))
}
lowercaseFruitWriter['Apple'](lowerFn)  // Output: "apple"
```

[🚀back to top](#top)

## Iterating over TypeScript record types

<details>

<summary>using `forEach`</summary>

-  first need to convert the Record to an **array** of key-value pairs by using following method
-  `Object.keys()` returns an array of the record’s keys, which can then be iterated over using forEach or any loop
-  `Object.values()` returns an array of the record’s values, which can be iterated over
- ` Object.entries()` returns an array of key-value pairs, allowing you to use array destructuring within the loop

```ts
Object.keys(courses).forEach((key) => {
    const course = courses[key as Course];
    console.log(`${key}: ${course.professor}, ${course.cfu}`);
});
Object.values(courses).forEach((course) => {
    console.log(`${course.professor}, ${course.cfu}`);
});
Object.entries(courses).forEach(([key, value]) => {
    console.log(`${key}: ${value.professor}, ${value.cfu}`);
});
```

</details>

<details>

<summary>using `for...in`</summary>

- The `for...in` loop allows iterating over the keys of a record

```ts
for (const key in courses) {
    if (courses.hasOwnProperty(key)) {
        const course = courses[key as Course];
        console.log(`${key}: ${course.professor}, ${course.cfu}`);
    }
}
```

</details>

<br><br>

[🚀back to top](#top)

## React use case

```ts
// dropdown selection
type Fruit = 'Apple' | 'Banana' | 'Cherry' ;
const fruitComponent:Record<Fruit, JSX.Element> = {
  'Apple': <p>Apple</p>,
  'Banana': <p>Banana</p>,
  'Cherry': <p>Cherry</p>
};

const app = () => {
  const [fruit, setFruit] = React.useState<Fruit>('Apple');
  return (
    <div>
        <select onChange={(e) => setFruit(e.target.value as Fruit)}>
            {Object.keys(fruitComponent).map((f) => (
                <option key={f} value={f}>{f}</option>
            ))}
        </select>
        <div>
            {fruitComponent[fruit]}
        </div>
    </div>
  )
}
```

[🚀back to top](#top)

## Advanced use cases

### selective type mapping with the Pick type

- creating dictionaries with only a subset of properties.

```ts
interface CourseInfo {
    professor: string;
    cfu: number;
    semester: string;
    students: number;
}
// new type SelectedCourseInfo that only includes the professor and the cfu properties from CourseInfo
type SelectedCourseInfo = Pick<CourseInfo, "professor" | "cfu">;

type Course = "Computer Science" | "Mathematics" | "Literature";
const courses: Record<Course, SelectedCourseInfo> = {
    "Computer Science": { professor: "Mary Jane", cfu: 12 },
    "Mathematics": { professor: "John Doe", cfu: 12 },
    "Literature": { professor: "Frank Purple", cfu: 12 },
};
```

### handle dynamic keys in TypeScript safely

- Using Record with **string keys**, it provides type safety for the union values while allowing any string to be used as the key

```ts
type PreferenceValue = string | boolean | number;
type Preferences = Record<string, PreferenceValue>;   // string keys
const userPreferences: Preferences = {};

function setPreference(key: string, value: PreferenceValue) {
  userPreferences[key] = value;
}
setPreference('theme', 'dark');
setPreference('notifications', true);
// setPreference('fontSize', []); // Error: Type 'never[]' is not assignable to type 'PreferenceValue'
```

[🚀back to top](#top)

## Record vs Map

||Record|	Map|
|---|---|---|
|Performance|	Optimized for static data access; |faster for direct property access	Optimized for frequent additions and removals; slightly slower for lookups|
|Type safety|	Strong compile-time type checking for both keys and values	|Runtime type safety; any type can be used as keys, including objects and functions|
|Use cases|	Ideal for static dictionaries with predetermined keys	|Better for dynamic collections where keys/values change frequently|
|Syntax|	`Record<KeyType, ValueType>`|`new Map<KeyType, ValueType>()`|
|Key types|	Limited to `string`, `number`, or `symbol` (which convert to strings)|	Supports any data type as keys, including objects and functions|
|Methods|	Standard object operations (dot notation, brackets, deleteoperator)	|Built-in methods: `get()`,` set()`, `has()`, `delete()`, `clear()`, `size`|
|Iteration|	No guaranteed order (though modern engines maintain creation order)	|Preserves insertion order when iterating|
|Memory|	Better memory efficiency for static data	|Higher memory overhead but better for frequently changing collections|

## Record vs. indexed types


> [Level up your TypeScript with Record types](https://blog.logrocket.com/typescript-record-types/)
