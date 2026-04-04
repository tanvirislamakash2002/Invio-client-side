"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Ban, Truck, PackageCheck, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: string) => void;
  onCancel: (orderId: string) => void;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <PackageCheck className="h-3 w-3" />,
  CONFIRMED: <CheckCircle className="h-3 w-3" />,
  SHIPPED: <Truck className="h-3 w-3" />,
  DELIVERED: <PackageCheck className="h-3 w-3" />,
  CANCELLED: <Ban className="h-3 w-3" />,
};

export function OrderTable({ orders, onView, onUpdateStatus, onCancel }: OrderTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    await onUpdateStatus(orderId, status);
    setUpdatingId(null);
  };

  const handleCancel = async (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setUpdatingId(orderId);
      await onCancel(orderId);
      setUpdatingId(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={statusColors[order.status]}>
                  <span className="flex items-center gap-1">
                    {statusIcons[order.status]}
                    {order.status}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(order)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                      <>
                        {order.status === "PENDING" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Confirmed
                          </DropdownMenuItem>
                        )}
                        {order.status === "CONFIRMED" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "SHIPPED")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status === "SHIPPED" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "DELIVERED")}>
                            <PackageCheck className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleCancel(order.id)}
                          className="text-red-600"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Cancel Order
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}