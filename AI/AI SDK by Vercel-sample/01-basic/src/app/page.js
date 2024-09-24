"use client";

import { useChat } from "ai/react";

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {messages.map(m => <div key={m.id}>
        {m.role === "user" ? "User: " : "AI: "}
        {m.content}
      </div>)}

      {isLoading && (
        <div><h1>Loading...</h1></div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="What to do where"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </main>
  );
}
