import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from 'better-sqlite3';
import { todos } from '@/db/schema';

const sqlite =new Database('sqlite.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getTodos: baseProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  addTodo: baseProcedure
    .input(z.string())
    .mutation(async (opts) => {
      await db.insert(todos).values({ content: opts.input, done: 0 }).run();
      return true;
    }),
  setDone: baseProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      }),
    )
    .mutation(async (opts) => {
      await db.update(todos).set({ done: opts.input.done }).where(todos.id.eq(opts.input.id)).run();
      return true;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;