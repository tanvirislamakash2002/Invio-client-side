"use server"; 

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export type CreateOrderPayload = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export const orderService = {
  // Create Order
  create: async (data: CreateOrderPayload) => {
    try {
      const cookieStore = cookies(); 

      const res = await fetch(`${API_URL}/order`, {
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
      return { data: null, error: { message: "Order creation failed" } };
    }
  },

  // Get all orders
  getAll: async () => {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${API_URL}/order`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders"] },
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Fetch orders failed" } };
    }
  },

  // Get single order
  getById: async (id: string) => {
    try {
      const cookieStore = cookies();

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
    } catch {
      return { data: null, error: { message: "Fetch order failed" } };
    }
  },

  // Update order status (admin/manager)
  updateStatus: async (id: string, status: string) => {
    try {
      const cookieStore = cookies();

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
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch {
      return { data: null, error: { message: "Update failed" } };
    }
  },
};