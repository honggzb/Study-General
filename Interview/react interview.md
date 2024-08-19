- [React Interview Questions & Answers](https://github.com/sudheerj/reactjs-interview-questions)
- [coding-exercise](https://github.com/sudheerj/reactjs-interview-questions/tree/master/coding-exercise)

--------------------------------------------------------------------------
## State vs props

```
                          state                           |    props
an object that holds some information that may change     | inputs to components
over the lifetime of the component                        | pass data to child component
used for internal communication inside a component        | props.reactProp
useState()                                                | 
```

## The Virtual DOM (VDOM) 

is an in-memory representation of Real DOM. The representation of a UI is kept in memory and synced with the "real" DOM. It's a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called **reconciliation**.

## higher-order component (HOC) 

is a function that takes a component and returns a new component. Basically, it's a pattern that is derived from React's compositional nature.

## lazy function

- React.lazy function supports default exports only
- `const SomeComponent = lazy(() => import("./IntermediateComponent.js"))`

## How to re-render the view when the browser is resized?

use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render

## What is flux

- Flux is an application design paradigm used as a replacement for the more traditional MVC pattern
- Action(Reducer)
- dispatcher
- Store

