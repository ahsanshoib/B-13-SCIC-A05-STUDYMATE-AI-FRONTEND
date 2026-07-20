import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { DashboardSummary } from "@/types/dashboard";

const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } = await api.get<{ success: true } & DashboardSummary>("/dashboard/summary");
  return data;
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
    staleTime: 30 * 1000,
  });
}