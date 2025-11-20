- [React Interview Questions & Answers](https://github.com/sudheerj/reactjs-interview-questions)
- [coding-exercise](https://github.com/sudheerj/reactjs-interview-questions/tree/master/coding-exercise)

--------------------------------------------------------------------------
- [top](#top)
- [State vs props](#state-vs-props)
- [The Virtual DOM (VDOM)](#the-virtual-dom-vdom)
- [React Component Lifecycle](#react-component-lifecycle)
- [Passing Data between Parent and Child Component](#passing-data-between-parent-and-child-component)
  - [using useState](#using-usestate)
  - [using callback function](#using-callback-function)
- [When to use a Class Component over a Function Component](#When-to-use-a-class-component-over-a-function-component)
- [higher-order component (HOC)](#higher-order-component-hoc)
- [lazy function](#lazy-function)
- [How to re-render the view when the browser is resized?](#how-to-re-render-the-view-when-the-browser-is-resized)
- [What is flux](#what-is-flux)
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

## React Component Lifecycle

- ![React Component Lifecycle](./images/React-Component-Lifecycle.png)
- [Understanding the React Component Lifecycle: A Deep Dive into the Life of a React Component](https://medium.com/@arpitparekh54/understanding-the-react-component-lifecycle-a-deep-dive-into-the-life-of-a-react-component-74813cb8dfb5)

**React Lifecycle Methods diagram**

- ![React Lifecycle Methods diagram1](./images/React-Lifecycle-diagram1.png)
- ![React Lifecycle Methods diagram](./images/React-Lifecycle-diagram.png)
- https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

**React render** 

-  React renders by calling your component functions to get a description of the UI, comparing that description to the previous one (via the Virtual DOM and reconciliation), and then efficiently applying only the necessary changes to the actual browser DOM
1. Render Phase
   1. **Trigger a render**: A render is initiated when a component's state or props change, or during the initial mounting of the application
   2. **Calling Components**: React calls the component function(s) that need to be updated. These functions execute, returning a description of the UI (JSX)
   3. **Virtual DOM creation**: React uses the returned JSX to construct or update a "Virtual DOM" tree in memory. This Virtual DOM is a lightweight representation of the actual browser DOM
   4. **Reconciliation(Diffing)**: If it's a re-render, React performs a "diffing" algorithm to compare the new Virtual DOM tree with the previous one. This process identifies the minimal set of changes required to update the actual DOM
2. Commit Phase
   1. **DOM updates**: Based on the identified changes from the reconciliation process, React applies these updates to the actual browser DOM. This is the point where the UI visually changes
   2. **Browser repaint**: The browser then repaints the screen to reflect the updated DOM, making the changes visible to the user

**Key Concepts**

- **Virtual DOM**: A JavaScript object representation of the actual DOM, allowing React to efficiently calculate changes without directly manipulating the slower browser DOM.
- **Reconciliation**: The algorithm React uses to compare two Virtual DOM trees and determine the differences, optimizing the updates to the real DOM.
- **Fiber**: React's internal reconciliation engine, which enables features like incremental rendering and pausing/resuming work
  
[⬆ back to top](#top)

## Passing Data between Parent and Child Component

### using useState

```jsx
//Parent:
const ParentComponent = () => {
  const [dataFromChild, setDataFromChild] = useState(null);
  const handleDataFromChild = (data) => {  // Callback function to receive data from the child
    setDataFromChild(data);
  };
  return (
    <div>
      <h2>Parent Component</h2>
      <p>Data from Child: {dataFromChild}</p>
      <ChildComponent sendDataToParent={handleDataFromChild} />
    </div>
  );
};
//Child:
const ChildComponent = ({ sendDataToParent }) => {
  const dataToSend = 'Hello from Child!';
  // Function to send data to the parent on some event (e.g., button click)
  const sendDataToParentOnClick = () => {
    sendDataToParent(dataToSend);
  };
  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={sendDataToParentOnClick}>Send Data to Parent</button>
    </div>
  );
};
```

### using callback function

- child component -->  parent component:  `using callback function`
- parent component  -->  child component:   `using prop`
  
```js
// Child
const Button = ({ text, onButtonClick }) => {
    return <button onClick={() => onButtonClick("hello")}>{text}</button>;
};
// Parent
const App = () => {
    const onButtonClick = (value) => {
        console.log("OnButtonClick in parent", value);
    };
    return (
        <div>
            App <Button text="Add" onButtonClick={onButtonClick} />
        </div>
    );
};
```

## When to use a Class Component over a Function Component

- **Use Function Components**:
  - If you don't need state or lifecycle methods, and your component is purely presentational.
  - For simplicity, readability, and modern code practices, especially with the use of React Hooks for state and side effects.
- **Use Class Components**:
  - If you need to manage state or use lifecycle methods.
  - In scenarios where backward compatibility or integration with older code is necessary.

[⬆ back to top](#top)

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


[⬆ back to top](#top)
