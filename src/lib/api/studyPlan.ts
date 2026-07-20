import { api } from "@/lib/axios";
import { StudyPlan, GenerateStudyPlanInput, RefineStudyPlanInput } from "@/types/ai";

export const generatePlan = async (input: GenerateStudyPlanInput): Promise<StudyPlan> => {
  const { data } = await api.post<{ success: true; plan: StudyPlan }>(
    "/study-plans/generate",
    input
  );
  return data.plan;
};

export const refinePlan = async (input: RefineStudyPlanInput): Promise<StudyPlan> => {
  const { data } = await api.post<{ success: true; plan: StudyPlan }>("/study-plans/refine", input);
  return data.plan;
};

export const fetchLatestPlan = async (): Promise<StudyPlan | null> => {
  const { data } = await api.get<{ success: true; plan: StudyPlan | null }>("/study-plans/latest");
  return data.plan;
};

export const fetchPlans = async (): Promise<StudyPlan[]> => {
  const { data } = await api.get<{ success: true; plans: StudyPlan[] }>("/study-plans");
  return data.plans;
};