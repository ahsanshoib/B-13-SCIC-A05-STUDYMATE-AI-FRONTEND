"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GenerateStudyPlanInput } from "@/types/ai";

const planFormSchema = z.object({
  examDate: z.string().min(1, "Exam date is required"),
  subjectsInput: z.string().min(1, "Add at least one subject"),
  dailyStudyHours: z.coerce.number().min(0.5, "At least 0.5 hours").max(16, "Max 16 hours"),
  weakTopicsInput: z.string().optional(),
  targetGrade: z.string().min(1, "Target grade is required").max(50),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface Props {
  onSubmit: (input: GenerateStudyPlanInput) => void;
  isSubmitting: boolean;
}

const parseList = (value?: string) =>
  (value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

export function StudyPlanForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: { dailyStudyHours: 3 },
  });

  const submit = (values: PlanFormValues) => {
    onSubmit({
      examDate: values.examDate,
      subjects: parseList(values.subjectsInput),
      dailyStudyHours: values.dailyStudyHours,
      weakTopics: parseList(values.weakTopicsInput),
      targetGrade: values.targetGrade,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your study goals</CardTitle>
        <CardDescription>The more specific, the better your plan will be.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="examDate">Exam date</Label>
            <Input id="examDate" type="date" {...register("examDate")} />
            {errors.examDate && <p className="text-xs text-destructive">{errors.examDate.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subjectsInput">Subjects (comma-separated)</Label>
            <Input
              id="subjectsInput"
              placeholder="Organic Chemistry, Linear Algebra, Physics"
              {...register("subjectsInput")}
            />
            {errors.subjectsInput && (
              <p className="text-xs text-destructive">{errors.subjectsInput.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dailyStudyHours">Daily study hours available</Label>
            <Input
              id="dailyStudyHours"
              type="number"
              step="0.5"
              min={0.5}
              max={16}
              {...register("dailyStudyHours")}
            />
            {errors.dailyStudyHours && (
              <p className="text-xs text-destructive">{errors.dailyStudyHours.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="weakTopicsInput">Weak topics (comma-separated, optional)</Label>
            <Input
              id="weakTopicsInput"
              placeholder="reaction mechanisms, eigenvalues"
              {...register("weakTopicsInput")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="targetGrade">Target grade</Label>
            <Input id="targetGrade" placeholder="A, 90%, First Class..." {...register("targetGrade")} />
            {errors.targetGrade && (
              <p className="text-xs text-destructive">{errors.targetGrade.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Sparkles className="h-4 w-4" />
            {isSubmitting ? "Generating your plan..." : "Generate study plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}