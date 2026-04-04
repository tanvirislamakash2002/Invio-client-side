"use server";

import { updateTag } from "next/cache";
import { restockService } from "@/services/restock.service";

export const getRestockQueue = async (page: number = 1, limit: number = 20) => {
  return await restockService.getAll(page, limit);
};

export const restockProduct = async (productId: string, quantity: number) => {
  const res = await restockService.restock(productId, quantity);
  if (!res.error) {
    updateTag("restock");
    updateTag("products");
  }
  return res;
};

export const removeFromRestockQueue = async (productId: string) => {
  const res = await restockService.remove(productId);
  if (!res.error) {
    updateTag("restock");
  }
  return res;
};