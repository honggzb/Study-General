[Polymorphic Components](#top)
- [using polymorphic prop as](#using-polymorphic-prop-as)
  - [Basic Polymorphic Components](#basic-polymorphic-components)
  - [Polymorphic Components support refs](#polymorphic-components-support-refs)

---------------------------------------

- **Polymorphic Components** is one that can dynamically change the type of element rendered
  - **polymorphic components render as different elements based on props passed to them**
- ![Polymorphic component](Polymorphic.png)
- methods
  - polymorphic prop `as`, asChild
  - Slot

## using polymorphic prop as

### Basic Polymorphic Components

- `PropsWithChildren`
- `ComponentPropsWithoutRef`:
  - other props based on `as`
  - return valid component props that correlate with the string attribute passed to the as prop
  - good to use `Omit`
- default as attributes
- `C` 👈 represents the element type passed for the as prop

```ts
type Rainbow = | "red" | "orange" | "yellow"  | "green" | "blue"  | "indigo" | "violet"
type TextProps<C extends React.ElementType> = {
 as?: C;
 color?: Rainbow | "black";
}
type Props <C extends React.ElementType> =
  React.PropsWithChildren<TextProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;    // 👈other props based on as

export const Text = <C extends React.ElementType = "span">({  // default
  as,
  color,
  children,
  ...restProps,
}: Props<C>) => {
 const component = as ?? "span";
 const style = color ? { style: { color }} : {};
 return <component {...restProps} {...style}>{children}</component>;
};
// use this component
<Text as="div">Hello Polymorphic!</Text>
<Text color="violet">Hello Polymorphic!</Text>
<Text as="em">Hello Polymorphic!</Text>
```

[🚀back to top](#top)

### Polymorphic Components support refs

- https://github.com/ohansemmanuel/polymorphic-react-component

```ts
type Rainbow = | "red" | "orange" | "yellow"  | "green" | "blue"  | "indigo" | "violet";

type AsProp<C extends React.ElementType> = { as?: C };
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
// the reusable type utility
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
      Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
// This is the updated component props using PolymorphicComponentPropWithRef
type TextProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C, { color?: Rainbow | "black" }>;
// This is the type used in the type annotation for the component
type TextComponent = <C extends React.ElementType = "span">(
 props: TextProps<C>
) => React.ReactElement | null;

export const Text = React.forwardRef<C extends React.ElementType = "span">(  // default
  { as, color, children }: TextProps<C>,
  ref?: PolymorphicRef<C>,
}: Props<C>) => {
 const component = as ?? "span";
 const style = color ? { style: { color }} : {};
 return <component {...style} ref={ref}>{children}</component>;
};
// use this component
<Text as="div">Hello Polymorphic!</Text>
<Text color="violet">Hello Polymorphic!</Text>
<Text as="h1">
  Edit <code>src/App.tsx</code> and save to reload.
</Text>
{/* Example: the 'as' prop can also take in a custom component*/}
<Text as={Em}>This is important</Text>
 <Text
    as="a"
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
>
  Learn React
</Text>
```

[🚀back to top](#top)

