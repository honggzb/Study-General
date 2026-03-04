[AbortController API- abort asynchronous API](#top)

- [AbortController with the Fetch API](#abortcontroller-with-the-fetch-api)
- [AbortController with fs.readFile](#abortcontroller-with-fsreadfile)
- [use AbortSignal to time out async operations](#use-abortsignal-to-time-out-async-operations)
- [use AbortSignal to cancel multiple operations](#use-abortsignal-to-cancel-multiple-operations)
- [AbortSignal Working with streams](#abortsignal-working-with-streams)
- [use the Abort Controller in React](#use-the-abort-controller-in-react)
  - [one line cleanup](#one-line-cleanup)
  - [common pattern using AbortController for API requests in react](#common-pattern-using-abortcontroller-for-api-requests-in-react)

## AbortController API

- The AbortController API is a handy API for aborting some **asynchronous** processes(Node v15.0.0+) like `fs.readFile`, `fs.writeFile`, `http.request`, `https.request`
- `abort` method:    👉 event to notify the abortable API watching the controller about the cancellation
  - third argument` { once: true }` to addEventListener as instead of using `removeEventListener`
- `signal` property: 👉 listen for the `abort` event
  - `reason`:  the reason you pass to the abort method at cancellation, initial vale is `undefined`
  - `aborted`: initial value is `false`, changes to `true` after aborting
- **Benefit**: 
  - pass the **signal** property to a **cancelable asynchronous** API and invoke the controller’s **abort** method to trigger the **abort process**

```ts
const controller = new AbortController();      //1
const { signal } = controller;                 //2
const abortEventListener = (event) => {
  console.log(signal.aborted); // true
  console.log(signal.reason); // Hello World
};
signal.addEventListener("abort", abortEventListener);     //3
//or 
signal.addEventListener("abort", abortEventListener, { once: true });
controller.abort("Hello World");                          //4
signal.removeEventListener("abort", abortEventListener);  //5

```

[🚀back to top](#top)

## AbortController with the Fetch API

```ts
const url = "https://jsonplaceholder.typicode.com/todos/1";

const controller = new AbortController();
const signal = controller.signal;

const fetchTodo = async () => {
  try {
    const response = await fetch(url, { signal });
    const todo = await response.json();
    console.log(todo);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Operation timed out");
    } else {
      console.error(err);
    }
  }
};

fetchTodo();
controller.abort();
```

[🚀back to top](#top)

## AbortController with fs.readFile

```ts
const fs = require("node:fs");

const controller = new AbortController();
const { signal } = controller;

fs.readFile("data.txt", { signal, encoding: "utf8" }, (error, data) => {
  if (error) {
    if (error.name === "AbortError") {
      console.log("Read file process aborted");
    } else {
      console.error(error);
    }
    return;
  }
  console.log(data);
});

controller.abort();
```

[🚀back to top](#top)

## use AbortSignal to time out async operations

- `AbortSignal.timeout()` static method

```ts
const signal = AbortSignal.timeout(200);
const url = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    const response = await fetch(url, { signal });
    const todo = await response.json();
    console.log(todo);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Operation timed out");
    } else {
      console.error(err);
    }
  }
};

fetchTodo();
```

[🚀back to top](#top)

## use AbortSignal to cancel multiple operations

- `AbortSignal.any()`

```ts
// Create two separate controllers for different concerns
const userController = new AbortController();
const timeoutController = new AbortController();
// Set up a timeout that will abort after 5 seconds
setTimeout(() => timeoutController.abort(), 5000);
// Register an event listener that can be aborted by either signal
document.addEventListener('click', handleUserClick, {
  signal: AbortSignal.any([userController.signal, timeoutController.signal])
});
```

[🚀back to top](#top)

## AbortSignal Working with streams

```ts
const abortController = new AbortController();
const { signal } = abortController;
const uploadStream = new WritableStream({
  /* implementation */
}, { signal });
// To abort:
abortController.abort();
```

[🚀back to top](#top)

## use the Abort Controller in React

### one line cleanup

```ts
useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;
  // Define all your handler functions
  const handleMouseMove = (e) => { /* update state */ };
  const handleKeyPress = (e) => { /* update state */ };
  const handleScroll = () => { /* update state */ };
  const handleResize = () => { /* update state */ };
  // Add all the listeners with the signal
  document.addEventListener('mousemove', handleMouseMove, { signal });
  document.addEventListener('keydown', handleKeyPress, { signal });
  window.addEventListener('scroll', handleScroll, { signal });
  window.addEventListener('resize', handleResize, { signal });
  // Just one line for cleanup, no matter the number of event listeners available!
  return () => controller.abort();
}, []);
```

### common pattern using AbortController for API requests in react

- necessarily need a `useEffect()` to use an `AbortController` in React
- can constantly use the `AbortController` for **fetch requests** in React

```ts
// Key implementation of AbortController for API requests in React
// Component with search functionality
const SearchComponent = () => {
  const controllerRef = useRef<AbortController>();
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<Array<any> | undefined>();

  async function handleOnChange(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    // Update the query state
    setQuery(target.value);
    setResults(undefined);
    // Cancel any previous in-flight request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    // Create a new controller for this request
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          query: target.value
        }),
        signal
      });

      const data = await response.json();
      setResults(data.results);
    } catch(e) {
      // Silently catch aborted requests
      // For production, you might want to check if error is an AbortError
    }
  }
  return (
    <div>
      <input type="text" onChange={handleOnChange} />
      {/* Results rendering */}
    </div>
  );
};
```

[🚀back to top](#top)

> [The complete guide to the AbortController API](https://blog.logrocket.com/complete-guide-abortcontroller/)
