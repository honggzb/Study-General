
- [Queries](#queries)
  - [Queries in convex](#queries-in-convex)
  - [Calling queries from clients](#calling-queries-from-clients)
  - [Splitting up query code via helpers](#splitting-up-query-code-via-helpers)
- [Mutations](#mutations)
  - [Splitting up query code via helpers](#splitting-up-query-code-via-helpers-1)
- [Actions](#actions)
- [HTTP Actions](#http-actions)


[Functions](#top)

There are three types of functions:

- **Queries**:  read data from Convex database and are automatically cached and subscribable (realtime, reactive)
- **Mutations**:  write data to the database and run as a transaction
- **Actions**:  call OpenAI, Stripe, Twilio, or any other service or API

||Queries|	Mutations|	Actions|
|---|---|---|---|
|Database access	|Yes	|Yes|	No|
|Transactional	|Yes|	Yes|	No|
|Cached	|Yes|	No|	No|
|Real-time Updates	|Yes	|No|	No|
|External API Calls (fetch)	|No|	No|	Yes|

## Queries

- Queries have three awesome attributes:
  - Caching: Convex caches query results automatically. If many clients request the same query, with the same arguments, they will receive a cached response
  - Reactivity: clients can subscribe to queries to receive new results when the underlying data changes
  - Consistency: All database reads inside a single query call are performed at the same logical timestamp. Concurrent writes do not affect the query results

### Queries in convex

- **Queries are defined in TypeScript files inside 'convex/' directory**
  - `api.myFunctions.myQuery` mapping `myFunctions:myQuery`
  - `api.foo.myQueries.myQuery` mapping `foo/myQueries:myQuery`
  - `api.myFunction.default` mapping `myFunction:default`"or `myFunction`
1. **Query arguments**
  - argument values are accessible as fields of the **second** parameter of the handler function
   - [argument validation](https://docs.convex.dev/functions/validation)
2. **Query responses**:
   1. can return values of any supported [Convex type](https://docs.convex.dev/functions/validation) which will be automatically serialized and deserialized
   2. can return `undefined`, which is not a valid Convex value:  it is translated to `null` on the client
3. **Query context**
   1. can by passing a [QueryCtx](https://docs.convex.dev/generated-api/server#queryctx) object to the handler function as the **first** parameter

```ts
// convex/myFunctions.ts
import { query } from "./_generated/server";
import { v } from "convex/values";
export const myConstantString = query({
  args: { a: v.number(), b: v.number() },  //Query arguments
  handler: (ctx, args) => {  // ctx: Query context
    return args.a + args.b;
    // Do something with `ctx`
    // such as return await ctx.db.get("tasks", args.id);
  },
});
```

### Calling queries from clients

-  call a query from React use the **[useQuery](https://docs.convex.dev/client/react#fetching-data) hook** along with the generated api object

```ts
// src/MyApp.tsx
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
export function MyApp() {
  const data = useQuery(api.myFunctions.sum, { a: 1, b: 2 });
  // do something with `data`
}
```

### Splitting up query code via helpers

```ts
import { Id } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
export const getTaskAndAuthor = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get("tasks", args.id);
    if (task === null) {
      return null;
    }
    return { task, author: await getUserName(ctx, task.authorId ?? null) };
  },
});
// second function by using QueryCtx
async function getUserName(ctx: QueryCtx, userId: Id<"users"> | null) {
  if (userId === null) {
    return null;
  }
  return (await ctx.db.get("users", userId))?.name;
}
```

[🚀back to top](#top)

## Mutations

- Mutations **insert**, **update** and **remove** data from the database
- Mutations **check authentication** or perform other business logic, and optionally return a response to the client application
1. **Mutation arguments**
  - argument values are accessible as fields of the **second** parameter of the `handler` function
   - [argument validation](https://docs.convex.dev/functions/validation)
2. **Mutation responses**:
   1. can return values of any supported [Convex type](https://docs.convex.dev/functions/validation) which will be automatically serialized and deserialized
   2. can return `undefined`, which is not a valid Convex value:  it is translated to `null` on the client
3. **Mutation context**
   1. can by passing a [MutationCtx](https://docs.convex.dev/generated-api/server#mutationctx) object to the handler function as the **first** parameter

```ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const mutateSomething = mutation({
  args: { a: v.number(), b: v.number() },
  handler: (ctx, args) => {
    await ctx.db.insert("tasks", { text: args.text });
  },
});
```

### Splitting up query code via helpers

```ts
import { v } from "convex/values";
import { mutation, MutationCtx } from "./_generated/server";
export const addItem = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", { text: args.text });
    await trackChange(ctx, "addItem");
  },
});
// MutationCtx
async function trackChange(ctx: MutationCtx, type: "addItem" | "removeItem") {
  await ctx.db.insert("changes", { type });
}
```

[🚀back to top](#top)

## Actions

1. **Query arguments**
  - argument values are accessible as fields of the **second** parameter of the handler function
2. **Query responses**:
   1. can return values of any supported [Convex type](https://docs.convex.dev/functions/validation) which will be automatically serialized and deserialized
   2. can return `undefined`, which is not a valid Convex value:  it is translated to `null` on the client
3. **Query context**
   1. can by passing a [QueryCtx](https://docs.convex.dev/generated-api/server#queryctx) object to the handler function as the **first** parameter
4. [GIPHY Action Example App](https://github.com/get-convex/convex-demos/tree/main/giphy-action)

```ts
// convex/myFunctions.ts
/* call convex */
import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
export const doSomething = action({
  args: { a: v.number() },
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(internal.myFunctions.readData, {  // read data
      a: args.a,
    });
    const data = await ctx.runMutation(internal.myMutations.writeData, {  // write data
      a: args.a,
    });
    // do something with `data`
  },
});
// https://docs.convex.dev/functions/internal-functions
//  don't want to expose it to the client directly
export const readData = internalQuery({
  args: { a: v.number() },
  handler: async (ctx, args) => {
    // read from `ctx.db` here
  },
});
/*  call a third-party API using fetch if supports fetch  */
import { action } from "./_generated/server";
export const doSomething = action({
  args: {},
  handler: async () => {
    const data = await fetch("https://api.thirdpartyservice.com");
    // do something with data
  },
});
/*  call a third-party using "use node" if unsupported NPM packages or Node.js APIs */
"use node";
import { action } from "./_generated/server";
import SomeNpmPackage from "some-npm-package";
export const doSomething = action({
  args: {},
  handler: () => {
    // do something with SomeNpmPackage
  },
});
```

[🚀back to top](#top)

## HTTP Actions


[🚀back to top](#top)

- [Convex Docs](https://docs.convex.dev/home)
- [The Ultimate Convex Crash Course](https://www.youtube.com/watch?v=_Qqvoq8JVXM)
- [The Complete Convex Crash Course](https://www.youtube.com/watch?v=DpZIkkYPd5I)
