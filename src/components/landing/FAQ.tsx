import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How does the AI Study Planner work?",
    answer:
      "You give it your exam date, subjects, daily available hours, and the topics you're weakest on. It generates a daily and weekly schedule that prioritizes those weak topics, and you can regenerate or refine it at any time.",
  },
  {
    question: "What file types can I upload for document analysis?",
    answer:
      "PDF, DOCX, and TXT files are supported. The AI returns a summary, key points, extracted formulas, and quiz questions generated from the content.",
  },
  {
    question: "Is there a free way to try StudyMate AI?",
    answer:
      "Yes — use the demo login on the login page to explore the full dashboard, planner, and chat assistant with pre-filled sample data, no signup required.",
  },
  {
    question: "Can I add my own study materials?",
    answer:
      "Yes. Once logged in, go to Add Study Resource to create your own entries with a title, description, subject, difficulty, and estimated study time.",
  },
  {
    question: "Does the AI chat assistant remember previous questions?",
    answer:
      "Yes, each conversation keeps context, so you can ask follow-up questions without repeating background information.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}