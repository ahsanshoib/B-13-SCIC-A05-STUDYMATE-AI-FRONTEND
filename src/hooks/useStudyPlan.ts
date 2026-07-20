import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as studyPlanApi from "@/lib/api/studyPlan";
import { GenerateStudyPlanInput, RefineStudyPlanInput } from "@/types/ai";

export const studyPlanKeys = {
  latest: ["study-plans", "latest"] as const,
  all: ["study-plans"] as const,
};

export function useLatestStudyPlan() {
  return useQuery({
    queryKey: studyPlanKeys.latest,
    queryFn: studyPlanApi.fetchLatestPlan,
  });
}

export function useGenerateStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: GenerateStudyPlanInput) => studyPlanApi.generatePlan(input),
    onSuccess: (plan) => {
      queryClient.setQueryData(studyPlanKeys.latest, plan);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.all });
      toast.success("Your study plan is ready");
    },
    onError: (error: Error) => toast.error(error.message || "Could not generate a plan"),
  });
}

export function useRefineStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: RefineStudyPlanInput) => studyPlanApi.refinePlan(input),
    onSuccess: (plan) => {
      queryClient.setQueryData(studyPlanKeys.latest, plan);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.all });
      toast.success("Plan refined");
    },
    onError: (error: Error) => toast.error(error.message || "Could not refine the plan"),
  });
}