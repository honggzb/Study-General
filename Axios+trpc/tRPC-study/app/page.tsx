"use client";

import { useQuery } from "@tanstack/react-query";
import Todolist from "./components/todolist";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const trpc = useTRPC();
  const todolists =  useQuery(trpc.getTodos.queryOptions());
  return (
    <main className="max-w-3xl mx-auto mt-5">
        <Todolist initialTodos={todolists.data} />
    </main>
  );
}
