- [Functional Components vs. Class Components](#functional-components-vs-class-components)
- [children to parent: passing event handlers as props](#children-to-parent-passing-event-handlers-as-props)
- [Common React Bottlenecks](#common-react-bottlenecks)
- [Performance Audits](#performance-audits)


## Functional Components vs. Class Components

||Class Components|Functional Components|
|---|---|---|
|defination |preferred for complex components that demand precise control over state and lifecycle behavior|similar to JavaScript functions that receive properties (props) and return React elements for rendering|
|Advantages|Performance<brInternal State Management<brPrecise Control over Behavior|Easier to reuse and compose<br>Promoting Functional Programming<br>Easier to test|
|Lifecycle |componentDidMount is used to fetch initial data when the component mounts<br> compocomponentDidUpdate is used to log a message whenever the data state changes<br>nentDidUpdate<br>componentWillUnmount is used to log a message before the component is unmounted|Function components don't have lifecycle methods. <br>However, with React Hooks, you can use the `useEffect` Hook to replicate lifecycle behavior <br>(like componentDidMount, componentDidUpdate, componentWillUnmount, and so on)|

- [Function Components vs Class Components in React – With Examples](https://www.freecodecamp.org/news/function-component-vs-class-component-in-react/)

## children to parent: passing event handlers as props

```ts
function ChildButton({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
function ParentButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }
  return (
    <ChildButton onClick={handlePlayClick}>
      Play "{movieName}"
    </ChildButton>
  );
}
export default function Toolbar() {
  return (
    <ParentButton movieName="Kiki's Delivery Service" />
  );
}
// event handler props
export default function App() {
  return (
    <ParentButton
      onPlayMovie={() => alert('Playing!')}      // with props
      onUploadImage={() => alert('Uploading!')} />
  );
}
function ParentButton({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <ChildButton onClick={onPlayMovie}> Play Movie</ChildButton>
      <ChildButton onClick={onUploadImage}>Upload Image</ChildButton>
    </div>
  );
}
function ChildButton({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

## Common React Bottlenecks

- Changes triggering unnecessary re-render
- DOM thrashing and manipulation
- Rendering large tables or lists without using virtualization
- Fetching data within a component's render method without caching or error handling
- Slow app loading time
  - bundling all together, leading to a large file size  -> no code splitting
- Poolly optimized state management
  - useMemo, useCallback

## Performance Audits

- Prepping for the Audit
  - Measure using a consistent environment
  - make sure KPI data measurement is in place
  - this may mean adding new collection mechanisms
- Performing the Audit
  - Measure your routes and/or component flows
  - document the steps as you go
  - Repeat tests a few times to avoid outliers
  - recore data and upload capture files
- profile
