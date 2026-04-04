"use server";

import { activityService } from "@/services/activity.service";

export const getRecentActivities = async (limit: number = 10) => {
  return await activityService.getRecent(limit);
};

export const getAllActivities = async (params: {
  page?: number;
  limit?: number;
  entityType?: string;
  action?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  return await activityService.getAll(params);
};