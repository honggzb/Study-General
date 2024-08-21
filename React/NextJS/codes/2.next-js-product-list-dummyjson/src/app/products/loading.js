import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div>
      <div className='w-10/12 mx-auto pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
      </div>
      <div className='w-10/12 mx-auto pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
        <Skeleton className="h-[500px] w-[350px] rounded-xl" />
      </div>
    </div>
  )
}

export default Loading