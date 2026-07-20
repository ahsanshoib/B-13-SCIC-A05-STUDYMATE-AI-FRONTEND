"use client";

import { useState } from "react";
import { RefreshCw, Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudyPlan } from "@/types/ai";

const PRIORITY_VARIANT = { high: "signal", medium: "accent", low: "muted" } as const;

interface Props {
  plan: StudyPlan;
  onRegenerate: () => void;
  onRefine: (note: string) => void;
  isRefining: boolean;
}

export function StudyPlanOutput({ plan, onRegenerate, onRefine, isRefining }: Props) {
  const [refinementNote, setRefinementNote] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Your plan for {plan.targetGrade}
          </h2>
          <p className="text-sm text-muted-foreground">
            Version {plan.version} · Exam on {new Date(plan.examDate).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily schedule</TabsTrigger>
          <TabsTrigger value="weekly">Weekly plan</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <div className="space-y-3">
            {plan.dailySchedule.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
              >
                <span className="mt-0.5 w-20 shrink-0 text-xs font-medium text-muted-foreground">
                  {item.time}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.subject} — {item.topic}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.durationMinutes} min</p>
                </div>
                <Badge variant={PRIORITY_VARIANT[item.priority]}>{item.priority}</Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {plan.weeklyPlan.map((day) => (
              <Card key={day.day}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5 pt-0">
                  {day.focusAreas.map((area) => (
                    <Badge key={area} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Priorities</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {plan.priorities.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">{i + 1}.</span> {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <Lightbulb className="h-4 w-4 text-accent" />
            <CardTitle className="text-sm">Suggested improvements</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {plan.improvementSuggestions.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span> {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Refine this plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <Textarea
            placeholder="e.g. Give me more time on Physics and less on History"
            value={refinementNote}
            onChange={(e) => setRefinementNote(e.target.value)}
            rows={2}
          />
          <Button
            variant="accent"
            size="sm"
            disabled={!refinementNote.trim() || isRefining}
            onClick={() => {
              onRefine(refinementNote);
              setRefinementNote("");
            }}
          >
            <Sparkles className="h-4 w-4" />
            {isRefining ? "Refining..." : "Refine plan"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}