import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export function ReviewSkeleton() {
  return (
    <Card className="shadow-lg bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
      <CardHeader className="p-5 pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </CardBody>
    </Card>
  );
}
