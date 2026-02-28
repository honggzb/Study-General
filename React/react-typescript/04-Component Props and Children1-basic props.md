[React typescript -4.Component Props and Children1-basic props](#top)

- [Primitive Props](#primitive-props)
- [Array Props: Collections and Lists](#array-props-collections-and-lists)
- [Object Props: Complex Data Structures](#object-props-complex-data-structures)
- [Function Props: Callbacks and Event Handlers](#function-props-callbacks-and-event-handlers)
- [Conditional Props with Discriminated Unions](#conditional-props-with-discriminated-unions)
- [Generic Props for Reusable Components](#generic-props-for-reusable-components)
  - [Generic TextField with Typed onChange](#generic-textfield-with-typed-onchange)
- [Extending HTML Element Props](#extending-html-element-props)
- [React’s Built-in Helper Types](#reacts-built-in-helper-types)
  - [PropsWithChildren: The Children Helper](#propswithchildren-the-children-helper)
  - [PropsWithoutChildren: The Explicit Leaf](#propswithoutchildren-the-explicit-leaf)
  - [RefAttributes: Type-Safe Refs](#refattributes-type-safe-refs)
  - [Combining Helper Types: Real-World Patterns](#combining-helper-types-real-world-patterns)
- [Common patterns and Anti-Patterns](#common-patterns-and-anti-patterns)

-------------------------------------------------------------------------------------

- Props are the API of React components — how interact with what you’ve built
- Pattern of Component Props ➡️ **Providing Sensible Defaults**
  - **Type safety**: TypeScript knows about your defaults at compile time
  - **Locality**: Defaults are visible right where the component is defined
  - **Performance**: No extra property merging at runtime
  - **Future-proof**: Works with React’s Compiler and other optimizations

## Primitive Props

```ts
interface AlertProps {
  variant: 'success' | 'warning' | 'error' | 'info';  // String literals are often better than plain strings
  timeout?: number;
  dismissible?: boolean;
  title: string;
}
function Alert({
  variant,
  timeout = 5000,         // it is good pattern to Providing Sensible Defaults
  dismissible = true,
  title
}: AlertProps) {
  const iconName = variant === 'success' ? 'check' : 'alert';  // TypeScript knows variant is one of four specific strings
  return (
    <div className={`alert alert--${variant}`}>
      <h3>{title}</h3>
      {dismissible && <button>×</button>}
    </div>
  );
}
```

## Array Props: Collections and Lists

```ts
interface TagListProps {
  tags: string[];
}
// Array of objects with consistent shape
interface UserListProps {
  users: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }[];
}
// Array with discriminated unions
interface NotificationProps {
  notifications: Array<
    | { type: 'message'; content: string; sender: string }
    | { type: 'system'; content: string; level: 'info' | 'warning' }
    | { type: 'error'; content: string; code?: string }
  >;
}

function NotificationList({ notifications }: NotificationProps) {
  return (
    <div>
      {notifications.map((notification, index) => {
        // TypeScript knows the shape based on the type discriminant
        if (notification.type === 'message') {
          return (
            <div key={index} className="notification--message">
              <strong>{notification.sender}:</strong> {notification.content}
            </div>
          );
        }
        if (notification.type === 'system') {
          return (
            <div key={index} className={`notification--${notification.level}`}>
              {notification.content}
            </div>
          );
        }
        // Must be error type
        return (
          <div key={index} className="notification--error">
            Error {notification.code}: {notification.content}
          </div>
        );
      })}
    </div>
  );
}
```

[🚀back to top](#top)

## Object Props: Complex Data Structures

```ts
// Strict object shape
interface ConfigProps {
  settings: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}
// Flexible with index signatures
interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    width?: number;
  }>;
  // Flexible row data
  data: Array<{
    id: string | number;
    [key: string]: any; // Allow any additional properties
  }>;
}
// Nested with optional properties
interface FormProps {
  initialValues: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      address?: {
        street: string;
        city: string;
        country: string;
        postalCode?: string;
      };
    };
  };
}
```

[🚀back to top](#top)

## Function Props: Callbacks and Event Handlers

```ts
interface SearchProps {
  onSearch: (query: string) => void;                                // ➡️Simple callback
  onSubmit: (query: string) => Promise<void>;                       // ➡️Async callback with error handling
  onFilter: (category: string, tags: string[]) => void;             // ➡️Callback with multiple parameters
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;  // ➡️Optional callback with event
  validator?: (value: string) => string | undefined;                // ➡️Callback that returns a value: returns error message
}
function Search({ onSearch, onSubmit, onChange }: SearchProps) {
  const [query, setQuery] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(query);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e); // Optional chaining for optional callback
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

[🚀back to top](#top)

## Conditional Props with Discriminated Unions

- props depend on each other—when one prop is present, others become required or forbidden. Discriminated unions help model these relationships precisely

```ts
type ButtonProps = {
  children: React.ReactNode;
} & (
  | {
      variant: 'button';
      onClick: () => void;
      disabled?: boolean;
    }
  | {
      variant: 'link';
      href: string;
      target?: '_blank' | '_self';
    }
  | {
      variant: 'submit';
      form?: string;
      disabled?: boolean;
    }
);

function Button(props: ButtonProps) {
  const { children } = props;
  switch (props.variant) {
    case 'button':
      return (
        <button onClick={props.onClick} disabled={props.disabled}>
          {children}
        </button>
      );
    case 'link':
      return (
        <a href={props.href} target={props.target}>
          {children}
        </a>
      );
    case 'submit':
      return (
        <button type="submit" form={props.form} disabled={props.disabled}>
          {children}
        </button>
      );
  }
}
// TypeScript ensures correct prop combinations
<Button variant="button" onClick={() => {}}>Click</Button>
<Button variant="link" href="/home">Home</Button>
<Button variant="submit" form="myForm">Submit</Button>
```

[🚀back to top](#top)

## Generic Props for Reusable Components

- Generics make components truly reusable while maintaining type safety

```ts
interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  placeholder?: string;
}
```

### Generic TextField with Typed onChange

- Create a `TextField` that accepts `value`/`defaultValue` generically and narrows `onChange` to the right event based on the underlying element.

```ts
type TextFieldAs = 'input' | 'textarea';
type TextFieldCommon = {
  label: string;
  error?: string;
  as?: TextFieldAs;
};
type InputFieldProps = TextFieldCommon & Omit<JSX.IntrinsicElements['input'], 'onChange'> & {
  as?: 'input';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type TextareaFieldProps = TextFieldCommon & Omit<JSX.IntrinsicElements['textarea'], 'onChange'> & {
  as: 'textarea';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
type TextFieldProps = InputFieldProps | TextareaFieldProps;

export function TextField(props: TextFieldProps) {
  const { label, error, as = 'input', ...rest } = props as TextFieldProps & { as: TextFieldAs };
  return (
    <label className={`text-field ${error ? 'has-error' : ''}`}>
      <span className="label">{label}</span>
      {as === 'textarea' ? (
        <textarea {...(rest as TextareaFieldProps)} />
      ) : (
        <input {...(rest as InputFieldProps)} />
      )}
      {error && <span className="error">{error}</span>}
    </label>
  );
}
// Usage with correct event narrowing
<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
<TextField as="textarea" label="Bio" defaultValue={bio} onChange={(e) => setBio(e.target.value)} />
```

[🚀back to top](#top)

## Extending HTML Element Props

- using spreading `...`   ➡️ extending props
- using `Omit`            ➡️ Omitting specific HTML props

```ts
//1. using spreading ...   ➡️ extending props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}
function CustomButton({
  variant = 'primary',
  loading,
  children,
  disabled,
  ...rest                 // using spread
}: CustomButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      {...rest}                 // using spread
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
//2. using Omit            ➡️ Omitting specific HTML props
interface InputProps extends Omit<                 // using Omit
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  type?: 'text' | 'email' | 'password';            // Restrict to specific types
  onChange: (value: string) => void;               // Simplify onChange signature
}

function Input({ onChange, ...props }: InputProps) {  // ...
  return (
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

[🚀back to top](#top)

## React’s Built-in Helper Types

- React provides several utility types(helper types)
- These helpers handle common patterns, from adding children props to managing refs

### PropsWithChildren: The Children Helper

- `PropsWithChildren` is exactly equivalent to adding `children?: ReactNode` to props
- Use `PropsWithChildren` when:
   - component is a container that wraps other content
   - want consistent children typing across codebase
   - layout or wrapper components

```ts
import { PropsWithChildren } from 'react';
// ❌ The old way: manually adding children
interface CardProps {
  title: string;
  variant?: 'default' | 'highlighted';
  children?: React.ReactNode;
}
// ✅ The clean way: using PropsWithChildren
interface CardProps {
  title: string;
  variant?: 'default' | 'highlighted';
}
function Card({ title, variant = 'default', children }: PropsWithChildren<CardProps>) {
  return (
    <div className={`card card--${variant}`}>
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}
```

[🚀back to top](#top)

### PropsWithoutChildren: The Explicit Leaf

```ts
import { PropsWithoutChildren } from 'react';

// Components that should never have children
type InputProps = PropsWithoutChildren<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}>;

function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
// ❌ TypeScript error if someone tries to add children
<Input value="test" onChange={setValue}>
  This will cause a type error!
</Input>
```

- The real power of `PropsWithoutChildren` comes when building type utilities:

```ts
// Creating a type helper that strips children from any props
type LeafComponent<P> = React.FC<PropsWithoutChildren<P>>;
// Now can create leaf components with guaranteed no children
const StatusBadge: LeafComponent<{ status: 'online' | 'offline' }> = ({ status }) => {
  return <span className={`badge badge--${status}`}>{status}</span>;
};
```

[🚀back to top](#top)

### RefAttributes: Type-Safe Refs

```ts
import { forwardRef, RefAttributes } from 'react';
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}
// RefAttributes adds the optional ref prop with proper typing
type ButtonPropsWithRef = ButtonProps & RefAttributes<HTMLButtonElement>;
// Using with forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', onClick, children }, ref) => {
    return (
      <button ref={ref} className={`btn btn--${variant}`} onClick={onClick}>
        {children}
      </button>
    );
  }
);
// The ref is properly typed
function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Button ref={buttonRef} onClick={() => buttonRef.current?.focus()}>
      Focus me!
    </Button>
  );
}
```

[🚀back to top](#top)

### Combining Helper Types: Real-World Patterns

```ts
// A card component that needs children and refs
interface CardBaseProps {
  title: string;
  footer?: ReactNode;
}
type CardProps = PropsWithChildren<CardBaseProps> & RefAttributes<HTMLDivElement>;
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, footer, children }, ref) => {
    return (
      <div ref={ref} className="card">
        <header>{title}</header>
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    );
  }
);

// A form field that explicitly has no children
type FieldProps = PropsWithoutChildren<{
  name: string;
  value: string;
  onChange: (value: string) => void;
}> & RefAttributes<HTMLInputElement>;

// A layout component with optional children
interface LayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
}
function Layout({ sidebar, header, children }: PropsWithChildren<LayoutProps>) {
  return (
    <div className="layout">
      {header && <header>{header}</header>}
      <div className="layout-body">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{children}</main>
      </div>
    </div>
  );
}
```

[🚀back to top](#top)

## Common patterns and Anti-Patterns

```ts
//✅ Good Patterns
// Use string literals for known values
type Size = 'small' | 'medium' | 'large';
// Make impossible states impossible
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
// Group related props
interface FormFieldProps {
  field: {
    name: string;
    value: string;
    error?: string;
  };
  label: string;
  required?: boolean;
}
// ❌ Anti-Patterns to Avoid
// Don't use 'any' for props
interface BadProps {
  data: any; // No type safety
}
// Don't make everything optional
interface TooFlexible {
  title?: string;
  content?: string;
  onClick?: () => void;
  // Component can't function without any props!
}
// Don't use boolean flags for multiple states
interface ConfusingStates {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  // These can conflict!
}
```

[🚀back to top](#top)
