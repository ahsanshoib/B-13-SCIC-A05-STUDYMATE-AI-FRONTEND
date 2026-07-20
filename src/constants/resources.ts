import { Subject, Difficulty, ResourceSort } from "@/types/resource";

export const SUBJECTS: Subject[] = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Statistics",
  "English Literature",
  "History",
  "Psychology",
  "Accounting",
  "Electrical Engineering",
];

export const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const SORT_OPTIONS: { value: ResourceSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title_asc", label: "Title (A–Z)" },
  { value: "title_desc", label: "Title (Z–A)" },
  { value: "time_asc", label: "Shortest study time" },
  { value: "time_desc", label: "Longest study time" },
];