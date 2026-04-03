"use client";

import { updateOrderStatus } from "@/actions/order.action";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderActions({ order }: { order: any }) {
  const handleChange = async (status: string) => {
    const toastId = toast.loading("Updating...");

    const res = await updateOrderStatus(order.id, status);

    if (res.error) {
      toast.error(res.error.message, { id: toastId });
    } else {
      toast.success("Updated", { id: toastId });
    }
  };

  return (
    <Select defaultValue={order.status} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Change" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="PROCESSING">Processing</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}