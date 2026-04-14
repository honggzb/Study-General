[tRPC初探](#top)

- [General](#general)
- [tRPC核心概念](#trpc核心概念)
  - [路由Router](#路由router)
  - [程序Procedure - API 端口](#程序procedure---api-端口)
  - [查询Query](#查询query)
  - [突变Mutation](#突变mutation)
  - [订阅Subscription](#订阅subscription)
  - [上下文Context](#上下文context)
  - [中间件Middleware](#中间件middleware)
  - [验证Validation](#验证validation)
- [Tanstank intent skills](#tanstank-intent-skills)
- [Next.js Integration](#nextjs-integration)
  - [Starter projects](#starter-projects)
  - [App Router vs. Pages Router](#app-router-vs-pages-router)
  - [App Router](#app-router)
    - [setup with Tanstack react query](#setup-with-tanstack-react-query)
    - [Make API requests:](#make-api-requests)
    - [Getting data in a Server Component](#getting-data-in-a-server-component)
    - [using data both on the server as well as inside client components](#using-data-both-on-the-server-as-well-as-inside-client-components)
    - [Leveraging Suspense + prefetch and HydrateClient helper functions](#leveraging-suspense--prefetch-and-hydrateclient-helper-functions)
    - [Server Actions](#server-actions)
  - [Pages Router](#pages-router)
- [Integration with Drizzle](#integration-with-drizzle)

---------------------------------------------------------------------------------

## General

- tRPC 是一个基于 TypeScript 的远程过程调用框架，旨在简化客户端与服务端之间的通信过程，并提供高效的类型安全
  - Automatic type-safety（自动类型安全）
  - Snappy DX（敏捷高效的开发者体验）
  - Is framework agnostic （不依赖于特定框架）
  - Amazing autocompletion（出色的自动补全功能）
  - Light bundle size（轻量级打包大小）
- tRPC 允许使用类似本地函数调用的方式来调用远程函数，同时自动处理序列化和反序列化、错误处理和通信协议等底层细节
  - 写法上从 **发送 http 请求 ⇒ 调用本地函数**
- tRPC 可以作为 REST/GraphQL 的替代品，如果前端与后端共享代码的 TypeScript monorepo，trpc 则可以无需任何类型转换

##  tRPC核心概念

### 路由Router

- 路由是一个集合，是 procedure 命令空间下的集合
- 在 router 函数中定义路由对象，路由可以合并，合并的方式有两种：
  - 直接子 router 函数上
  - 使用 mergeRouters 工具函数

```ts
import { initTRPC } from '@trpc/server';
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
});
```

### 程序Procedure - API 端口

- API 端口，可以多种 查询/突变/订阅。用于创建后端函数 创建后端函数

```ts
import { initTRPC } from '@trpc/server';
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
```

### 查询Query

- 直接获取数据的 Procedure
- query 函数接受一个函数作为参数，函数参数的返回值是客户端返回值

```ts
 const appRouter = router({
  hello: publicProcedure.query(() => {
    return {
      message: 'hello world',
    };
  }),
});
```

### 突变Mutation

- 创建、更新或删除某些数据的Procedure
- mutation 函数接受一个函数作为参数，函数参数的返回值中使用 options 获取上下文，用于可变操作

```ts
 const appRouter = router({
  goodbye: publicProcedure.mutation(async (opts) => {
    await opts.ctx.signGuestBook();
    return {
      message: 'goodbye!',
    };
  }),
});
```

### 订阅Subscription

- 创建持久连接并侦听更改的Procedure。
- 在 nodejs 服务端通常配合 事件触发器 和 可观察对象 observable一起使用

```ts
const ee = new EventEmitter();     //监听事件
const t = initTRPC.create();
export const appRouter = t.router({
  onAdd: t.procedure.subscription(() => {
    return observable<Post>((emit) => {
      const onAdd = (data: Post) => {
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);     //监听 add 事件
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
});
```

### 上下文Context

- 通常用于会话状态、身份认证和数据库连接等内容

```ts
// 创建上下文
const createContext = async () => {
    //
}
const t = initTRPC.context<typeof createContext>().create();
// 使用上下文
t.procedure.use(({ ctx }) => { ... });
// 定义 http 服务式使用
 const handler = createHTTPHandler({
  router: appRouter,
  createContext,
});
// 获取 caller 时使用
const caller = appRouter.createCaller(await createContext());   // 这里的 caller 可以直接调用 appRouter 内部的方法来获取数据
// 服务端 helpers 函数时使用
 const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: await createContext(),
});
```

### 中间件Middleware

- 中间件可以在 procedure 运行之前和之后运行，在中间件中可以修改上往下文中的数据
- middleware 接受一个函数作为对象，通过 opts 获取上下文，并且可以调用可观察对象的 next 方法

```ts
const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
const mid = middleware(async (opts) => {
  // 中间件逻辑
  return opts.next({
    ctx: {
      value: 'new value' as const,
    },
  });
});
export const midProcedure = publicProcedure.use(mid);
```

### 验证Validation

- 在router 中 publicProcedure 函数具有 input/output 方法用于验证

```ts
// 使用 Zod 库进行校验
import { z } from 'zod';
export const appRouter = t.router({
  hello: publicProcedure
    .input(
      z.object({ name: z.string() }),
    ).output(
      z.object({ greeting: z.string() }),
    ).query(),
});
```

[🚀back to top](#top)

## Tanstank intent skills

1. `npx @tanstack/intent@latest install`
2. `npx @tanstack/intent@latest list`
3.  the skills are in 'project/node_modules'

```
PACKAGE                     VERSION  SKILLS  REQUIRES
───────────────────────────────────────────────────────
@trpc/client                11.16.0  3       –
@trpc/server                11.16.0  16      –
@trpc/tanstack-react-query  11.16.0  2       –
```

- [Tanstack Intent- Ship Agent Skills with your npm Packages](https://tanstack.com/intent/latest)

[🚀back to top](#top)

## Next.js Integration

### Starter projects

1. App Router
   - `npx create-next-app --example https://github.com/trpc/trpc/tree/main/examples/next-sse-chat trpc-sse-chat`
   - App Router with SSE-based subscriptions and chat
   - Uses `@trpc/react-query` with the fetch adapter
2. Pages Router
   - Next.js starter with Prisma, E2E testing, & ESLint: `npx create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter`
   - Monorepo setup with React Native, Next.js, & Prisma: `git clone git@github.com:KATT/zart.git`
   - Next.js TodoMVC-example with SSG & Prisma: `npx create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-todomvc trpc-todo`

### App Router vs. Pages Router

||App Router	|Pages Router|
|---|---|---|
|Recommended for|	New projects|	Existing Pages Router projects|
|Data fetching|	Server Components, `prefetchQuery`|	`getServerSideProps`, `getStaticProps`, SSR via HOC|
|Server adapter|	[Fetch adapter](https://trpc.io/docs/server/adapters/fetch)|	[Next.js adapter](https://trpc.io/docs/server/adapters/nextjs)|
|Client package|	`@trpc/tanstack-react-query`|	`@trpc/next` + `@trpc/react-query`|
|Provider setup|	Manual `QueryClientProvider` + `TRPCProvider`|	Automatic via `withTRPC()` HOC|

### App Router

- https://trpc.io/docs/client/nextjs/app-router-setup

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── trpc/
│   │   │       └── [trpc]/
│   │   │           └── route.ts  # <-- tRPC HTTP handler
│   │   ├── layout.tsx            # <-- mount TRPCReactProvider
│   │   └── page.tsx              # <-- server component
│   ├── trpc/
│   │   ├── init.ts               # <-- tRPC server init & context
│   │   ├── routers/
│   │   │   ├── _app.ts           # <-- main app router
│   │   │   ├── post.ts           # <-- sub routers
│   │   │   └── ...
│   │   ├── client.tsx            # <-- client hooks & provider
│   │   ├── query-client.ts       # <-- shared QueryClient factory
│   │   └── server.tsx            # <-- server-side caller
│   └── ...
└── ...
```

#### setup with Tanstack react query

1. `npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query@latest zod client-only server-only`
2. Create a tRPC router:
   1. 'trpc\init.ts'
   2. 'trpc\routers\_app.ts'
3. Create the API route handler: 'app/api/trpc/[trpc]/route.ts'
4. Create a Query Client factory: 'trpc/query-client.ts'
5. Create a tRPC client for Client Components:
   1. 'trpc/client.tsx'
      1. the entrypoint when consuming your tRPC API from client components
      2. import the `type` definition of your tRPC router and create typesafe hooks using `createTRPCContext`
   2. Mount the `TRPCReactProvider` in the root layout(app\layout.tsx)
6. Create a tRPC caller for Server Components
   1. 'trpc/server.tsx'
7. Now test in browser `http://localhost:3000/api/trpc/hello`, `http://localhost:3000/api/trpc/getTodos`

[🚀back to top](#top)

#### Make API requests:

1. Prefetching in a Server Component

```ts
// app/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '~/trpc/server';
import { ClientGreeting } from './client-greeting';
 
export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: 'world',
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientGreeting />
    </HydrationBoundary>
  );
}
```

2. Using data in a Client Component
   - `usQuery`
   - `useTRPC`

```ts
// app/client-greeting.tsx
'use client';
// <-- hooks can only be used in client components
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/trpc/client';
export function ClientGreeting() {
  const trpc = useTRPC();
  const greeting = useQuery(trpc.hello.queryOptions({ text: 'world' }));
  if (!greeting.data) return <div>Loading...</div>;
  return <div>{greeting.data.greeting}</div>;
}
```

#### Getting data in a Server Component

```ts
// trpc/server.tsx
import { headers } from 'next/headers';
import { createTRPCContext } from './init';
import { appRouter } from './routers/_app';
// ...
export const caller = appRouter.createCaller(async () =>
  createTRPCContext({ headers: await headers() }),
);
// app/page.tsx
import { caller } from '~/trpc/server';
export default async function Home() {
  const greeting = await caller.hello();
  const greeting: {
      greeting: string;
  }
  return <div>{greeting.greeting}</div>;
}
```

[🚀back to top](#top)

#### using data both on the server as well as inside client components

```ts
// app/page.tsx
import { getQueryClient, HydrateClient, trpc } from '~/trpc/server';
import { ClientGreeting } from './client-greeting';
export default async function Home() {
  const queryClient = getQueryClient();
  const greeting = await queryClient.fetchQuery(trpc.hello.queryOptions());
  // Do something with greeting on the server
  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}
```

[🚀back to top](#top)

#### Leveraging Suspense + prefetch and HydrateClient helper functions

```ts
// trpc/server.tsx   --prefetch and HydrateClient helper functions
export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === 'infinite') {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}
//app/page.tsx  --  Leveraging Suspense
import { HydrateClient, prefetch, trpc } from '~/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ClientGreeting } from './client-greeting';
export default async function Home() {
  prefetch(trpc.hello.queryOptions());
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
// app/client-greeting.tsx
'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '~/trpc/client';
export function ClientGreeting() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hello.queryOptions());
  return <div>{data.greeting}</div>;
}
```

[🚀back to top](#top)

#### Server Actions

[🚀back to top](#top)

### Pages Router

- https://trpc.io/docs/client/nextjs/pages-router/setup

```
├── prisma/  # <-- if prisma is added
│   └── ...
├── src/
│   ├── pages/
│   │   ├── _app.tsx  # <-- add `withTRPC()`-HOC here
│   │   ├── api/
│   │   │   └── trpc/
│   │   │       └── [trpc].ts  # <-- tRPC HTTP handler
│   │   └── ...
│   ├── server/
│   │   ├── routers/
│   │   │   ├── _app.ts  # <-- main app router
│   │   │   ├── post.ts  # <-- sub routers
│   │   │   └── ...
│   │   ├── context.ts   # <-- create app context
│   │   └── trpc.ts      # <-- procedure helpers
│   └── utils/
│       └── trpc.ts  # <-- your typesafe tRPC hooks
└── ...
```

[🚀back to top](#top)

## Integration with Drizzle

1. `npm i drizzle-orm better-sqlite3 drizzle-kit`
2. `npm i @types/better-sqlite3 -D`
3. create 'db\schema.ts'
4. create 'drizzle.config.ts' in root directory
5. `npx drizzle-kit generate`
   1. create 'drizzle\0000_acoustic_madame_hydra.sql'
   2. create 'drizzle\meta' folder
6. add `addTodo` and `setTodo` function to 'trpc\routers\_app.ts'
7. modify client component 'app\components\todolist.tsx'

[🚀back to top](#top)

> References
- [TRPC official](https://link.zhihu.com/?target=https%3A//trpc.io/)
  - https://github.com/trpc/trpc
  - https://trpc.io/docs/example-apps
  - [Next.js Integration](https://trpc.io/docs/client/nextjs)
- [tRPC + NextJS App Router = Simple Typesafe APIs](https://www.youtube.com/watch?v=qCLV0Iaq9zU)
  - https://github.com/jherr/trpc-on-the-app-router/
- [TS全栈需要了解 tRPC 的八个核心概念](https://zhuanlan.zhihu.com/p/663576643)
- [tRPC + NextJS App Router = Simple Typesafe APIs](https://www.youtube.com/watch?v=qCLV0Iaq9zU)
- [sqlite3- 快速入手教程](https://zhuanlan.zhihu.com/p/496160310)


