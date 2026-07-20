import { api } from "@/lib/axios";
import { DocumentAnalysis } from "@/types/ai";

export const analyzeDocument = async (file: File): Promise<DocumentAnalysis> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<{ success: true; document: DocumentAnalysis }>(
    "/documents/analyze",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data.document;
};

export const fetchDocuments = async (): Promise<DocumentAnalysis[]> => {
  const { data } = await api.get<{ success: true; documents: DocumentAnalysis[] }>("/documents");
  return data.documents;
};

export const fetchDocumentById = async (id: string): Promise<DocumentAnalysis> => {
  const { data } = await api.get<{ success: true; document: DocumentAnalysis }>(`/documents/${id}`);
  return data.document;
};