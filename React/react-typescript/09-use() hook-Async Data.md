[React typescript -9.use hook-Async Data](#top)

- [Basic Typing Promise-based data](#basic-typing-promise-based-data)
- [complex conditional Type Safety use hook](#complex-conditional-type-safety-use-hook)
- [work with Error handling and Suspense](#work-with-error-handling-and-suspense)
- [Common Pitfalls](#common-pitfalls)
- [Use Cases 1 - Parallel Data Loading](#use-cases-1---parallel-data-loading)
- [Advanced Pattern](#advanced-pattern)
  - [Typed Resource with Loading States Pattern](#typed-resource-with-loading-states-pattern)
  - [Typed Resource Composition Pattern](#typed-resource-composition-pattern)
- [Use Cases 2 - Typed Search Results](#use-cases-2---typed-search-results)

-------------------------------------------------------------

- **use()** hook: version 19+
- ![use-hook](./use-hook.png)

## Basic Typing Promise-based data

- `use()` hook isto infer the resolved type from **promise**
- component encounters an unresolved promise. React will suspend the component (throwing the promise), and the nearest Suspense boundary catches it, showing a fallback until the promise resolves. Once resolved, React re-renders the component with the actual data

```ts
import { use } from 'react';
// ✅ Basic promise consumption
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>Hello, {user.name}!</h1>;
}
// fetching data from an API and consuming it with use()
interface User {
  id: number;
  name: string;
}
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}
// Generic resource factory with proper typing
function createResource<T>(fetcher: () => Promise<T>): Promise<T> {
  return fetcher();
}
// Usage with automatic type inference
const userResource = createResource(() =>
  fetch('/api/users/123').then((res) => res.json() as Promise<User>),
);

function UserProfile() {
  // TypeScript infers that `user` is of type `User`
  const user = use(userResource);
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
```

[🚀back to top](#top)

## complex conditional Type Safety use hook

```ts
interface MultiResourceProps {
  userPromise?: Promise<User>;
  profilePromise?: Promise<UserProfile>;
  mode: 'user' | 'profile' | 'none';
}

function MultiResource({ userPromise, profilePromise, mode }: MultiResourceProps) {
  if (mode === 'user' && userPromise) {
    const user = use(userPromise);
    return <UserCard user={user} />;
  }
  if (mode === 'profile' && profilePromise) {
    const profile = use(profilePromise);
    return <ProfileCard profile={profile} />;
  }
  return <div>Nothing to show</div>;
}
```

- multiple async resource

```ts
function ComplexAsyncPage({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const postsPromise = useMemo(() => fetchUserPosts(userId), [userId]);
  // Both promises are consumed independently
  const user = use(userPromise);
  const posts = use(postsPromise);
  return (
    <div>
      <UserHeader user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

[🚀back to top](#top)

## work with Error handling and Suspense

```ts
import { ErrorBoundary } from 'react-error-boundary';
interface ApiError {
  message: string;
  status: number;
  code: string;
}
function ErrorFallback({ error }: { error: ApiError }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <p>Status: {error.status}</p>
    </div>
  );
}
function TypedErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}
// Usage
function App() {
  return (
    <TypedErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AsyncUserProfile userId="123" />
      </Suspense>
    </TypedErrorBoundary>
  );
}
```

[🚀back to top](#top)

## Common Pitfalls

- Don’t Create Promises in Render
- Handle Promise Resolution Timing
- Always validate API responses at runtime. TypeScript types don’t exist at runtime, so external data needs validation

```ts
// 1. Don’t Create Promises in Render
// ❌ Bad: Creates new promise on every render
function BadExample({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // New promise every time!
  return <h1>{user.name}</h1>;
}
// ✅ Good: Memoize the promise
function GoodExample({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
// 2. Handle Promise Resolution Timing
// ✅ Good: Handle the case where data might not be available
function SafeComponent({ dataPromise }: { dataPromise: Promise<Data> | null }) {
  if (!dataPromise) {
    return <div>No data requested</div>;
  }
  const data = use(dataPromise);
  return <DataDisplay data={data} />;
}
// 3. Type Your Promise Factories Properly
// ❌ Bad: Loses type information
const createUserFetcher = (id: string) => fetch(`/api/users/${id}`).then((res) => res.json());
// ✅ Good: Explicit return type
const createUserFetcher = (id: string): Promise<User> =>
  fetch(`/api/users/${id}`).then((res) => res.json() as User);
// ✅ Even better: Runtime validation
const createUserFetcher = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data); // Assuming you're using Zod
};
```

[🚀back to top](#top)

## Use Cases 1 - Parallel Data Loading

```ts
interface DashboardData {
  user: User;
  notifications: Notification[];
  stats: UserStats;
}
function Dashboard({ userId }: { userId: string }) {
  // Create all promises upfront for parallel loading
  const [userPromise, notificationsPromise, statsPromise] = useMemo(
    () => [fetchUser(userId), fetchNotifications(userId), fetchUserStats(userId)],
    [userId],
  );
  // Consume them all with proper typing
  const user = use(userPromise);
  const notifications = use(notificationsPromise);
  const stats = use(statsPromise);
  return (
    <div>
      <UserHeader user={user} />
      <StatsWidget stats={stats} />
      <NotificationList notifications={notifications} />
    </div>
  );
}
```

[🚀back to top](#top)

## Advanced Pattern

### Typed Resource with Loading States Pattern

```ts
interface ResourceWithMeta<T> {
  data: T;
  loading: boolean;
  error?: Error;
}
// This is more of a conceptual pattern since use() handles this automatically
function createResourceWithMeta<T>(promise: Promise<T>): Promise<ResourceWithMeta<T>> {
  return promise.then(
    (data) => ({ data, loading: false }),
    (error) => ({ data: null as any, loading: false, error }),
  );
}
```

[🚀back to top](#top)

### Typed Resource Composition Pattern

- using `Promise.all()`

```ts
interface CompositeResource<T, U> {
  primary: T;
  secondary: U;
}
function createCompositeResource<T, U>(
  primaryPromise: Promise<T>,
  secondaryPromise: Promise<U>,
): Promise<CompositeResource<T, U>> {
  return Promise.all([primaryPromise, secondaryPromise]).then(([primary, secondary]) => ({
    primary,
    secondary,
  }));
}
// Usage
function CompositeView({ userId }: { userId: string }) {
  const compositePromise = useMemo(
    () => createCompositeResource(fetchUser(userId), fetchUserPreferences(userId)),
    [userId],
  );
  const { primary: user, secondary: preferences } = use(compositePromise);
  return (
    <div>
      <UserProfile user={user} />
      <PreferencesPanel preferences={preferences} />
    </div>
  );
}
```

[🚀back to top](#top)

## Use Cases 2 - Typed Search Results

```ts
interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}
function SearchResults<T>({ searchPromise }: { searchPromise: Promise<SearchResult<T>> }) {
  const results = use(searchPromise);
  return (
    <div>
      <p>{results.total} results found</p>
      {results.items.map((item, index) => (
        <SearchResultItem key={index} item={item} />
      ))}
      {results.hasMore && <LoadMoreButton />}
    </div>
  );
}
// Usage with type inference
const userSearchPromise = searchUsers('john'); // Returns Promise<SearchResult<User>>
<SearchResults searchPromise={userSearchPromise} />;
```

[🚀back to top](#top)
