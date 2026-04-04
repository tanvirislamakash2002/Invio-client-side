import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export interface RestockQueueItem {
  id: string;
  productId: string;
  currentStock: number;
  threshold: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  priorityLabel: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    minStockThreshold: number;
    status: string;
    category: {
      id: string;
      name: string;
    };
  };
}

export const restockService = {
  // Get all restock queue items
  getAll: async (page: number = 1, limit: number = 20) => {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${API_URL}/restock?page=${page}&limit=${limit}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["restock"] },
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        return { data: null, error: { message: result.message }, pagination: null };
      }
      const data = result.data?.data || result.data || [];
    const pagination = result.data?.pagination || result.pagination || null;
      return { 
        data: data, 
        error: null, 
        pagination: pagination  
      };
    } catch (error) {
      console.error("Fetch restock queue error:", error);
      return { data: null, error: { message: "Failed to fetch restock queue" }, pagination: null };
    }
  },

  // Restock a product
  restock: async (productId: string, quantity: number) => {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${API_URL}/restock/${productId}/restock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ quantity }),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }
      
      return { data: result.data, error: null };
    } catch (error) {
      console.error("Restock error:", error);
      return { data: null, error: { message: "Failed to restock product" } };
    }
  },

  // Remove from restock queue
  remove: async (productId: string) => {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${API_URL}/restock/${productId}`, {
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
    } catch (error) {
      console.error("Remove from queue error:", error);
      return { data: null, error: { message: "Failed to remove from queue" } };
    }
  },
};