import { DocumentAnalysis } from "@/types/ai";

export function downloadDocumentSummary(doc: DocumentAnalysis) {
  const lines = [
    `StudyMate AI — Document Summary`,
    `File: ${doc.fileName}`,
    `Generated: ${new Date(doc.createdAt).toLocaleString()}`,
    ``,
    `SUMMARY`,
    doc.summary,
    ``,
    `KEY POINTS`,
    ...doc.keyPoints.map((p) => `- ${p}`),
    ``,
    `ACTION ITEMS`,
    ...doc.actionItems.map((a) => `- ${a}`),
    ``,
    `FORMULAS & CONCEPTS`,
    ...(doc.formulasAndConcepts.length ? doc.formulasAndConcepts.map((f) => `- ${f}`) : ["None identified"]),
    ``,
    `QUIZ QUESTIONS`,
    ...doc.quizQuestions.flatMap((q, i) => [
      `${i + 1}. ${q.question}`,
      ...q.options.map((opt, idx) => `   ${String.fromCharCode(65 + idx)}. ${opt}`),
      `   Answer: ${String.fromCharCode(65 + q.correctAnswerIndex)}`,
      ``,
    ]),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.fileName.replace(/\.[^/.]+$/, "")}-summary.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}