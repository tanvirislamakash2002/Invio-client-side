import { customerAction } from "@/actions/customer.action";
import NewOrderForm from "@/components/modules/orders/NewOrderForm";


export const metadata = {
  title: "Create New Order",
};

export default async function NewOrderPage() {
  // Fetch customers server-side
  const { data: customers = [], error } = await customerAction.getCustomers();

  if (error) return <p className="text-red-500">Failed to load customers</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Order</h1>
      <NewOrderForm customers={customers} />
    </div>
  );
}