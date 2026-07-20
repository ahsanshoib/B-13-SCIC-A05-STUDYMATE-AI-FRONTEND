"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LogOut, Mail, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your account details.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your StudyMate AI account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-64" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {user?.name ?? "—"}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {user?.email ?? "—"}
              </div>
            </>
          )}

          <Button variant="outline" onClick={handleSignOut} className="mt-2">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}