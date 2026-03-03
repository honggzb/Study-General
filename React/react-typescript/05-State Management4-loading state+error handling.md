[React typescript -5.State Management4-loading state+error handling](#top)

- [Async State Type](#async-state-type)
- [Optimistic Updates with Rollback](#optimistic-updates-with-rollback)
- [Skeleton Loading States](#skeleton-loading-states)
- [Enhanced Error Handling with Error Types](#enhanced-error-handling-with-error-types)
- [Error Boundaries for Unexpected Errors -Catch errors that occur during rendering](#error-boundaries-for-unexpected-errors--catch-errors-that-occur-during-rendering)
- [Multiple Async States](#multiple-async-states)

-------------------------------------------------------------------------

- <mark>Always Use Discriminated Unions for Async State</mark>
- <mark>Consider Stale Data</mark>
- <mark>Classify errors</mark> - Different errors need different handling
- <mark>Provide User-Friendly Error Messages and feedback</mark> - Users should always know what’s happening
- <mark>Enable recovery</mark> - Always provide a way to retry or recover
- <mark>Consider optimistic updates</mark> - But always handle rollback
- <mark>Use error boundaries</mark> - Catch unexpected rendering errors

## Async State Type

- TypeScript’s <mark>**discriminated unions to model async states**</mark>:
  - makes Impossible States **Impossible**
  - makes bugs literally impossible to write, eliminate entire categories of bugs
  - provide better user experiences
  - make code more maintainable

```ts
// it’s impossible to be loading AND have an error. TypeScript won’t let you access data unless the status is ‘success’
// Generic type for any async operation
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; staleData?: T } // Show stale(old) data while loading
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error; lastValidData?: T };   //stale data
// Helper functions to create states
const asyncStates = {
  idle: <T>(): AsyncState<T> => ({ status: 'idle' }),
  loading: <T>(): AsyncState<T> => ({ status: 'loading' }),
  success: <T>(data: T): AsyncState<T> => ({ status: 'success', data }),
  error: <T>(error: Error): AsyncState<T> => ({ status: 'error', error })
};
// Custom hook using the generic type
function useAsyncState<T>(asyncFunction: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>(asyncStates.idle());
  const execute = useCallback(async () => {
    setState(asyncStates.loading());
    try {
      const data = await asyncFunction();
      setState(asyncStates.success(data));
    } catch (error) {
      setState(asyncStates.error(
        error instanceof Error ? error : new Error('Unknown error')
      ));
    }
  }, [asyncFunction]);
  const reset = useCallback(() => {
    setState(asyncStates.idle());
  }, []);
  return { state, execute, reset };
}
// Usage
function TodoListWithHook() {
  const { state, execute, reset } = useAsyncState(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json() as Promise<Todo[]>;
  });
  useEffect(() => {  execute(); }, [execute]);
  switch (state.status) {
    case 'idle':
      return <button onClick={execute}>Load Todos</button>;
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return (
        <div>
          <p>Error: {state.error.message}</p>
          <button onClick={execute}>Retry</button>
        </div>
      );
    case 'success':
      return (
        <div>
          <button onClick={reset}>Reset</button>
          <ul>  {state.data.map(todo => (  <li key={todo.id}>{todo.title}</li> ))} </ul>
        </div>
      );
  }
}
```

[🚀back to top](#top)

## Optimistic Updates with Rollback

```ts
type OptimisticState<T> =
  | { status: 'stable'; data: T }
  | { status: 'updating'; data: T; optimisticData: T }
  | { status: 'reverting'; data: T; error: Error };

function TodoListWithOptimisticUpdates() {
  const [state, setState] = useState<OptimisticState<Todo[]>>({
    status: 'stable',
    data: [],
  });
  // Load initial data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data: Todo[]) => setState({ status: 'stable', data }));
  }, []);

  const toggleTodo = async (id: number) => {
    // Get current data
    const currentData = 'data' in state ? state.data : [];
    const todoIndex = currentData.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;
    // Create optimistic data
    const optimisticData = [...currentData];
    optimisticData[todoIndex] = {
      ...optimisticData[todoIndex],
      completed: !optimisticData[todoIndex].completed,
    };
    // Apply optimistic update
    setState({
      status: 'updating',
      data: currentData,
      optimisticData,
    });
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: optimisticData[todoIndex].completed,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      setState({ status: 'stable', data: optimisticData });  // Commit the optimistic update
    } catch (error) {
      // Revert on failure
      setState({
        status: 'reverting',
        data: currentData,
        error: error instanceof Error ? error : new Error('Update failed'),
      });
      // After showing error, revert to stable
      setTimeout(() => {
        setState({ status: 'stable', data: currentData });
      }, 2000);
    }
  };

  const displayData = state.status === 'updating' ? state.optimisticData : state.data;

  return (
    <div>
      {state.status === 'reverting' && ( <div className="error-banner">Failed to update. Reverting changes...</div> )}
      <ul>
        {displayData.map((todo) => (
          <li
            key={todo.id}
            style={{
              opacity: state.status === 'updating' ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              disabled={state.status !== 'stable'}
            />
            <span style={{  textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

[🚀back to top](#top)

## Skeleton Loading States

- Provide better perceived performance with skeleton screens

```ts
function TodoSkeleton() {
  return (
    <div className="todo-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-checkbox" />
          <div className="skeleton-text" />
        </div>
      ))}
    </div>
  );
}
type LoadingState<T> =
  | { status: 'skeleton' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error; canRetry: boolean };

function TodoListWithSkeleton() {
  const [state, setState] = useState<LoadingState<Todo[]>>({
    status: 'skeleton',
  });
  useEffect(() => {
    // Show skeleton immediately
    setState({ status: 'skeleton' });
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setState((prev) =>
        prev.status === 'skeleton'
          ? { status: 'loading', progress: 10 }
          : prev.status === 'loading' && prev.progress < 90
            ? { status: 'loading', progress: prev.progress + 20 }
            : prev,
      );
    }, 200);
    // Fetch actual data
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: Todo[]) => {
        clearInterval(progressInterval);
        setState({ status: 'success', data });
      })
      .catch((error) => {
        clearInterval(progressInterval);
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
          canRetry: true,
        });
      });
    return () => clearInterval(progressInterval);
  }, []);

  switch (state.status) {
    case 'skeleton':
      return <TodoSkeleton />;
    case 'loading':
      return (
        <div>
          <TodoSkeleton />
          <progress value={state.progress} max={100}>
            {state.progress}%
          </progress>
        </div>
      );
    case 'error':
      return (
        <div className="error-state">
          <p>😔 {state.error.message}</p>
          {state.canRetry && <button onClick={() => window.location.reload()}>Retry</button>}
        </div>
      );
    case 'success':
      return (
        <ul>
          {state.data.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </li>
          ))}
        </ul>
      );
  }
}
```

[🚀back to top](#top)

## Enhanced Error Handling with Error Types

```ts
// Classify different error types
type ErrorType = 'network' | 'timeout' | 'server' | 'validation' | 'unknown';
interface TypedError extends Error {
  type: ErrorType;
  statusCode?: number;
  retry?: boolean;
}
function classifyError(error: unknown): TypedError {
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    return {
      name: 'NetworkError',
      message: 'Network connection failed. Please check your internet connection.',
      type: 'network',
      retry: true,
    };
  }
  if (error instanceof Error && error.name === 'AbortError') {
    return {
      name: 'TimeoutError',
      message: 'Request timed out. Please try again.',
      type: 'timeout',
      retry: true,
    };
  }
  if (error instanceof Response) {
    if (error.status >= 500) {
      return {
        name: 'ServerError',
        message: 'Server error. Please try again later.',
        type: 'server',
        statusCode: error.status,
        retry: true,
      };
    }
    if (error.status >= 400) {
      return {
        name: 'ClientError',
        message: 'Request failed. Please check your input.',
        type: 'validation',
        statusCode: error.status,
        retry: false,
      };
    }
  }
  return {
    name: 'UnknownError',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    type: 'unknown',
    retry: true,
  };
}
// Enhanced async state with typed errors
type EnhancedAsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; progress?: number }
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: TypedError; attemptCount: number };
function TodoListWithEnhancedErrors() {
  const [state, setState] = useState<EnhancedAsyncState<Todo[]>>({
    status: 'idle',
  });
  const fetchWithRetry = async (attemptCount = 0) => {
    setState({ status: 'loading' });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw response;
      }
      const data: Todo[] = await response.json();
      setState({  status: 'success',  data, timestamp: new Date() });
    } catch (error) {
      const typedError = classifyError(error);
      setState({ status: 'error', error: typedError, attemptCount: attemptCount + 1,});
      // Auto-retry for certain errors
      if (typedError.retry && attemptCount < 3) {
        setTimeout(() => fetchWithRetry(attemptCount + 1), 2000 * (attemptCount + 1));
      }
    }
  };
  useEffect(() => {
    fetchWithRetry();
  }, []);

  switch (state.status) {
    case 'idle':
      return <div>Initializing...</div>;
    case 'loading':
      return (
        <div>
          <div>Loading todos...</div>
          {state.progress && ( <progress value={state.progress} max={100}>{state.progress}%</progress>)}
        </div>
      );
    case 'error':
      return (
        <div className="error-container">
          <h3>
            {state.error.type === 'network' && '🌐'}
            {state.error.type === 'timeout' && '⏱️'}
            {state.error.type === 'server' && '🖥️'} Error Loading Todos
          </h3>
          <p>{state.error.message}</p>
          {state.error.statusCode && <code>Status: {state.error.statusCode}</code>}
          {state.attemptCount > 1 && <p>Attempted {state.attemptCount} times</p>}
          {state.error.retry && ( <button onClick={() => fetchWithRetry(state.attemptCount)}>Try Again</button> )}
        </div>
      );
    case 'success':
      return (
        <div>
          <p> Loaded {state.data.length} todos at {state.timestamp.toLocaleTimeString()} </p>
          <ul> {state.data.map((todo) => ( <li key={todo.id}>{todo.title}</li> ))} </ul>
        </div>
      );
  }
}
```

[🚀back to top](#top)

## Error Boundaries for Unexpected Errors -Catch errors that occur during rendering

```ts
import { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
    // Send to error reporting service
  }
  retry = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry);
      }
      return (
        <div className="error-boundary-default">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error.message}</pre>
          </details>
          <button onClick={this.retry}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
// Usage
function App() {
  return (
    <ErrorBoundary
      fallback={(error, retry) => (
        <div className="custom-error">
          <h3>Oops! The todos couldn't load</h3>
          <p>{error.message}</p>
          <button onClick={retry}>Reload</button>
        </div>
      )}
    >
      <TodoListWithEnhancedErrors />
    </ErrorBoundary>
  );
}
```

[🚀back to top](#top)

## Multiple Async States

```ts
type MultiAsyncState<T, U> = {
  todos: AsyncState<T>;
  user: AsyncState<U>;
};
function DashboardWithMultipleStates() {
  const [state, setState] = useState<MultiAsyncState<Todo[], User>>({
    todos: { status: 'idle' },
    user: { status: 'idle' },
  });
  useEffect(() => {
    // Fetch todos
    setState((prev) => ({
      ...prev,
      todos: { status: 'loading' },
    }));
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setState((prev) => ({
          ...prev,
          todos: { status: 'success', data },
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          todos: {
            status: 'error',
            error: error instanceof Error ? error : new Error('Failed to fetch todos'),
          },
        }));
      });
    // Fetch user
    setState((prev) => ({
      ...prev,
      user: { status: 'loading' },
    }));
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data: User) => {
        setState((prev) => ({
          ...prev,
          user: { status: 'success', data },
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          user: {
            status: 'error',
            error: error instanceof Error ? error : new Error('Failed to fetch user'),
          },
        }));
      });
  }, []);
  // Derive overall state
  const isLoading = state.todos.status === 'loading' || state.user.status === 'loading';
  const hasError = state.todos.status === 'error' || state.user.status === 'error';
  const isReady = state.todos.status === 'success' && state.user.status === 'success';
  if (isLoading) return <div>Loading dashboard...</div>;
  if (hasError) {
    return (
      <div>
        {state.todos.status === 'error' && <p>Todos error: {state.todos.error.message}</p>}
        {state.user.status === 'error' && <p>User error: {state.user.error.message}</p>}
      </div>
    );
  }
  if (isReady) {
    return (
      <div>
        <h2>Welcome, {state.user.data.name}!</h2>
        <h3>Your Todos:</h3>
        <ul>
          {state.todos.data.map((todo) => ( <li key={todo.id}>{todo.title}</li> ))}
        </ul>
      </div>
    );
  }
  return <div>Initializing...</div>;
}
```

[🚀back to top](#top)
