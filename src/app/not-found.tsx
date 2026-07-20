import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline">Explore resources</Button>
        </Link>
      </div>
    </div>
  );
}