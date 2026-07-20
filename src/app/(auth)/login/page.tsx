"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Sparkles } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { GoogleButton } from "@/components/shared/GoogleButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  email: "demo@studymate.ai",
  password: "StudyMateDemo123!",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const submitLogin = async (email: string, password: string) => {
    setServerError(null);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setServerError(error.message ?? "Invalid email or password");
      return;
    }
    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  const onSubmit = (data: LoginForm) => submitLogin(data.email, data.password);

  const handleDemoLogin = async () => {
    setValue("email", DEMO_CREDENTIALS.email, { shouldValidate: true });
    setValue("password", DEMO_CREDENTIALS.password, { shouldValidate: true });
    setDemoLoading(true);
    await submitLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    setDemoLoading(false);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your study plan">
      <Button
        type="button"
        variant="accent"
        className="w-full"
        onClick={handleDemoLogin}
        disabled={demoLoading || isSubmitting}
      >
        <Sparkles className="h-4 w-4" />
        {demoLoading ? "Logging in..." : "Try the demo account"}
      </Button>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or log in with your account</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton redirectTo={redirectTo} />

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or use email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || demoLoading}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}