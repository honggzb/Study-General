## TypeScript学习笔记---判断是否在emum type值域内

- Method 1: Using `includes()` with a Type Guard Function
- Method 2: Using an **Object Lookup**
- Identifying an "Invalid" Type

```ts
type IdentifierShort = 'L' | 'R' | 'P' | 'V' | 'S' | 'G' | 'M' | 'T';
const validIdentifiers = ['L', 'R', 'P', 'V', 'S', 'G', 'M', 'T'] as const;
// Method 1: Using includes() with a Type Guard Function
if (typeof value === 'string' && validIdentifiers.includes(value as any)) {
    // In this block, value is type 'IdentifierShort'
   console.log(`Valid identifier: ${value}`);
}
// Method 2: Using an Object Lookup
const validIdentifierMap: Record<IdentifierShort, boolean> = {
  'L': true,
  'R': true,
  'P': true,
  'V': true,
  'S': true,
  'G': true,
  'M': true,
  'T': true,
};
if (typeof value === 'string' && validIdentifierMap[value as IdentifierShort]) {
   console.log(`Valid: ${value}`);
}
// Identifying an "Invalid" Type
type InvalidIdentifier = Exclude<string, IdentifierShort>;
   // This variable can hold any string *except* those in IdentifierShort
const myInvalidValue: InvalidIdentifier = "X"; // Valid assignment
   // const anotherInvalidValue: InvalidIdentifier = "L"; // Error: Type '"L"' is not assignable to type 'InvalidIdentifier'
```
