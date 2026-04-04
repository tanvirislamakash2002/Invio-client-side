import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
  try {
    const cookieStore = await cookies();
    
    const res = await fetch(`${API_URL}/order`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 60 },
    });
    
    const result = await res.json();
    const orders = result.data || [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter((order: any) => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });
    
    const pendingOrders = orders.filter((order: any) => 
      order.status === "PENDING"
    );
    
    const completedOrders = orders.filter((order: any) => 
      order.status === "DELIVERED"
    );
    
    const revenueToday = todayOrders
      .filter((order: any) => order.status === "DELIVERED")
      .reduce((sum: number, order: any) => sum + order.totalPrice, 0);
    
    const productsRes = await fetch(`${API_URL}/products`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    
    const productsResult = await productsRes.json();
    const products = productsResult.data || [];
    
    const lowStockItems = products.filter(
      (product: any) => product.stockQuantity > 0 && product.stockQuantity < product.minStockThreshold
    ).length;
    
    return {
      success: true,
      data: {
        totalOrdersToday: todayOrders.length,
        pendingOrders: pendingOrders.length,
        completedOrders: completedOrders.length,
        lowStockItems,
        revenueToday,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      success: false,
      data: {
        totalOrdersToday: 0,
        pendingOrders: 0,
        completedOrders: 0,
        lowStockItems: 0,
        revenueToday: 0,
      },
    };
  }
},

// Get product summary
getProductSummary: async () => {
  try {
    const cookieStore = await cookies();
    
    const res = await fetch(`${API_URL}/products?limit=10`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 60 },
    });
    
    const result = await res.json();
    const products = result.data || [];
    
    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      stockQuantity: product.stockQuantity,
      minStockThreshold: product.minStockThreshold,
      status: product.status,
    }));
  } catch (error) {
    console.error("Product summary error:", error);
    return [];
  }
},

// Get recent orders
getRecentOrders: async (limit: number = 5) => {
  try {
    const cookieStore = await cookies();
    
    const res = await fetch(`${API_URL}/order?limit=${limit}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 30 },
    });
    
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Recent orders error:", error);
    return [];
  }
},

  // Get recent activities
  getRecentActivities: async (limit: number = 5) => {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${API_URL}/activity?limit=${limit}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 30 },
      });
      
      const result = await res.json();
      return result.data || [];
    } catch (error) {
      console.error("Recent activities error:", error);
      return [];
    }
  },

  // Get revenue data for chart
getRevenueData: async () => {
  try {
    const cookieStore = await cookies();
    
    const res = await fetch(`${API_URL}/order`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { revalidate: 300 },
    });
    
    const result = await res.json();
    const orders = result.data || [];
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dayRevenue = orders
        .filter((order: any) => 
          order.status === "DELIVERED" && 
          new Date(order.createdAt).toDateString() === date.toDateString()
        )
        .reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
      
      last7Days.push({ date: dayStr, revenue: dayRevenue });
    }
    
    return last7Days;
  } catch (error) {
    console.error("Revenue data error:", error);
    return [];
  }
},
};