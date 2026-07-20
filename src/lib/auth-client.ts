import { createAuthClient } from "better-auth/react";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const authBaseUrl = rawApiUrl
  ? rawApiUrl.endsWith("/api")
    ? rawApiUrl.slice(0, -4)
    : rawApiUrl
  : "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;