"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as actions from "@/actions";

const ShowTalent = ({ talentData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: talentData.name,
    email: talentData.email,
    title: talentData.title,
    skills: talentData.skills,
  });

  return (
    <Card className="w-[300px] h-[330px]">
      <CardHeader>
        <CardTitle className="text-4xl">{talentData.name}</CardTitle>
        <CardDescription>{talentData.title}</CardDescription>
        <CardDescription>{talentData.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{talentData.skills}</p>
        <div className="flex gap-4 my-4">
          <form action={actions.deleteTalent}>
            <input type="hidden" name="inputID" value={talentData.id} />
            <button className="bg-red-500 px-6 py-2 rounded text-white">
              Delete
            </button>
          </form>
          {/* Dialog */}
          {/* Edit */}
          <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <form action={actions.editTalent}>
                  <div className="w-full gap-4 py-4">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="name" className="text-gray-500 ml-2">Name</Label>
                      <Input
                        onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value }) }
                        type="text"
                        name="name"
                        value={updatedData.name}
                        placeholder={updatedData.name}></Input>
                      <Label htmlFor="email" className="text-gray-500 ml-2">Email</Label>
                      <Input
                        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value }) }
                        type="text"
                        name="email"
                        value={updatedData.email}
                        placeholder={updatedData.email}></Input>
                      <Label htmlFor="title" className="text-gray-500 ml-2">Title</Label>
                      <Input
                        onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value }) }
                        type="text"
                        name="title"
                        value={updatedData.title}
                        placeholder={updatedData.title}></Input>
                      <Label htmlFor="skills" className="text-gray-500 ml-2">Skills</Label>
                      <textarea
                        onChange={(e) => setUpdatedData({ ...updatedData, skills: e.target.value }) }
                        type="text"
                        name="skills"
                        value={updatedData.skills}
                        placeholder={updatedData.skills}
                        className="w-full font-normal outline outline-0 focus:outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900">
                      </textarea>
                      <Input type="hidden" name="inputID" value={talentData.id} ></Input>
                    </div>
                  </div>
                  <Button type="submit" onClick={() => setOpenDialog(false)}>
                    Save changes
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* Hire Button */}
        <Link className="bg-blue-500 px-6 py-2 rounded text-white" href={`mailto:${talentData.email}`}>
          Hire Me
        </Link>
      </CardContent>
    </Card>
  )
}

export default ShowTalent