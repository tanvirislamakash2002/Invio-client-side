import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export type CreateOrderPayload = {
  customer: {
    name: string;
    email?: string;
    phone?: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
};

export const orderService = {
  // Create Order
  create: async (data: CreateOrderPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
console.log('order ser------------', res);
      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.error || result.message } };
      }

      return { data: result.data || result.order, error: null };
    } catch (error) {
      console.error("Order creation error:", error);
      return { data: null, error: { message: "Order creation failed" } };
    }
  },

  // Get all orders with filters
  getAll: async (params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const cookieStore = await cookies();
      const query = new URLSearchParams();
      
      if (params?.search) query.append("search", params.search);
      if (params?.status) query.append("status", params.status);
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());

      const url = `${API_URL}/order${query.toString() ? `?${query.toString()}` : ""}`;

      const res = await fetch(url, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders"] },
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data || result, error: null };
    } catch (error) {
      console.error("Fetch orders error:", error);
      return { data: null, error: { message: "Fetch orders failed" } };
    }
  },

  // Get single order
  getById: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/${id}`, {
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
    } catch (error) {
      console.error("Fetch order error:", error);
      return { data: null, error: { message: "Fetch order failed" } };
    }
  },

  // Update order status
  updateStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.error || result.message } };
      }

      return { data: result.data, error: null };
    } catch (error) {
      console.error("Update status error:", error);
      return { data: null, error: { message: "Update failed" } };
    }
  },

  // Cancel order
  cancel: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/order/${id}/cancel`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.error || result.message } };
      }

      return { data: result.data, error: null };
    } catch (error) {
      console.error("Cancel order error:", error);
      return { data: null, error: { message: "Cancel failed" } };
    }
  },
};