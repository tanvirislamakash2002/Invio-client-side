"use server";

import { updateTag } from "next/cache";
import { orderService, CreateOrderPayload } from "@/services/order.service";

export const createOrder = async (data: CreateOrderPayload) => {
  const res = await orderService.create(data);
  if (!res.error) updateTag("orders");
  return res;
};

export const getOrders = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return orderService.getAll(params);
};

export const getOrderById = async (id: string) => {
  return orderService.getById(id);
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await orderService.updateStatus(id, status);
  if (!res.error) updateTag("orders");
  return res;
};

export const cancelOrder = async (id: string) => {
  const res = await orderService.cancel(id);
  if (!res.error) updateTag("orders");
  return res;
};