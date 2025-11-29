"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ListCard = ({list}) => {

  const router = useRouter();
  const [openListDialog, setOpenListDialog] = useState(false);
  const [editData, setEditData] = useState({
    title: list.title,
    description: list.description,
  });

  async function handleEdit() {
    try {
      const apiResponse = await fetch(`http://localhost:3000/api/list?id=${list.id}`, {
        method: "PUT",
        body: JSON.stringify(editData),
      });
      const result = await apiResponse.json();
      setOpenListDialog(false);
      if (result?.success) {
        router.refresh("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleDelete() {
    try {
      const apiResponse = await fetch(`http://localhost:3000/api/list?id=${list.id}`, {
        method: "DELETE",
      });

      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Card className="w-[300px] h-auto bg-gray-200 text-black">
      <CardHeader>
        <CardTitle>{list?.title}</CardTitle>
        <CardDescription>{list?.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpenListDialog(true)}>
          Edit
        </Button>
        <Dialog open={openListDialog}>
          <DialogContent className="sm:max-w-[425px] bg-gray-200">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  value={editData.title}
                  id="title"
                  className=" col-span-3 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-200 border-gray-600 placeholder-gray-400 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <textarea
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  value={editData.description}
                  id="description"
                  className=" col-span-3 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-200 border-gray-00 placeholder-gray-400 text-black"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleEdit()}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={() => handleDelete()}>
          Delete
        </Button>
      </CardContent>
    </Card>
  )
}

export default ListCard
