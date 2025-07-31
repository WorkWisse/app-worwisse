import { Card, CardBody, Skeleton } from "@heroui/react";

interface CompanySkeletonProps {
  count?: number;
  showRank?: boolean;
}

export function CompanySkeleton({
  count = 5,
  showRank = true,
}: CompanySkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={`company-skeleton-${index}`}
          className="shadow-lg bg-white dark:bg-slate-800 rounded-xl overflow-hidden w-full"
        >
          <CardBody className="p-5">
            <div className="flex items-center space-x-4">
              {showRank && <Skeleton className="w-5 h-6 rounded" />}
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex-grow min-w-0 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
