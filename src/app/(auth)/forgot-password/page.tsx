import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Password reset isn't available yet in this preview."
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </span>
        <p className="text-sm text-muted-foreground">
          For now, please contact support at{" "}
          <a href="mailto:support@studymate.ai" className="text-primary hover:underline">
            support@studymate.ai
          </a>{" "}
          or use the demo account to explore StudyMate AI.
        </p>
        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full">
            Back to login
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
