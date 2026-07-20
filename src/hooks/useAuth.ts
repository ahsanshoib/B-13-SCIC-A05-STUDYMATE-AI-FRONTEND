"use client";

import { useSession } from "@/lib/auth-client";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface UseAuthResult {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthResult {
  const { data, isPending } = useSession();

  return {
    user: data?.user
      ? {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
        }
      : null,
    isLoading: isPending,
    isAuthenticated: !!data?.user,
  };
}