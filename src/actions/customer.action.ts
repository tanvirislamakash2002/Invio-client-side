import { createCustomerIfNotExist, CreateCustomerPayload, Customer, getCustomers } from "@/services/customer.service";


export const customerAction = {
  getCustomers: async (search?: string, page = 1, limit = 10) => {
    return await getCustomers({ search, page, limit });
  },

  findOrCreateCustomer: async (payload: CreateCustomerPayload): Promise<{ data?: Customer; error?: any }> => {
    return await createCustomerIfNotExist(payload);
  }
};