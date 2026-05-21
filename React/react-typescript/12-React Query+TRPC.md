[React typescript -12.React Query+TRPC](#top)

- [General](#general)
- [tRPC setup](#trpc-setup)
- [using tPRC](#using-tprc)
  - [Using tRPC Queries in Components](#using-trpc-queries-in-components)
- [Mutations with Optimistic Updates the cache](#mutations-with-optimistic-updates-the-cache)
- [Vanilla React Query: Typed Patterns](#vanilla-react-query-typed-patterns)
  - [React Query](#react-query)
  - [React Query + tRPC- Cache Management and Invalidation](#react-query--trpc--cache-management-and-invalidation)
- [tRPC integrates with React Query’s error handling](#trpc-integrates-with-react-querys-error-handling)

## General

- tRPC  -> eliminate the type drift between client and server
  - End-to-end type safety from server to client
  - Auto-generated client code from your server router
  - No more manual API types or keeping schemas in sync
  - Compile-time errors when server APIs change
- React Query   -> caching and state management
  - Intelligent caching with automatic background updates
  - Request deduplication and proper loading states
  - Optimistic updates and cache invalidation
  - Proper error handling and retry logic
- Together, they create a data layer where your IDE can autocomplete server function names, parameters, and return types—while React Query handles all the async complexity behind the scenes

## tRPC setup

1. `npm install @trpc/server @trpc/client @trpc/react-query`
2. `npm install @tanstack/react-query zod`
3. `npm install @trpc/next`
4. tRPC server setup  <-- 'server/trpc.ts'
5. tRPC Client Setup with React Query Integration  <-- 'utils/trpc.ts' + 'app.ts'

```ts
// server/trpc.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
// Example router with some procedures
export const appRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return {   // Your database call here
      id: input.id,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
    };
  }),
  getUsers: publicProcedure.query(async () => {
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];
  }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      // Create user in database
      return {
        id: Math.random().toString(),
        ...input,
        createdAt: new Date(),
      };
    }),
});
export type AppRouter = typeof appRouter;   //tRPC will use this to generate fully typed client code
// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/trpc';
export const trpc = createTRPCReact<AppRouter>();
// app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import { useState } from 'react';
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc', // Your tRPC endpoint
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserDashboard />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

[🚀back to top](#top)

## using tPRC

### Using tRPC Queries in Components

```ts
// components/UserDashboard.tsx
import { trpc } from '../utils/trpc';
function UserDashboard() {
  // ✅ Fully typed query - IDE knows return type and loading states
  const { data: users, isLoading, error } = trpc.getUsers.useQuery();
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Users</h1>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
function UserCard({ user }: { user: { id: string; name: string; email: string } }) {
  // Query with parameters - also fully typed
  const { data: userData, isLoading } = trpc.getUser.useQuery({
    id: user.id,
  });
  if (isLoading) return <div>Loading {user.name}...</div>;
  return (
    <div className="user-card">
      <h3>{userData?.name}</h3>
      <p>{userData?.email}</p>
      <small>Created: {userData?.createdAt.toLocaleDateString()}</small>
    </div>
  );
}
```

[🚀back to top](#top)

## Mutations with Optimistic Updates the cache

```ts
function CreateUserForm() {
  const utils = trpc.useUtils();
  const createUser = trpc.createUser.useMutation({
    // Optimistically update the cache
    onMutate: async (newUser) => {
      await utils.getUsers.cancel();
      const previousUsers = utils.getUsers.getData();
      // Optimistically add the new user
      utils.getUsers.setData(undefined, (old = []) => [
        ...old,
        {
          id: 'temp-' + Date.now(),
          ...newUser,
        },
      ]);
      return { previousUsers };
    },
    // If mutation fails, rollback
    onError: (err, newUser, context) => {
      utils.getUsers.setData(undefined, context?.previousUsers);
    },
    // Always refetch after error or success
    onSettled: () => {
      utils.getUsers.invalidate();
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createUser.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={createUser.isLoading}>
        {createUser.isLoading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

[🚀back to top](#top)

## Vanilla React Query: Typed Patterns

### React Query

- Even without tRPC, you can get strong typing with plain React Query by typing your fetchers, query keys, and error types.

```ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
// 1) Typed fetchers + inferred data
async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as { id: string; name: string };
}
type InferPromise<T> = T extends Promise<infer U> ? U : never;
type UserData = InferPromise<ReturnType<typeof fetchUser>>; // { id: string; name: string }
// 2) Tuple query keys with const assertions for safety
const userKey = (id: string) => ['user', id] as const;
// 3) Typed error channel (e.g., Error)
function useUser(id: string): UseQueryResult<UserData, Error> {
  return useQuery<UserData, Error>({
    queryKey: userKey(id),
    queryFn: () => fetchUser(id),
    // Select can further transform types
    select: (u) => ({ ...u, display: u.name.toUpperCase() }),
    staleTime: 60_000,
  });
}
// Usage
const { data, error } = useUser('123');
```

[🚀back to top](#top)

### React Query + tRPC- Cache Management and Invalidation

- React Query  -> intelligent cache management
- tRPC         -> typed utilities for managing the cache

```ts
function useUserActions(userId: string) {
  const utils = trpc.useUtils();
  const updateUser = trpc.updateUser.useMutation({
    onSuccess: (updatedUser) => {
      // Invalidate and refetch specific user
      utils.getUser.invalidate({ id: userId });
      // Update user in the users list cache
      utils.getUsers.setData(undefined, (oldUsers = []) =>
        oldUsers.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user)),
      );
      // Invalidate any related queries
      utils.getUserPosts.invalidate({ userId });
    },
  });
  const deleteUser = trpc.deleteUser.useMutation({
    onSuccess: () => {
      // Remove from all relevant caches
      utils.getUser.invalidate({ id: userId });
      utils.getUsers.invalidate();
      utils.getUserPosts.invalidate({ userId });
    },
  });
  return {
    updateUser,
    deleteUser,
  };
}
```

[🚀back to top](#top)

## tRPC integrates with React Query’s error handling

```ts
// Global error handling
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              // Don't retry 4xx errors, but retry 5xx
              if (error instanceof TRPCError && error.data?.httpStatus < 500) {
                return false;
              }
              return failureCount < 3;
            },
            onError: (error) => {
              console.error('Query error:', error);
              // Could show toast notification here
            },
          },
          mutations: {
            onError: (error) => {
              console.error('Mutation error:', error);
              // Handle mutation errors globally
            },
          },
        },
      }),
  );
  // ... rest of setup
}
// Component-level error handling
function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    error,
    isError,
    refetch,
  } = trpc.getUser.useQuery(
    { id: userId },
    {
      retry: false, // Override global retry for this query
      onError: (error) => {
        if (error.data?.code === 'NOT_FOUND') {
          // Handle user not found specifically
          navigate('/users');
        }
      },
    },
  );
  if (isError) {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }
  // ... rest of component
}
```

[🚀back to top](#top)
