import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-semibold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">StudyMate AI</span>
        </Link>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
}