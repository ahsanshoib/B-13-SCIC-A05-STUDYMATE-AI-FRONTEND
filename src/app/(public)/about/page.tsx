import { Target, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VALUES = [
  {
    icon: Target,
    title: "Focused, not overwhelming",
    description:
      "Every feature exists to answer one question: what should I study next? We cut everything that doesn't serve that.",
  },
  {
    icon: Sparkles,
    title: "AI that explains itself",
    description:
      "StudyMate AI doesn't just hand you a schedule — it tells you why a topic is prioritized and lets you refine the reasoning.",
  },
  {
    icon: Users,
    title: "Built with students, for students",
    description:
      "Every planner input and document feature came from watching real students prep for real exams.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Studying shouldn&apos;t feel like guesswork
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          StudyMate AI started from a simple frustration: students spend more time deciding
          what to study than actually studying. We built an AI companion that plans, reads,
          and answers — so that time goes back to learning.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {VALUES.map((value) => (
          <Card key={value.title} className="h-full">
            <CardContent className="pt-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-border bg-muted/30 p-8">
        <h2 className="text-lg font-semibold text-foreground">How we build</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          StudyMate AI runs on Google Gemini for study planning, document analysis, and
          conversational assistance. We treat AI output as a starting point, not a final
          answer — every plan can be regenerated or refined, and every document summary
          links back to source material so you can verify what the AI extracted.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The platform is built on Next.js, Express, and MongoDB, with authentication
          handled by Better Auth, including Google sign-in and a no-signup demo account
          for anyone who wants to try it first.
        </p>
      </div>
    </div>
  );
}