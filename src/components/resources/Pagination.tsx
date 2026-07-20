"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination as PaginationData } from "@/types/resource";

export function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}) {
  const { page, totalPages } = pagination;
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p, idx) => (
        <div key={p} className="flex items-center gap-1.5">
          {idx > 0 && pages[idx - 1] !== p - 1 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
          <Button
            variant={p === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}