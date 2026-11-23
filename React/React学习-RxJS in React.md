[React学习-RxJS in React](#top)

- [Core Integration Patterns](#core-integration-patterns)
  - [Custom Hook with useEffect (Simple Streams)](#custom-hook-with-useeffect-simple-streams)
  - [BehaviorSubject + useSyncExternalStore (Global State)](#behaviorsubject--usesyncexternalstore-global-state)
  - [Dedicated Binding Libraries](#dedicated-binding-libraries)
- [Common Pitfalls to Watch For](#common-pitfalls-to-watch-for)
- [Real-World Examples with RxJS in React](#real-world-examples-with-rxjs-in-react)
  - [Search Autocompletion with Debouncing](#search-autocompletion-with-debouncing)
  - [Real-Time Stock Ticker](#real-time-stock-ticker)
  - [Managing State with RxJS](#managing-state-with-rxjs)
- [Advanced - Combining Streams with RxJS](#advanced---combining-streams-with-rxjs)


---------------------

RxJS (Reactive Extensions for JavaScript) pairs with React to handle **complex asynchronous data streams, real-time events, and shared state using observables**. While React focuses on rendering UI, RxJS acts as a push-based data pipeline—though its steep learning curve means it is best reserved for intricate async workflows rather than basic state.

When to Use RxJS in React

- **Complex asynchronous flows**. Use operators like `switchMap`, `debounceTime`, and `distinctUntilChanged` to prevent race conditions in real-time typeahead searches or chained API requests, or WebSocket connections.
- **High-frequency event streams**. Manage WebSockets, drag-and-drop interactions, or live telemetry feeds cleanly without messy useEffect dependency arrays.
- **Combining multiple data sources**: Merge, combine, or process multiple streams efficiently
- **Providing advanced operators**: Simplify debouncing, retrying, and error handling
- **Cross-framework state sharing**. Keep business logic and state pipelines framework-agnostic if sharing code between React and Angular or vanilla JS

## Core Integration Patterns

### Custom Hook with useEffect (Simple Streams)

- For basic event streams or intervals, subscribe inside useEffect and return a cleanup function to prevent memory leaks
- **Tip**: Define observable$ outside the component or wrap it in useMemo so it doesn't recreate on every render.

```ts
import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
   // Tip: Define observable$ outside the component or wrap it in useMemo so it doesn't recreate on every render.
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const subscription = observable$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable$]);
  return value;
}
```

### BehaviorSubject + useSyncExternalStore (Global State)

- For shared state in modern React, pair an RxJS BehaviorSubject (which holds a current value) with React's useSyncExternalStore to prevent UI tearing during concurrent rendering

```ts
import { useSyncExternalStore } from 'react';
import { BehaviorSubject } from 'rxjs';
// 1. Create store outside React
const count$ = new BehaviorSubject<number>(0);
export const increment = () => count$.next(count$.getValue() + 1);
// 2. Subscribe safely in React
export function Counter() {
  const count = useSyncExternalStore(
    (callback) => {
      const sub = count$.subscribe(callback);
      return () => sub.unsubscribe();
    },
    () => count$.getValue()
  );
  return <button onClick={increment}>Count: {count}</button>;
}
```

### Dedicated Binding Libraries

- **React-RxJS**. Provides a `bind()` utility that connects RxJS streams directly to React hooks with automatic subscription management and Suspense support.
- **observable-hooks**. Offers lightweight hooks like useObservableState and useSubscription to bridge streams and component lifecycles.

## Common Pitfalls to Watch For

- React Strict Mode double-firing. Strict Mode mounts, unmounts, and remounts components in development. If you subscribe to a cold observable (like an HTTP call), it will fire twice. Use `shareReplay(1)` to multicast the stream.
- Forgetting to `unsubscribe`. Always **clean up** subscriptions on unmount (subscription.unsubscribe()), or observables like interval and WebSockets will continue running in the background.
- **State Synchronization**: Use `BehaviorSubject` to keep RxJS state in sync with React state

[⬆ back to top](#top)

## Real-World Examples with RxJS in React

### Search Autocompletion with Debouncing

```ts
import React, { useState, useEffect } from "react";
import { fromEvent } from "rxjs";
import { debounceTime, pluck, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
const SearchComponent = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const input = document.querySelector("#search");
    const subscription = fromEvent(input, "input")
      .pipe(
        pluck("target", "value"), // Extract the input value
        debounceTime(300), // Wait for 300ms after user stops typing
        switchMap((query) =>
          ajax.getJSON(`https://api.example.com/search?q=${query}`).pipe(
            catchError((err) => {
              setError(err.message);
              return [];
            })
          )
        )
      )
      .subscribe((data) => setResults(data));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <input id="search" type="text" placeholder="Search..." />
      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
```

[⬆ back to top](#top)

### Real-Time Stock Ticker

```ts
// subscribe to a live data stream to display continuously updating stock prices.
import React, { useState, useEffect } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
const StockTicker = () => {
  const [stock, setStock] = useState({ symbol: "AAPL", price: 0 });
  useEffect(() => {
    const stockStream = interval(1000).pipe(
      map(() => ({
        symbol: "AAPL",
        price: (Math.random() * 1000).toFixed(2)
      }))
    );
    const subscription = stockStream.subscribe(setStock);
    return () => subscription.unsubscribe();
  }, []);
  return (
    <div>
      <h2>{stock.symbol}</h2>
      <p>Price: ${stock.price}</p>
    </div>
  );
};
export default StockTicker;
```

[⬆ back to top](#top)

### Managing State with RxJS

```ts
// RxJS can act as a state management solution. Use Subjects to manage global states across components
// stateService.js
import { BehaviorSubject } from "rxjs";
const theme$ = new BehaviorSubject("light");
export const setTheme = (newTheme) => theme$.next(newTheme);
export const getTheme = () => theme$.asObservable();

// App.js
import React, { useEffect, useState } from "react";
import { getTheme, setTheme } from "./stateService";
const App = () => {
  const [theme, setLocalTheme] = useState("light");
  useEffect(() => {
    const subscription = getTheme().subscribe(setLocalTheme);
    return () => subscription.unsubscribe();
  }, []);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className={theme}>
      <h1>{theme} mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
export default App;
```

[⬆ back to top](#top)

## Advanced - Combining Streams with RxJS

```ts
//merge mouse clicks and key presses into a single stream
import { fromEvent, merge } from "rxjs";
const clicks$ = fromEvent(document, "click");
const keyPresses$ = fromEvent(document, "keypress");
const combined$ = merge(clicks$, keyPresses$);
combined$.subscribe((event) => console.log(event.type, event));
```

[⬆ back to top](#top)

> [Reactive Programming in React with RxJS: Advanced Concepts](https://medium.com/@ignatovich.dm/reactive-programming-in-react-with-rxjs-advanced-concepts-75d35c4ffd07)
