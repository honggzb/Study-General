- [Convex Overview](#convex-overview)

## Convex Overview

- Convex is the open source, reactive database where queries are TypeScript code running right in the database
- ![Convex Overview](./images/Convex-Overview.png)
- **Database**:
  - Convex is a "document-relational" database.
  - The Convex database is reactive: whenever any data on which a query depends changes, the query is rerun, and client subscriptions are updated
- **Server functions**:
  - call Convex functions via **client libraries** or directly via **HTTP**
  - When create a new Convex project, automatically get a `convex/` folder where write server functions
  - `query`(read), `mutation`(write) to the db
  - use `actions` to call LLMs or send emails
  - can also durably schedule Convex functions via the `scheduler` or `cron` jobs
  - ![Convex-scheduler](./images/Convex-scheduler.png)
  - [Convex Tutorial: Calling external services](https://docs.convex.dev/tutorial/actions)
- **Client libraries**:
  - keep frontend synced with the results of server functions
  - `useQuery`  --> subscribe to this query, and the following happens to get an initial value
    - The Convex client sends a message to the Convex server to subscribe to the query
    - The Convex server runs the function, which reads data from the database
    - The Convex server sends a message to the client with the function's result
- ![Convex-Overview1](./images/Convex-Overview1.png)

```ts
/* Server functions  */
// A Convex query function
export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
    return tasks;
  },
});
// A Convex mutation function
export const setTaskCompleted = mutation({
  args: { taskId: v.id("tasks"), completed: v.boolean() },
  handler: async (ctx, { taskId, completed }) => {
    // Update the database using TypeScript
    await ctx.db.patch("tasks", taskId, { completed });
  },
});
/* Client libraries  */
// In your React component
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
export function TaskList() {
  const data = useQuery(api.tasks.getAllOpenTasks);
  return data ?? "Loading...";
}
```

[🚀back to top](#top)

- [Convex Docs](https://docs.convex.dev/home)
- [The Ultimate Convex Crash Course](https://www.youtube.com/watch?v=_Qqvoq8JVXM)
- [The Complete Convex Crash Course](https://www.youtube.com/watch?v=DpZIkkYPd5I)
