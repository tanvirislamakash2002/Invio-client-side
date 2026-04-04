export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
  };
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderPayload {
  customer: {
    name: string;
    email?: string;
    phone?: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
}