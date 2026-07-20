"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyResources, useDeleteResource } from "@/hooks/useResources";
import { formatStudyTime, formatDate, difficultyLabel } from "@/lib/format";

export default function ManageResourcesPage() {
  const { data: resources, isLoading } = useMyResources();
  const deleteResource = useDeleteResource();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setPendingId(id);
    await deleteResource.mutateAsync(id);
    setPendingId(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage resources</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and delete the study resources you&apos;ve added.
          </p>
        </div>
        <Link href="/resources/add">
          <Button>
            <Plus className="h-4 w-4" />
            Add resource
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !resources || resources.length === 0 ? (
          <div className="rounded-lg border border-border bg-muted/30 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              You haven&apos;t added any resources yet.
            </p>
            <Link href="/resources/add" className="mt-3 inline-block">
              <Button variant="outline" size="sm">
                Add your first resource
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-lg border border-border md:block">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Subject</th>
                    <th className="px-4 py-3 font-medium">Difficulty</th>
                    <th className="px-4 py-3 font-medium">Study time</th>
                    <th className="px-4 py-3 font-medium">Added</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {resources.map((resource) => (
                    <tr key={resource._id} className="hover:bg-muted/30">
                      <td className="max-w-xs truncate px-4 py-3 font-medium text-foreground">
                        {resource.title}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{resource.subject}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{difficultyLabel(resource.difficulty)}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatStudyTime(resource.estimatedStudyTimeMinutes)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(resource.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link href={`/resources/${resource._id}`}>
                            <Button variant="ghost" size="icon" aria-label="View resource">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete resource"
                            disabled={pendingId === resource._id}
                            onClick={() => handleDelete(resource._id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {resources.map((resource) => (
                <div key={resource._id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{resource.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {resource.subject} · {formatStudyTime(resource.estimatedStudyTimeMinutes)}
                      </p>
                    </div>
                    <Badge variant="outline">{difficultyLabel(resource.difficulty)}</Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/resources/${resource._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      disabled={pendingId === resource._id}
                      onClick={() => handleDelete(resource._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}