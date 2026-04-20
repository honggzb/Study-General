[Functions](#top)

- [Queries](#queries)
  - [Queries in convex](#queries-in-convex)
  - [Calling queries from clients](#calling-queries-from-clients)
  - [Splitting up query code via helpers](#splitting-up-query-code-via-helpers)
- [Mutations](#mutations)
  - [Splitting up query code via helpers](#splitting-up-query-code-via-helpers-1)
- [Actions](#actions)
- [HTTP Actions](#http-actions)
  - [Defining HTTP actions](#defining-http-actions)
  - [Common patterns](#common-patterns)
    - [File Storage](#file-storage)
    - [CORS](#cors)
    - [Authentication](#authentication)
- [Internal Functions](#internal-functions)
- [Argument and Return Value Validation](#argument-and-return-value-validation)
  - [Extracting TypeScript types](#extracting-typescript-types)
  - [Reusing and extending validators](#reusing-and-extending-validators)
- [Error Handling](#error-handling)
  - [Errors in queries](#errors-in-queries)
  - [Errors in mutations](#errors-in-mutations)
  - [Errors in actions functions](#errors-in-actions-functions)
  - [Application Errors](#application-errors)
  - [Read/write limit errors](#readwrite-limit-errors)

-----------------------------------------------------------

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

- HTTP actions can manipulate the request and response directly, and interact with data in Convex indirectly by running `queries`, `mutations`, and `actions`
- HTTP actions might be used for receiving `webhooks` from external applications or defining a public HTTP API
- HTTP actions are exposed at `https://<your deployment name>.convex.site` (e.g. https://happy-animal-123.convex.site)
- Example: [HTTP Actions](https://github.com/get-convex/convex-demos/tree/main/http)

### Defining HTTP actions

- **first argument** to the handler is an [ActionCtx](https://docs.convex.dev/api/interfaces/server.GenericActionCtx) object, which provides `auth`, `storage`, and `scheduler`, as well as `runQuery`, `runMutation`, `runAction`
- **second argument** contains the [HTTP API Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) data
- **Note**: HTTP actions do not support **argument validation**

```ts
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
// http Action
export const postMessage = httpAction(async (ctx, request) => {
  const { author, body } = await request.json();
  await ctx.runMutation(internal.messages.sendOne, {
    body: `Sent via HTTP action: ${body}`,
    author,
  });
  return new Response(null, {
    status: 200,
  });
});
```

[🚀back to top](#top)

### Common patterns

#### File Storage

- [Uploading files via an HTTP action](https://docs.convex.dev/file-storage/upload-files#uploading-files-via-an-http-action)
- [Serving files from HTTP actions](https://docs.convex.dev/file-storage/serve-files#serving-files-from-http-actions): fetching stored files

#### CORS

- add Cross-Origin Resource Sharing (CORS) headers to HTTP actions

#### Authentication

- [Convex's built-in authentication](https://docs.convex.dev/auth) integration and access a user identity from `ctx.auth.getUserIdentity()`
- To do this call endpoint with an Authorization header including a JWT token

```ts
const jwtToken = "...";
fetch("https://<deployment name>.convex.site/myAction", {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});
```

[🚀back to top](#top)

## Internal Functions

- Internal functions can **only** be called by other functions and cannot be called directly from a Convex client.
- Use cases for internal functions
  - Calling them from actions via `runQuery` and `runMutation`
  - Calling them from HTTP actions via `runQuery`, `runMutation`, and `runAction`
  - [Scheduling](https://docs.convex.dev/scheduling/scheduled-functions) them from other functions to run in the future
  - Scheduling them to run periodically from [cron jobs](https://docs.convex.dev/scheduling/cron-jobs)
  - Running them using the Dashboard
  - Running them from the CLI

```ts
// Defining internal functions in convex/plans.ts
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
export const markPlanAsProfessional = internalMutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    await ctx.db.patch("plans", args.planId, { planType: "professional" });
  },
});
// Calling internal functions in convex/changes.ts
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
export const upgrade = action({
  args: {
    planId: v.id("plans"),
  },
  handler: async (ctx, args) => {
    // Call out to payment provider (e.g. Stripe) to charge customer
    const response = await fetch("https://...");
    if (response.ok) {
      // Mark the plan as "professional" in the Convex DB
      // directly call internal.plans.markPlanAsProfessional
      await ctx.runMutation(internal.plans.markPlanAsProfessional, {
        planId: args.planId,
      });
    }
  },
});
```

[🚀back to top](#top)

## Argument and Return Value Validation

|Validator for Argument Validation and Schemas|Example Usage|json Format for Export|
|---|---|---|
|`v.id(tableName)`|doc._id|string|
|`v.null()`|null|null|
|`v.number()`|3.1|number / string|
|`v.boolean()`|true|bool|
|`v.string()`|"abc"|string|
|`v.bytes()`|new ArrayBuffer(8)|string (base64)|
|`v.array(values)`|[1, 3.2, "abc"]|array|
|`v.object({property: value})`|{a: "abc"}|object|
|`v.record(keys, values)`|{"a": "1", "b": "2"}|object|
|`v.union(v.string(), v.null())`|`v.union(`<br>`v.literal("one"),`<br>`v.literal("two"),`<br>`)`||
| `v.literal()`||constant|
|`v.any()`|||

### Extracting TypeScript types

- `Infer` allows to turn validator calls into `TypeScript types`

```ts
import { mutation } from "./_generated/server";
import { Infer, v } from "convex/values";
const nestedObject = v.object({
  property: v.string(),
});
// Resolves to `{property: string}`.
export type NestedObject = Infer<typeof nestedObject>;  // Extracting TypeScript types
export default mutation({
  args: {
    nested: nestedObject,
  },
  handler: async (ctx, { nested }) => {
    //...
  },
});
```

### Reusing and extending validators

```ts
const statusValidator = v.union(v.literal("active"), v.literal("inactive"));
const userValidator = v.object({
  name: v.string(),
  email: v.email(),
  status: statusValidator,
  profileUrl: v.optional(v.string()),
});
const schema = defineSchema({
  users: defineTable(userValidator).index("by_email", ["email"]),
});
```

- can create new object validators from existing ones by adding or removing fields using `.pick`, `.omit`, `.extend`, and `.partial` on object validators

```ts
// Creates a new validator with only the name and profileUrl fields.
const publicUser = userValidator.pick("name", "profileUrl");
// Creates a new validator with all fields except the specified fields.
const userWithoutStatus = userValidator.omit("status", "profileUrl");
// Creates a validator where all fields are optional.
// This is useful for validating patches to a document.
const userPatch = userWithoutStatus.partial();
// Creates a new validator adding system fields to the user validator.
const userDocument = userValidator.extend({
  _id: v.id("users"),
  _creationTime: v.number(),
});
```

[🚀back to top](#top)

## Error Handling

1. **Application Errors**: The function code hits a logical condition that should stop further processing, and throws a `ConvexError`
2. **Developer Errors**:
3. **Read/Write Limit Errors**: The function is retrieving or writing too much data
4. **Internal Convex Errors**: There is a problem within Convex (like a network blip), convex will automatically handle internal Convex errors. If there are problems on our end, we'll automatically retry your queries and mutations until the problem is resolved and queries and mutations succeed

### Errors in queries

- error will be sent to the client and thrown from useQuery call site
- best way to handle these errors is with [React Error Boundaries component](https://legacy.reactjs.org/docs/error-boundaries.html)

```ts
<StrictMode>
  <ErrorBoundary>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </ErrorBoundary>
</StrictMode>
```

### Errors in mutations

1. Cause the **promise returned** from your mutation call to be rejected
2. Cause **optimistic update** to be rolled back
3. errors in mutations **won't** be caught by error boundaries because the error doesn't happen as part of rendering components
4. Handle errors in mutation
   1. `.catch()
   2. try...catch

```ts
// method 1
sendMessage(newMessageText).catch((error) => {
  // Do something with `error` here
});
// method 2
try {
  await sendMessage(newMessageText);
} catch (error) {
  // Do something with `error` here
}
```

### Errors in actions functions

- actions may have side-effects and therefore **can't be automatically** retried by Convex when errors occur

### Application Errors

1. Throwing application errors: `throw new ConvexError(...)`
2. Handling application errors on the client:
- [Application Errors](https://docs.convex.dev/functions/error-handling/application-errors)

```ts
/*  1. Throwing application errors  */
// error.data === "My fancy error message"
throw new ConvexError("My fancy error message");
// error.data === {message: "My fancy error message", code: 123, severity: "high"}
throw new ConvexError({
  message: "My fancy error message",
  code: 123,
  severity: "high",
});
// error.data === {code: 123, severity: "high"}
throw new ConvexError({
  code: 123,
  severity: "high",
});
/* Handling application errors on the client: src/App.tsx */
import { ConvexError } from "convex/values";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
export function MyApp() {
  const doSomething = useMutation(api.myFunctions.mutateSomething);
  const handleSomething = async () => {
    try {
      await doSomething({ a: 1, b: 2 });
    } catch (error) {
      const errorMessage =
        // Check whether the error is an application error
        error instanceof ConvexError
          ? // Access data and cast it to the type we expect
            (error.data as { message: string }).message
          : // Must be some developer error,
            // and prod deployments will not
            // reveal any more information about it
            // to the client
            "Unexpected error occurred";
      // do something with `errorMessage`
    }
  };
  // ...
}
```

### Read/write limit errors

- `db.query("table").take(5).collect()`
- `db.query("table").filter(...).first()`
- [limits](https://docs.convex.dev/production/state/limits)

[🚀back to top](#top)

> References
- [Convex Docs](https://docs.convex.dev/home)
- [The Ultimate Convex Crash Course](https://www.youtube.com/watch?v=_Qqvoq8JVXM)
- [The Complete Convex Crash Course](https://www.youtube.com/watch?v=DpZIkkYPd5I)
