"use client";

import { useState } from "react";
import { deleteProduct } from "@/actions/product.action";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteProductModal({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProduct(productId);
    if (res.error) toast.error(res.error.message);
    else {
      toast.success("Deleted");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}