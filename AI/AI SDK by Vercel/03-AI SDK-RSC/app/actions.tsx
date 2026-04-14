"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { CoreMessage, ToolInvocation } from 'ai';
import { ReactNode } from "react";
import { openai } from '@ai-sdk/openai';
import { BotCard, BotMessage } from "@/components/llm-crypto/message";
import { Loader2 } from "lucide-react";
import { z } from 'zod';
import { MainClient } from 'binance';
import { Price } from "@/components/llm-crypto/price";
import { StatsSkeleton } from "@/components/llm-crypto/stats-skeleton";
import { PriceSkeleton } from "@/components/llm-crypto/price-skeleton";
import { Stats } from "@/components/llm-crypto/stats";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const binance = new MainClient({
  api_key: process.env.BINANCE_API_KEY,
  api_secret: process.env.BINANCE_API_SECRET,
});

const content = `\
You are a crypto bot and you can help users get the prices of cryptocurrencies.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of BTC = 69000]" means that the interface of the cryptocurrency price of BTC is shown to the user.

If the user wants the price, call \`get_crypto_price\` to show the price.
If the user wants the market cap or other stats of a given cryptocurrency, call \`get_crypto_stats\` to show the stats.
If the user wants a stock price, it is an impossible task, so you should respond that you are a demo and cannot do that.
If the user wants to do anything else, it is an impossible task, so you should respond that you are a demo and cannot do that.

Besides getting prices of cryptocurrencies, you can also chat with users.
`;

export async function sendMessage(message: string): Promise<{
  id: number,
  role: 'user' | 'assistant',
  display: ReactNode;
}> {

  const history = getMutableAIState<typeof AI>();
  //Updating AI State on Server with the new user message.
  history.update([
    ...history.get(),
    {                           //new message
      role: 'user',
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: openai('gpt-4o-2024-05-13'),
    messages: [
      {
        role: 'system',
        content,
        toolInvocations: []
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done) history.done([...history.get(), { role: 'assistant', content }]);
      return <BotMessage>{content}</BotMessage>;
    },
    temperature: 0.0,
    tools: {
      get_crypto_price: {
        description: 'Get the current price of a given cryptocurrency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z.string().describe('The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL.'),
        }),
        generate: async function* ({ symbol }: { symbol: string; }) {
          console.log("get_crypto_price", symbol);
          yield (
            <BotCard>
              <PriceSkeleton />
            </BotCard>
          );
          const stats = await binance.get24hrChangeStatististics({ symbol: `${symbol}USDT` });
          const price = Number(stats.lastPrice);  // get the last price
          const delta = Number(stats.priceChange);   // extract the delta
          await sleep(1000);
          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'get_crypto_price',
              content: `[Price of ${symbol} = ${price}]`,
            },
          ]);
          //return null;
          return (
            <BotCard>
              <Price name={symbol} price={price} delta={delta} />
            </BotCard>
          );
        },
      },
      get_crypto_stats: {
        description: 'Get the current stats of a given cryptocurrency. Use this to show the stats to the user.',
        parameters: z.object({
          slug: z.string().describe('The full name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana.'),
        }),
        generate: async function* ({ slug }: { slug: string; }) {
          yield (
            <BotCard>
              <StatsSkeleton />
            </BotCard>
          );
          const url = new URL("https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail");
          // set the query params which are required
          url.searchParams.append("slug", slug);
          url.searchParams.append("limit", "1");
          url.searchParams.append("sortBy", "market_cap");
          const response = await fetch(url, {
            headers: {    // set the headers
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
            }
          });
          if (!response.ok) {
            return <BotMessage>Crypto not found!</BotMessage>;
          }
          const res = await response.json() as {
            data: {
              id: number;
              name: string;
              symbol: string;
              volume: number;
              volumeChangePercentage24h: number;
              statistics: {
                rank: number;
                totalSupply: number;
                marketCap: number;
                marketCapDominance: number;
              },
            };
          };
          const data = res.data;
          const stats = res.data.statistics;
          const marketStats = {
            name: data.name,
            volume: data.volume,
            volumeChangePercentage24h: data.volumeChangePercentage24h,
            rank: stats.rank,
            marketCap: stats.marketCap,
            totalSupply: stats.totalSupply,
            dominance: stats.marketCapDominance,
          };
          await sleep(1000);
          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'get_crypto_price',
              content: `[Stats of ${data.symbol}]`,
            },
          ]);
          return (
            <BotCard>
              <Stats {...marketStats} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    role: 'assistant',
    display: reply.value,
  };

}

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
  toolInvocations?: ToolInvocation[];
}>;

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: { sendMessage },
});
