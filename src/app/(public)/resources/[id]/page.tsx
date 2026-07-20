"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User, Tag, ArrowLeft, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { useResource, useRelatedResources } from "@/hooks/useResources";
import { formatStudyTime, formatDate, difficultyLabel } from "@/lib/format";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=70";

export default function ResourceDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: resource, isLoading, isError } = useResource(params.id);
  const { data: related } = useRelatedResources(params.id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="mt-6 h-8 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
      </div>
    );
  }

  if (isError || !resource) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-20 text-center">
        <AlertCircle className="h-6 w-6 text-destructive" />
        <p className="text-sm text-muted-foreground">
          This resource doesn&apos;t exist or has been removed.
        </p>
        <Link href="/explore" className="mt-2 text-sm font-medium text-primary hover:underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted sm:h-80">
        <Image
          src={resource.imageUrl || FALLBACK_IMAGE}
          alt={resource.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge>{resource.subject}</Badge>
        <Badge variant="outline">{difficultyLabel(resource.difficulty)}</Badge>
        {resource.tags.map((tag) => (
          <Badge key={tag} variant="muted">
            <Tag className="mr-1 h-3 w-3" />
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{resource.title}</h1>
      <p className="mt-3 text-muted-foreground">{resource.shortDescription}</p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Study time</p>
              <p className="text-sm font-medium text-foreground">
                {formatStudyTime(resource.estimatedStudyTimeMinutes)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Added</p>
              <p className="text-sm font-medium text-foreground">{formatDate(resource.createdAt)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Shared by</p>
              <p className="text-sm font-medium text-foreground">{resource.ownerName}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Overview</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {resource.fullDescription}
        </p>
      </div>

      {related && related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-foreground">Related resources</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ResourceCard key={item._id} resource={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}