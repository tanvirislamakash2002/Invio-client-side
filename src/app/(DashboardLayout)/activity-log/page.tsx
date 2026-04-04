import { Suspense } from "react";
import { ActivityClient } from "@/components/modules/activity/activity-client";
import { getAllActivities } from "@/actions/activity.action";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    entityType?: string;
    action?: string;
  }>;
}

// Loading component
function ActivityLoading() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="rounded-md border">
        <div className="p-4 space-y-3">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ActivityPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");
  const limit = 20;
  const entityType = params?.entityType || "";
  const action = params?.action || "";

  const result = await getAllActivities({ page, limit, entityType, action });
  
  const initialActivities = result.data || [];
  const initialPagination = result.pagination || {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <History className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Activity Log</h1>
        </div>
        <p className="text-muted-foreground">
          Track all system activities including orders, products, and stock updates
        </p>
      </div>

      {/* Stats Summary */}
      <Card className="mb-8 bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Activities</p>
              <p className="text-2xl font-bold">{initialPagination.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pages</p>
              <p className="text-2xl font-bold">{initialPagination.totalPages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Per Page</p>
              <p className="text-2xl font-bold">{initialPagination.limit}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Page</p>
              <p className="text-2xl font-bold">{initialPagination.page}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Suspense fallback={<ActivityLoading />}>
        <ActivityClient 
          initialActivities={initialActivities}
          initialPagination={initialPagination}
        />
      </Suspense>
    </div>
  );
}