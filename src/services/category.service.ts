import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
    getCategories: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories`, {
                method: "GET",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["categories"] }
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message } };
            }

            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Failed to fetch categories" } };
        }
    },

    createCategory: async (payload: { name: string; description?: string }) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message } };
            }

            return { data: data.data, error: null };
        } catch {
            return { data: null, error: { message: "Create failed" } };
        }
    },

    updateCategory: async (id: string, payload: { name: string; description?: string }) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message } };
            }

            return { data: data.data, error: null };
        } catch {
            return { data: null, error: { message: "Update failed" } };
        }
    },

    deleteCategory: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message } };
            }

            return { data: true, error: null };
        } catch {
            return { data: null, error: { message: "Delete failed" } };
        }
    },
};