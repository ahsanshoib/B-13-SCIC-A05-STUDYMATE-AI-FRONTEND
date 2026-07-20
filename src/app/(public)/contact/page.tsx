"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success(`Thanks ${data.name.split(" ")[0]} — we'll get back to you soon.`);
    reset();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Questions, feedback, or partnership ideas — we read every message.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <a href="mailto:support@studymate.ai" className="text-sm text-muted-foreground hover:text-foreground">
                support@studymate.ai
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Based</p>
              <p className="text-sm text-muted-foreground">Remote-first, worldwide</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Response time</p>
              <p className="text-sm text-muted-foreground">Within 1–2 business days</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jordan Lee" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Question about the AI Study Planner" {...register("subject")} />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="How can we help?" {...register("message")} />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}