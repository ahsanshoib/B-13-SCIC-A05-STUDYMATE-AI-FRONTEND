import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/constants/blog";
import { formatDate } from "@/lib/format";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The StudyMate AI Blog
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Study techniques, planning strategies, and how we think about using AI responsibly in learning.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardContent className="flex h-full flex-col pt-6">
                <Badge variant="outline" className="w-fit">
                  {post.category}
                </Badge>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}