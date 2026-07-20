"use client";

import Link from "next/link";
import { BookOpen, CalendarCheck, FileText, MessagesSquare, ArrowRight, AlertCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AiActivityChart } from "@/components/dashboard/AiActivityChart";
import { AiFeatureUsageChart } from "@/components/dashboard/AiFeatureUsageChart";
import { ResourcesBySubjectChart } from "@/components/dashboard/ResourcesBySubjectChart";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboardSummary } from "@/hooks/useDashboard";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/format";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useDashboardSummary();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {user?.name ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Here's how your studying is going.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : isError || !data ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 py-16 text-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-sm text-destructive">Couldn&apos;t load your dashboard. Try refreshing.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Resources added"
                value={data.stats.resourcesAdded}
                icon={BookOpen}
                accent="primary"
              />
              <StatCard
                label="Study plans generated"
                value={data.stats.studyPlansGenerated}
                icon={CalendarCheck}
                accent="accent"
              />
              <StatCard
                label="Documents analyzed"
                value={data.stats.documentsAnalyzed}
                icon={FileText}
                accent="signal"
              />
              <StatCard
                label="Chat messages sent"
                value={data.stats.chatMessagesSent}
                icon={MessagesSquare}
                accent="primary"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AiActivityChart data={data.aiActivityByDay} />
              <AiFeatureUsageChart data={data.aiUsageByFeature} />
            </div>

            <ResourcesBySubjectChart data={data.resourcesBySubject} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm">Latest study plan</CardTitle>
                  <Link href="/ai/planner">
                    <Button variant="ghost" size="sm">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {data.latestStudyPlan ? (
                    <div className="text-sm text-muted-foreground">
                      Targeting <span className="font-medium text-foreground">{data.latestStudyPlan.targetGrade}</span>{" "}
                      · Exam on {formatDate(data.latestStudyPlan.examDate)} · Version {data.latestStudyPlan.version}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You haven&apos;t generated a study plan yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm">Recent documents</CardTitle>
                  <Link href="/ai/documents">
                    <Button variant="ghost" size="sm">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {data.recentDocuments.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {data.recentDocuments.map((doc) => (
                        <li key={doc._id} className="flex items-center justify-between gap-2">
                          <span className="truncate text-foreground">{doc.fileName}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatDate(doc.createdAt)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No documents analyzed yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}