import { NextResponse } from "next/server";

// NOTE: Edge middleware can't reliably check auth when the frontend and
// backend live on different domains (e.g. vercel.app + onrender.com), since
// the session cookie belongs to the backend's domain and is never visible
// here. Route protection is handled client-side instead (see
// components/shared/RequireAuth.tsx).
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
