"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { StudyPlanForm } from "@/components/ai/StudyPlanForm";
import { StudyPlanOutput } from "@/components/ai/StudyPlanOutput";
import { Skeleton } from "@/components/ui/skeleton";
import { useLatestStudyPlan, useGenerateStudyPlan, useRefineStudyPlan } from "@/hooks/useStudyPlan";
import { GenerateStudyPlanInput } from "@/types/ai";

export default function StudyPlannerPage() {
  const { data: latestPlan, isLoading } = useLatestStudyPlan();
  const generate = useGenerateStudyPlan();
  const refine = useRefineStudyPlan();

  const [lastInput, setLastInput] = useState<GenerateStudyPlanInput | null>(null);

  const handleGenerate = (input: GenerateStudyPlanInput) => {
    setLastInput(input);
    generate.mutate(input);
  };

  const handleRegenerate = () => {
    if (lastInput) generate.mutate(lastInput);
  };

  const handleRefine = (refinementNote: string) => {
    if (!lastInput || !latestPlan) return;
    refine.mutate({ ...lastInput, refinementNote, previousPlanId: latestPlan._id });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <CalendarClock className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Study Planner</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell it your goals — it builds the schedule.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <StudyPlanForm onSubmit={handleGenerate} isSubmitting={generate.isPending} />

        <div>
          {isLoading || generate.isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : latestPlan ? (
            <StudyPlanOutput
              plan={latestPlan}
              onRegenerate={handleRegenerate}
              onRefine={handleRefine}
              isRefining={refine.isPending}
            />
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-border text-center">
              <p className="text-sm text-muted-foreground">
                Fill out your goals to generate your first AI study plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}