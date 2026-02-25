[React typescript -3.Component type](#top)

- [ReactNode vs ReactElement vs JSX.Element](#reactnode-vs-reactelement-vs-jsxelement)
  - [The Type Hierarchy](#the-type-hierarchy)
  - [A Decision Tree](#a-decision-tree)
  - [When to Use These Specific Types](#when-to-use-these-specific-types)
  - [Component Return Types: Let TypeScript Infer](#component-return-types-let-typescript-infer)
- [Render Props with Children](#render-props-with-children)
- [React.Children.map](#reactchildrenmap)
- [React.Children.only- need exactly one child element](#reactchildrenonly--need-exactly-one-child-element)
- [Type Guards for Children- when different types of children](#type-guards-for-children--when-different-types-of-children)
- [Polymorphic Components and the as Prop](#polymorphic-components-and-the-as-prop)
  - [Reusable Polymorphic Type](#reusable-polymorphic-type)
  - [Real-World Use Cases](#real-world-use-cases)


## ReactNode vs ReactElement vs JSX.Element

1. **React.ReactNode**
   - is the recommended and most flexible type for most use cases, as it covers nearly everything React can render
2. **JSX.Element** and **ReactElement**
   - **JSX.Element**   ➡️ TypeScript’s Take, has a crucial limitation
   - **ReactElement**  ➡️ React’s Take
   - `type JSXElement = ReactElement<any, any>;`  ➡️  `JSX.Element` is always `ReactElement<any, any>`
   - **Allows**: A <mark>single</mark> React element (e.g., `<p>Hello</p>`)
   - **Does not allow**: Multiple elements, plain strings, numbers, null, etc..
   - **Use case**: For components designed to wrap exactly one child element
3. Utility Type: **React.PropsWithChildren**
   - Instead of explicitly defining `children: ReactNode` in every interface, can use the `React.PropsWithChildren<P>` utility type
   - This merges component's specific props (P) with an optional children prop typed as `ReactNode`
4. Note: `React.FC` **Deprecation** after React V18+

```ts
import { PropsWithChildren } from 'react';
interface ButtonProps {
  // other props like onClick, type, etc.
  onClick: () => void;
}
const Button = ({ children, onClick }: PropsWithChildren<ButtonProps>) => (
  <button onClick={onClick}>{children}</button>
);
```

### The Type Hierarchy

```ts
// ReactNode is the superset of everything React can render
type ReactNode =
  | ReactElement         // ← This includes JSX.Element
  | string               // ← Text nodes
  | number               // ← Numeric values
  | Iterable<ReactNode>  // ← Arrays and fragments (includes ReactFragment)
  | ReactPortal          // ← Portal nodes
  | boolean              // ← Conditionals (rendered as nothing)
  | null                 // ← Absence of content
  | undefined;           // ← Undefined values
// JSX.Element is a specific ReactElement, JSX.Element is always ReactElement<any, any>
type JSX.Element = ReactElement<any, any>;
// The hierarchy:
// ReactNode > ReactElement > JSX.Element
```

### A Decision Tree

1. **Start with ReactNode** — it handles 95% of use cases correctly
2. **Consider ReactElement** only when you need to **manipulate** the <mark>element</mark>-rare (clone, inspect props, etc.)
3. **Avoid JSX.Element for children** — it’s too restrictive and doesn’t add value

<details>

<summary>**Question 1: Are you typing children props?**</summary>

```ts
/* Question 1: Are you typing children props? */
// → Use ReactNode (99% of cases)
interface ContainerProps {
  children: ReactNode; // ✅ Maximum flexibility
}
```

</details>

```ts
/* Question 2: Do you need to clone or inspect the element? */
// → Use ReactElement: need to manipulate the element(clone trigger)
interface ModalProps {
  trigger: ReactElement; // ✅ Can clone and add props
  children: ReactNode; // ✅ Just rendering
}
function Modal({ trigger, children }: ModalProps) {
  // Can safely clone because trigger is ReactElement, it's guaranteed to be an element
  const enhancedTrigger = cloneElement(trigger, {
    onClick: () => setOpen(true),
  });
  return (
    <>
      {enhancedTrigger}
      {children}
    </>
  );
}
/* Question 3: Are you constraining return types? */
// → Let TypeScript infer or use ReactNode for conditionals
function ConditionalComponent({ show }: { show: boolean }): ReactNode {
  if (!show) return null; // ✅ ReactNode allows null
  return <div>Content</div>;
}
/* Question 4: Do you need specific prop types preserved? */
// → Use ReactElement with generics
function processElement(element: ReactElement<{ className?: string }>) {
  // TypeScript knows element.props has className
  const className = element.props.className || 'default';
  return cloneElement(element, { className: `${className} processed` });
```

### When to Use These Specific Types

```ts
// When you're building a table and need pairs
interface TableRowProps {
  // Ensures we get an array, not a single element
  cells: ReactFragment;
}
// When handling portal-specific logic
interface OverlayManagerProps {
  // Specifically portal elements
  overlays: ReactPortal[];
  // Regular children
  children: ReactNode;
}
// When you need to exclude certain types
type TextOnly = Extract<ReactNode, string | number>;
interface TextDisplayProps {
  // Only accepts text or numbers, not elements
  content: TextOnly;
}
function TextDisplay({ content }: TextDisplayProps) {
  // TypeScript knows content is string | number
  return <span className="text-only">{String(content)}</span>;
}
```

### Component Return Types: Let TypeScript Infer

```ts
// ✅ Let TypeScript infer JSX.Element
function Button() {
  return <button>Click me</button>;
}
// ⚠️ Explicit typing usually unnecessary
function Button(): JSX.Element {
  return <button>Click me</button>;
}
// ✅ Explicit typing when returning conditional content
function ConditionalButton({ show }: { show: boolean }): ReactNode {
  if (!show) return null;
  return <button>Click me</button>;
}
```

[🚀back to top](#top)

## Render Props with Children

```ts
interface DataFetcherProps {
  url: string;
  children: (data: any, loading: boolean) => ReactNode;
}

function DataFetcher({ url, children }: DataFetcherProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  return <>{children(data, loading)}</>;
}
// The render function can return anything renderable:
<DataFetcher url="/api/users">
  {(users, loading) => {
    if (loading) return 'Loading...';
    if (!users) return null;
    return users.map((user) => <UserCard key={user.id} user={user} />);
  }}
</DataFetcher>;
```

[🚀back to top](#top)

## React.Children.map

```ts
import { ReactNode, cloneElement, isValidElement } from 'react';
interface WrapperProps {
  children: ReactNode;
}
function AddClassToChildren({ children }: WrapperProps) {
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        // Type guard to ensure we have a valid React element
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: `${child.props.className || ''} wrapped-${index}`.trim(),
          });
        }
        // Return non-element children (strings, numbers) unchanged
        return child;
      })}
    </div>
  );
}
```

[🚀back to top](#top)

## React.Children.only- need exactly one child element

```ts
interface SingleChildProps {
  children: ReactNode;
}
function SingleChildWrapper({ children }: SingleChildProps) {
  const singleChild = React.Children.only(children);  // This will throw if children is not exactly one element
  if (isValidElement(singleChild)) {
    return cloneElement(singleChild, {
      className: `${singleChild.props.className || ''} enhanced`.trim()
    });
  }
  return singleChild;
}
// ✅ Works:
<SingleChildWrapper>
  <Button>Click me</Button>
</SingleChildWrapper>
// ❌ Throws error (multiple children):
<SingleChildWrapper>
  <Button>One</Button>
  <Button>Two</Button>
</SingleChildWrapper>
```

[🚀back to top](#top)

## Type Guards for Children- when different types of children

```ts
function isReactElement(child: ReactNode): child is ReactElement {
  return isValidElement(child);
}
function isStringChild(child: ReactNode): child is string {
  return typeof child === 'string';
}
interface SmartListProps {
  children: ReactNode;
}
function SmartList({ children }: SmartListProps) {
  return (
    <ul>
      {React.Children.map(children, (child, index) => {
        if (isStringChild(child)) {
          return (
            <li key={index} className="text-item">
              {child}
            </li>
          );
        }
        if (isReactElement(child)) {
          return (
            <li key={index} className="element-item">
              {child}
            </li>
          );
        }
        // Handle other types (numbers, etc.)
        return (
          <li key={index} className="other-item">
            {String(child)}
          </li>
        );
      })}
    </ul>
  );
}
```

[🚀back to top](#top)

## Polymorphic Components and the as Prop

- Polymorphic component: handles your styling and behavior logic, but need it to render different HTML elements depending on the context
- build a Button component that can render as any HTML element or React component while preserving full type safety
    - When use as="a", you get href, target, download, etc.
    - When use the default button, you get onClick, disabled, type, etc
- `BaseButtonProps`: the props that every Button should have, regardless of what element it renders as
- `PolymorphicButtonProps<T>`: merge base props with the props of whatever element type `T` represents
- `ComponentPropsWithoutRef<T>`: all the standard props for element `T` (like href for anchors, onClick for buttons)
- Generic constraint `<T extends ElementType>`: This ensures `T` can only be something that React can actually render

```ts
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
// First, let's define our base props that every Button should have
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
// a polymorphic prop type that merges our base props with the props of whatever element we're rendering as
type PolymorphicButtonProps<T extends ElementType> = BaseButtonProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

// The component itself, using a generic to preserve the element type
const Button = <T extends ElementType = 'button'>(
  { as, variant = 'primary', size = 'md', children, ...props }: PolymorphicButtonProps<T>
) => {
  const Component = as || 'button';
  // Your styling logic goes here
  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  const className = [baseClasses, variantClasses[variant], sizeClasses[size]].join(' ');
  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
};
export default Button;

/* Using Your Polymorphic Button */
// ✅ Renders a <button> with onClick
<Button onClick={() => console.log('clicked')}>
  Default Button
</Button>
// ✅ Renders an <a> with href - TypeScript knows href is valid here
<Button as="a" href="https://example.com" target="_blank"> Link Button </Button>
// ✅ Renders a Next.js Link component
import Link from 'next/link';
<Button as={Link} href="/dashboard"> Next.js Link </Button>
// ✅ All your custom props work too
<Button variant="danger" size="lg" onClick={handleDelete}>
  Delete Account
</Button
```

- add **Ref** Forwarding to Polymorphic Patterns

```ts
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];
type PolymorphicButtonProps<T extends ElementType> = BaseButtonProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;
type ButtonComponent = <T extends ElementType = 'button'>(
  props: PolymorphicButtonProps<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;
const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    { as, variant = 'primary', size = 'md', children, ...props }: PolymorphicButtonProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = as || 'button';
    // ... same styling logic as before
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  },
);
Button.displayName = 'Button';
```

[🚀back to top](#top)

### Reusable Polymorphic Type

```ts
type PolymorphicComponentProps<T extends ElementType, Props = {}> = Props & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicComponent<DefaultElement extends ElementType, Props = {}> = <
  T extends ElementType = DefaultElement,
>(
  props: PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;
// can use in multiple polymorphic components- Button, Card, ...
const Button: PolymorphicComponent<'button', BaseButtonProps> = forwardRef(
  { as, variant = 'primary', size = 'md', children, ...props }, ref) => {
//...
}
const Card: PolymorphicComponent<'div', CardProps> = forwardRef(
  ({ as, padding = 'md', shadow = true, children, ...props }, ref) => {
//...
}
```

[🚀back to top](#top)

### Real-World Use Cases

```ts
interface TextProps {
  variant?: 'body' | 'caption' | 'heading';
  weight?: 'normal' | 'medium' | 'bold';
}
const Text: PolymorphicComponent<'span', TextProps> = /* ... */;
// Usage across your app
<Text as="h1" variant="heading" weight="bold">Page Title</Text>
<Text as="p" variant="body">Regular paragraph text</Text>
<Text as="label" variant="caption" weight="medium">Form label</Text>
```

[🚀back to top](#top)
