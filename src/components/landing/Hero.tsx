"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLAN_STEPS = [
  { time: "7:00 AM", task: "Organic Chemistry — reaction mechanisms", tag: "Weak topic" },
  { time: "9:30 AM", task: "Linear Algebra — eigenvalues practice set", tag: "Priority" },
  { time: "4:00 PM", task: "Mock test review — Physics unit 4", tag: "Exam in 12d" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[65vh] w-full items-center overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:100%_2.75rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="accent" className="mb-5">
            <Sparkles className="mr-1 h-3 w-3" /> AI-generated study plans in seconds
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Study smarter, not{" "}
            <span className="text-primary">longer.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Tell StudyMate AI your exam date, subjects, and weak topics. It
            builds your daily schedule, reads your lecture notes, and answers
            your questions along the way.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Build my study plan
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore resources
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" /> No credit card
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Free demo login
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Today's plan</span>
            <Badge variant="signal">Exam in 12 days</Badge>
          </div>
          <div className="space-y-3">
            {PLAN_STEPS.map((step, i) => (
              <motion.div
                key={step.time}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.2 }}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
              >
                <span className="mt-0.5 w-16 shrink-0 text-xs font-medium text-muted-foreground">
                  {step.time}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{step.task}</p>
                  <span className="mt-1 inline-block text-xs text-accent">{step.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Generated from your goals, weak topics, and 3 hrs/day availability
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}