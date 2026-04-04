"use server";

import { productService } from "@/services/product.service";
import { updateTag } from "next/cache";

export const createProduct = async (data: any) => {
  const res = await productService.create(data);
  if (!res.error) updateTag("products"); 
  return res;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await productService.update(id, data);
  if (!res.error) updateTag("products");
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await productService.delete(id);
  if (!res.error) updateTag("products");
  return res;
};

export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: string;
}) => productService.getAll(params);

export const getProductById = async (id: string) => productService.getById(id);

export const getActiveProducts = async () => {
  return productService.getActiveProducts();
};