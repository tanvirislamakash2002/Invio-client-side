import { Metadata } from "next";
import { OrderForm } from "@/components/modules/orders/order-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Order - Inventory Management",
  description: "Create a new customer order",
};

export default async function CreateOrderPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create New Order</h1>
          <p className="text-muted-foreground mt-1">
          </p>
        </div>
      </div>

      {/* Order Form */}
      <OrderForm />
    </div>
  );
}