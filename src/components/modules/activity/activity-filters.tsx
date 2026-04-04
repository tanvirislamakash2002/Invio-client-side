"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ActivityFiltersProps {
  entityType: string;
  setEntityType: (value: string) => void;
  action: string;
  setAction: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const entityTypeOptions = [
  { value: "all", label: "All Entities" },  // ← Changed from "" to "all"
  { value: "ORDER", label: "Orders" },
  { value: "PRODUCT", label: "Products" },
  { value: "CATEGORY", label: "Categories" },
  { value: "RESTOCK", label: "Restock" },
  { value: "USER", label: "Users" },
];

const actionOptions = [
  { value: "all", label: "All Actions" },  // ← Changed from "" to "all"
  { value: "ORDER_CREATED", label: "Order Created" },
  { value: "ORDER_STATUS_UPDATED", label: "Order Status Updated" },
  { value: "ORDER_CANCELLED", label: "Order Cancelled" },
  { value: "ORDER_UPDATED", label: "Order Updated" },
  { value: "STOCK_UPDATED", label: "Stock Updated" },
];

export function ActivityFilters({
  entityType,
  setEntityType,
  action,
  setAction,
  onApply,
  onReset,
}: ActivityFiltersProps) {
  // Convert empty string to "all" for display
  const displayEntityType = entityType === "" ? "all" : entityType;
  const displayAction = action === "" ? "all" : action;

  const handleEntityTypeChange = (value: string) => {
    setEntityType(value === "all" ? "" : value);
  };

  const handleActionChange = (value: string) => {
    setAction(value === "all" ? "" : value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={displayEntityType} onValueChange={handleEntityTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by entity" />
        </SelectTrigger>
        <SelectContent>
          {entityTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={displayAction} onValueChange={handleActionChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by action" />
        </SelectTrigger>
        <SelectContent>
          {actionOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={onApply}>
          <Search className="mr-2 h-4 w-4" />
          Apply
        </Button>
        <Button variant="outline" onClick={onReset}>
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}