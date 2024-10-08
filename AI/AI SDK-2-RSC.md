[AI SDK 2 - RSC](#top)
  
- [setup](#setup)
- [AI SDK RSC](#ai-sdk-rsc)
  - [AI SDK RSC Functions](#ai-sdk-rsc-functions)
  - [Streaming React Components](#streaming-react-components)
  - [Managing Generative UI State by using AI and UI State](#managing-generative-ui-state-by-using-ai-and-ui-state)
- [using AI SDK RSC in project](#using-ai-sdk-rsc-in-project)
- [prompt for cryptoCurrency](#prompt-for-cryptocurrency)


## setup

- `npx create-next-app@latest`
- `npx shadcn@latest init`, `npx shadcn@latest add input card button textarea`
- AI
  - `npm install ai`
  - `npm install @ai-sdk/openai`
  - [AI SDK-OpenAI Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/openai)

```
   project     |       Tech Stack            |     function           |  implementation
---------------|-----------------------------|------------------------|--------------------------
               | Binance, CMC(coinmarketcap) | Bitcoin                | Cryptocurrency Exchange
               | Shadcn ui                   | ui library             |
rsc-ai         | date-fns                    | format date            | date utility
               | react-intersection-observer | Observer API           |
               | react-hook-form,zod +       | form validation        |
               | @hookform/resolvers         | form validation        |
               | AI SDK RSC                  | merge LLM              |

├── 📂app/
│   ├── 📄actions.tsx                   - AI SDK server action
│   ├── 📄globals.css
│   ├── 📄layout.tsx
│   └── 📄page.tsx
├── 📂 components/
│   │    ├── 📂llm-crypto/             - user-defined LLM UI components
│   │    │      ├── 📄message.tsx      - bot message(bot card) + AssistantMessage + UserMessage
│   │    │      ├── 📄price-skeleton.tsx
│   │    │      ├── 📄price.tsx
│   │    │      ├── 📄stats-skeleton.tsx
│   │    │      └── 📄stats.tsx
│   │    └── 📂ui/
│   ├── 📄chat-list.tsx               - chat list component
│   └── 📄chat-scroll-anchor.tsx
├── 📂lib/
│   ├── 📄format-price.ts
│   ├── 📄use-at-bottom.ts
│   ├── 📄use-enter-submit.ts
│   └── 📄utils.ts
```

[⬆ back to top](#top)

## AI SDK RSC

- The <mark>ai/rsc</mark> package is compatible with frameworks that support React Server Components.
- a new way of building AI applications, allowing the **large language model (LLM) to generate** and **stream UI** directly from the server to the client


### AI SDK RSC Functions

|AI SDK RSC Functions|Description|
|---|---|
|streamUI|calls a model and allows it to respond with React Server Components|
|useUIState|returns the current UI state and a function to update the UI State (like React's useState). UI State is the visual representation of the AI state|
|useAIState|returns the current AI state and a function to update the AI State (like React's useState). The AI state is intended to contain context and information shared with the AI model, such as system messages, function responses, and other relevant data|
|useActions|provides access to your Server Actions from the client. This is particularly useful for building interfaces that require user interactions with the server|
|createAI|creates a client-server context provider that can be used to wrap parts of your application tree to easily manage both UI and AI states of your application|
|---|---|
|createStreamableValue|creates a stream that sends values from the server to the client. The value can be any serializable data|
|readStreamableValue|reads a streamable value from the client that was originally created using createStreamableValue|
|createStreamableUI|creates a stream that sends UI from the server to the client|
|useStreamableValue|accepts a streamable value created using createStreamableValue and returns the current value, error, and pending state|

[⬆ back to top](#top)

### Streaming React Components

- `streamUI`
- treamUI function must return a **React component**
- A tool is an object that has:
  - **description**: a string telling the model what the tool does and when to use it
  - **parameters**: a Zod schema describing what the tool needs in order to run
  - **generate**: an asynchronous function that will be run if the model calls the tool. This must return a React component

```ts
const result = await streamUI({
  model: openai('gpt-4o'),
  prompt: 'Get the weather for San Francisco',
  text: ({ content }) => <div>{content}</div>,
  tools: {
    getWeather: {
      description: 'Get the weather for a location',
      parameters: z.object({ location: z.string() }),
      generate: async function* ({ location }) {
        yield <LoadingComponent />;
        const weather = await getWeather(location);
        return <WeatherComponent weather={weather} location={location} />;
      },
    },
  },
});
```

[⬆ back to top](#top)

### Managing <mark>Generative UI State</mark> by using AI and UI State

- State is particularly important in AI applications as it is passed to large language models (LLMs) on each request to ensure they have the necessary context to produce a great generation
- **AI and UI State**
  - <mark>AI State</mark> refers to the state of your application in a serialisable format that will be used on the server and can be shared with the language model
  - <mark>UI State</mark> refers to the state of your application that is rendered on the client. UI state is a list of actual UI elements that are rendered on the client
- Using AI / UI State, building **multistep generative interfaces**
  1. create AI provider: 'app\actions.tsx'
  2. add AI provider to layout: 'app\layout.tsx'
  3. use AI provider in components: 'app\page.tsx'

```ts
//app/actions.tsx
// Define the AI state and UI state types
export type AIState = Array<{
  id?: number;
  name?: 'get_crypto_price' | 'get_crypto_stats';
  role: 'user' | 'assistant' | 'system';
  content: string;
}>;
export type UIState = Array<{
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
  toolInvocations?: ToolInvocation[];   // only for UIState
}>;
export async function sendMessage(message: string): Promise<{
  id: number,
  role: 'user' | 'assistant',
  display: ReactNode;
}> {
  ...
}
// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: { sendMessage },    //must pass Server Actions to the actions object.
});
```

[⬆ back to top](#top)

## using AI SDK RSC in project

- create server action: 'app\actions.tsx'
- create user-defined component:
  - 'components\llm-crypto\price.tsx', ''components\llm-crypto\stats.tsx''
  - showing difference UI of price info and statistic info in chat-list

```ts
//app/actions.tsx
export async function sendMessage(message: string): Promise<{
  id: number,
  role: 'user' | 'assistant',
  display: ReactNode;
}> {
  // 1) Updating AI State on Server with the new user message.
  const history = getMutableAIState<typeof AI>();
  history.update([ ...history.get(),
    { role: 'user', content: message },
  ]);
  // 2) Streaming UI from Server to Client
  const reply = await streamUI({
    model: openai('gpt-4o-2024-05-13'),
    messages: [
      { role: 'system', content, toolInvocations: [] },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage> <Loader2 /> </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done) history.done([...history.get(), { role: 'assistant', content }]);
      return <BotMessage>{content}</BotMessage>;
    },
    temperature: 0.0,
    tools: {
      get_crypto_price: {
        description: 'Get the current price of a given cryptocurrency. Use this to show the price to the user.',
        parameters: z.object({ symbol: z.string().describe('The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL.')}),
        generate: async function* ({ symbol }: { symbol: string; }) {
          yield (<BotCard> <PriceSkeleton /> </BotCard>);
          const stats = await binance.get24hrChangeStatististics({ symbol: `${symbol}USDT` });
          ...
          await sleep(1000);
          history.done([...]);
          return (  // tools must return React.ReactNode
            <BotCard><Price name={symbol} price={price} delta={delta} /></BotCard>
          );
        },
      },
      get_crypto_stats: {
        description: 'Get the current stats of a given cryptocurrency. Use this to show the stats to the user.',
        parameters: z.object({slug: z.string().describe('The full name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana.'),}),
        generate: async function* ({ slug }: { slug: string; }) {
          yield (<BotCard> <StatsSkeleton /> </BotCard>);
          const url = new URL("https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail");
          ...
          const response = await fetch(url, ... });
          if (!response.ok) {
            return <BotMessage>Crypto not found!</BotMessage>;
          }
          const marketStats = {...};
          await sleep(1000);
          history.done([
            ...history.get(),
            {...},
          ]);
          return ( // tools must return React.ReactNode
            <BotCard><Stats {...marketStats} /></BotCard>
          );
        },
      },
    },
  });
  return {
    id: Date.now(),
    role: 'assistant',
    display: reply.value,    // return value
  };
}
// Define the AI state and UI state types
export type AIState = Array<{...}>;
export type UIState = Array<{...}>;
// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: { sendMessage },    //must pass Server Actions to the actions object.
});
```

[⬆ back to top](#top)

## prompt for cryptoCurrency

- 'give me a price of btc'
- 'what is the price of doge?'
- 'give me a price of solana'
- 'give me a price of doge'
- 'give me the stats of ethereum'
- 'give me the stats of solana'
- 'create a steek and modern UI component that shows the statistics of a cryptocurrency, specifically- name,volume, volume change percentage, marketcap, dominance, total supply'

[⬆ back to top](#top)

> References:
- [AI SDK RSC-React Server Components](https://sdk.vercel.ai/docs/ai-sdk-rsc/overview)
- https://github.com/taylor-lindores-reeves/ai-rsc/tree/main
- https://www.youtube.com/watch?v=UIMG1kFiWa4


```html
import { cn } from "@/lib/utils";
import clsx from "clsx";
<div className={clsx("text-3xl font-bold", delta > 0 ? "text-green-500" : "text-red-500")}></div>
<div className={cn('group relative flex items-start md:-ml-12', className)}></div>
<div className={cn("text-lg font-medium", volumeChangePercentage24h > 0 ? "text-green-500" : "text-red-500")}>{volumeChangePercentage24h}%</div>
```
