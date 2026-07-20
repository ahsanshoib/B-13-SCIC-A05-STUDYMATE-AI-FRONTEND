import { Badge } from "@/components/ui/badge";

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Economics", "Statistics", "English Literature", "History", "Psychology",
  "Accounting", "Electrical Engineering",
];

export function Subjects() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for every subject
          </h2>
          <p className="mt-4 text-muted-foreground">
            Resources, plans, and AI answers span the subjects students
            actually study for.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {SUBJECTS.map((subject) => (
            <Badge key={subject} variant="outline" className="px-4 py-1.5 text-sm">
              {subject}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}