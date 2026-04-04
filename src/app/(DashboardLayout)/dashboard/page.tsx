import { Suspense } from "react";
import { StatsCards } from "@/components/modules/dashboard/stats-cards";
import { ProductSummary } from "@/components/modules/dashboard/product-summary";
import { RecentOrders } from "@/components/modules/dashboard/recent-orders";
import { RecentActivities } from "@/components/modules/dashboard/recent-activities";
import { RevenueChart } from "@/components/modules/dashboard/revenue-chart";
import {
  getDashboardStats,
  getProductSummary,
  getRecentOrders,
  getRecentActivities,
  getRevenueData,
} from "@/actions/dashboard.action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Loading components
function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProductSummarySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const [stats, products, recentOrders, recentActivities, revenueData] = await Promise.all([
    getDashboardStats(),
    getProductSummary(),
    getRecentOrders(5),
    getRecentActivities(5),
    getRevenueData(),
  ]);
console.log(stats, products, recentOrders, recentActivities, revenueData);
  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your inventory and orders
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards stats={stats.data} />
      </Suspense>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Suspense fallback={<Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><Skeleton className="h-[300px] w-full" /></CardContent></Card>}>
          <RevenueChart data={revenueData} />
        </Suspense>

        {/* Recent Activities */}
        <Suspense fallback={<Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><div className="space-y-3">{[...Array(4)].map((_, i) => (<Skeleton key={i} className="h-16 w-full" />))}</div></CardContent></Card>}>
          <RecentActivities activities={recentActivities} />
        </Suspense>
      </div>

      {/* Recent Orders */}
      <Suspense fallback={<Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><div className="space-y-3">{[...Array(5)].map((_, i) => (<Skeleton key={i} className="h-12 w-full" />))}</div></CardContent></Card>}>
        <RecentOrders orders={recentOrders} />
      </Suspense>

      {/* Product Summary */}
      <Suspense fallback={<ProductSummarySkeleton />}>
        <ProductSummary products={products} />
      </Suspense>
    </div>
  );
}