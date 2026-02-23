[React typescript -2. Type Narrowing and Control Flow](#top)

- [Equality Narrowing](#equality-narrowing)
- [Type Guards - Narrowing tools](#type-guards---narrowing-tools)
- [Operator Type Guards](#operator-type-guards)
- [Custom Type Guards](#custom-type-guards)
- [Array Type Guards](#array-type-guards)
- [Type Narrowing in React](#type-narrowing-in-react)
- [Advanced Patterns](#advanced-patterns)
- [Never and Exhaustiveness](#never-and-exhaustiveness)
- [Optional Chaining and Narrowing](#optional-chaining-and-narrowing)
- [Type Narrowing in React](#type-narrowing-in-react-1)
  - [Component Props](#component-props)
  - [Conditional Rendering](#conditional-rendering)
  - [Form Validation](#form-validation)
- [Advanced Patterns](#advanced-patterns-1)
  - [Discriminated Unions with Multiple Fields](#discriminated-unions-with-multiple-fields)
  - [Combining Type Guards](#combining-type-guards)
  - [Narrowing with Generics](#narrowing-with-generics)
- [Best Practices](#best-practices)

---------------------------------------------------------------

## Equality Narrowing

- **Type narrowing** is when TypeScript refines a type to be more specific based on the code’s control flow
- TypeScript narrows based on **equality checks**:

```ts
function handleStatus(status: 'loading' | 'success' | 'error' | null) {
  if (status === null) return 'Not started';
  if (status === 'loading') return <Spinner />;
  if (status === 'success') return <SuccessMessage />;
  return <ErrorMessage />;  // status is 'error'
}
// Using switch for exhaustive checks
type Action =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + action.amount;  // action is { type: 'increment'; amount: number }
    case 'decrement':
      return state - action.amount;  // action is { type: 'decrement'; amount: number }
    case 'reset':
      return 0;                      // action is { type: 'reset'
    default:                         // TypeScript knows this is unreachable
      const exhaustive: never = action;
      throw new Error(`Unhandled action: ${exhaustive}`);
  }
}
```

[back to top](#🚀)

## Type Guards - Narrowing tools

- `typeof` Type Guards       -->   primitive types
- `instanceof` Type Guards   -->   class instances and built-in objects

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

## Operator Type Guards

```ts
interface TextProps {
  text: string;
  maxLength?: number;
}
interface ComponentProps {
  component: React.ComponentType;
  props?: Record<string, any>;
}
const DynamicRender = (props: TextProps | ComponentProps) => {
   // props is TextProps
  if ('text' in props) {
    const displayText = props.maxLength
      ? props.text.slice(0, props.maxLength)
      : props.text;
    return <p>{displayText}</p>;
  }
  // props is ComponentProps
  const Component = props.component;
  return <Component {...props.props} />;
};
```

[back to top](#🚀)

## Custom Type Guards

```ts
// Simple type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
// More complex type guard
interface User {
  id: number;
  name: string;
  email: string;
}
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    typeof (value as User).id === 'number' &&
    typeof (value as User).name === 'string' &&
    typeof (value as User).email === 'string'
  );
}
// Using the type guard
function processData(data: unknown) {
  if (isUser(data)) {
    // data is User
    console.log(`User: ${data.name} (${data.email})`);
  } else if (isString(data)) {
    // data is string
    console.log(`String: ${data}`);
  } else {
    console.log('Unknown data type');
  }
}
```

[back to top](#🚀)

## Array Type Guards

```ts
// Filter with type guards
const mixedArray: (string | number | null)[] = ['a', 1, null, 'b', 2];
// This doesn't narrow the type
const filtered = mixedArray.filter((item) => item !== null);   // filtered is still (string | number | null)[]
// Use a type guard function
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
const filtered2 = mixedArray.filter(isNotNull);   // filtered2 is (string | number)[]
// Or be more specific
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
const strings = mixedArray.filter(isString);     // strings is string[]
```

## Type Narrowing in React

- Component Props
- Conditional Rendering
- Form Validation
- Discriminated Unions with Multiple Fields

```ts
/* Component Props */
type ButtonProps =
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string }
  | { variant: 'disabled' };
const Button = (props: ButtonProps) => {
  switch (props.variant) {
    case 'primary':         // props has onClick
      return (
        <button className="btn-primary" onClick={props.onClick}>
          Click me
        </button>
      );
    case 'link':            // props has href
      return (
        <a className="btn-link" href={props.href}>
          Visit
        </a>
      );
    case 'disabled':       // props has no additional properties
      return (
        <button className="btn-disabled" disabled>
          Disabled
        </button>
      );
    default:
      const exhaustive: never = props;
      throw new Error(`Unhandled variant: ${exhaustive}`);
  }
};
/* Conditional Rendering */
interface DataState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: Error;
}
function DataDisplay<T>({ state }: { state: DataState<T> }) {
  if (state.status === 'idle') {
    return <div>Ready to load</div>;
  }
  if (state.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (state.status === 'error') {
    return <div>Error: {state.error?.message}</div>;   // TypeScript knows error exists when status is 'error'
  }
  return <div>Data: {JSON.stringify(state.data)}</div>;  // state.status is 'success', data should exist
}
/* Form Validation */
type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; error: string };
function validateEmail(input: string): ValidationResult {
  if (!input.includes('@')) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true, value: input.trim().toLowerCase() };
}
const EmailInput = () => {
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    const result = validateEmail(input);
    if (result.valid) {
      // result.value is available
      submitEmail(result.value);
    } else {
      // result.error is available
      showError(result.error);
    }
  };
  return (
    <input value={input} onChange={e => setInput(e.target.value)} onBlur={handleSubmit} />
  );
};
```

## Advanced Patterns

- **Discriminated Unions with Multiple Fields**

```ts
/* Discriminated Unions with Multiple Fields */
type Response<T> =
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: Error; retryAfter?: number }
  | { status: 'pending'; progress?: number };
function handleResponse<T>(response: Response<T>) {
  if (response.status === 'success') {
    // All success fields are available
    console.log(`Success at ${response.timestamp}: ${response.data}`);
  } else if (response.status === 'error') {
    // All error fields are available
    console.error(`Error: ${response.error.message}`);
    if (response.retryAfter) {
      setTimeout(retry, response.retryAfter);
    }
  } else {
    // response.status === 'pending'
    console.log(`Pending... ${response.progress ?? 0}%`);
  }
}
```

[back to top](#🚀)

## Never and Exhaustiveness

- Use `never` to ensure you handle all cases

```ts
// React reducer example
type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload };
    case 'FETCH_ERROR':
      return { status: 'error', error: action.error };
    case 'RESET':
      return { status: 'idle' };
    default:
      const exhaustive: never = action;
      return state;
  }
}
```

[back to top](#🚀)

## Optional Chaining and Narrowing

- using `?` and `??`

```ts
interface User {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}
const city = user.address?.city;           // city is string | undefined
const name = user?.name ?? 'Anonymous';    // name is string (never undefined or null)
```

[back to top](#🚀)

## Type Narrowing in React

### Component Props

```ts
type ButtonProps =
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string }
  | { variant: 'disabled' };
const Button = (props: ButtonProps) => {
  switch (props.variant) {
    case 'primary':
      return (
        <button className="btn-primary" onClick={props.onClick}> Click me</button>
      );
    case 'link':
      return (
        <a className="btn-link" href={props.href}>Visit</a>
      );
    case 'disabled':
      return (
        <button className="btn-disabled" disabled>Disabled</button>
      );
    default:
      const exhaustive: never = props;
      throw new Error(`Unhandled variant: ${exhaustive}`);
  }
};
```

[back to top](#🚀)

### Conditional Rendering

```ts
interface DataState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: Error;
}
function DataDisplay<T>({ state }: { state: DataState<T> }) {
  if (state.status === 'idle') {
    return <div>Ready to load</div>;
  }
  if (state.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (state.status === 'error') {
    // TypeScript knows error exists when status is 'error'
    return <div>Error: {state.error?.message}</div>;
  }
  // state.status is 'success', data should exist
  return <div>Data: {JSON.stringify(state.data)}</div>;
}
```

[back to top](#🚀)

### Form Validation

```ts
// on field(email) validation
type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; error: string };
function validateEmail(input: string): ValidationResult {
  if (!input.includes('@')) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true, value: input.trim().toLowerCase() };
}
const EmailInput = () => {
  const [input, setInput] = useState('');
  const handleSubmit = () => {
    const result = validateEmail(input);
    if (result.valid) {
      // result.value is available
      submitEmail(result.value);
    } else {
      // result.error is available
      showError(result.error);
    }
  };
  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      onBlur={handleSubmit}
    />
  );
};
// whole form validation
type FieldValue = string | number | boolean | Date | null;
interface Field {
  name: string;
  value: FieldValue;
  validation?: (value: FieldValue) => string | null;
}
interface Form {
  fields: Field[];
  isValid: boolean;
}

function validateField(field: Field): string | null {
  const { value, validation } = field;
  // Check for required field
  if (value === null || value === undefined) {
    return 'Field is required';
  }

  // Type-specific validation
  if (typeof value === 'string') {
    if (value.trim().length === 0) {
      return 'Field cannot be empty';
    }
    if (value.length > 255) {
      return 'Field is too long';
    }
  }
  if (typeof value === 'number') {
    if (isNaN(value)) {
      return 'Invalid number';
    }
    if (value < 0) {
      return 'Number must be positive';
    }
  }
  if (value instanceof Date) {
    if (isNaN(value.getTime())) {
      return 'Invalid date';
    }
    if (value < new Date()) {
      return 'Date must be in the future';
    }
  }
  // Custom validation
  if (validation) {
    return validation(value);
  }
  return null;
}

const FormComponent = ({ form }: { form: Form }) => {
  const handleSubmit = () => {
    const errors = form.fields
      .map(field => ({
        field: field.name,
        error: validateField(field)
      }))
      .filter(result => result.error !== null);
    if (errors.length === 0) {
      // All fields are valid
      submitForm(form);
    } else {
      // Show errors
      errors.forEach(({ field, error }) => {
        console.error(`${field}: ${error}`);
      });
    }
  };

  return (
    <form onSubmit={e => { e.preventDefault(); handleSubmit();}}>
      {form.fields.map(field => (
        <FieldRenderer key={field.name} field={field} />
      ))}
    </form>
  );
};
```

[back to top](#🚀)

## Advanced Patterns

### Discriminated Unions with Multiple Fields

```ts
type Response<T> =
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: Error; retryAfter?: number }
  | { status: 'pending'; progress?: number };

function handleResponse<T>(response: Response<T>) {
  if (response.status === 'success') {
    // All success fields are available
    console.log(`Success at ${response.timestamp}: ${response.data}`);
  } else if (response.status === 'error') {
    // All error fields are available
    console.error(`Error: ${response.error.message}`);
    if (response.retryAfter) {
      setTimeout(retry, response.retryAfter);
    }
  } else {
    // response.status === 'pending'
    console.log(`Pending... ${response.progress ?? 0}%`);
  }
}
```

[back to top](#🚀)

### Combining Type Guards

```ts
interface Admin {
  role: 'admin';
  permissions: string[];
}
interface User {
  role: 'user';
  subscription?: 'free' | 'premium';
}
type Person = Admin | User;

function hasPermission(person: Person, permission: string): boolean {
  if (person.role === 'admin') {  // First narrow by role, person is Admin
    return person.permissions.includes(permission);
  }
  // Further narrow by subscription, person is User
  if (person.subscription === 'premium') {
    return ['read', 'write'].includes(permission);
  }
  // Free users have limited permissions
  return permission === 'read';
}
```

[back to top](#🚀)

### Narrowing with Generics

```ts
function processValue<T>(value: T | null, processor: (value: T) => void): void {
  if (value !== null) {  // value is T (not null)
    processor(value);
  }
}
// Type guard with generics
function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
function filterDefined<T>(items: (T | undefined)[]): T[] {
  return items.filter(isDefined);
}
```

[back to top](#🚀)

## Best Practices

```ts
//1. Use Discriminated Unions
// ✅ Good - Easy to narrow
type Result<T> = { success: true; data: T } | { success: false; error: string };
// ❌ Avoid - Harder to narrow
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}
//2. Make Invalid States Unrepresentable
// ✅ Good - Can't have both data and error
type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
// ❌ Avoid - Could have data and error simultaneously
interface State<T> {
  isLoading: boolean;
  data?: T;
  error?: Error;
}
//3. Use Exhaustive Checks
// ✅ Always include exhaustive checks
function handle(value: 'a' | 'b') {
  switch (value) {
    case 'a':
      return 1;
    case 'b':
      return 2;
    default:
      const exhaustive: never = value;
      throw new Error(`Unhandled value: ${exhaustive}`);
  }
}
//4. Prefer Type Guards Over Type Assertions
// ✅ Good - Safe type narrowing
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
if (isString(value)) {
  console.log(value.toUpperCase());
}
// ❌ Avoid - Unsafe type assertion
console.log((value as string).toUpperCase());
```

[back to top](#🚀)

