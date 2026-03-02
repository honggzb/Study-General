[React typescript -7.State Management1-useState with TypeScript](#top)

- [Basic useState Pattern](#basic-usestate-pattern)
  - [primitive \&\& Object type](#primitive--object-type)
  - [Union Types for Constrained Values](#union-types-for-constrained-values)
  - [The Null/Undefined Pattern for Async Data](#the-nullundefined-pattern-for-async-data)
- [Generic Custom Hooks with useState](#generic-custom-hooks-with-usestate)
- [Functional Update pattern](#functional-update-pattern)
- [Best Practice](#best-practice)
  - [Related values that change together/](#related-values-that-change-together)
  - [Separate concerns that change independently](#separate-concerns-that-change-independently)
  - [avoid Mutating State Directly](#avoid-mutating-state-directly)
  - [avoid Stale Closures in Event Handlers](#avoid-stale-closures-in-event-handlers)
- [Performance Tips](#performance-tips)
  - [Lazy Initial State](#lazy-initial-state)
  - [Batching State Updates](#batching-state-updates)
- [A Complete Example](#a-complete-example)

-------------------------------------------------------------------------

- <mark>Let TypeScript infer when possible</mark> - For simple primitives, TypeScript’s inference is usually sufficient
- <mark>Be explicit with complex types</mark> - Arrays, objects, and unions need explicit typing
- <mark>Use union types with null</mark> - The `Type | null` pattern is perfect for async data
- <mark>Prefer functional updates</mark> - They prevent stale closure bugs and are more predictable
- <mark>Split state by concern</mark> - Keep unrelated state separate for cleaner code
- <mark>Initialize expensive state lazily</mark> - Use functions for expensive initial computations

## Basic useState Pattern

### primitive && Object type

```ts
import { useState } from 'react';
function TodoCounter() {
  //1.  TypeScript infers types automatically when there are values, no need explicit
  const [count, setCount] = useState(0);       // number
  const [title, setTitle] = useState('');      // string
  const [isDone, setIsDone] = useState(false); // boolean
  return (
    <div>
      <p>Todos completed: {count}</p>
      <button onClick={() => setCount(count + 1)}>Mark one complete</button>
      {/* TypeScript ensures type safety: setCount to only accept numbers or a function that returns a number. */}
      <button onClick={() => setCount('five')}>
        {' '}
        {/* ❌ Error: string not assignable to number */}
        This won't compile
      </button>
    </div>
  );
}
//2. need explicit when there are empty value
const [items, setItems] = useState([]);               // ❌ Bad: TypeScript infers never[] - you can't add anything!
const [items, setItems] = useState<string[]>([]);     // ✅ Good: Explicitly typed array
const [user, setUser] = useState(null);               // ❌ Inferred as null - you can never update it!
const [user, setUser] = useState<User | null>(null);  // ✅ Explicit union with null
const [data, setData] = useState<ApiResponse | undefined>(undefined);  // ✅ Using undefined as the "not loaded" state
const [filters, setFilters] = useState({});           // ❌ Inferred as {}, which is not very useful
interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
}
const [filters, setFilters] = useState<FilterState>({ // ✅ Be explicit about the shape
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
});
const [filters, setFilters] = useState<Partial<FilterState>>({});  // ✅ Or use Partial if some properties are optional initially

//3. Objects
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
 }
function TodoItem() {
  const [todo, setTodo] = useState<Todo | null>(null);  // Single todo item (can be null initially)
  const [todos, setTodos] = useState<Todo[]>([]);       // Array of todos
   // Example: Adding a new todo
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      userId: 1,
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);  //
  };
  // Example: Toggling completion
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}
```

### Union Types for Constrained Values

```ts
// ✅ Explicit union type
type FilterStatus = 'all' | 'active' | 'completed';
// ✅ Using const assertion for the initial value
const [theme, setTheme] = useState('light' as const);   // Note: This only constrains the initial value, not subsequent updates
function TodoFilter() {
  // Without explicit typing, TypeScript infers 'string'
  const [filter, setFilter] = useState<FilterStatus>('all');
  // TypeScript ensures only valid values
  setFilter('completed'); // ✅ Works
  setFilter('pending'); // ❌ Error: 'pending' not assignable to FilterStatus
  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
}
```

[🚀back to top](#top)

### The Null/Undefined Pattern for Async Data

- When data hasn’t loaded yet, using **null** or **undefined** as **initial state** is a common pattern

```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
function TodoDetail({ todoId }: { todoId: number }) {
  const [todo, setTodo] = useState<Todo | null>(null);    // null indicates "not loaded yet"
  const [error, setError] = useState<string | null>(null);
  // Load todo on mount
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((res) => res.json())
      .then((data: Todo) => setTodo(data))
      .catch((err) => setError(err.message));
  }, [todoId]);
  // TypeScript makes you handle all cases
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Loading...</div>;
  // TypeScript knows todo is definitely Todo here (not null)
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? 'Done' : 'Pending'}</p>
    </div>
  );
}
```

[🚀back to top](#top)

## Generic Custom Hooks with useState

```ts
// Generic hook for any toggleable value - reusable
function useToggle<T>(initialValue: T, alternateValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const toggle = useCallback(() => {
    setValue((current) => (current === initialValue ? alternateValue : initialValue));
  }, [initialValue, alternateValue]);
  return [value, toggle, setValue] as const;
}
// Usage with different types
function TodoControls() {
  const [view, toggleView] = useToggle('list', 'grid');
  const [isDark, toggleTheme] = useToggle(false, true);
  const [sortOrder, toggleSort] = useToggle<'asc' | 'desc'>('asc', 'desc');
  return (
    <div>
      <button onClick={toggleView}>View: {view}</button>
      <button onClick={toggleTheme}>Theme: {isDark ? 'Dark' : 'Light'}</button>
      <button onClick={toggleSort}>Sort: {sortOrder}</button>
    </div>
  );
}
```

[🚀back to top](#top)

## Functional Update pattern

- When next state **depends on the previous state**, use the functional update pattern
- The callback parameter gets the correct type automatically
- **not to mutate state directly, even with functional updates. Always return a new object or array**

```ts
// ✅ TypeScript knows `prev` is string[]
const [items, setItems] = useState<string[]>([]);
setItems((prev) => [...prev, 'new item']);

// ✅ Works with complex objects too
interface FormState {  email: string;  password: string; errors: string[]; }
const [form, setForm] = useState<FormState>({
  email: '',
  password: '',
  errors: [],
});
setForm((prev) => ({
  ...prev,
  errors: [...prev.errors, 'Email is required'], // TypeScript validates everything
}));

// ✅
function TodoStats() {
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  // TypeScript knows 'prev' has the shape of our stats object
  const incrementCompleted = () => {
    setStats((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      active: prev.active - 1,
    }));
  };
  // This pattern prevents stale closure bugs
  const batchUpdate = () => {
    // All three updates will use the latest state
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
    setStats((prev) => ({ ...prev, active: prev.active + 1 }));
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
  };
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Active: {stats.active}</p>
    </div>
  );
}
```

[🚀back to top](#top)

## Best Practice

### Related values that change together/

```ts
// ✅ Good: Related values that change together
function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // All form data is together
    console.log('Submitting:', formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      {/* Other fields... */}
    </form>
  );
}
```

[🚀back to top](#top)

### Separate concerns that change independently

```ts
// ✅ Good: Separate concerns that change independently
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  // Each piece of state has a single responsibility
  // They can be updated independently without affecting others
}
```

[🚀back to top](#top)

### avoid Mutating State Directly

```ts
function TodoMutationBug() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // ❌ Bad: Mutating state directly
  const buggyAddTodo = (newTodo: Todo) => {
    todos.push(newTodo); // This mutates the existing array
    setTodos(todos); // React won't re-render!
  };
  // ✅ Good: Creating a new array
  const correctAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]); // New array reference
  };
  // ✅ Better: Using functional update
  const bestAddTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]); // Always uses latest state
  };
}
```

### avoid Stale Closures in Event Handlers

```ts
function StaleClosureExample() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // ❌ Bad: count is captured and becomes stale
    const timer = setInterval(() => {
      setCount(count + 1);                        // ❌Always adds to the initial count!
    }, 1000);
    return () => clearInterval(timer);
  }, []);                                          //❌Empty deps means count is captured once
  // ✅ Good: Using functional update
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);               // Always uses current value
    }, 1000);
    return () => clearInterval(timer);
  }, []);                                         // Now the empty deps array is safe
}
```

[🚀back to top](#top)

## Performance Tips

### Lazy Initial State

- When initial state requires expensive computation, use a function

```ts
function ExpensiveComponent() {
  // ❌ This runs on every render
  const [data, setData] = useState(expensiveComputation());
  // ✅ This runs only once
  const [data, setData] = useState(() => expensiveComputation());
  // Real example: parsing localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
}
```

[🚀back to top](#top)

### Batching State Updates

- React automatically batches updates in event handlers

```ts
function TodoBatching() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [count, setCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const handleClick = () => {
    // These are automatically batched - one re-render
    setTodos([]);
    setCount(0);
    setLastUpdate(new Date());
  };
  // In async code, updates are also batched in React 18+
  const handleAsync = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    // Still batched in React 18+
    setTodos(data);
    setCount(data.length);
    setLastUpdate(new Date());
  };
}
```

[🚀back to top](#top)

## A Complete Example

```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
type FilterStatus = 'all' | 'active' | 'completed';
function TodoManager() {
  // Multiple pieces of state with proper typing, split state by concern
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Computed value based on state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    const newTodo: Todo = { userId: 1, id: Date.now(), title: newTodoTitle, completed: false,};
    setTodos((prev) => [...prev, newTodo]);    // using function if it related to prev state
    setNewTodoTitle('');
  };
  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };
  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo Manager</h1>
      <form onSubmit={addTodo}>
        <input type="text" value={newTodoTitle} placeholder="What needs to be done?"
          onChange={(e) => setNewTodoTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All ({todos.length})</button>
        <button onClick={() => setFilter('active')} disabled={filter === 'active'}>
          Active ({todos.filter((t) => !t.completed).length})
        </button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
          Completed ({todos.filter((t) => t.completed).length})
        </button>
      </div>
      {/* Todo list */}
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

[🚀back to top](#top)

