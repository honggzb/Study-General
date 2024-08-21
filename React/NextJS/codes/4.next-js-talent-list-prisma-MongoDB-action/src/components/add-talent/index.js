import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as actions from "@/actions";

const AddTalent = () => {
  return (
    <div className="w-full mt-8">
      <form action={actions.createTalent} className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" />
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" />
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" />
        <Label htmlFor="skills">Skills</Label>
        <textarea
          type="text" name="skills"
          className="w-full font-normal outline outline-0 transition-all border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        ></textarea>
        <Button>Submit</Button>
      </form>
      </div>
  )
}

export default AddTalent