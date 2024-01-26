[React学习-Hooks](#top)

- [useState](#usestate)
- [useEffect](#useeffect)
  - [pattern 1- there is no state or props dependency of function](#pattern-1--there-is-no-state-or-props-dependency-of-function)
  - [pattern 2- there is dependency of function](#pattern-2--there-is-dependency-of-function)
- [useMemo](#usememo)
- [useLayoutEffect](#uselayouteffect)
- [Custom Hooks](#custom-hooks)
- [useContext](#usecontext)
  - [Use case: global user name](#use-case-global-user-name)
  - [Updating the context](#updating-the-context)

--------------------------------------------------------------------------------

## useState

- calling set method will re-render component
- state change will trigger re-render function component from top to bottom

## useEffect

-  will fire for any of update lifecycle methods whenever render gets called
- `useEffect(() => {}, [thirdParameter])`: only when third parameter changed, re-render component will fire
- handle async in useEffect
  - using empty Array in third parameters or other state

```javascript
const [user, setUser] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
useEffect(() => {
  const fetchFunc = async () => {
    const response await fetch(`https://dxxx?username=${searchQuery}`);
    const resJson = await reponse.json()
    setUser(resJson[0]);
  };
  fetchFunc();
}, [])      // using empty Array
// or other state
//}, [searchQuery])
```

### pattern 1- there is no state or props dependency of function

- put function outside component

```javascript
const printMessage = (message) => {
  console.log('Test message', message);
}
export const UseEffectExample = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);
  useEffect(() => {
    printMessage('test1');
  }, []);        //printMessage only run one time
  return (
    <div>
      <h1>test1 value: {String(test1)}</h1>
      <h1>test2 value: {String(test2)}</h1>
      <button onClick={() => setTest1(!test1)}>Flip first value</button>
      <button onClick={() => setTest2(!test2)}>Flip Second value</button>
    </div>
  );
};
```

### pattern 2- there is dependency of function

1. define function inside useEffect
2. using useCallback

```javascript
// 1. define function inside useEffect
export const UseEffectExample = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);
  useEffect(() => {
    const myFunc = () => {
      console.log('Test message');
    };
    myFunc();
  }, [test1]);     //only change of test1 can triggle useEffect
  return (
    <div>
      <h1>test1 value: {String(test1)}</h1>
      <h1>test2 value: {String(test2)}</h1>
      <button onClick={() => setTest1(!test1)}>Flip test value</button>
      <button onClick={() => setTest2(!test2)}>Flip test value</button>
    </div>
  );
};
//2. using useCallback
export const UseEffectExample = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);
  const myFunc = useCallback(() => {
      console.log('Test message');
  }, [test1]);                //only change of test1 can triggle myFunc
  useEffect(() => {
    myFunc();
  }, [myFunc]);     
  return (
    <div>
      <h1>test1 value: {String(test1)}</h1>
      <h1>test2 value: {String(test2)}</h1>
      <button onClick={() => setTest1(!test1)}>Flip test value</button>
      <button onClick={() => setTest2(!test2)}>Flip test value</button>
    </div>
  );
};
```

[⬆ back to top](#top)

## useMemo

- same as `useCallback`

```javascript
export const UseEffectExample = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(true);
  const myObj = useMemo(() => ({
    a: 'my value of a is ' + test1,
  }),[test1]);      // only change of test1 can triggle init myObj
  useEffect(() => {
    console.log(myObj.a);
  }, [myObj]);
  return (
    <div>
      <h1>test1 value: {String(test1)}</h1>
      <h1>test2 value: {String(test2)}</h1>
      <button onClick={() => setTest1(!test1)}>Flip test value</button>
      <button onClick={() => setTest2(!test2)}>Flip test value</button>
    </div>
  );
};
```

[⬆ back to top](#top)

## useLayoutEffect

- `useLayoutEffect` run before `useEffect`

```javascript
import { useLayoutEffect, useEffect, useRef } from 'react';
import './styles.css';
export const UseLayoutEffectExample = () => {
  const ourDiv = useRef();
  useEffect(() => {
    console.log('useEffect');
    //ourDiv.current.style.backgroundColor = 'red';
  }, [ourDiv]);
  // there is no flick effect by using useLayoutEffect when DOM repaint because useLayoutEffect run before useEffect
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    ourDiv.current.style.backgroundColor = 'red';
  }, [ourDiv]);
  return (
    <div id='my-div' ref={ourDiv}>
      useLayoutEffect vs useEffect
    </div>
  );
};
```

[⬆ back to top](#top)

## Custom Hooks

- fetch data

```javascript
//use-fetch.effect.tsx
import {useState, useEffect} from 'react';
function useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response await fetch(url);
      const dataArray = await reponse.json()
      setData(dataArray[0]);
    };
    fetchData();
  });
  return data;
}
export default useFetch;
// use it in component
const user = useFetch('xxxxx'); 
```

- mouse move in and switch color

```javascript
// 1. hooks/useMouseCoordinates.jsx
import { useEffect, useState } from "react";
export function useMouseCoordinates(defaultValue) {
  const [mouseCoordinates, setMouseCoordinates] = useState(
    defaultValue || { x: null, y: null }
  );
  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      setMouseCoordinates({ x: event.x, y: event.y });
    });
  }, []);
  return { mouseCoordinates };   // return hook name
}
// 2. using in component
import { useMouseCoordinates } from "./hooks/useMouseCoordinates";
function OtherComponent() {
  const mouseCoordinates = useMouseCoordinates();  
  return (<div style={{ height: 100, width: 100, backgroundColor: mouseCoordinates.x > 66 ? "blue" : "red" }} />
  )
}
```

- scroll bottom to loading more

```javascript
// useScrollPosition.jsx
import { useEffect, useState } from "react";
export function useScrollPosition() {
    const [isBottom, setIsBottom] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll',() => {
            setIsBottom(
                window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight
            );
        });
    }, []);
    return { isBottom };
}
// App.jsx
const { isBottom } = useScrollPosition();
useEffect(() => {
    if(isBottom) {
      console.log("increment page !");
      incrementPage();
    }
  }, [isBottom])
```

[⬆ back to top](#top)

## useContext

- `useContext` allow your components to access global data and re-render when that global data is changed. Context solves the [props drilling problem](https://kentcdodds.com/blog/prop-drilling)
- `useContext` lets you supply child components with global data, no matter how deep they are in the components tree.
- can hold inside the context:
  - global state
  - theme
  - application configuration
  - authenticated user name
  - user settings
  - preferred language
  - a collection of services
- Defect
  - integrating the context adds complexity
  - adding context complicates unit testing of components
- How to use the context
  1. creating the context
  2. providing the context
  3. consuming the context

```javascript
// 1. context.js
import { createContext } from 'react';
export const Context = createContext('Default Value');
// 2. providing the context
import { Context } from './context';
function Main() {
  const value = 'My Context Value';
  return (
    <Context.Provider value={value}>
      <MyComponent />
    </Context.Provider>
  );
}
//3. consuming the context
import { useContext } from 'react';
import { Context } from './context';
function MyComponent() {
  const value = useContext(Context);
  return <span>{value}</span>;
}
```

### Use case: global user name

```javascript
import { useContext, createContext } from "react";
//creates the context that's going to hold the user name information
const UserContext = createContext("Unknown");   //
export function Application() {
  const [userName, setUserName] = useState('John Smith');
  //if I change the user name from 'John Smith' to 'Smith, John Smith', then <UserInfo /> consumer immediately re-renders to display the latest context value
  useEffect(() => {
    setTimeout(() => {
      setUserName('Smith, John Smith');
    }, 2000);
  }, []);
  return (
    <UserContext.Provider value={userName}>
      <Layout>Main content</Layout>
    </UserContext.Provider>
  );
}
//<Layout /> and <Header /> intermediate components don't have to pass down the userName prop
function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
function Header() {
  return (
    <header><UserInfo /></header>
  );
}
function UserInfo() {
  const userName = useContext(UserContext);
  return <span>{userName}</span>;
}
```

### Updating the context
  
- Context API is stateless by default and doesn't provide a dedicated method to update the context value from consumer components
- can be easily implemented by integrating a state management mechanism(like `useState()` or `seReducer()`hooks)

But this can be easily implemented by integrating a state management mechanism (like useState() or useReducer() hooks), and providing an update function right in the context next to the value itself.

In the following example, <Application /> component uses useState() hook to manage the context value.

```javascript
import { createContext, useState, useContext, useMemo } from 'react';

const UserContext = createContext({
  userName: '',
  setUserName: () => {},
});

function Application() {
  const [userName, setUserName] = useState('John Smith');
  const value = useMemo( () => ({ userName, setUserName }), [userName]);
  return (
    <UserContext.Provider value={value}>
      {useMemo(() => (
        <>
          <UserNameInput />
          <UserInfo />
        </>
      ), [])}
    </UserContext.Provider>
  );
}
function UserNameInput() {
  const { userName, setUserName } = useContext(UserContext);
  const changeHandler = event => setUserName(event.target.value);
  return (
    <input type="text" value={userName} onChange={changeHandler}  />
  );
}
function UserInfo() {
  const { userName } = useContext(UserContext);
  return <span>{userName}</span>;
}
```

- [A Guide to React Context and useContext() Hook](https://dmitripavlutin.com/react-context-and-usecontext)

[⬆ back to top](#top)

