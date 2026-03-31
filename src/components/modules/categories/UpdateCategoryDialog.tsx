"use client";

import { useState } from "react";
import { updateCategory } from "@/actions/category.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Roles } from "@/constants/roles";

export default function UpdateCategoryDialog({ category, userRole }: any) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");

  const handleUpdate = async () => {
    if (!name.trim()) return;

    const res = await updateCategory(category.id, { name, description });

    if (res.error) toast.error(res.error.message);
    else {
      toast.success("Category updated");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!(userRole === Roles.admin || userRole === Roles.manager)}>
          Update
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Category description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />

        <Button onClick={handleUpdate} disabled={!name.trim()}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}