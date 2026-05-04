[React typescript -7.Context and Selector Patterns + Dispatch Prop](#top)

- [Basic Typed Context Pattern](#basic-typed-context-pattern)
- [State and Actions Split Pattern](#state-and-actions-split-pattern)
- [Selector Pattern- good performance](#selector-pattern--good-performance)
- [General Real World Use Cases](#general-real-world-use-cases)
- [Safer createContext Helper](#safer-createcontext-helper)
  - [Advanced: Context with Actions Pattern](#advanced-context-with-actions-pattern)
  - [Runtime Validation with Zod](#runtime-validation-with-zod)
  - [Real World Use Cases- Theme Context with System Preference Detection](#real-world-use-cases--theme-context-with-system-preference-detection)
- [Performance Considerations](#performance-considerations)
  - [Provider Value Memoization](#provider-value-memoization)
  - [Callback Stability](#callback-stability)
- [Dispatch Prop to Context](#dispatch-prop-to-context)
  - [1 Create Typed Context](#1-create-typed-context)
  - [2 Implement the Provider](#2-implement-the-provider)
  - [3 Gradual Migration Strategy](#3-gradual-migration-strategy)
  - [Real World Migration Example: Multi-step Form State Management](#real-world-migration-example-multi-step-form-state-management)

--------------------------------------------------

- **Type safety**: Context values are never undefined—TypeScript knows this
- **Split state and actions**: prevent unnecessary re-renders, **better performance and maintainability**
- Use **selectors** to minimize re-renders and subscribe only to needed data
- Leverage** discriminated unions** for type-safe state transitions
- Create **custom hooks** that **encapsulate** context usage and provide runtime safety

## Basic Typed Context Pattern

- **Always create a custom hook for your context rather than exposing `useContext` directly**. This lets you add runtime checks and encapsulate the context usage pattern.

```ts
import { createContext, useContext, ReactNode } from 'react';
// ✅ Define your context value type explicitly
interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
// ✅ Create context with undefined as default
const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
  children: ReactNode;
}
export function UserProvider({ children }: UserProviderProps) {
  const value: UserContextType = {
    currentUser,
    isLoading,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
// ✅ Custom hook with runtime safety check
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

[🚀back to top](#top)

## State and Actions Split Pattern

- splitting context into separate state and actions can improve both performance and maintainability
  - This pattern borrows ideas from Redux but keeps things simpler
- benefit of this pattern
  - **Performance**: Components that only trigger actions don’t re-render when state changes
  - **Clarity**: The separation makes it obvious what’s state vs. what’s behavior
  - **Testing**: You can test actions independently from the components that use them

```ts
import { createContext, useContext, useReducer, ReactNode } from 'react';

// ✅ Separate state and actions
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}
interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
  loadTodos: () => Promise<void>;
}
// ✅ Create separate contexts
const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoActionsContext = createContext<TodoActions | undefined>(undefined);
// ✅ Reducer for state management
type TodoAction =
  | { type: 'ADD_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: TodoState['filter'] } }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }
  | { type: 'SET_TODOS'; payload: { todos: Todo[] } };
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
            createdAt: new Date(),
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    // ... other cases
    default:
      return state;
  }
}
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });
  // ✅ Actions that use the dispatch function
  const actions: TodoActions = {
    addTodo: (text: string) => {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: crypto.randomUUID(), text },
      });
    },
    toggleTodo: (id: string) => {
      dispatch({ type: 'TOGGLE_TODO', payload: { id } });
    },
    deleteTodo: (id: string) => {
      dispatch({ type: 'DELETE_TODO', payload: { id } });
    },
    setFilter: (filter: TodoState['filter']) => {
      dispatch({ type: 'SET_FILTER', payload: { filter } });
    },
    loadTodos: async () => {
      dispatch({ type: 'SET_LOADING', payload: { isLoading: true } });
      try {
        const todos = await fetchTodos();
        dispatch({ type: 'SET_TODOS', payload: { todos } });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
      }
    },
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoActionsContext.Provider value={actions}>{children}</TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}
// ✅ Separate hooks for state and actions
export function useTodoState(): TodoState {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
}
export function useTodoActions(): TodoActions {
  const context = useContext(TodoActionsContext);
  if (context === undefined) {
    throw new Error('useTodoActions must be used within a TodoProvider');
  }
  return context;
}
```

[🚀back to top](#top)

## Selector Pattern- good performance

- selector pattern lets components **subscribe only to the specific slices of state** they care about, dramatically reducing unnecessary re-renders
- The `useSyncExternalStore` hook is React 18’s recommended way to subscribe to external stores. It handles the tricky bits of ensuring your selectors work correctly with React’s concurrent features

```ts
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';
// ✅ State store with subscription capabilities
class AppStateStore {
  private state: AppState;
  private listeners = new Set<() => void>();
  constructor(initialState: AppState) {
    this.state = initialState;
  }
  getState = (): AppState => {
    return this.state;
  };
  setState = (newState: Partial<AppState>): void => {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}
// ✅ Context that provides the store
const AppStateContext = createContext<AppStateStore | undefined>(undefined);
export function AppStateProvider({ children }: { children: ReactNode }) {
  const store = useMemo(
    () =>
      new AppStateStore({
        user: null,
        todos: [],
        theme: 'light',
        notifications: [],
        isLoading: false,
      }),
    [],
  );
  return <AppStateContext.Provider value={store}>{children}</AppStateContext.Provider>;
}
// ✅ Selector hook that prevents unnecessary re-renders
export function useAppState<T>(selector: (state: AppState) => T): T {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [selector, store]),
  );
}
// ✅ Actions hook for state updates
export function useAppActions() {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppActions must be used within AppStateProvider');
  }
  return {
    setUser: (user: User | null) => store.setState({ user }),
    addTodo: (todo: Todo) => {
      const currentState = store.getState();
      store.setState({ todos: [...currentState.todos, todo] });
    },
    setTheme: (theme: 'light' | 'dark') => store.setState({ theme }),
    setLoading: (isLoading: boolean) => store.setState({ isLoading }),
  };
}
/* using in components */
// ✅ This component only re-renders when the user changes
function UserProfile() {
  const user = useAppState((state) => state.user);
  const { setUser } = useAppActions();
  if (!user) return <LoginPrompt />;
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}
// ✅ This component only re-renders when todos change
function TodoCount() {
  const todoCount = useAppState((state) => state.todos.length);
  const completedCount = useAppState(
    (state) => state.todos.filter((todo) => todo.completed).length,
  );
  return (
    <div>
      {completedCount} of {todoCount} completed
    </div>
  );
}
// ✅ This component only re-renders when theme changes
function ThemeToggle() {
  const theme = useAppState((state) => state.theme);
  const { setTheme } = useAppActions();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

[🚀back to top](#top)

## General Real World Use Cases

- Shopping Cart with Performance Optimization
- Multi-Step Form with Validation State
- Real-Time Dashboard

```ts
// Separate contexts for cart data and UI state
const CartDataContext = createContext<CartState | undefined>(undefined);
const CartUIContext = createContext<CartUIActions | undefined>(undefined);
// Components that show cart count don't re-render when UI state changes
function CartBadge() {
  const itemCount = useCartData((state) => state.items.length);
  return <Badge count={itemCount} />;
}
// Cart drawer only re-renders when UI state changes
function CartDrawer() {
  const isOpen = useCartUI((state) => state.isDrawerOpen);
  const { closeDrawer } = useCartActions();
  return <Drawer isOpen={isOpen} onClose={closeDrawer} />;
}
```

[🚀back to top](#top)

## Safer createContext Helper
- React Context is powerful, but the default createContext API leaves you with an uncomfortable truth: your context value might be undefined if someone forgets to wrap their component tree in a Provider.
- This leads to defensive programming, runtime checks, and the occasional late-night debugging session when you realize why your app is throwing errors in production.

```ts
type Theme = 'light' | 'dark';
interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
}
const [useTheme, ThemeProvider] = createSafeContext<ThemeContextValue>('Theme');
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeProvider value={value}>{children}</ThemeProvider>;
}
// ❌ If you forget to wrap with <AppThemeProvider>, useTheme() will throw
export function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Never undefined
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}
```

```ts
import { createContext, useContext, Context, ReactNode } from 'react';
/**
 * Creates a context that never returns undefined and provides a typed hook
 * @param displayName - Name for debugging and error messages
 * @returns Tuple of [hook, Provider component, raw context]
 */
export function createSafeContext<T>(displayName: string) {
  const context = createContext<T | null>(null);   // ✅ No undefined in the type - we're confident about this
  if (process.env.NODE_ENV !== 'production') {
    context.displayName = displayName;
  }
  // ✅ Custom hook that guarantees a value
  function useContextHook(): T {
    const contextValue = useContext(context);
    if (contextValue === null) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider. ` +
          `Make sure your component is wrapped with <${displayName}Provider>.`,
      );
    }
    return contextValue;
  }
  // ✅ Provider component that prevents null values
  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }
  // Set display names for better debugging
  if (process.env.NODE_ENV !== 'production') {
    useContextHook.displayName = `use${displayName}`;
    ContextProvider.displayName = `${displayName}Provider`;
  }

  return [useContextHook, ContextProvider, context] as const;
}
```

### Advanced: Context with Actions Pattern

- for complex state, it will separate contexts for state and actions (this prevents unnecessary re-renders when components only need to dispatch actions):

```ts
/* Creates separate state and actions contexts for performance optimization*/
export function createStateActionContext<State, Actions>(displayName: string) {
  const StateContext = createContext<State | null>(null);
  const ActionsContext = createContext<Actions | null>(null);
  if (process.env.NODE_ENV !== 'production') {
    StateContext.displayName = `${displayName}State`;
    ActionsContext.displayName = `${displayName}Actions`;
  }
  function useStateHook(): State {
    const state = useContext(StateContext);
    if (state === null) {
      throw new Error(`use${displayName}State must be used within a ${displayName}Provider`);
    }
    return state;
  }
  function useActionsHook(): Actions {
    const actions = useContext(ActionsContext);
    if (actions === null) {
      throw new Error(`use${displayName}Actions must be used within a ${displayName}Provider`);
    }
    return actions;
  }
  function Provider({
    children,
    state,
    actions,
  }: {
    children: ReactNode;
    state: State;
    actions: Actions;
  }) {
    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
      </StateContext.Provider>
    );
  }
  if (process.env.NODE_ENV !== 'production') {
    useStateHook.displayName = `use${displayName}State`;
    useActionsHook.displayName = `use${displayName}Actions`;
    Provider.displayName = `${displayName}Provider`;
  }
  return [useStateHook, useActionsHook, Provider] as const;
}
/* use it with a todo list  */
interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
}
const [useTodoState, useTodoActions, TodoProvider] = createStateActionContext<
  TodoState,
  TodoActions
>('Todo');
export function TodoManager({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });
  const actions: TodoActions = {
    addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: { text } }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: { id } }),
    deleteTodo: (id) => dispatch({ type: 'DELETE_TODO', payload: { id } }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: { filter } }),
  };
  return (
    <TodoProvider state={state} actions={actions}>
      {children}
    </TodoProvider>
  );
}
// ✅ Components only re-render when their specific slice changes
function TodoFilters() {
  const { filter } = useTodoState(); // Only re-renders when filter changes
  const { setFilter } = useTodoActions(); // Never re-renders
  return (
    <div>
      {(['all', 'active', 'completed'] as const).map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={filter === filterOption ? 'active' : ''}
        >
          {filterOption}
        </button>
      ))}
    </div>
  );
}
```

[🚀back to top](#top)

### Runtime Validation with Zod

```ts
import { z } from 'zod';
const UserContextSchema = z.object({
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    })
    .nullable(),
  login: z.function(),
  logout: z.function(),
});
type UserContextType = z.infer<typeof UserContextSchema>;

export function createValidatedContext<T>(displayName: string, schema: z.ZodSchema<T>) {
  const context = createContext<T | null>(null);
  function useContextHook(): T {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
    }
    // ✅ Runtime validation ensures the context value matches your schema
    const validationResult = schema.safeParse(contextValue);
    if (!validationResult.success) {
      console.error(`${displayName} context validation failed:`, validationResult.error);
      throw new Error(`${displayName} context value is invalid. Check the console for details.`);
    }
    return validationResult.data;
  }
  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }
  return [useContextHook, ContextProvider, context] as const;
}
// Usage with validation
const [useValidatedUser, ValidatedUserProvider] = createValidatedContext('User', UserContextSchema);
```

[🚀back to top](#top)

### Real World Use Cases- Theme Context with System Preference Detection

```ts
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
const [useTheme, ThemeProvider] = createSafeContext<ThemeContextType>('Theme');

export function ThemeManager({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
  };
  return <ThemeProvider value={value}>{children}</ThemeProvider>;
}
// Components can safely assume theme context exists
function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Never undefined!
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
  );
}
```

[🚀back to top](#top)

## Performance Considerations

### Provider Value Memoization

```ts
export function OptimizedUserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: currentUser,
      login: async (email: string, password: string) => {
        const user = await authApi.login(email, password);
        setCurrentUser(user);
      },
      logout: () => {
        authApi.logout();
        setCurrentUser(null);
      },
    }),
    [currentUser],
  );
  return <UserProvider value={contextValue}>{children}</UserProvider>;
}
```

[🚀back to top](#top)

### Callback Stability

```ts
export function StableCallbackProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // ✅ Stable callbacks don't cause unnecessary re-renders
  const login = useCallback(async (email: string, password: string) => {
    const user = await authApi.login(email, password);
    setUser(user);
  }, []);
  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <UserProvider value={value}>{children}</UserProvider>;
}
```

[🚀back to top](#top)

## Dispatch Prop to Context

### 1 Create Typed Context

```ts
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}
// ✅ First, centralize your action types
export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; priority: Todo['priority'] } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_PRIORITY'; payload: { id: string; priority: Todo['priority'] } };
// ✅ Define what our context will provide
interface TodoContextValue {
  todos: Todo[];
  dispatch: Dispatch<TodoAction>;
}
// ✅ Create context with undefined as default
/* always use undefined as your context default value and provide a custom hook. This prevents accidentally using the context outside a provider, which would silently fail with a default object */
const TodoContext = createContext<TodoContextValue | undefined>(undefined);
// ✅ Custom hook with runtime safety
export function useTodoContext(): TodoContextValue {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
```

[🚀back to top](#top)

### 2 Implement the Provider

```ts
interface TodoProviderProps {
  children: ReactNode;
  initialTodos?: Todo[];
}
export function TodoProvider({ children, initialTodos = [] }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ todos, dispatch }), [todos]);
  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
}
// ✅ Your reducer stays the same
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          priority: action.payload.priority,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'SET_PRIORITY':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, priority: action.payload.priority } : todo,
      );
    default:
      return state;
  }
}
```

[🚀back to top](#top)

### 3 Gradual Migration Strategy

```ts
// ✅ Step 3a: First, wrap your app with the provider
function App() {
  return (
    <TodoProvider>
      <div>
        <Header />
        <MainContent />
        <Sidebar />
      </div>
    </TodoProvider>
  );
}
// ✅ Step 3b: Update the leaf components first
function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
      />
      <span>{todo.text}</span>
      <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
        Delete
      </button>
    </li>
  );
}
// ✅ Step 3c: Remove props from parent components
function TodoList() {
  const { todos } = useTodoContext();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
// ✅ Step 3d: Clean up intermediate components
function MainContent() {
  const { todos } = useTodoContext();
  return (
    <div>
      <TodoList />
      <TodoStats todos={todos} />
    </div>
  );
}
```

[🚀back to top](#top)

### Real World Migration Example: Multi-step Form State Management

```ts
// Before: Prop drilling form dispatch through multiple steps
interface RegistrationFormState {
  currentStep: number;
  userData: {
    personalInfo?: PersonalInfo;
    accountDetails?: AccountDetails;
    preferences?: UserPreferences;
  };
  validation: {
    personalInfo?: ValidationErrors;
    accountDetails?: ValidationErrors;
    preferences?: ValidationErrors;
  };
  isSubmitting: boolean;
}
type FormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'UPDATE_ACCOUNT_DETAILS'; payload: AccountDetails }
  | { type: 'UPDATE_PREFERENCES'; payload: UserPreferences }
  | { type: 'SET_VALIDATION_ERRORS'; payload: { step: string; errors: ValidationErrors } }
  | { type: 'SET_SUBMITTING'; payload: boolean };
// ✅ After: Clean context-based approach
const RegistrationContext = createContext<
  | {
      state: RegistrationFormState;
      dispatch: Dispatch<FormAction>;
    }
  | undefined
>(undefined);
export function useRegistrationForm() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrationForm must be used within RegistrationProvider');
  }
  return context;
}
export function useRegistrationActions() {
  const { dispatch } = useRegistrationForm();
  return useMemo(
    () => ({
      nextStep: () => dispatch({ type: 'NEXT_STEP' }),
      prevStep: () => dispatch({ type: 'PREV_STEP' }),
      updatePersonalInfo: (info: PersonalInfo) =>
        dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info }),
      updateAccountDetails: (details: AccountDetails) =>
        dispatch({ type: 'UPDATE_ACCOUNT_DETAILS', payload: details }),
      updatePreferences: (prefs: UserPreferences) =>
        dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs }),
      setValidationErrors: (step: string, errors: ValidationErrors) =>
        dispatch({ type: 'SET_VALIDATION_ERRORS', payload: { step, errors } }),
      setSubmitting: (isSubmitting: boolean) =>
        dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting }),
    }),
    [dispatch],
  );
}
// ✅ Now form steps are clean and focused
function PersonalInfoStep() {
  const { state } = useRegistrationForm();
  const { updatePersonalInfo, nextStep } = useRegistrationActions();
  // Only concerned with personal info, no prop drilling needed
  const handleSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    nextStep();
  };
  return <PersonalInfoForm onSubmit={handleSubmit} data={state.userData.personalInfo} />;
}
```

[🚀back to top](#top)

- https://stevekinney.com/courses/react-typescript/passing-dispatch-and-context
