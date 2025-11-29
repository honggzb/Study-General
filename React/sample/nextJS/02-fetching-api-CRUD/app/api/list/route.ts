import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { success } from "zod";

export async function POST(request: Request) {

  const data = await request.json();

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

  return NextResponse.json({ created: true });
}


export async function GET() {
  try {
    const allLists = await prisma.list.findMany({
      select: {
        title: true,
        id: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    if(allLists) {
      return NextResponse.json({
        success: true,
        data: allLists,
      })
    } else {
      NextResponse.json({ success: false, message: "An error occurred" });
    }

  } catch (error) {
    NextResponse.json({ success: false, message: "An error occurred" });
  }
}

//
export async function PUT(req: Request) {
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
      }
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

//
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const currentListId = searchParams.get("id");

  try {
    const deleteList = await prisma.list.delete({
      where: {
        id: currentListId,
      },
    });
    if (deleteList) {
      return NextResponse.json({
        success: true,
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}