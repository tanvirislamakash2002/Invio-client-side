import { TableCell, TableRow } from "@/components/ui/table";
import OrderStatusBadge from "./order-status-badge";
import OrderActions from "./order-actions";

export default function OrderRow({ order }: { order: any }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id}</TableCell>

      <TableCell>
        {order.items?.length || 0}
      </TableCell>

      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell>
        {new Date(order.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell className="text-right">
        <OrderActions order={order} />
      </TableCell>
    </TableRow>
  );
}