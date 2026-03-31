"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { updateProduct } from "@/actions/product.action";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    price: z.number().min(0),
    stockQuantity: z.number().min(0),
    minStockThreshold: z.number().min(0),
    status: z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof productSchema>;

interface Props {
    product: FormValues;
    productId: string;
    categories: { id: string; name: string }[];
}

export default function UpdateProductForm({ product, productId, categories }: Props) {
    const router = useRouter();
console.log(product.status);
    const form = useForm({
        defaultValues: { ...product } as FormValues,
        onSubmit: async ({ value }) => {
            const parsed = productSchema.safeParse(value);

            if (!parsed.success) {
                toast.error(parsed.error.issues[0]?.message);
                return;
            }

            const toastId = toast.loading("Updating product...");

            const res = await updateProduct(productId, parsed.data);

            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Product updated", { id: toastId });
                router.push("/products");
            }
        },
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Update Product</h1>

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
                                rows={3}
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
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Stock Quantity */}
                <form.Field name="stockQuantity">
                    {(field) => (
                        <div className="space-y-1">
                            <Label>Stock Quantity</Label>
                            <Input
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Minimum Stock Threshold */}
                <form.Field name="minStockThreshold">
                    {(field) => (
                        <div className="space-y-1">
                            <Label>Minimum Stock Threshold</Label>
                            <Input
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Status */}
                <form.Field name="status">
                    {(field) => (
                        <div className="space-y-1">
                            <Label>Status</Label>
                            <Select
                                value={field.state.value}
                                onValueChange={field.handleChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>

                <Button type="submit" className="w-full">
                    Update Product
                </Button>
            </form>
        </div>
    );
}