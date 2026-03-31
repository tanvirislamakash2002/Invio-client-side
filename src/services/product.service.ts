import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

type CreateProductPayload = {
  name: string;
  description?: string;
  categoryId: string;
  price: number;
  stockQuantity: number;
  minStockThreshold: number;
};

type UpdateProductPayload = Partial<CreateProductPayload>;

export const productService = {
  // Create a new product
  create: async (data: CreateProductPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Create failed" } };
    }
  },

  // Update existing product
  update: async (id: string, data: UpdateProductPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/products/${id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Update failed" } };
    }
  },

  // Delete a product
  delete: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Delete failed" } };
    }
  },

  // Get all products
  getAll: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/products`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["products"] },
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Fetch failed" } };
    }
  },

  // Get product by ID
  getById: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/products/${id}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["products"] },
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Fetch failed" } };
    }
  },
}

