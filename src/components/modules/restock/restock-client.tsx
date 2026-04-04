"use client";

import { useState, useEffect, useCallback } from "react";
import { RestockTable } from "./restock-table";
import { RestockFilters } from "./restock-filters";
import { getRestockQueue } from "@/actions/restock.action";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RestockItem {
  id: string;
  productId: string;
  currentStock: number;
  threshold: number;
  priority: string;
  priorityLabel: string;
  product: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    minStockThreshold: number;
    category: { name: string };
  };
}

interface RestockClientProps {
  initialItems: RestockItem[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function RestockClient({ initialItems, initialPagination }: RestockClientProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [page, setPage] = useState(initialPagination.page);
  const [totalPages, setTotalPages] = useState(initialPagination.totalPages);
  const limit = initialPagination.limit;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const result = await getRestockQueue(page, limit);
    if (result.data) {
      let filtered = result.data;
      
      // Apply search filter
      if (search) {
        filtered = filtered.filter((item: RestockItem) =>
          item.product.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Apply priority filter
      if (priority !== "all") {
        filtered = filtered.filter((item: RestockItem) =>
          item.priority === priority
        );
      }
      
      setItems(filtered);
      setTotalPages(result.pagination?.totalPages || 1);
    }
    setLoading(false);
  }, [page, limit, search, priority]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchItems();
  };

  const handleResetFilters = () => {
    setSearch("");
    setPriority("all");
    setPage(1);
  };

  const handleRefresh = () => {
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <RestockFilters
          search={search}
          setSearch={setSearch}
          priority={priority}
          setPriority={setPriority}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading restock queue...</div>
      ) : (
        <>
          <RestockTable items={items} onUpdate={handleRefresh} />

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="py-2">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}