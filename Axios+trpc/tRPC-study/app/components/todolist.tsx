"use client";

import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Todolist = ({initialTodos}: {initialTodos: any[]}) => {

  const trpc = useTRPC();
  const todolists =  useQuery(trpc.getTodos.queryOptions(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));
  const addTodo = useMutation(trpc.addTodo.mutationOptions({
    onSettled: () => {
      todolists.refetch();
    }
  }));
  const setDone = useMutation(trpc.setDone.mutationOptions({
    onSettled: () => {
      todolists.refetch();
    }
  }));
  const [content, setContent] = useState('');

  return (
    <>
      {/* <div>{JSON.stringify(todolists.data)}</div> */}
      <div>
        <div className="text-black my-5 text-xl">
        {todolists?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.1 }}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: todo.done ? 0 : 1,
                });
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="content">Content</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
          />
          <button
            onClick={ async () => {
              if(content.length){
                  await addTodo.mutateAsync(content);
                  setContent('');
              }
              addTodo.mutateAsync(content);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
              Add Todo
          </button>
        </div>

        <hr />
        <ul>
          {todolists.data?.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Todolist