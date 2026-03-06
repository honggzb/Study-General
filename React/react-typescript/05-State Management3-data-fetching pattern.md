[React typescript -5.State Management3-data-fetching pattern](#top)

- [Async/Await Pattern with Proper Error Handling](#asyncawait-pattern-with-proper-error-handling)
- [Preventing Race Conditions with Cleanup](#preventing-race-conditions-with-cleanup)
- [Using AbortController for True Cancellation](#using-abortcontroller-for-true-cancellation)
- [Handling Multiple Async States](#handling-multiple-async-states)
  - [Multiple fetches in sequence](#multiple-fetches-in-sequence)
  - [Parallel Fetching with Promise.all](#parallel-fetching-with-promiseall)
- [Demo 1 - Pagination and Infinite Scroll](#demo-1---pagination-and-infinite-scroll)
- [Demo 2 -Debounced Search](#demo-2--debounced-search)

-------------------------------------------------------------------------

- <mark>data-fetching pattern</mark>: combine `useState` with `useEffect`
  -  requires careful attention to: loading states, error handling, race conditions, and cleanup
- <mark>Loading states</mark> - Always show appropriate feedback
- <mark>Error handling</mark> - Catch and display errors gracefully
- <mark>Race conditions</mark> - Cancel outdated requests
- <mark>Cleanup</mark> - Prevent memory leaks and state updates after unmount
- <mark>TypeScript types</mark> - Type your API responses explicitly

## Async/Await Pattern with Proper Error Handling

```ts
function ImprovedTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);                // Clear previous errors
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        // Type guard to ensure we have an Error object
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Todos ({todos.length})</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

[🚀back to top](#top)

## Preventing Race Conditions with Cleanup

- When fetching data based on props or state, you need to handle the case where the component updates before the previous fetch completes

```ts
function UserTodos({ userId }: { userId: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let isCancelled = false;   // This flag prevents setting state after unmount
    const fetchUserTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch todos for user ${userId}`);
        }
        const data: Todo[] = await response.json();
        // Only update state if this effect hasn't been cancelled
        if (!isCancelled) {
          setTodos(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setIsLoading(false);
        }
      }
    };

    fetchUserTodos();
    // Cleanup function - runs when component unmounts or userId changes
    return () => isCancelled = true;
  }, [userId]); // Re-run when userId changes

  if (isLoading) return <div>Loading todos for user {userId}...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>User {userId}'s Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.completed ? 0.5 : 1 }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

[🚀back to top](#top)

## Using AbortController for True Cancellation

- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) interface represents a controller object that allows you to abort one or more Web requests as and when desired

```ts
// For even better control, use AbortController to actually cancel the network request
function CancellableTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const abortController = new AbortController();   // Creates a new AbortController object instance.
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          signal: abortController.signal,                                     // Pass the abort signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        // Check if the error is from aborting
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
    // Cleanup: abort the fetch if component unmounts
    return () =>  abortController.abort();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map((todo) => ( <li key={todo.id}>{todo.title}</li> ))}
    </ul>
  );
}
```

[🚀back to top](#top)

## Handling Multiple Async States

### Multiple fetches in sequence

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
function TodoWithUserInfo({ todoId }: { todoId: number }) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTodoAndUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch todo first
        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { signal: abortController.signal });
        if (!todoResponse.ok) {
          throw new Error('Failed to fetch todo');
        }
        const todoData: Todo = await todoResponse.json();
        setTodo(todoData);
        // Then fetch the user
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${todoData.userId}`, { signal: abortController.signal });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        setUser(userData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodoAndUser();
    return () => abortController.abort();
  }, [todoId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo || !user) return <div>Data not found</div>;
  return (
    <div>
      <h3>{todo.title}</h3>
      <p>
        Assigned to: {user.name} ({user.email})
      </p>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}
```

[🚀back to top](#top)

### Parallel Fetching with Promise.all

```ts
// When fetches don’t depend on each other, run them in parallel
function DashboardData() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch both in parallel
        const [todosResponse, usersResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/todos', {  signal: abortController.signal }),
          fetch('https://jsonplaceholder.typicode.com/users', {  signal: abortController.signal }),
        ]);
        if (!todosResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        // Parse both responses
        const [todosData, usersData] = await Promise.all([
          todosResponse.json() as Promise<Todo[]>,
          usersResponse.json() as Promise<User[]>,
        ]);
        setTodos(todosData);
        setUsers(usersData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
    return () =>  abortController.abort();
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Users ({users.length})</h3>
        <h3>Total Todos ({todos.length})</h3>
        <h3>Completed ({todos.filter((t) => t.completed).length})</h3>
      </div>
    </div>
  );
}
```

[🚀back to top](#top)

## Demo 1 - Pagination and Infinite Scroll

```ts
function PaginatedTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`, { signal: abortController.signal },);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const newTodos: Todo[] = await response.json();
        if (newTodos.length === 0) {
          setHasMore(false);
        } else {
          setTodos((prev) => [...prev, ...newTodos]);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
    return () => abortController.abort();
  }, [page]);
  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h2>Todos (Paginated)</h2>
      <ul>
        {todos.map((todo) => ( <li key={todo.id}>{todo.title}</li> ))}
      </ul>
      {isLoading && <div>Loading more...</div>}
      {error && <div>Error: {error}</div>}
      {hasMore && !isLoading && <button onClick={loadMore}>Load More</button>}
      {!hasMore && <div>No more todos to load</div>}
    </div>
  );
}
```

[🚀back to top](#top)

## Demo 2 -Debounced Search

```ts
function TodoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    if (!searchTerm.trim()) {
      setTodos([]);
      return;
    }
    // Debounce the search
    const timeoutId = setTimeout(() => {
      const abortController = new AbortController();
      const searchTodos = async () => {
        try {
          setIsSearching(true);
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos?q=${encodeURIComponent(searchTerm)}`,
            { signal: abortController.signal },
          );
          if (!response.ok) {
            throw new Error('Search failed');
          }
          const results: Todo[] = await response.json();
          setTodos(results);
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Search error:', err);
          }
        } finally {
          setIsSearching(false);
        }
      };

      searchTodos();
      // Cleanup for the fetch
      return () => abortController.abort();
    }, 500); // 500ms debounce delay
    // Cleanup for the timeout
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
      />
      {isSearching && <div>Searching...</div>}
      <ul>
        {todos.map((todo) => ( <li key={todo.id}>{todo.title}</li>))}
      </ul>
    </div>
  );
}
```

[🚀back to top](#top)

## Demo 3 - Retry Logic for Failed Requests

```ts
// Add automatic retry for transient failures
function TodosWithRetry() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchWithRetry = async () => {
      setIsLoading(true);
      setError(null);
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            signal: abortController.signal,
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Todo[] = await response.json();
          setTodos(data);
          setRetryCount(0); // Reset on success
          break; // Exit retry loop on success
        } catch (err) {
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
              break; // Don't retry if aborted
            }
            if (attempt === maxRetries) {
              setError(`Failed after ${maxRetries + 1} attempts: ${err.message}`);
              setRetryCount(attempt);
            } else {
              console.log(`Attempt ${attempt + 1} failed, retrying...`);
              // Wait before retrying (exponential backoff)
              await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
          }
        }
      }
      setIsLoading(false);
    };
    fetchWithRetry();
    return () => abortController.abort();
  }, []); // Add retryCount to deps if you want manual retry
  const manualRetry = () => {
    setRetryCount(0);
    // Trigger re-fetch by updating a dependency
  };
  if (isLoading) return <div>Loading (Attempt {retryCount + 1})...</div>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={manualRetry}>Retry</button>
      </div>
    );
  }
  return (
    <ul>
      {todos.map((todo) => ( <li key={todo.id}>{todo.title}</li>))}
    </ul>
  );
}
```

[🚀back to top](#top)
