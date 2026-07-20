"use client";

import { useState } from "react";
import { FileSearch, Loader2 } from "lucide-react";
import { DocumentDropzone } from "@/components/ai/DocumentDropzone";
import { DocumentAnalysisOutput } from "@/components/ai/DocumentAnalysisOutput";
import { Button } from "@/components/ui/button";
import { useAnalyzeDocument } from "@/hooks/useDocuments";

export default function DocumentIntelligencePage() {
  const [file, setFile] = useState<File | null>(null);
  const analyze = useAnalyzeDocument();

  const handleAnalyze = () => {
    if (file) analyze.mutate(file);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <FileSearch className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          AI Document Intelligence
        </h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload lecture notes and get a summary, key points, action items, and a quiz.
      </p>

      <div className="mt-8 space-y-4">
        <DocumentDropzone onFileSelected={setFile} disabled={analyze.isPending} />

        <Button
          className="w-full sm:w-auto"
          disabled={!file || analyze.isPending}
          onClick={handleAnalyze}
        >
          {analyze.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing document...
            </>
          ) : (
            "Analyze document"
          )}
        </Button>
      </div>

      {analyze.data && (
        <div className="mt-10">
          <DocumentAnalysisOutput doc={analyze.data} />
        </div>
      )}
    </div>
  );
}