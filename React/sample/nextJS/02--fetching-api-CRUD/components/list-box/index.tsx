"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ListBox = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

async function handleSubmit() {
  try {

    const apiResponse = await fetch("http://localhost:3000/api/list", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const result = await apiResponse.json();
    // caching result
    if (result?.success) {
        router.refresh();
      }
    console.log(result);

  } catch (error) {
    console.log("error", error);
  }
}

return (
    <div className='mt-12'>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='flex flex-col gap-4'>

        <label htmlFor="title" className='font-bold'>Title</label>
        <input
          value={formData.title}
          onChange={ (e) => setFormData({ ...formData, title: e.target.value }) }
          type="text" name="title"
          className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-200 border-gray-600 placeholder-gray-600 text-black" />

        <label htmlFor="description" className='font-bold'>Description</label>
        <textarea name="description"
          onChange={ (e) => setFormData({ ...formData, description: e.target.value }) }
          value={formData.description}
          className="h-24 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-200 border-gray-600 placeholder-gray-600 text-black" />

        <button type='submit' className="px-6 my-4 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-500 border-gray-600 placeholder-gray-400 text-white">Create</button>
      </form>
    </div>
  )
}

export default ListBox
