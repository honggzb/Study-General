[有用的和常用的](#top)

- [shadcn for Next.js](#shadcn-for-nextjs)
- [Prisma setup](#prisma-setup)
- [Prisma+MongoDB CRUD](#prismamongodb-crud)

## shadcn for Next.js

- [shadcn for Next.js](https://ui.shadcn.com/docs/installation/next)
- `npx shadcn-ui@latest init`
- `npx shadcn-ui@latest add card input label dialog`

## Prisma setup

- [prisma-Add to existing project-MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb)
  1. `npm install prisma --save-dev`
  2.  `npx prisma`  <-- invoke the Prisma CLI
  3.  `npx prisma init`
      1.  creates a new directory called 'prisma' that contains a file called 'schema.prisma'
      2.  creates the '.env' file in the root directory of the project
  4. Connecting database, modify 'prisma/schema.prisma'
  5. `npx prisma generate`
     1. Environment variables loaded from '.env'
     2. Prisma schema loaded from 'prisma\schema.prisma'
  6. `npm install @prisma/client`
  7. create 'src\utils\prisma.js' file

```ts
//src\utils\prisma.js
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

## Prisma+MongoDB CRUD- server side

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

## Prisma+MongoDB CRUD in client component

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
