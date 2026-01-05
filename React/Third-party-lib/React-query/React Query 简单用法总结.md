[React Query 简单用法总结](#top)

- [核心API及用法](#核心api及用法)
  - [useQuery —— GET](#usequery--get)
  - [useMutation —— POST/PUT/DELETE](#usemutation--postputdelete)
  - [useInfiniteQuery —— 无限加载](#useinfinitequery--无限加载)
  - [useQueryClient —— 手动更新缓存](#usequeryclient--手动更新缓存)
- [其他高级用法](#其他高级用法)
  - [enabled选项（控制请求时机）](#enabled选项控制请求时机)
  - [轮询数据（实时更新）-- refetchInterval](#轮询数据实时更新---refetchinterval)
  - [预获取数据prefetch data（SSR/SSG）](#预获取数据prefetch-datassrssg)

----------------------------------------------------

- ✅ 适合使用 React Query 的场景
  - 需要自动缓存和后台同步的 API 请求（避免重复请求）
  - 需要分页、滚动加载（useInfiniteQuery）
  - 需要数据变更和手动更新缓存（useMutation + useQueryClient）
  - 需要自动轮询或实时数据同步（refetchInterval）
  - 需要进行乐观更新以提升用户体验
- ❌ 不适合使用 React Query 的场景
  - 本地组件状态管理（例如 useState 适用于组件内部数据）
  - 需要手动深度管理状态（Redux 可能更合适）


##  核心API及用法

### useQuery —— GET

- `useQuery`用于执行GET请求，自动处理缓存和后台刷新

```ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchUser = async () => {
  const { data } = await axios.get('/api/user');
  return data;
};
export default function UserProfile() {
  const { data, isLoading, error } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>Welcome, {data.name}!</div>;
}
```

### useMutation —— POST/PUT/DELETE

- `useMutation`用于创建、更新或删除 数据

```ts
// 提交表单
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const createUser = async (user) => {
  const { data } = await axios.post('/api/user', user);
  return data;
};
export default function CreateUser() {
  const mutation = useMutation({ mutationFn: createUser });
  const handleSubmit = async () => {
    mutation.mutate({ name: 'John Doe', age: 30 });
  };
  return (
    <div>
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create User'}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>User created!</p>}
    </div>
  );
}
```

[⬆ back to top](#top)

### useInfiniteQuery —— 无限加载

- 用于 分页 或 滚动加载 数据

```ts
// 滚动加载文章
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`/api/posts?page=${pageParam}`);
  return data;
};
export default function Posts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  });
  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>{page.posts.map((post) => <p key={post.id}>{post.title}</p>)}</div>
      ))}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'No More Posts'}
      </button>
    </div>
  );
}
```

[⬆ back to top](#top)

### useQueryClient —— 手动更新缓存

- 可用于 数据同步 和 乐观更新

```ts
// 删除用户并更新缓存
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const deleteUser = async (id) => {
  await axios.delete(`/api/user/${id}`);
};
export default function UsersList() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // 让缓存失效，触发重新获取数据
    }
  });
  return (
    <button onClick={() => mutation.mutate(1)}>Delete User</button>
  );
}
```

[⬆ back to top](#top)

## 其他高级用法

### enabled选项（控制请求时机）

```ts
useQuery({
  queryKey: ['user', id],
  queryFn: fetchUser,
  enabled: !!id // 当 id 存在时才请求
});
```

### 轮询数据（实时更新）-- refetchInterval

- `useQuery({ queryKey: ['stock'], queryFn: fetchStock, refetchInterval: 5000 });`

### 预获取数据prefetch data（SSR/SSG）

-  `queryClient.prefetchQuery`
-  For server side render-SSR, use `getServerSideProps`
-  For static generation-SSG, use `getStaticProps`

```ts
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['user'], fetchUser);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
```

[⬆ back to top](#top)

```ts

```

[⬆ back to top](#top)
