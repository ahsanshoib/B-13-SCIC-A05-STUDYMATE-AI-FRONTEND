import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "primary" | "accent" | "signal";
}) {
  const accentClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    signal: "bg-signal/10 text-signal",
  }[accent];

  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentClasses}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}