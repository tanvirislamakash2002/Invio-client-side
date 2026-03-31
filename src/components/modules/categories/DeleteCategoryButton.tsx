"use client";

import { deleteCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteCategoryButton({ id }: { id: string }) {
    const handleDelete = async () => {
        const res = await deleteCategory(id);

        if (res.error) {
            toast.error(res.error.message);
        } else {
            toast.success("Deleted");
        }
    };

    return (
        <Button variant="destructive" onClick={handleDelete}>
            Delete
        </Button>
    );
}