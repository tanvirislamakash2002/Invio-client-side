import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export interface Activity {
  id: string;
  action: string;
  description: string;
  entityType: string;
  entityId: string;
  userId: string;
  orderId: string | null;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  order: {
    orderNumber: string;
  } | null;
}

export const activityService = {
  // Get recent activities (for dashboard)
  getRecent: async (limit: number = 10) => {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${API_URL}/activity?limit=${limit}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 30 },
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }
      
      return { data: result.data, error: null };
    } catch (error) {
      console.error("Fetch recent activities error:", error);
      return { data: null, error: { message: "Failed to fetch activities" } };
    }
  },

  // Get all activities with pagination and filters
  getAll: async (params: {
    page?: number;
    limit?: number;
    entityType?: string;
    action?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const cookieStore = await cookies();
      const query = new URLSearchParams();
      
      if (params.page) query.append("page", params.page.toString());
      if (params.limit) query.append("limit", params.limit.toString());
      if (params.entityType) query.append("entityType", params.entityType);
      if (params.action) query.append("action", params.action);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);
      
      const url = `${API_URL}/activity/all${query.toString() ? `?${query.toString()}` : ""}`;
      
      const res = await fetch(url, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 30 },
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        return { data: null, error: { message: result.message }, pagination: null };
      }
      
      return { 
        data: result.data, 
        error: null, 
        pagination: result.pagination 
      };
    } catch (error) {
      console.error("Fetch activities error:", error);
      return { data: null, error: { message: "Failed to fetch activities" }, pagination: null };
    }
  },
};