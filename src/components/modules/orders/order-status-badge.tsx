import { Badge } from "@/components/ui/badge";

export default function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-500",
    PROCESSING: "bg-blue-500",
    COMPLETED: "bg-green-600",
    CANCELLED: "bg-red-500",
  };

  return (
    <Badge className={`${map[status] || "bg-gray-500"} text-white`}>
      {status}
    </Badge>
  );
}