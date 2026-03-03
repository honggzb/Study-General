[React typescript -6.Component Props and Children3-Render Props(HOC Alternatives)](#top)

- [Render prop component(Provider) with excellent TypeScript support](#render-prop-componentprovider-with-excellent-typescript-support)
- [Generic Render Props for Maximum Flexibility](#generic-render-props-for-maximum-flexibility)
- [Custom Hooks: The Modern Alternative](#custom-hooks-the-modern-alternative)
- [Compound Components with Render Props](#compound-components-with-render-props)

|Pattern|When to Use|
|---|---|
||sharing stateful logic between components|
|Custom Hooks|The logic doesn’t need to control rendering|
||shared data is relatively simple|
|---------------|-----------------------------------------------|
||need to control when/how child components render|
|Render Props |building reusable UI components|
||component needs to handle loading states, errors, etc|
||compose multiple data sources|
|---------------|-----------------------------------------------|
|| complex, multi-part UI components|
|Compound Components|need to share state between distant child components|
||want API flexibility (users can arrange parts differently)|
||component has multiple distinct pieces that work together|
|---------------|-----------------------------------------------|
|||
|Avoid HOCs| need to compose multiple behaviors|
||The wrapped component’s props need to be transparent to consumers|

## Render prop component(Provider) with excellent TypeScript support

- Instead of wrapping your component, **pass a function that receives the data and returns JSX**

```ts
interface AuthRenderProps {
  user: User | null;
  isLoading: boolean;
  error?: string;
}
interface AuthProviderProps {
  // with this children render props,
  // typeScript knows exactly what data is available inside the render function,
  // giving you perfect autocomplete and error checkin
  children: (props: AuthRenderProps) => React.ReactNode;
  fallback?: React.ReactNode;                             // return a JSX
}
function AuthProvider({ children, fallback }: AuthProviderProps) {
  const { user, isLoading, error } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user && fallback) return <>{fallback}</>;

  return <>{children({ user, isLoading, error })}</>;
}
// Usage is clean and type-safe
function ProfilePage() {
  return (
    <AuthProvider fallback={<LoginForm />}>
      {({ user }) => (
        <div>
          <h1>Welcome, {user?.name}!</h1>
          {/* Full IntelliSense support - TypeScript knows user exists here */}
        </div>
      )}
    </AuthProvider>
  );
}
```

[🚀back to top](#top)

## Generic Render Props for Maximum Flexibility

- need to handle **different data types**, generics make render props even more powerful

```ts
interface DataFetcher<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
interface FetchDataProps<T> {
  url: string;
  children: (state: DataFetcher<T>) => React.ReactNode;
}

function FetchData<T>({ url, children }: FetchDataProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}
// Usage with different data types - TypeScript infers everything
interface User {
  id: number;
  name: string;
  email: string;
}
function UserProfile({ userId }: { userId: number }) {
  return (
    <FetchData<User> url={`/api/users/${userId}`}>
      {({ data: user, loading, error, refetch }) => {
        if (loading) return <div>Loading user...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!user) return <div>User not found</div>;
        return (
          <div>
            <h2>{user.name}</h2> {/* TypeScript knows this is a User! */}
            <p>{user.email}</p>
            <button onClick={refetch}>Refresh</button>
          </div>
        );
      }}
    </FetchData>
  );
}
```

[🚀back to top](#top)

## Custom Hooks: The Modern Alternative

```ts
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  const logout = useCallback(async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
  }, []);
  return { user, isLoading, error, logout };
}
// Usage is incredibly clean, shared logic without component wrapping
function ProfilePage() {
  const { user, isLoading, error, logout } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <LoginForm />;
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

[🚀back to top](#top)

## Compound Components with Render Props

-  render prop receives the full context with proper typing

```ts
interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  selectedValue: string | null;
  select: (value: string) => void;
}
// the full context with proper typing
const DropdownContext = React.createContext<DropdownContextValue | null>(null);
interface DropdownProps {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}
function Dropdown({ children, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const select = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onSelect?.(value);
      close();
    }, [onSelect, close]);
  const contextValue: DropdownContextValue = {
    isOpen,
    toggle,
    close,
    selectedValue,
    select,
  };
  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}
// Render prop child component
interface DropdownListProps {
  children: (context: DropdownContextValue) => React.ReactNode;
}
function DropdownList({ children }: DropdownListProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownList must be used within Dropdown');
  }
  if (!context.isOpen) return null;
  return (
    <div className="absolute top-full left-0 rounded border bg-white shadow-lg">
      {children(context)}
    </div>
  );
}
// Usage combines the best of both patterns
function UserSelector() {
  return (
    <Dropdown onSelect={(userId) => console.log('Selected:', userId)}>
      <button>Select User</button>
      <DropdownList>
        {({ select, selectedValue }) => (
          <FetchData<User[]> url="/api/users">
            {({ data: users, loading }) => {
              if (loading) return <div className="p-2">Loading...</div>;
              return (
                <>
                  {users?.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => select(user.id.toString())}
                      className={`block w-full p-2 text-left hover:bg-gray-100 ${selectedValue === user.id.toString() ? 'bg-blue-50' : '' }`}>
                      {user.name}
                    </button>
                  ))}
                </>
              );
            }}
          </FetchData>
        )}
      </DropdownList>
    </Dropdown>
  );
}
```

[🚀back to top](#top)
