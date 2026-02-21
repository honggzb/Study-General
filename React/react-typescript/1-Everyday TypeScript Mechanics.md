[React typescript](#top)

- [Everyday TypeScript Mechanics](#everyday-typescript-mechanics)
  - [Type Narrowing and Control Flow](#type-narrowing-and-control-flow)
 
## Everyday TypeScript Mechanics

### Type Narrowing and Control Flow

- **Type narrowing** is when TypeScript refines a type to be more specific based on the code’s control flow
- `typeof` Type Guards: for primitive types
- `instanceof` Type Guards: for class instances and built-in objects

```ts
/** typeof */
function formatValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return value ? 'Yes' : 'No';  // value is boolean
}
// In React components
const DisplayValue = ({ value }: { value: string | number | null }) => {
  if (typeof value === 'string') {
    return <span className="text-value">{value}</span>;
  }
  if (typeof value === 'number') {
    return <span className="number-value">{value.toFixed(2)}</span>;
  }
  return <span className="null-value">No value</span>;
};
/** instanceof */
class ValidationError extends Error {
  field: string;
  constructor(field: string, message: string) {
    super(message);
    this.field = field;
  }
}
function handleError(error: Error | ValidationError) {
  if (error instanceof ValidationError) {
    console.log(`Field ${error.field}: ${error.message}`);  // error is ValidationError
  } else {
    console.log(`General error: ${error.message}`);  // error is Error
  }
}
// Works with built-in types(built-in Object) too
function processDate(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();  // value is Date
  }
  return new Date(value).toISOString();  // value is string
}
```

[back to top](#🚀)
