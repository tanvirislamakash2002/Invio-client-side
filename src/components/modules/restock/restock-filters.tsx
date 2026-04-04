"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface RestockFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

export function RestockFilters({
  search,
  setSearch,
  priority,
  setPriority,
  onApply,
  onReset,
}: RestockFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          {priorityOptions.map((option) => (
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