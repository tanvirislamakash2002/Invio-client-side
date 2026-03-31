"use server";

import { updateTag } from "next/cache";
import { categoryService } from "@/services/category.service";

// Get all categories
export const getCategories = async () => {
    return await categoryService.getCategories();
};

// Create category (name + optional description)
export const createCategory = async (payload: { name: string; description?: string }) => {
    const res = await categoryService.createCategory(payload);

    if (!res.error) updateTag("categories");

    return res;
};

// Update category (name + optional description)
export const updateCategory = async (id: string, payload: { name: string; description?: string }) => {
    const res = await categoryService.updateCategory(id, payload);

    if (!res.error) updateTag("categories");

    return res;
};

// Delete category
export const deleteCategory = async (id: string) => {
    const res = await categoryService.deleteCategory(id);

    if (!res.error) updateTag("categories");

    return res;
};