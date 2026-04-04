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
  status?: string;  // ← Added status field
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

  // Get all products with pagination and filters
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    status?: string;
  }) => {
    try {
      const cookieStore = await cookies();
      const query = new URLSearchParams();
      
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.search) query.append("search", params.search);
      if (params?.categoryId) query.append("categoryId", params.categoryId);
      if (params?.status) query.append("status", params.status);

      const url = `${API_URL}/products${query.toString() ? `?${query.toString()}` : ""}`;

      const res = await fetch(url, {
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
  getActiveProducts: async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/products?status=ACTIVE`, {
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
};