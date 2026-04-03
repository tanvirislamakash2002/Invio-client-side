import { getOrders } from "@/actions/order.action";
import OrderTable from "@/components/modules/orders/orders-table";

export default async function OrdersPage() {
  const { data: orders } = await getOrders();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <OrderTable orders={orders || []} />
    </div>
  );
}