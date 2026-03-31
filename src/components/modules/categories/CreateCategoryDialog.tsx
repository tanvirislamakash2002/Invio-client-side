"use client";

import { useState } from "react";
import { createCategory } from "@/actions/category.action";
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

export default function CreateCategoryDialog({user}:{user:any}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!name.trim()) return;

        const res = await createCategory({ name, description }); 

        if (res.error) {
            toast.error(res.error.message);
        } else {
            toast.success("Category created");
            setName("");
            setDescription(""); 
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Category</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="Category description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Button onClick={handleSubmit}
                disabled={!name.trim() || !(user.role === Roles.admin || user.role === Roles.manager)}>Create</Button>
            </DialogContent>
        </Dialog>
    );
}