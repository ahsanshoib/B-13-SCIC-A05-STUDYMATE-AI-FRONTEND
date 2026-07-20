export interface DashboardStats {
  resourcesAdded: number;
  studyPlansGenerated: number;
  documentsAnalyzed: number;
  chatMessagesSent: number;
}

export interface AiActivityDay {
  date: string;
  count: number;
}

export interface AiUsageByFeature {
  feature: string;
  count: number;
}

export interface ResourceBySubject {
  subject: string;
  count: number;
}

export interface DashboardSummary {
  stats: DashboardStats;
  aiActivityByDay: AiActivityDay[];
  aiUsageByFeature: AiUsageByFeature[];
  resourcesBySubject: ResourceBySubject[];
  latestStudyPlan: {
    _id: string;
    targetGrade: string;
    examDate: string;
    version: number;
  } | null;
  recentDocuments: { _id: string; fileName: string; createdAt: string }[];
}