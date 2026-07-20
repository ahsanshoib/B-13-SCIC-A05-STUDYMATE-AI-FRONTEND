import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Priya Nair",
    role: "Second-year Engineering student",
    quote:
      "I used to spend an hour just deciding what to study first. The AI planner does that in a minute and actually adjusts when I fall behind.",
  },
  {
    name: "Marcus Webb",
    role: "MCAT candidate",
    quote:
      "Uploading my biochem notes and getting quiz questions back saved me so much prep time before practice tests.",
  },
  {
    name: "Amara Diallo",
    role: "High school senior",
    quote:
      "The chat assistant remembers what I asked earlier, so I don't have to re-explain my weak topics every time.",
  },
];

export function Testimonials() {
  return (
    <section className="w-full border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by students preparing for real exams
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="h-full">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 text-signal">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}