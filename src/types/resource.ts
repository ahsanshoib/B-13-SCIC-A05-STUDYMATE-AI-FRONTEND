export type Subject =
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Computer Science"
  | "Economics"
  | "Statistics"
  | "English Literature"
  | "History"
  | "Psychology"
  | "Accounting"
  | "Electrical Engineering";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ResourceSort =
  | "newest"
  | "oldest"
  | "title_asc"
  | "title_desc"
  | "time_asc"
  | "time_desc";

export interface Resource {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subject: Subject;
  difficulty: Difficulty;
  estimatedStudyTimeMinutes: number;
  tags: string[];
  imageUrl?: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ResourceListResponse {
  success: true;
  items: Resource[];
  pagination: Pagination;
}

export interface ResourceFiltersState {
  search: string;
  subject: Subject | "";
  difficulty: Difficulty | "";
  sort: ResourceSort;
  page: number;
}

export interface CreateResourceInput {
  title: string;
  shortDescription: string;
  fullDescription: string;
  subject: Subject;
  difficulty: Difficulty;
  estimatedStudyTimeMinutes: number;
  tags: string[];
  imageUrl?: string;
}
