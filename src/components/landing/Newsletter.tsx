"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterForm) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(`You're subscribed with ${data.email}`);
    reset();
  };

  return (
    <section className="w-full border-y border-border bg-primary/5">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Weekly study tips, straight to your inbox
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          One email a week: exam strategies, new resources, and product updates. No spam.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 text-left">
            <Input
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "newsletter-email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="newsletter-email-error" className="mt-1 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}