"use client";

import { useState, useEffect, useCallback } from "react";
import { ActivityTable } from "./activity-table";
import { ActivityFilters } from "./activity-filters";
import { getAllActivities } from "@/actions/activity.action";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Activity {
  id: string;
  action: string;
  description: string;
  entityType: string;
  createdAt: string;
  user: { name: string; email: string };
  order: { orderNumber: string } | null;
}

interface ActivityClientProps {
  initialActivities: Activity[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function ActivityClient({ initialActivities, initialPagination }: ActivityClientProps) {
  const [activities, setActivities] = useState(initialActivities);
  const [loading, setLoading] = useState(false);
  const [entityType, setEntityType] = useState("");
  const [action, setAction] = useState("");
  const [page, setPage] = useState(initialPagination.page);
  const [totalPages, setTotalPages] = useState(initialPagination.totalPages);
  const limit = initialPagination.limit;

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    const result = await getAllActivities({ page, limit, entityType, action });
    if (result.data) {
      setActivities(result.data);
      setTotalPages(result.pagination?.totalPages || 1);
    }
    setLoading(false);
  }, [page, limit, entityType, action]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchActivities();
  };

  const handleResetFilters = () => {
    setEntityType("");
    setAction("");
    setPage(1);
  };

  const handleRefresh = () => {
    fetchActivities();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <ActivityFilters
          entityType={entityType}
          setEntityType={setEntityType}
          action={action}
          setAction={setAction}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading activities...</div>
      ) : (
        <>
          <ActivityTable activities={activities} />

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