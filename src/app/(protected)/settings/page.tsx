"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Moon, Sun, Bell, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { authClient } from "@/lib/auth-client";

const nameSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
});

type NameForm = z.infer<typeof nameSchema>;

const NOTIFICATIONS_KEY = "studymate-notification-prefs";

interface NotificationPrefs {
  studyReminders: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

const DEFAULT_PREFS: NotificationPrefs = {
  studyReminders: true,
  weeklyDigest: true,
  productUpdates: false,
};

export default function SettingsPage() {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = window.localStorage.getItem(NOTIFICATIONS_KEY);
    if (stored) setPrefs(JSON.parse(stored));
  }, []);

  const updatePref = (key: keyof NotificationPrefs, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(next));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    values: { name: user?.name ?? "" },
  });

  const onSubmit = async (data: NameForm) => {
    const { error } = await authClient.updateUser({ name: data.name });
    if (error) {
      toast.error(error.message ?? "Could not update your name");
      return;
    }
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your profile and preferences.</p>

      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <UserIcon className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            {isDark ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
            <CardTitle className="text-sm">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Dark mode</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes.</p>
              </div>
              <Switch checked={isDark} onCheckedChange={toggle} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Bell className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Notifications</CardTitle>
            <CardDescription className="sr-only">Notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Study reminders</p>
                <p className="text-xs text-muted-foreground">Nudges based on your daily schedule.</p>
              </div>
              <Switch
                checked={prefs.studyReminders}
                onCheckedChange={(v) => updatePref("studyReminders", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Weekly digest</p>
                <p className="text-xs text-muted-foreground">A summary of your study activity each week.</p>
              </div>
              <Switch checked={prefs.weeklyDigest} onCheckedChange={(v) => updatePref("weeklyDigest", v)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Product updates</p>
                <p className="text-xs text-muted-foreground">New features and improvements.</p>
              </div>
              <Switch
                checked={prefs.productUpdates}
                onCheckedChange={(v) => updatePref("productUpdates", v)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}