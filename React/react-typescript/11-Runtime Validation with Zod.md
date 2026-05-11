[React typescript -11.Runtime Validation with Zod](#top)

- [Basic](#basic)
- [Handling Complex Data Shapes](#handling-complex-data-shapes)
- [Handling Validation Gracefully](#handling-validation-gracefully)
- [React 19 and the use Hook with validation](#react-19-and-the-use-hook-with-validation)
- [Robust Data Fetching Hook](#robust-data-fetching-hook)
- [Validation Boundary -wrap data-fetching components in error boundaries](#validation-boundary--wrap-data-fetching-components-in-error-boundaries)
- [Performance](#performance)

## Basic

- Zod is the gold standard for TypeScript-first schema validation. It lets you define schemas that both validate at runtime and infer TypeScript types
-  If the API returns malformed data, Zod will throw a descriptive error rather than letting invalid data silently corrupt your component state

```ts
import { z } from 'zod';
// ✅ Good: Schema that validates and provides types
const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Must be a valid email'),
});
type User = z.infer<typeof UserSchema>;   // Automatically infer the TypeScript type

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  const data = await response.json();
  // Runtime validation that throws on invalid data
  return UserSchema.parse(data);
}
```

[🚀back to top](#top)

## Handling Complex Data Shapes

```ts
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
});
const DetailedUserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  address: AddressSchema.optional(),                         // Optional nested object
  tags: z.array(z.string()).default([]),                     // Array with default
  preferences: z.record(z.string(), z.unknown()).optional(), // Flexible Key-value pairs
  createdAt: z.string().transform((date) => new Date(date)), // Transform string to Date
});

type DetailedUser = z.infer<typeof DetailedUserSchema>;
```

[🚀back to top](#top)

## Handling Validation Gracefully

- handle network failures, HTTP errors, and validation failures with different strategies retry on network errors but log and return null on validation failures

```ts
async function fetchUserSafely(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    const result = UserSchema.safeParse(data);
    if (!result.success) {
      console.error('Validation failed:', result.error.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

[🚀back to top](#top)

## React 19 and the use Hook with validation

```ts
import { use, Suspense } from 'react';
// Promise that fetches and validates user data
function createUserPromise(id: string) {
  //validated fetching function from above
  // fetchUser function already includes validation, any malformed data will cause the promise to reject, triggering React’s error boundary handling rather than rendering broken UI
  return fetchUser(id);
}
function UserProfile({ userId }: { userId: string }) {
  const user = use(createUserPromise(userId));   // React 19's use hook consumes the promise
  return (
    <div>
      <h1> {user.firstName} {user.lastName} </h1>
      <p>{user.email}</p>
    </div>
  );
}
function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
```

[🚀back to top](#top)

## Robust Data Fetching Hook

```ts
import { useState, useEffect } from 'react';
import { z } from 'zod';
type AsyncState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };
function useValidatedFetch<T>(url: string, schema: z.ZodSchema<T>, dependencies: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'loading',
    data: null,
    error: null,
  });
  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setState({ status: 'loading', data: null, error: null });
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const rawData = await response.json();
        const result = schema.safeParse(rawData);
        if (!result.success) {
          const errorMessage = result.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ');
          throw new Error(`Validation failed: ${errorMessage}`);
        }
        if (!cancelled) {
          setState({
            status: 'success',
            data: result.data,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, dependencies);
  return state;
}
// use this hook
function UserProfile({ userId }: { userId: string }) {
  const userState = useValidatedFetch(`/api/users/${userId}`, UserSchema, [userId]);
  if (userState.status === 'loading') {
    return <div>Loading user...</div>;
  }
  if (userState.status === 'error') {
    return <div>Error: {userState.error}</div>;
  }
  const { data: user } = userState;
  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
    </div>
  );
}
```

[🚀back to top](#top)

## Validation Boundary -wrap data-fetching components in error boundaries

```ts
import { Component, ReactNode } from 'react';
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
class DataValidationBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Data validation error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            <h2>Data Error</h2>
            <p>The data from the server doesn't match what we expected.</p>
            <details>
              <summary>Technical details</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
// using
function App() {
  return (
    <DataValidationBoundary>
      <UserProfile userId="123" />
    </DataValidationBoundary>
  );
}
```

[🚀back to top](#top)

## Performance

1. Validate Once, Trust Later:
   - If you’re passing validated data through multiple components, you don’t need to re-validate it
2. Schema Caching
   - For frequently used schemas, consider caching the compiled validation functions

```ts
// 1. Validate Once, Trust Later
// ✅ Good: Validate at the boundary, pass typed data down
function UserDashboard({ userId }: { userId: string }) {
  const userState = useValidatedFetch(`/api/users/${userId}`, UserSchema, [userId]);
  if (userState.status === 'success') {
    // userState.data is already validated - pass it down safely
    return (
      <>
        <UserHeader user={userState.data} />
        <UserDetails user={userState.data} />
        <UserActivity user={userState.data} />
      </>
    );
  }
  return <div>Loading...</div>;
}
// These components can trust the data is valid
function UserHeader({ user }: { user: User }) {
  return (
    <h1>
      {user.firstName} {user.lastName}
    </h1>
  );
}
// 2. Schema Caching
const schemaCache = new Map();
function getCachedSchema<T>(key: string, schema: z.ZodSchema<T>) {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, schema);
  }
  return schemaCache.get(key);
}
```

[🚀back to top](#top)
