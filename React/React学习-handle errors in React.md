[How to handle errors in React](#top)

- [try/catch - js tranditonal method](#trycatch---js-tranditonal-method)
- [try/catch + react](#trycatch--react)
- [React ErrorBoundary component](#react-errorboundary-component)

---------------------------------------------------------------------------------

## try/catch - js tranditonal method

```ts
try {
  doSomething();
} catch (e) {
  // like sending this error to some logging service
}
/** async function */
// 1. 
try {
  await fetch('/bla-bla');
} catch (e) {
  // oh no, the fetch failed! We should do something about it!
}
//2. promises way
fetch('/bla-bla').then((result) => {
  // if a promise is successful, the result will be here
}).catch((e) => {
  // oh no, the fetch failed! We should do something about it!
})
```

[⬆ back to top](#top)


## try/catch + react

- using `useEffect`

```ts
const SomeComponent = () => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    try {
      // do something like fetching some data
    } catch(e) {
      // oh no! the fetch failed, we have no data to render!
      setHasError(true);
    }
  })
  // something happened during fetch, lets render some nice error screen
  if (hasError) return <SomeErrorScreen />
  // all's good, data is here, let's render it
  return <SomeComponentContent {...datasomething} />
}
```

**The limitation**

1. have trouble with useEffect hook because useEffect is called asynchronously after render
   -  **try/catch should be placed inside useEffect**
2. children components: try/catch won’t be able to catch anything that is happening inside children components
3. setting state during render is a no-no
   1. following sample will cause an infinte loop of re-render
- if we rely solely on try/catch in React, we will either miss most of the errors, or will turn every component into an incomprehensible mess of code that will probably cause errors by itself

```ts
onst Component = () => {
  const [hasError, setHasError] = useState(false);
  try {
    doSomethingComplicated();
  } catch(e) {
    // don't do that! will cause infinite loop in case of an error
    setHasError(true);
  }
}
```

[⬆ back to top](#top)

## React ErrorBoundary component

- [Error Boundaries](https://react.dev/reference/react/useTransition#displaying-an-error-to-users-with-error-boundary): a special API that turns a regular component into a try/catch statement in a way, only for React declarative code
- Error Boundary for `useTransition` is currently only available in React’s canary and experimental channels.
  
```ts
// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // initialize the error state
    this.state = { hasError: false };
  }
  // if an error happened, set the state to true
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    // if error happened, return a fallback component
    if (this.state.hasError) {
      return <>Oh no! Epic fail!</>
    }
    return this.props.children;
  }
}
// using ErrorBoundary component
const Component = () => {
  return (
    <ErrorBoundary>
      <SomeChildComponent />
      <AnotherChildComponent />
    </ErrorBoundary>
  )
}
```

- Error boundary catches only errors that happen during React lifecycle
- Things that happen outside of it, like resolved promises, async code with setTimeout, various callbacks and event handlers, will just disappear if not dealt with explicitly
-** trick of Catching async errors with ErrorBoundary**: 
  - The trick here is to catch those errors first with try/catch, then inside catch statement trigger normal React re-render, and then re-throw those errors back into the re-render lifecycle. That way ErrorBoundary can catch them as any other error. And since state update is the way to trigger re-render, and state set function can actually accept a updater function as an argument

```ts
const Component = () => {
  // create some random state that we'll use to throw errors
  const [state, setState] = useState();
  const onClick = () => {
    try {
      // something bad happened
    } catch (e) {
      // trigger state update, with updater function as an argument
      setState(() => {
        // re-throw this error within the updater function
        // it will be triggered during state update
        throw e;
      })
    }
  }
}
```

[⬆ back to top](#top)


> reference
- [How to handle errors in React: full guide](https://www.developerway.com/posts/how-to-handle-errors-in-react)
- [codesandbox 1](https://codesandbox.io/p/sandbox/simple-error-boundary-component-4ldsun?file=%2Fsrc%2FApp.tsx)
- [codesandbox2](https://codesandbox.io/p/sandbox/simple-async-error-in-error-boundary-r8l22g)
