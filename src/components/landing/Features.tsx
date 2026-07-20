import { CalendarClock, FileSearch, MessagesSquare, Search, TrendingUp, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FEATURES = [
  {
    icon: CalendarClock,
    title: "AI Study Planner",
    description:
      "Give it your exam date, subjects, and weak topics — get a daily and weekly schedule that adjusts as you study.",
  },
  {
    icon: FileSearch,
    title: "AI Document Intelligence",
    description:
      "Upload lecture notes as PDF, DOCX, or TXT. Get summaries, key points, quiz questions, and extracted formulas.",
  },
  {
    icon: MessagesSquare,
    title: "AI Chat Assistant",
    description:
      "Ask study-related questions in context. It remembers your conversation and suggests what to do next.",
  },
  {
    icon: Search,
    title: "Smart Resource Search",
    description:
      "Search and filter thousands of study resources by subject, difficulty, and estimated study time.",
  },
  {
    icon: TrendingUp,
    title: "Progress Dashboard",
    description:
      "Track study hours, resource completion, and plan adherence with clear, visual charts.",
  },
  {
    icon: Tags,
    title: "Personal Resource Library",
    description:
      "Add, tag, and manage your own study resources alongside AI-generated recommendations.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to study with a plan
          </h2>
          <p className="mt-4 text-muted-foreground">
            One workspace for planning, understanding, and asking — instead of
            switching between five different apps.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardHeader>
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </span>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}