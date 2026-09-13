"use client";

import { useAuthContext } from "@/context/AuthContext";

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
  const { user, loading } = useAuthContext();

  return {
    user: user
      ? {
          id: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "User",
          email: user.email || "",
          image: user.photoURL || null,
        }
      : null,
    isLoading: loading,
    isAuthenticated: !!user,
  };
}