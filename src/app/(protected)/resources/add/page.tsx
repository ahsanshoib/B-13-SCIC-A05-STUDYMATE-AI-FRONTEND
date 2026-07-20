"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBJECTS, DIFFICULTIES } from "@/constants/resources";
import { useCreateResource } from "@/hooks/useResources";
import { CreateResourceInput } from "@/types/resource";

const addResourceSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
  shortDescription: z.string().trim().min(10, "At least 10 characters").max(220),
  fullDescription: z.string().trim().min(30, "At least 30 characters").max(8000),
  subject: z.enum(SUBJECTS as [string, ...string[]], { errorMap: () => ({ message: "Choose a subject" }) }),
  difficulty: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "Choose a difficulty" }),
  }),
  estimatedStudyTimeMinutes: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .int()
    .min(5, "Minimum 5 minutes")
    .max(6000, "Maximum 6000 minutes"),
  tags: z.string().trim().optional(),
  imageUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
});

type AddResourceForm = z.infer<typeof addResourceSchema>;

export default function AddResourcePage() {
  const router = useRouter();
  const createResource = useCreateResource();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddResourceForm>({
    resolver: zodResolver(addResourceSchema),
    defaultValues: { estimatedStudyTimeMinutes: 60 },
  });

  const onSubmit = async (data: AddResourceForm) => {
    await createResource.mutateAsync({
      title: data.title,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      subject: data.subject as CreateResourceInput["subject"],
      difficulty: data.difficulty as CreateResourceInput["difficulty"],
      estimatedStudyTimeMinutes: data.estimatedStudyTimeMinutes,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      imageUrl: data.imageUrl || undefined,
    });
    router.push("/resources/manage");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Add study resource</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Share notes, guides, or practice material with clear details so it's easy to find later.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resource details</CardTitle>
          <CardDescription>Fields marked are required unless noted optional.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Linear Algebra: Eigenvalues explained" {...register("title")} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="shortDescription">Short description</Label>
              <Input
                id="shortDescription"
                placeholder="A quick summary shown on the resource card"
                {...register("shortDescription")}
              />
              {errors.shortDescription && (
                <p className="text-xs text-destructive">{errors.shortDescription.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fullDescription">Full description</Label>
              <Textarea
                id="fullDescription"
                rows={6}
                placeholder="Everything a student needs to know before using this resource"
                {...register("fullDescription")}
              />
              {errors.fullDescription && (
                <p className="text-xs text-destructive">{errors.fullDescription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label>Difficulty</Label>
                <Controller
                  control={control}
                  name="difficulty"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a level" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIFFICULTIES.map((d) => (
                          <SelectItem key={d.value} value={d.value}>
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-xs text-destructive">{errors.difficulty.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="estimatedStudyTimeMinutes">Estimated study time (minutes)</Label>
                <Input
                  id="estimatedStudyTimeMinutes"
                  type="number"
                  min={5}
                  max={6000}
                  {...register("estimatedStudyTimeMinutes")}
                />
                {errors.estimatedStudyTimeMinutes && (
                  <p className="text-xs text-destructive">{errors.estimatedStudyTimeMinutes.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
                <Input id="tags" placeholder="eigenvalues, linear-algebra" {...register("tags")} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input id="imageUrl" placeholder="https://..." {...register("imageUrl")} />
              {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding resource..." : "Add resource"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}