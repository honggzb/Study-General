[RxJS+react](#top)

- [General](#general)
- [Real-World Examples with RxJS in React](#real-world-examples-with-rxjs-in-react)
  - [Search Autocompletion with Debouncing](#search-autocompletion-with-debouncing)
  - [Real-Time Stock Ticker](#real-time-stock-ticker)
  - [Managing State with RxJS](#managing-state-with-rxjs)
  - [Combining multi-Streams with RxJS](#combining-multi-streams-with-rxjs)

-----------------------------------------------------------------------------
## General

- Benefit
  - **Streamlining** side effects: Handle <mark>asynchronous</mark> operations like API calls, user inputs, or WebSocket connections
  - Combining **multiple data sources**: Merge, combine, or process multiple streams efficiently
  - Providing **advanced operators**: Simplify debouncing, retrying, and error handling
  - Real-time updates of various widgets on the dashboard
- setup
  - `npm install rxjs`
  - note: can use hooks or library like [React-RxJS](https://react-rxjs.org/)
- <mark>Tips for Using RxJS in React</mark>
  - Cleanup Subscriptions: Always `unsubscribe` in useEffect to avoid memory leaks
  - State Synchronization: Use `BehaviorSubject` to keep RxJS state in sync with React state
  - Debugging: Use libraries like [rxjs-spy](https://github.com/cartant/rxjs-spy) to trace streams

## Real-World Examples with RxJS in React

### Search Autocompletion with Debouncing

**Create Streams and Subscribe to Events**

```ts
import { fromEvent } from 'rxjs';
const button = document.querySelector('button');
const clicks$ = fromEvent(button, 'click');
clicks$.subscribe(() => console.log('Button was clicked!'));
```

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

### Combining multi-Streams with RxJS

```ts
// create a stream from an array of numbers and use the filter operator to emit only even numbers. Subscribing to evenNumbers$ will log only the even numbers to the console
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
const numbers$ = from([1, 2, 3, 4, 5]);
const evenNumbers$ = numbers$.pipe(filter(n => n % 2 === 0));
evenNumbers$.subscribe(n => console.log(`Even number: ${n}`));
```

```ts
import { fromEvent, merge } from "rxjs";
const clicks$ = fromEvent(document, "click");
const keyPresses$ = fromEvent(document, "keypress");
const combined$ = merge(clicks$, keyPresses$);
combined$.subscribe((event) => console.log(event.type, event));
```

- `BehaviorSubjects` allow values to be multicasted to many Observers
- `combineLatest` function is used to create a new Observable that combines the latest values from multiple Observables (stateA$ and stateB$) into a single object
- Tips for Managing State Across Different Components
  - RxJS provides patterns and operators that can help to synchronize and update state across different parts of the application without causing performance bottlenecks or memory leaks

```ts
import { combineLatest } from 'rxjs';
const stateA$ = new BehaviorSubject(0);
const stateB$ = new BehaviorSubject('initial');
const combinedState$ = combineLatest([stateA$, stateB$]);
combinedState$.subscribe(([stateA, stateB]) => {
  console.log('Combined state:', { stateA, stateB });
});

```

- [Reactive Programming in React with RxJS: Advanced Concepts](https://medium.com/@ignatovich.dm/reactive-programming-in-react-with-rxjs-advanced-concepts-75d35c4ffd07)

[⬆ back to top](#top)
