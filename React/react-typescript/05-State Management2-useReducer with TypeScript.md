[React typescript -5.State Management2-useReducer with TypeScript](#top)

- [Basic useState Pattern](#basic-usestate-pattern)
- [Action Creators with Type Safety](#action-creators-with-type-safety)
- [Generic Actions for Common Patterns](#generic-actions-for-common-patterns)
- [Real-World Example: Reducer-Driven Form with Derived Action/Dispatch Types](#real-world-example-reducer-driven-form-with-derived-actiondispatch-types)
- [UseCallback with TypeScript](#usecallback-with-typescript)

-------------------------------------------------------------------------

- <mark>Let inference work for primitives</mark>: `useState(0)`, `useState('')`, `useState(false)`
- <mark>Be explicit with unions</mark>: `useState<Status>('idle')`
- <mark>Always type empty containers</mark>: `useState<T[]>([])`, `useState<Partial<T>>({})`
- <mark>Use discriminated unions for complex state</mark>: Prevent impossible state combinations
- <mark>Prefer functional updates</mark>: They’re safer and get better type checking
- <mark>Define types separately</mark>: Make them reusable and improve error messages
- <mark>Use exhaustive checking</mark>: Add `never` checks in **reducers**

## Basic useState Pattern

- useReducer handle complex state logic, so it is better use **Discriminated Unions** for Complex State

```ts
// ❌ Problematic approach - allows impossible states
// What if loading=true AND error=true? What if data exists but loading=true?
interface BadAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
// ✅ Better approach - impossible states are impossible
interface CounterState {
  count: number;
  step: number;
}
// ✅ Define all possible actions with discriminated union
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set':
      return { ...state, count: action.payload }; // TypeScript knows payload exists
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:             // This ensures we handle all action types
      // The never type in the default case is a neat trick—if you add a new action type but forget to handle it, TypeScript will yell at you
      const _exhaustive: never = action;
      return state;
  }
}
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });
  // TypeScript validates these action objects
  const increment = () => dispatch({ type: 'increment' });
  const setCount = (value: number) => dispatch({ type: 'set', payload: value });
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>+{state.step}</button>
    </div>
  );
}
```

[🚀back to top](#top)

## Action Creators with Type Safety

```ts
// Action creators with proper typing
const counterActions = {
  increment: (): CounterAction => ({ type: 'increment' }),
  decrement: (): CounterAction => ({ type: 'decrement' }),
  set: (value: number): CounterAction => ({ type: 'set', value }),
  incrementBy: (amount: number): CounterAction => ({ type: 'incrementBy', amount }),
} as const;
// Usage in component
function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterActions.increment())}>+1</button>
      <button onClick={() => dispatch(counterActions.incrementBy(5))}>+5</button>
      <button onClick={() => dispatch(counterActions.set(0))}>Reset</button>
    </div>
  );
}
```

[🚀back to top](#top)

## Generic Actions for Common Patterns

```ts
// Generic action patterns
type AsyncAction<T extends string, TData = undefined> = TData extends undefined
  ? { type: `${T}_PENDING` } | { type: `${T}_FULFILLED` } | { type: `${T}_REJECTED`; error: string }
  :   | { type: `${T}_PENDING` }
      | { type: `${T}_FULFILLED`; data: TData }
      | { type: `${T}_REJECTED`; error: string };
// Usage for API calls
type UserAction = AsyncAction<'FETCH_USER', User> | AsyncAction<'DELETE_USER'>;
// This generates:
// | { type: 'FETCH_USER_PENDING' }
// | { type: 'FETCH_USER_FULFILLED'; data: User }
// | { type: 'FETCH_USER_REJECTED'; error: string }
// | { type: 'DELETE_USER_PENDING' }
// | { type: 'DELETE_USER_FULFILLED' }
// | { type: 'DELETE_USER_REJECTED'; error: string }
```

[🚀back to top](#top)

## Real-World Example: Reducer-Driven Form with Derived Action/Dispatch Types

```ts
// complext state sample
interface FormState {
  fields: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: Partial<Record<keyof FormState['fields'], string>>;
  isSubmitting: boolean;
  submitCount: number;
}
/** Reducer-Driven Form with Derived Action/Dispatch Types  */
// 1) State
interface LoginState {
  email: string;
  password: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  error?: string;
}
// 2) Action creators (as const for literal types)
const loginActions = {
  updateEmail: (value: string) => ({ type: 'updateEmail', value }) as const,
  updatePassword: (value: string) => ({ type: 'updatePassword', value }) as const,
  submit: () => ({ type: 'submit' }) as const,
  success: () => ({ type: 'success' }) as const,
  failure: (message: string) => ({ type: 'failure', message }) as const,
};
// 3) Derive Action and Dispatch from creators
type LoginAction = ReturnType<(typeof loginActions)[keyof typeof loginActions]>;
type LoginDispatch = React.Dispatch<LoginAction>;
// 4) Reducer with exhaustive check
function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'updateEmail':
      return { ...state, email: action.value };
    case 'updatePassword':
      return { ...state, password: action.value };
    case 'submit':
      return { ...state, status: 'submitting', error: undefined };
    case 'success':
      return { ...state, status: 'success' };
    case 'failure':
      return { ...state, status: 'error', error: action.message };
    default: {
      const _exhaustive: never = action;    //exhaustive check with never type
      return state;
    }
  }
}
// 5) Hook that exposes typed dispatch
function useLoginForm() {
  const [state, dispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
    status: 'idle',
  });
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(loginActions.updateEmail(e.target.value));
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(loginActions.updatePassword(e.target.value));
  const submit = async () => {
    dispatch(loginActions.submit());
    try {
      await fakeLogin(state.email, state.password);
      dispatch(loginActions.success());
    } catch (e) {
      dispatch(loginActions.failure(e instanceof Error ? e.message : 'Unknown error'));
    }
  };
  return { state, dispatch: dispatch as LoginDispatch, onEmailChange, onPasswordChange, submit };
}

type FormAction =
  | { type: 'updateField'; field: keyof FormState['fields']; value: string }
  | { type: 'setError'; field: keyof FormState['fields']; error: string }
  | { type: 'clearError'; field: keyof FormState['fields'] }
  | { type: 'setSubmitting'; isSubmitting: boolean }
  | { type: 'submitAttempt' }
  | { type: 'reset' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
        // Clear error when user starts typing
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'setError':
      return { ...state,  errors: { ...state.errors, [action.field]: action.error }};
    case 'clearError':
      return { ...state, errors: {...state.errors, [action.field]: undefined } };
    case 'setSubmitting':
      return { ...state, isSubmitting: action.isSubmitting };
    case 'submitAttempt':
      return { ...state, submitCount: state.submitCount + 1 };
    case 'reset':
      return {
        fields: { email: '', password: '', confirmPassword: '' },
        errors: {},
        isSubmitting: false,
        submitCount: 0,
      };
    default:
      const _exhaustive: never = action;
      return state;
  }
}

function useForm() {
    const [state, dispatch] = useReducer(formReducer, {
      fields: { email: '', password: '', confirmPassword: '' },
      errors: {},
      isSubmitting: false,
      submitCount: 0,
  });
  const updateField = (field: keyof FormState['fields'], value: string) => {
      dispatch({ type: 'updateField', field, value });
  };
  const validateAndSubmit = async () => {
    // Validation logic here...
    dispatch({ type: 'submitAttempt' });
    dispatch({ type: 'setSubmitting', isSubmitting: true });
      try {
        // Submit logic...
        console.log('Form submitted:', state.fields);
      } catch (error) {
        dispatch({ type: 'setError', field: 'email', error: 'Submission failed' });
      } finally {
        dispatch({ type: 'setSubmitting', isSubmitting: false });
      }
  };
  return { state, updateField, validateAndSubmit, dispatch };
}
```

[🚀back to top](#top)

## UseCallback with TypeScript

- Proper typing doesn’t just prevent bugs—it can also guide performance optimizations
- model state precisely, can use React’s optimization hooks more effectively

```ts
interface OptimizedState {
  expensiveData: ComplexObject[];
  uiState: {
    selectedId: string | null;
    isModalOpen: boolean;
  };
}
function useOptimizedState() {
  const [state, setState] = useState<OptimizedState>({
    expensiveData: [],
    uiState: { selectedId: null, isModalOpen: false },
  });
  // Separate setters for different concerns
  const updateUiState = useCallback((updates: Partial<OptimizedState['uiState']>) => {
    setState((prev) => ({
      ...prev,
      uiState: { ...prev.uiState, ...updates },
    }));
  }, []);
  const updateExpensiveData = useCallback((data: ComplexObject[]) => {
    setState((prev) => ({ ...prev, expensiveData: data }));
  }, []);
  return { state, updateUiState, updateExpensiveData };
}
```

[🚀back to top](#top)
