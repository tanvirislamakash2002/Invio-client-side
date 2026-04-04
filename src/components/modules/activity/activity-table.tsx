"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Package,
  RefreshCw,
  Ban,
  PenSquare,
  BarChart3,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

interface Activity {
  id: string;
  action: string;
  description: string;
  entityType: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  order: {
    orderNumber: string;
  } | null;
}

interface ActivityTableProps {
  activities: Activity[];
}

const entityTypeColors: Record<string, string> = {
  ORDER: "bg-blue-100 text-blue-800",
  PRODUCT: "bg-green-100 text-green-800",
  CATEGORY: "bg-purple-100 text-purple-800",
  RESTOCK: "bg-orange-100 text-orange-800",
  USER: "bg-gray-100 text-gray-800",
};

const actionIcons: Record<string, React.ReactNode> = {
  ORDER_CREATED: <Package className="h-4 w-4" />,
  ORDER_STATUS_UPDATED: <RefreshCw className="h-4 w-4" />,
  ORDER_CANCELLED: <Ban className="h-4 w-4" />,
  ORDER_UPDATED: <PenSquare className="h-4 w-4" />,
  STOCK_UPDATED: <BarChart3 className="h-4 w-4" />,
  RESTOCK_ADDED: <PlusCircle className="h-4 w-4" />,
};

export function ActivityTable({ activities }: ActivityTableProps) {
  const getEntityTypeBadge = (entityType: string) => {
    return (
      <Badge className={entityTypeColors[entityType] || "bg-gray-100"}>
        {entityType}
      </Badge>
    );
  };

  const getActionIcon = (action: string) => {
    return actionIcons[action] || <ClipboardList className="h-4 w-4" />;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="whitespace-nowrap">
                {format(new Date(activity.createdAt), "MMM d, h:mm a")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {getActionIcon(activity.action)}
                  </span>
                  <span>{activity.description}</span>
                </div>
              </TableCell>
              <TableCell>{getEntityTypeBadge(activity.entityType)}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{activity.user.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {activity.order && (
                  <span className="text-sm font-mono">
                    #{activity.order.orderNumber}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {activities.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No activities found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}