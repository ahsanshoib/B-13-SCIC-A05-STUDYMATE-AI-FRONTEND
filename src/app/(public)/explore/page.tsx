"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceGridSkeleton } from "@/components/resources/ResourceCardSkeleton";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { Pagination } from "@/components/resources/Pagination";
import { useResources } from "@/hooks/useResources";
import { ResourceFiltersState } from "@/types/resource";

const DEFAULT_FILTERS: ResourceFiltersState = {
  search: "",
  subject: "",
  difficulty: "",
  sort: "newest",
  page: 1,
};

export default function ExplorePage() {
  const [filters, setFilters] = useState<ResourceFiltersState>(DEFAULT_FILTERS);
  const { data, isLoading, isError, isFetching } = useResources(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore study resources
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Search, filter, and sort resources shared by the StudyMate AI community.
        </p>
      </div>

      <ResourceFilters filters={filters} onChange={setFilters} />

      <div className="mt-8">
        {isLoading ? (
          <ResourceGridSkeleton count={8} />
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 py-16 text-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-sm text-destructive">
              Couldn&apos;t load resources. Check that the backend is running and try again.
            </p>
          </div>
        ) : data && data.items.length > 0 ? (
          <div
            className={
              isFetching
                ? "grid grid-cols-1 gap-6 opacity-60 transition-opacity sm:grid-cols-2 lg:grid-cols-4"
                : "grid grid-cols-1 gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-4"
            }
          >
            {data.items.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-muted/30 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No resources match your filters yet. Try clearing them or add the first one.
            </p>
          </div>
        )}
      </div>

      {data && (
        <Pagination
          pagination={data.pagination}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
}