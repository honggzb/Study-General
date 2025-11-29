## React学习-type汇总

```ts
// ----------------------------------------------------------------------------------------------------------
// 1. 
function MyButton({ title }: { title: string }) {
  return ( ... );
}

// ----------------------------------------------------------------------------------------------------------
// 2. inline syntax
interface MyButtonProps {
  title: string;
  disabled: boolean;
}
function MyButton({ title, disabled }: MyButtonProps) {
   return ( ... );
}

// ----------------------------------------------------------------------------------------------------------
// 3. useState
   // Explicitly set the type to "boolean"
const [enabled, setEnabled] = useState<boolean>(false);
   // union type
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");
   // group related state as an object and describe the different possibilities via object types
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };
const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });

// ----------------------------------------------------------------------------------------------------------
// 4. useReducer: takes a reducer function and an initial state
nterface State {     // describes the shape of the reducer’s state
   count: number
};
type CounterAction =  // describes the different actions which can be dispatched to the reducer
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }
const initialState: State = { count: 0 };  // the initial state, and also the type which is used by useReducer by default
function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}
    //...
const [state, dispatch] = useReducer(stateReducer, initialState);
const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
const reset = () => dispatch({ type: "reset" });
   // A explicit alternative to setting the type on initialState is to provide a type argument to useReducer
import { stateReducer, State } from './your-reducer-implementation';
const initialState = { count: 0 };
export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}

// ----------------------------------------------------------------------------------------------------------
// 5. useContext: type of the value provided by the context is inferred from the value passed to the createContext call
import { createContext, useContext, useState } from 'react';
type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");
const useGetTheme = () => useContext(ThemeContext);

// ----------------------------------------------------------------------------------------------------------
// 6. useMemo: The result of calling the Hook is inferred from the return value from the function in the first parameter

   // The type of visibleTodos is inferred from the return value of filterTodos
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// ----------------------------------------------------------------------------------------------------------
// 7. useCallback: the function’s type is inferred from the return value of the function in the first parameter

 const [value, setValue] = useState("Change me");
 const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
 }, [setValue])

// ----------------------------------------------------------------------------------------------------------
// 8. FormData: a JavaScript standard since 2010

function onSubmit(event: React.FormEvent) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const formValues = {
    name: formData.get('name')
    email: formData.get('email)
  }
}
```

|Types|||
|---|---|---|
|DOM Events|`function handleChange(event: React.ChangeEvent<HTMLInputElement>) {}`|[the full list](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b580df54c0819ec9df62b0835a315dd48b8594a9/types/react/index.d.ts#L1247C1-L1373)|
|Children |`children: React.ReactNode;`,<br> `children: React.ReactElement;`||
|Style Props|`style: React.CSSProperties;`||

- [Using TypeScript in react](https://react.dev/learn/typescript)
- [The TypeScript handbook](https://www.typescriptlang.org/docs/handbook/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- 
