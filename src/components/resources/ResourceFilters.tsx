"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBJECTS, DIFFICULTIES, SORT_OPTIONS } from "@/constants/resources";
import { ResourceFiltersState, Subject, Difficulty, ResourceSort } from "@/types/resource";

interface Props {
  filters: ResourceFiltersState;
  onChange: (filters: ResourceFiltersState) => void;
}

export function ResourceFilters({ filters, onChange }: Props) {
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchDraft !== filters.search) {
        onChange({ ...filters, search: searchDraft, page: 1 });
      }
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const hasActiveFilters = filters.search || filters.subject || filters.difficulty;

  const clearAll = () => {
    setSearchDraft("");
    onChange({ search: "", subject: "", difficulty: "", sort: "newest", page: 1 });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 sm:min-w-[220px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search resources by title or tag..."
          className="pl-9"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
        />
      </div>

      <Select
        value={filters.subject || "all"}
        onValueChange={(value) =>
          onChange({ ...filters, subject: value === "all" ? "" : (value as Subject), page: 1 })
        }
      >
        <SelectTrigger className="sm:w-[190px]">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All subjects</SelectItem>
          {SUBJECTS.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty || "all"}
        onValueChange={(value) =>
          onChange({
            ...filters,
            difficulty: value === "all" ? "" : (value as Difficulty),
            page: 1,
          })
        }
      >
        <SelectTrigger className="sm:w-[170px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          {DIFFICULTIES.map((d) => (
            <SelectItem key={d.value} value={d.value}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sort}
        onValueChange={(value) => onChange({ ...filters, sort: value as ResourceSort, page: 1 })}
      >
        <SelectTrigger className="sm:w-[190px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll}>
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}