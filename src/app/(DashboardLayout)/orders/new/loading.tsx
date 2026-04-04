import { Skeleton } from "@/components/ui/skeleton";

export default function CreateOrderLoading() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}