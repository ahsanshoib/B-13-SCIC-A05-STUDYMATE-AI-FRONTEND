"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const ACCEPTED_LABEL = "PDF, DOCX, or TXT — up to 10MB";

interface Props {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function DocumentDropzone({ onFileSelected, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) return;
      setSelectedFile(file);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (!disabled) handleFile(e.dataTransfer.files?.[0]);
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors",
        isDragging && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {selectedFile ? (
        <>
          <FileText className="h-8 w-8 text-primary" />
          <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
          <p className="text-xs text-muted-foreground">Click to choose a different file</p>
        </>
      ) : (
        <>
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drag and drop, or click to upload
          </p>
          <p className="text-xs text-muted-foreground">{ACCEPTED_LABEL}</p>
        </>
      )}
    </div>
  );
}