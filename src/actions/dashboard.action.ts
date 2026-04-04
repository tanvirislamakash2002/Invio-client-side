"use server";

import { dashboardService } from "@/services/dashboard.service";

export const getDashboardStats = async () => {
  return await dashboardService.getStats();
};

export const getProductSummary = async () => {
  return await dashboardService.getProductSummary();
};

export const getRecentOrders = async (limit: number = 5) => {
  return await dashboardService.getRecentOrders(limit);
};

export const getRecentActivities = async (limit: number = 5) => {
  return await dashboardService.getRecentActivities(limit);
};

export const getRevenueData = async () => {
  return await dashboardService.getRevenueData();
};