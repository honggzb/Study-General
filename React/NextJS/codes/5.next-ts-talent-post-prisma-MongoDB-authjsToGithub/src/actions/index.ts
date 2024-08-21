"use server";
import { PostSchema } from "@/schema";
import { z } from "zod";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function CreatePost(values: z.infer<typeof PostSchema>) {
  const validatedPost = PostSchema.safeParse(values);

  if (!validatedPost.success) {
    return { error: "Invalid Post" };
  }
  const session = await auth();
  if (session?.user) {
    const newPost = await prisma.post.create({
      data: {
        description: validatedPost.data.post as string,
        userId: session.user.id as string,
      },
    });
    revalidatePath("/");
  }
  return {
    success: "Post sent!",
  };
}

export async function DeletePost(formdata: FormData) {
  const postId = formdata.get("postId") as string;
  if (postId) {
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
  revalidatePath("/");
}

export const GetUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
}