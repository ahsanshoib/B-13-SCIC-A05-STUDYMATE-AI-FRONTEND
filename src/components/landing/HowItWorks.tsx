const STEPS = [
  {
    number: "01",
    title: "Tell it your goals",
    description:
      "Add your exam date, subjects, daily study hours, and the topics you find hardest.",
  },
  {
    number: "02",
    title: "Get your AI plan",
    description:
      "StudyMate AI generates a daily schedule and weekly plan, prioritizing your weak topics first.",
  },
  {
    number: "03",
    title: "Study, ask, adjust",
    description:
      "Upload notes for instant summaries, ask the assistant follow-up questions, and regenerate your plan as things change.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From goals to a plan in three steps
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-bold text-primary/20">{step.number}</span>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}