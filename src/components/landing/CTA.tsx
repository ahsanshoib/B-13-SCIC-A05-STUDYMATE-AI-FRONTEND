import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full bg-primary">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Your next study session starts with a plan
        </h2>
        <p className="max-w-lg text-primary-foreground/80">
          Set your exam date and let StudyMate AI build the schedule. It takes less than two minutes.
        </p>
        <Link href="/register">
          <Button size="lg" variant="accent">
            Create your free plan
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}