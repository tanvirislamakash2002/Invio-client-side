export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface CreateCustomerPayload {
  name: string;
  email?: string;
  phone?: string;
}

export interface GetCustomersParams {
  search?: string;
  page?: number;
  limit?: number;
}

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const getCustomers = async (params: GetCustomersParams = {}) => {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());

  try {
    const res = await fetch(`${API_URL}/customer?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    return await res.json();
  } catch (error: any) {
    return { error };
  }
};

export const createCustomerIfNotExist = async (payload: CreateCustomerPayload) => {
  try {
    const res = await fetch(`${API_URL}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to create customer");
    }

    return await res.json();
  } catch (error: any) {
    return { error };
  }
};