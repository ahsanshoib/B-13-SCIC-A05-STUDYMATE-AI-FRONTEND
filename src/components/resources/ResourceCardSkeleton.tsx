import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResourceCardSkeleton() {
  return (
    <Card className="flex h-[420px] w-full flex-col overflow-hidden">
      <Skeleton className="h-40 w-full shrink-0 rounded-none" />
      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-auto flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ResourceGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ResourceCardSkeleton key={i} />
      ))}
    </div>
  );
}