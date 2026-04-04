import { OrdersClient } from "@/components/modules/orders/orders-client";
import { getOrders } from "@/actions/order.action";
import { Suspense } from "react";

interface PageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const search = params?.search || "";
  const status = params?.status || "";
  const page = parseInt(params?.page || "1");
  const limit = 10;

  const result = await getOrders({ search, status, page, limit });
  
  const initialOrders = result.data?.data || [];
  const initialPagination = result.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Suspense fallback={<div className="text-center py-8">Loading orders...</div>}>
        <OrdersClient 
          initialOrders={initialOrders}
          initialPagination={initialPagination}
        />
      </Suspense>
    </div>
  );
}