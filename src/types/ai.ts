export interface DailyScheduleItem {
  time: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  priority: "high" | "medium" | "low";
}

export interface WeeklyFocusItem {
  day: string;
  focusAreas: string[];
}

export interface StudyPlan {
  _id: string;
  userId: string;
  examDate: string;
  subjects: string[];
  dailyStudyHours: number;
  weakTopics: string[];
  targetGrade: string;
  dailySchedule: DailyScheduleItem[];
  weeklyPlan: WeeklyFocusItem[];
  priorities: string[];
  improvementSuggestions: string[];
  version: number;
  previousPlanId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateStudyPlanInput {
  examDate: string;
  subjects: string[];
  dailyStudyHours: number;
  weakTopics: string[];
  targetGrade: string;
}

export interface RefineStudyPlanInput extends GenerateStudyPlanInput {
  refinementNote: string;
  previousPlanId: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface DocumentAnalysis {
  _id: string;
  userId: string;
  fileName: string;
  fileType: "pdf" | "docx" | "txt";
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  quizQuestions: QuizQuestion[];
  formulasAndConcepts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}