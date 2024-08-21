- https://dummyjson.com/



[Data Fetching](#top)

------------------------------------------------------------------

## Data Fetching, Caching, and Revalidating in nextjs

- [Data Fetching, Caching, and Revalidating in nextjs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- On the server
  - with [fetch](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch)
  - with [third-party libraries](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries)
- On the client
  - via a [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
    - supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS HTTP methods
    - Extended [NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request) and [NextResponse](https://nextjs.org/docs/app/api-reference/functions/next-response) APIs
  -  with third-party libraries.

### on the cliet - Prisma+MongoDB CRUD

- Server-side API endpoint --> 'src\app\api\list\route.js'

```ts
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
// POST Request
export async function POST(req) {
  const data = await req.json();
  console.log("data", data);
  try {
    const newList = await prisma.list.create({
      data: {
        title: data.title,
        description: data.description,
      }
    });
    if(newList) {
      return NextResponse.json({
        success: true,
        message: "data created successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
// GET Request
export async function GET() {
  try {
    const allLists = await prisma.list.findMany({
      select: {
        title: true,
        id: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if(allLists) {
      return NextResponse.json({
        success: true,
        data: allLists,
      });
    } else {
      NextResponse.json({ success: false, message: "An error occurred" });
    }
  } catch (error) {
    NextResponse.json({ success: false, message: "An error occurred" });
  }
}
// PUT Request
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const currentListId = searchParams.get("id");
  const data = await req.json();
  try {
    const updatedList = await prisma.list.update({
      where: {
        id: currentListId,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
    if(updatedList) {
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "An error occurred" });
  }
}
// DELETE Request
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const currentListId = searchParams.get("id");
  try {
    const deleteList = await prisma.list.delete({
      where: {
        id: currentListId,
      },
    });
    if(deleteList) {
      return NextResponse.json({
        success: true,
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message:  error.message });
  }
}
```

[⬆ back to top](#top)

### on the server - using in component

- 'src\components\list-box\index.js'
- 'src\components\list-card\index.js'
- 'src\components\list-show\index.js'

```ts
async function handleEdit() {
    try {
      const apiResponse = await fetch(`/api/list?id=${list.id}`, {
        method: "PUT",
        body: JSON.stringify(editData),
      });
      // refresh when click edit button
      const result = await apiResponse.json();
      setOpenListDialog(false);
      if (result?.success) {
        router.refresh("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
```

[⬆ back to top](#top)

## Server Actions and Mutations

- Server Actions are **asynchronous** functions that are executed on the server
- Server Actions can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications
- Server actions can be invoked using the action attribute in a `<form>` element
  - `<form action={actions.createTalent} >`
- Server actions can be invoked as `event handlers` and `useEffect` in Non-form Elements
  -

```ts
//1) src\actions\index.js
"use server";        //must server
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
export async function createTalent(formData) {  //must async
  const name = formData.get("name");
  const email = formData.get("email");
  const title = formData.get("title");
  const skills = formData.get("skills");
  await prisma.talent.create({
    data: {
      title: title,
      name: name,
      email: email,
      skills: skills,
    },
  });
  //cache-> update data when create a talent
  revalidatePath("/");
}

//2) src\components\add-talent\index.js   -- <form> element
// no need to write POST, GET, ...
import * as actions from "@/actions";
<form action={actions.createTalent} >
//...
</form>
//3) Non-form Elements - useEffect
'use client'
import { incrementViews } from './actions'
import { useState, useEffect } from 'react'
export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews)
  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    }
    updateViews()
  }, [])
  return <p>Total Views: {views}</p>
}
//4) Non-form Elements - Event handle
'use client'
import { incrementLike } from './actions'
import { useState } from 'react'
export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  return (
    <>
      <p>Total Likes: {likes}</p>
      <button onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}>Like
      </button>
    </>
  )
}
```

[⬆ back to top](#top)

###

[⬆ back to top](#top)
