import { Suspense } from "react";
import { RestockClient } from "@/components/modules/restock/restock-client";
import { getRestockQueue } from "@/actions/restock.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageSearch } from "lucide-react";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

// Loading component
function RestockLoading() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="rounded-md border">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function RestockPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");
  const limit = 20;

  const result = await getRestockQueue(page, limit);
  
  const initialItems = result.data || [];
  const initialPagination = result.pagination || {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  };

  const lowStockCount = initialItems.length;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <PackageSearch className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Restock Queue</h1>
        </div>
        <p className="text-muted-foreground">
          Manage products that need restocking. Products are automatically added when stock falls below threshold.
        </p>
      </div>

      {/* Stats Card */}
      <Card className="mb-8 bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Products Need Restock</p>
              <p className="text-3xl font-bold text-orange-800">{lowStockCount}</p>
            </div>
            <PackageSearch className="h-12 w-12 text-orange-400" />
          </div>
        </CardContent>
      </Card>

      {/* Restock Queue Table */}
      <Suspense fallback={<RestockLoading />}>
        <RestockClient 
          initialItems={initialItems}
          initialPagination={initialPagination}
        />
      </Suspense>
    </div>
  );
}