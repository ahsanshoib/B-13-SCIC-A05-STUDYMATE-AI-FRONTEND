const STATS = [
  { value: "42,000+", label: "Study plans generated" },
  { value: "18,500+", label: "Documents summarized" },
  { value: "3.2M", label: "AI chat messages answered" },
  { value: "4.8 / 5", label: "Average student rating" },
];

export function Stats() {
  return (
    <section className="w-full border-b border-border bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}