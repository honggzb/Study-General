[Components+Agent components](#top)

- [Convex Components](#convex-components)
  - [Data](#data)
  - [Using the component](#using-the-component)
- [AI Agents component](#ai-agents-component)
  - [Concepts](#concepts)
  - [Started with Agent](#started-with-agent)
  - [Agent Definition](#agent-definition)
    - [Basic Agent definition](#basic-agent-definition)
  - [Dynamic Agent definition](#dynamic-agent-definition)
- [Agent Usage](#agent-usage)
  - [Streaming text with an Agent](#streaming-text-with-an-agent)
  - [Saving the prompt then generating response asynchronously](#saving-the-prompt-then-generating-response-asynchronously)
  - [Generating an object](#generating-an-object)
  - [Customizing the agent with embedding model](#customizing-the-agent-with-embedding-model)
- [Thread](#thread)
  - [Creating a thread](#creating-a-thread)
  - [Deleting threads](#deleting-threads)
  - [Getting all threads owned by a user](#getting-all-threads-owned-by-a-user)
  - [Deleting all threads and messages associated with a user](#deleting-all-threads-and-messages-associated-with-a-user)
- [Messages](#messages)
  - [Generating a message in a thread](#generating-a-message-in-a-thread)
  - [UIMessage type](#uimessage-type)
  - [Retrieving messages](#retrieving-messages)
  - [Showing messages in React](#showing-messages-in-react)
  - [Saving messages](#saving-messages)
  - [Deleting messages](#deleting-messages)
- [Streaming](#streaming)
  - [Retrieving streamed deltas](#retrieving-streamed-deltas)
- [Tools](#tools)
  - [Creating a tool with a Convex context](#creating-a-tool-with-a-convex-context)
  - [Using an LLM or Agent as a tool](#using-an-llm-or-agent-as-a-tool)

-----------------------------------------------------------

## Convex Components

- Convex Components are self-contained **backend modules** that bundle functions, schemas, and data together
- Convex Components let yo add complex functionality to app—like authentication, rate limiting, or document collaboration—without implementing everything from scratch
- ![Convex Components](convex-Components.png)
- [Open-source building Convex components](https://www.convex.dev/components)

### Data

- Convex Components encapsulate state and behavior and allow exposing a clean interface.
- Convex Components e can have internal state machines that can persist between user sessions, span users, and change in response to external inputs, such as webhooks
- Components can store data in a few ways
- **Database tables** with their own schema validation definitions
  - Since Convex is realtime by default, data reads are automatically reactive, and writes commit transactional
- **File storage**, independent of the main app's file storage
- **Durable functions** via the built-in function scheduler. Components can schedule functions to run in the future and pass along state

### Using the component

1. [Agent component](https://docs.convex.dev/components/using)
2. Using the component's API directly

[🚀back to top](#top)

## AI Agents component

### Concepts

- **Agents** organize LLM prompting with associated models, prompts, and Tools. They can generate and stream both text and objects.
  - **Agents** encapsulate models, prompting, tools, and other configuration. They can be defined as globals, or at runtime
  - **Agents** can be used in any **Convex action**
- **Threads** persist messages and can be shared by multiple users and agents (including human agents)
  - **Conversation context** is automatically included in each LLM call, including built-in hybrid vector/text search for messages
- **[Workflows](https://docs.convex.dev/agents/workflows)** allow building multi-step operations that can span agents, users, durably and reliably
- **RAG** techniques are also supported for prompt augmentation either up front or as tool calls using the [RAG Component](https://www.convex.dev/components/rag)
- **Files** can be used in the chat history with automatic saving to [file storage](https://docs.convex.dev/file-storage)

### Started with Agent

1. `npm install @convex-dev/agent`
2. Create a 'convex.config.ts' file in your app's 'convex/' folder
   1. run `npx convex dev` to generate code for the component

```ts
// convex/convex.config.ts
import { defineApp } from "convex/server";
import agent from "@convex-dev/agent/convex.config";
const app = defineApp();
app.use(agent);
export default app;
```

### Agent Definition

#### Basic Agent definition

```ts
// Defining your first Agent
import { components } from "./_generated/api";
import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";
const agent = new Agent(components.agent, {
  name: "Basic Agent",
  languageModel: openai.chat("gpt-4o-mini"),
});
```

### Dynamic Agent definition

```ts
import { Agent } from "@convex-dev/agent";
import { type LanguageModel } from "ai";
import type { ActionCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { components } from "./_generated/api";
function createAuthorAgent(
  ctx: ActionCtx,
  bookId: Id<"books">,
  model: LanguageModel,
) {
  return new Agent(components.agent, {
    name: "Author",
    languageModel: model,
    tools: {   // See https://docs.convex.dev/agents/tools
      getChapter: getChapterTool(ctx, bookId),
      researchCharacter: researchCharacterTool(ctx, bookId),
      writeChapter: writeChapterTool(ctx, bookId),
    },
    maxSteps: 10, // Alternative to stopWhen: stepCountIs(10)
  });
}
```

## Agent Usage

- Generate messages
  - `agent.streamText` or `agent.generateObject`
  - arguments referring to [full list of AI SDK arguments](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text)
- message history
  - be provided by default as **context** from the given **thread**
  - referring to [LLM Context](https://docs.convex.dev/agents/context)
- [chat/basic.ts](https://github.com/get-convex/agent/blob/main/example/convex/chat/basic.ts) or [chat/streaming.ts](https://github.com/get-convex/agent/blob/main/example/convex/chat/streaming.ts) for live code examples

### Streaming text with an Agent

```ts
//Streaming text --> Basic usage (synchronous)
import { action } from "./_generated/server";
import { v } from "convex/values";

export const helloWorld = action({
  args: { city: v.string() },
  handler: async (ctx, { city }) => {
    const threadId = await createThread(ctx, components.agent);
    const prompt = `What is the weather in ${city}?`;
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});
//Streaming text --> Basic approach (synchronous)
export const generateReplyToPrompt = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    // await authorizeThreadAccess(ctx, threadId);
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});
```

### Saving the prompt then generating response asynchronously

```ts
import { components, internal } from "./_generated/api";
import { saveMessage } from "@convex-dev/agent";
import { internalAction, mutation } from "./_generated/server";
import { v } from "convex/values";
// Step 1: Save a user message, and kick off an async response.
export const sendMessage = mutation({
  args: { threadId: v.id("threads"), prompt: v.string() },
  handler: async (ctx, { threadId, prompt }) => {
    const { messageId } = await saveMessage(ctx, components.agent, {
      threadId,
      prompt,
    });
    await ctx.scheduler.runAfter(0, internal.example.generateResponseAsync, {
      threadId,
      promptMessageId: messageId,
    });
  },
});
// Step 2: Generate a response to a user message.
// the action doesn't need to return anything.
// All messages are saved by default, so any client subscribed to the thread messages will receive the new message as it is generated asynchronously
export const generateResponseAsync = internalAction({
  args: { threadId: v.string(), promptMessageId: v.string() },
  handler: async (ctx, { threadId, promptMessageId }) => {
    await agent.generateText(ctx, { threadId }, { promptMessageId });
  },
});
```

### Generating an object

```ts
import { z } from "zod/v3";
const result = await thread.generateObject({
  prompt: "Generate a plan based on the conversation so far",
  schema: z.object({...}),
});
```

[🚀back to top](#top)

### Customizing the agent with embedding model

```ts
import { tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod/v3";
import { Agent, createTool, type Config } from "@convex-dev/agent";
import { components } from "./_generated/api";
const sharedDefaults = {
  languageModel: openai.chat("gpt-4o-mini"),
  // Embedding model to power vector search of message history (RAG).
  textEmbeddingModel: openai.embedding("text-embedding-3-small"),
  contextOptions,    // Used for fetching context messages. See https://docs.convex.dev/agents/context
  storageOptions,    // Used for storing messages. See https://docs.convex.dev/agents/messages
  usageHandler: async (ctx, args) => {  // Used for tracking token usage. See https://docs.convex.dev/agents/usage-tracking
    const { usage, model, provider, agentName, threadId, userId } = args;
    // ... log, save usage to your database, etc.
  },
  // Used for filtering, modifying, or enriching the context messages. See https://docs.convex.dev/agents/context
  contextHandler: async (ctx, args) => {
    return [...customMessages, args.allMessages];
  },
  // Useful if you want to log or record every request and response.
  rawResponseHandler: async (ctx, args) => {
    const { request, response, agentName, threadId, userId } = args;
    // ... log, save request/response to your database, etc.
  },
  // Used for limiting the number of retries when a tool call fails. Default: 3.
  callSettings: { maxRetries: 3, temperature: 1.0 },
} satisfies Config;

const supportAgent = new Agent(components.agent, {
  // The default system prompt if not over-ridden.
  instructions: "You are a helpful assistant.",
  tools: {
    // Convex tool. See https://docs.convex.dev/agents/tools
    myConvexTool: createTool({
      description: "My Convex tool",
      args: z.object({...}),
      // Note: annotate the return type of the handler to avoid type cycles.
      handler: async (ctx, args): Promise<string> => {
        return "Hello, world!";
      },
    }),
    // Standard AI SDK tool
    myTool: tool({ description, parameters, execute: () => {}}),
  },
  // Used for limiting the number of steps when tool calls are involved.
  // NOTE: if you want tool calls to happen automatically with a single call,
  // you need to set this to something greater than 1 (the default).
  stopWhen: stepCountIs(5),
  ...sharedDefaults,
});
```

[🚀back to top](#top)

## Thread

- All messages saved in the Agent component are associated with a thread.
- When a message is generated based on a prompt, it saves the **user message** and generated **agent message(s)** automatically
- Threads can be associated with a user
  - messages can each individually be associated with a user. By default, messages are associated with the thread's user

### Creating a thread

- create in an action  -> return a thread
- create in a mutation

```ts
import { createThread } from "@convex-dev/agent";
const threadId = await createThread(ctx, components.agent);
// pass in metadata to set on the thread
const userId = await getAuthUserId(ctx);
const threadId = await createThread(ctx, components.agent, {
  userId,
  title: "My thread",
  summary: "This is a summary of the thread",
});
```

### Deleting threads

```ts
// Asynchronously (from a mutation or action)
await agent.deleteThreadAsync(ctx, { threadId });
// Synchronously in batches (from an action)
await agent.deleteThreadSync(ctx, { threadId });
// delete all threads by a user by their userId
await agent.deleteThreadsByUserId(ctx, { userId });
```

### Getting all threads owned by a user

```ts
const threads = await ctx.runQuery(
  components.agent.threads.listThreadsByUserId,
  { userId, paginationOpts: args.paginationOpts },
);
```

### Deleting all threads and messages associated with a user

```ts
//Asynchronously (from a mutation or action):
await ctx.runMutation(components.agent.users.deleteAllForUserIdAsync, {
  userId,
});
// Synchronously (from an action):
await ctx.runMutation(components.agent.users.deleteAllForUserId, { userId });
```

[🚀back to top](#top)

## Messages

- Agent component stores message and thread history to enable conversations between humans and agents.

### Generating a message in a thread

```ts
const agent = new Agent(components.agent, { languageModel, instructions });
export const generateReplyToPrompt = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    // await authorizeThreadAccess(ctx, threadId);
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});
```

### UIMessage type

- The core UIMessage type from the AI SDK is:
  - `parts` is an array of parts (e.g. "text", "file", "image", "toolCall", "toolResult")
  - cont`ent is a string of the message content.
  - `role` is the role of the message (e.g. "user", "assistant", "system").
- The helper adds these additional fields:
  - `key` is a unique identifier for the message.
  - `order` is the order of the message in the thread.
  - `stepOrder` is the step order of the message in the thread.
  - `status` is the status of the message (or "streaming").
  - `agentName` is the name of the agent that generated the message.
  - `text` is the text of the message.
  - `_creationTime` is the timestamp of the message. For streaming messages, it's currently assigned to the current time on the streaming client.
- `toUIMessages` helper
  -

### Retrieving messages

- `query` and return messages
  - `UIMessages` combine multiple MessageDocs into a single UIMessage when there are multiple tool calls followed by an assistant message
- See [chat/basic.ts](https://github.com/get-convex/agent/blob/main/example/convex/chat/basic.ts) for the server-side code, and [chat/streaming.ts](https://github.com/get-convex/agent/blob/main/example/convex/chat/streaming.ts) for the streaming example

```ts
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { listUIMessages, MessageDocs } from "@convex-dev/agent";
import { components } from "./_generated/api";
export const listThreadMessages = query({
  args: { threadId: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    await authorizeThreadAccess(ctx, threadId);
    const paginated = await listUIMessages(ctx, components.agent, args);     // return UIMessages
    // or
    const messageDocs = await listMessages(ctx, components.agent, args);     // return MessageDocs
    return paginated;
  },
});
```

### Showing messages in React

- `useUIMessages` in '@convex-dev/agent/react'
- See [ChatStreaming.tsx](https://github.com/get-convex/agent/blob/main/example/ui/chat/ChatStreaming.tsx) for a streaming example, or [ChatBasic.tsx](https://github.com/get-convex/agent/blob/main/example/ui/chat/ChatBasic.tsx) for a non-streaming example

```ts
import { api } from "../convex/_generated/api";
import { useUIMessages } from "@convex-dev/agent/react";
function MyComponent({ threadId }: { threadId: string }) {
  const { results, status, loadMore } = useUIMessages(
    api.chat.streaming.listMessages,
    { threadId },
    { initialNumItems: 10 /* stream: true */ },
  );
  return (
    <div>
      {results.map((message) => (
        <div key={message.key}>{message.text}</div>
      ))}
    </div>
  );
}
```

[🚀back to top](#top)

### Saving messages

```ts
const { messageId } = await saveMessage(ctx, components.agent, {
  threadId,
  userId,
  message: { role: "user", content: "The user message" },
});
// Without the Agent class
import { saveMessage } from "@convex-dev/agent";
const { messageId } = await saveMessage(ctx, components.agent, {
  threadId,
  userId,
  message: { role: "assistant", content: result },
  metadata: [{ reasoning, usage, ... }] // See MessageWithMetadata type
  agentName: "my-agent",
  // need to pass an embedding if you want to save it at the same time
  embedding: { vector: [0.1, 0.2, ...], model: "text-embedding-3-small" },
});
// Using the Agent class:
const { messageId } = await agent.saveMessage(ctx, {
  threadId,
  userId,
  prompt,
  metadata,
});
const { messages } = await agent.saveMessages(ctx, {
  threadId, userId,
  messages: [{ role, content }],
  metadata: [{ reasoning, usage, ... }] // See MessageWithMetadata type
});
```

### Deleting messages

```ts
// By ID:
await agent.deleteMessage(ctx, { messageId });
await agent.deleteMessages(ctx, { messageIds });  // batch delete
// By order (start is inclusive, end is exclusive):
    // Delete all messages with the same order as a given message:
await agent.deleteMessageRange(ctx, {
  threadId,
  startOrder: message.order,
  endOrder: message.order + 1,
});
    // Delete all messages with order 1 or 2.
await agent.deleteMessageRange(ctx, { threadId, startOrder: 1, endOrder: 3 });
   // Delete all messages with order 1 and stepOrder 2-4
await agent.deleteMessageRange(ctx, {
  threadId,
  startOrder: 1,
  startStepOrder: 2,
  endOrder: 2,
  endStepOrder: 5,
});
```

[🚀back to top](#top)

## Streaming

- Server: [streaming.ts](https://github.com/get-convex/agent/blob/main/example/convex/chat/streaming.ts)
- Client: [ChatStreaming.tsx](https://github.com/get-convex/agent/blob/main/example/ui/chat/ChatStreaming.tsx)

```ts
// easiest way to stream is to pass { saveStreamDeltas: true } to agent.streamText
agent.streamText(ctx, { threadId }, { prompt }, { saveStreamDeltas: true });
agent.streamText(ctx, { threadId }, { prompt }, { saveStreamDeltas: { chunking: "line", throttleMs: 1000 } });
//chunking can be "word", "line", a regex, or a custom function
// throttleMs is how frequently the deltas are saved
```

### Retrieving streamed deltas

```ts
import { paginationOptsValidator } from "convex/server";
import { vStreamArgs, listUIMessages, syncStreams } from "@convex-dev/agent";
import { components } from "./_generated/api";

export const listThreadMessages = query({
  args: {
    threadId: v.string(),
    // Pagination options for the non-streaming messages.
    paginationOpts: paginationOptsValidator,
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, args) => {
    await authorizeThreadAccess(ctx, threadId);
    // Fetches the regular non-streaming messages.
    const paginated = await listUIMessages(ctx, components.agent, args);
    const streams = await syncStreams(ctx, components.agent, args);
    return { ...paginated, streams };
  },
});
```

[🚀back to top](#top)

## Tools

- useing tools in
  - Retrieving data from the database
  - Writing or updating data in the database
  - Searching the web for more context
  - Calling an external API
  - Requesting that a user takes an action before proceeding (human-in-the-loop)
- Defining tools
  - Agent constructor: `(new Agent(components.agent, { tools: {...} }))`
  - Creating a thread: `createThread(ctx, { tools: {...} })`
  - Continuing a thread: `continueThread(ctx, { tools: {...} })`
  - On thread functions: `thread.generateText({ tools: {...} })`
  - Outside of a thread: `supportAgent.generateText(ctx, {}, { tools: {...} })`

### Creating a tool with a Convex context

### Using an LLM or Agent as a tool

[🚀back to top](#top)

- [Convex Docs](https://docs.convex.dev/home)
- [The Ultimate Convex Crash Course](https://www.youtube.com/watch?v=_Qqvoq8JVXM)
- [The Complete Convex Crash Course](https://www.youtube.com/watch?v=DpZIkkYPd5I)


