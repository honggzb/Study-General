import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

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