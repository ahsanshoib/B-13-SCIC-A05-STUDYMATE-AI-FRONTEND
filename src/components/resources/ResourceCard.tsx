import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Resource } from "@/types/resource";
import { formatStudyTime, formatDate, difficultyLabel } from "@/lib/format";

const DIFFICULTY_VARIANT = {
  beginner: "accent",
  intermediate: "signal",
  advanced: "default",
} as const;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=60";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex h-[420px] w-full flex-col overflow-hidden">
      <div className="relative h-40 w-full shrink-0 bg-muted">
        <Image
          src={resource.imageUrl || FALLBACK_IMAGE}
          alt={resource.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <Badge
          variant={DIFFICULTY_VARIANT[resource.difficulty]}
          className="absolute left-3 top-3"
        >
          {difficultyLabel(resource.difficulty)}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col pt-4">
        <span className="text-xs font-medium text-primary">{resource.subject}</span>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-foreground">
          {resource.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {resource.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatStudyTime(resource.estimatedStudyTimeMinutes)}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(resource.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {resource.tags[0] ?? resource.subject}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/resources/${resource._id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
