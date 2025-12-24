[React学习-React Query-2025](#top)

- [setup](#setup)
- [core concepts](#core-concepts)
  - [useQuery](#usequery)
  - [Query Functions](#query-functions)
  - [Query Options](#query-options)
- [Server-Side Rendering with React Query](#server-side-rendering-with-react-query)
- [Prefetching Data for Static Generation](#prefetching-data-for-static-generation)
- [Paginated Queries with placeholderData](#paginated-queries-with-placeholderdata)

----------------------------------------------------

- **Simplifies Data Managemen**t: handles the complexities of data fetching, caching, and synchronization
- **Automatic Caching**: caches data automatically, reducing redundant network requests and enhancing performance
- **Background Refetching**: updates data in the background, keeping your UI in sync with the server without interrupting user interactions
- **Optimistic Updates**: supports optimistic updates, instantly reflecting changes in the UI for a better user experience.
- **Built-in Error Handling**:

## setup

1. `npm install @tanstack/react-query`
2. `npm install @tanstack/react-query-devtools`

## core concepts

- Queries: `useQuery`      --> read operations
- Mutations: `useMutation` --> write operations (creating, updating, and deleting data)
- Query Invalidation:

### useQuery

- `useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })`
- **Query Keys**: TanStack Query manages query caching based on query keys. <mark>Query keys have to be an Array</mark> at the top level, and can be as simple as an Array with a single string, or as complex as an array of many strings and nested objects. As long as the query key is serializable using `JSON.stringify`, and **unique** to the query's data, you can use it.
  - Simple Query Keys: `useQuery({ queryKey: ['todos'], ... })  // A list of todos`
  - Array Keys with variables: `useQuery({ queryKey: ['todo', 5, { preview: true }], ...}) // An individual todo in a "preview" format`
- **Query Functions**
  - any function that returns a `promise`. The promise that is returned should either **resolve** the data or **throw an error**
  - Query Function Variables: 
- state of result object
  - `isPending` or `status === 'pending'` - The query has no data yet
  - `isError` or `status === 'error'` - The query encountered an erro
  - `isSuccess` or `status === 'success'` - The query was successful and data is available
  - `isFetching` - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be true

```ts
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
// or
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })
  if (status === 'pending') {
    return <span>Loading...</span>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
// Query Function Variables
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}
function fetchTodoList({ queryKey }) {  // Access the key, status and page variables in query function!
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

[⬆ back to top](#top)

### Query Functions

[⬆ back to top](#top)

### Query Options

- `queryOptions` helper is best way to share `queryKey` and `queryFn` between multiple places
- For Infinite Queries, a separate [infiniteQueryOptions](https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions) helper is available

```ts
import { queryOptions } from '@tanstack/react-query'
function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}
// usage:
useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

[⬆ back to top](#top)

## Server-Side Rendering with React Query

- prefetch queries on the server and hydrate them on the client
1. Create a utility function for fetching data
2. Use `getServerSideProps` to prefetch data

```ts
// utils/fetchTodos.js
export const fetchTodos = async () => {
  const response = await fetch(‘https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error(‘Network response was not ok’);
  }
  return response.json();
};
// pages/index.js
import { dehydrate, QueryClient, useQuery } from ‘@tanstack/react-query’;
import { fetchTodos } from ‘../utils/fetchTodos’;
export default function Home() {
const { data, error, isLoading } = useQuery([‘todos’], fetchTodos);
if (isLoading) return <div>Loading…</div>;
if (error) return <div>Error: {error.message}</div>;
return (
  <ul>
    {data.map(todo => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
);
}
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([‘todos’], fetchTodos);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
```

[⬆ back to top](#top)

## Prefetching Data for Static Generation

- For static generation, use `getStaticProps` instead of `getServerSideProps`

```ts
// pages/index.js
import { dehydrate, QueryClient, useQuery } from ‘@tanstack/react-query’;
import { fetchTodos } from ‘../utils/fetchTodos’;

export default function Home() {
  const { data, error, isLoading } = useQuery([‘todos’], fetchTodos);
  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
  <ul>
    {data.map(todo => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([‘todos’], fetchTodos);
  return {
    props: {
    dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // In seconds
  };
}
```

[⬆ back to top](#top)

## Paginated Queries with placeholderData

- [Paginated / Lagged Queries](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)
- **The data from the last successful fetch is available while new data is being requested, even though the query key has changed**
- When the new data arrives, the previous data is seamlessly swapped to show the new data.
- `isPlaceholderData` is made available to know what data the query is currently providing you

```ts
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

function Todos() {
  const [page, setPage] = React.useState(0)
  const fetchProjects = (page = 0) =>
    fetch('/api/projects?page=' + page).then((res) => res.json())

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['projects', page],
      queryFn: () => fetchProjects(page),
      placeholderData: keepPreviousData,
    })

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
        Previous Page
      </button>
      <button onClick={() => {
          if (!isPlaceholderData && data.hasMore) {
            setPage((old) => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  )
}
```

[⬆ back to top](#top)

> references
- [official example](https://github.com/TanStack/query/tree/main/examples)
- [Beginner's Guide to React Query](https://refine.dev/blog/react-query-guide/#why-use-react-query)
- https://github.com/samudrajovanka/nextjs-react-query-template/: pages+next14+react18
- [【ReactQuery】结合场景理解useQuery的各种用法](https://juejin.cn/post/7324186292297203762)
  - https://github.com/PaddyChen75/next-react-query-demo
- https://github.com/bonnie/udemy-REACT-QUERY:  vite+react
