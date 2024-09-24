"use client";

import { useState } from "react";
import { continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";

export const maxDuration = 30;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      <form onSubmit={ async e => {
          e.preventDefault();
          const newMessages = [...messages, { content: input, role: 'user'}];
          setMessages(newMessages);
          setInput('');
          const result = await continueConversation(newMessages);
          for await(const content of readStreamableValue(result)) {
            setMessages([
              ...newMessages,
              { role: 'assistant', content: content }
            ]);
          }
        }
      }>
        <input
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.target.value)} />
      </form>
    </main>
  );
}
