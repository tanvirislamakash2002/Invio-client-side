"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/product.action";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  price: z.number().min(0),
  stockQuantity: z.number().min(0),
  minStockThreshold: z.number().min(0)
});

type FormValues = z.infer<typeof productSchema>;

export default function AddProductForm({
  categories,
}: {
  categories: any[];
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      stockQuantity: 0,
      minStockThreshold: 5
    } as FormValues,

    onSubmit: async ({ value }) => {
      const parsed = productSchema.safeParse(value);

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message);
        return;
      }

      const toastId = toast.loading("Creating product...");

      const res = await createProduct(parsed.data);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Product created", { id: toastId });
        router.push("/products");
      }
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <div className="space-y-1">
              <Label>Product Name</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-1">
              <Label>Description</Label>
              <textarea
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full rounded-md border dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-white/4"
                rows={4}
              />
            </div>
          )}
        </form.Field>
        {/* Category */}
        <form.Field name="categoryId">
          {(field) => (
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Price */}
        <form.Field name="price">
          {(field) => (
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value))
                }
              />
            </div>
          )}
        </form.Field>

        {/* Stock */}
        <form.Field name="stockQuantity">
          {(field) => (
            <div className="space-y-1">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value))
                }
              />
            </div>
          )}
        </form.Field>

        {/* Threshold */}
        <form.Field name="minStockThreshold">
          {(field) => (
            <div className="space-y-1">
              <Label>Minimum Stock Threshold</Label>
              <Input
                type="number"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value))
                }
              />
            </div>
          )}
        </form.Field>

        <Button type="submit" className="w-full">
          Create Product
        </Button>
      </form>
    </div>
  );
}