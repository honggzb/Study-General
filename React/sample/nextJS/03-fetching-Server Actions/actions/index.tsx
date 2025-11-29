"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTalent(formData: FormData) {
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

  revalidatePath("/");
}

//
export async function editTalent(formData: FormData) {
  const newName = formData.get("name");
  const newTitle = formData.get("title");
  const newEmail = formData.get("email");
  const newSkills = formData.get("skills");
  const inputID = formData.get("inputID");

  await prisma.talent.update({
    where: {
      id: inputID,
    },
    data: {
      title: newTitle,
      name: newName,
      email: newEmail,
      skills: newSkills,
    },
  });
  revalidatePath("/");
}

//
export async function deleteTalent(formData) {
  const inputID = formData.get("inputID");

  await prisma.talent.delete({
    where: {
      id: inputID,
    },
  });

  revalidatePath("/");
}