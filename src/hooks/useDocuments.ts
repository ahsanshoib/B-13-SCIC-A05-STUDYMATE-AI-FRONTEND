import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as documentApi from "@/lib/api/documents";

export const documentKeys = {
  all: ["documents"] as const,
  detail: (id: string) => ["documents", "detail", id] as const,
};

export function useDocuments() {
  return useQuery({ queryKey: documentKeys.all, queryFn: documentApi.fetchDocuments });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentApi.fetchDocumentById(id),
    enabled: !!id,
  });
}

export function useAnalyzeDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => documentApi.analyzeDocument(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.all });
      toast.success("Document analyzed");
    },
    onError: (error: Error) => toast.error(error.message || "Could not analyze this document"),
  });
}