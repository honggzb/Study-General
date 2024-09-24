"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function continueConversation(messages) {
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });
  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
