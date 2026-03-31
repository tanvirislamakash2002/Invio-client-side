"use client";

import { useState } from "react";
import { updateCategory } from "@/actions/category.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdateCategoryDialog({ category, userRole: user }: any) {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description || "");

    const handleUpdate = async () => {
        const res = await updateCategory(category.id, { name, description });

        if (res.error) {
            toast.error(res.error.message);
        } else {
            toast.success("Updated");
        }
    };

    return (
        <div className="flex gap-2">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <Input
                placeholder="Category description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleUpdate}
                disabled={!name.trim() || !(user.role === "admin" || user.role === "manager")}>Update</Button>
        </div>
    );
}