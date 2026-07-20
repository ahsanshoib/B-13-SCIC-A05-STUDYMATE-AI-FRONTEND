"use client";

import { Download, CheckCircle2, ListChecks, Calculator, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentAnalysis } from "@/types/ai";
import { downloadDocumentSummary } from "@/lib/downloadSummary";

export function DocumentAnalysisOutput({ doc }: { doc: DocumentAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{doc.fileName}</h2>
          <p className="text-xs text-muted-foreground">
            Analyzed {new Date(doc.createdAt).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => downloadDocumentSummary(doc)}>
          <Download className="h-4 w-4" />
          Download summary
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 text-sm text-muted-foreground">{doc.summary}</CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <CardTitle className="text-sm">Key points</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {doc.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span> {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <ListChecks className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Action items</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {doc.actionItems.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">{i + 1}.</span> {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {doc.formulasAndConcepts.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <Calculator className="h-4 w-4 text-signal" />
            <CardTitle className="text-sm">Formulas & concepts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 pt-0">
            {doc.formulasAndConcepts.map((f, i) => (
              <Badge key={i} variant="signal">
                {f}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
          <HelpCircle className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm">Quiz questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {doc.quizQuestions.map((q, i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <p className="text-sm font-medium text-foreground">
                {i + 1}. {q.question}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`rounded-md border px-2.5 py-1.5 text-xs ${
                      idx === q.correctAnswerIndex
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}