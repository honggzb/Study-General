"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createTalent(formData) {
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

export async function deleteTalent(formData) {
  const inputID = formData.get("inputID");
  await prisma.talent.delete({
    where: {
      id: inputID,
    },
  });
  revalidatePath("/");
}

export async function editTalent(formData) {
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