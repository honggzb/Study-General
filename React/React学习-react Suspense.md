[React Suspense](#top)

- [React Suspense](#react-suspense)
- [Use cases of Suspense](#use-cases-of-suspense)
  - [Data fetching](#data-fetching)
  - [Lazy loading components](#lazy-loading-components)
  - [Handling multiple asynchronous operations](#handling-multiple-asynchronous-operations)


## React Suspense

- React Suspense is a built-in feature that simplifies managing asynchronous operations
- React Suspense checks if any child components are waiting for a promise to resolve. If so, React "suspends" the rendering of those components and displays a fallback UI, such as a loading spinner or message, until the promise is resolved
  - Render as you fetch data
- works with server-side rendering(SSR)
  - React Suspense also enhances server-side rendering (SSR) by allowing you to render parts of your application progressively
  - With SSR, you can use renderToPipeableStream to load essential parts of your page first and progressively load the remaining parts as they become available. 
  - Suspense manages the fallbacks during this process, improving performance, user experience, and SEO

```ts
<Suspense fallback={<div>Loading books...</div>}>
  <Books />
</Suspense>
```

[🚀back to top](#top)

## Use cases of Suspense

### Data fetching

- Render as you fetch data

```ts
const fetchData = () => {
      let data;
      let promise = fetch('/api/data').then(response => response.json()).then(json => { data = json });
      return {
        read() {
          if (!data) {
            throw promise;
          }
          return data;
        }
      };
};
const resource = fetchData();
const App = () => (
      <Suspense fallback={<p>Loading data...</p>}>
        <DataComponent />
      </Suspense>
);
const DataComponent = () => {
    const data = resource.read();
    return (
      <div><h1>Data: {data.value}</h1></div>
    );
};
```

[🚀back to top](#top)

### Lazy loading components

- Suspense works seamlessly with React's lazy() function to load components only when needed, reducing your application's initial load time. This is especially useful for large applications where not all components are required immediately

```ts
const LazyComponent = React.lazy(() => import('./LazyComponent'));
const App = () => (
  <Suspense fallback={<p>Loading component...</p>}>
    <LazyComponent />
  </Suspense>
);
```

### Handling multiple asynchronous operations

- '/sample-codes/react-suspense'

[🚀back to top](#top)

- https://github.com/rendrdotio/suspense

