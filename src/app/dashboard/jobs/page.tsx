"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type JobRow = {
  id: string;
  title: string;
  location: string;
  type: string;
  work_mode: string | null;
  category: string | null;
  status: "draft" | "published";
  updated_at: string | null;
};

export default function DashboardJobsPage() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
      .from("jobs")
      .select(
        "id, title, location, type, work_mode, category, status, updated_at"
      )
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Unable to fetch jobs.");
    } else {
      setJobs(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs();
  }, []);

  const handleToggleStatus = async (id: string, status: JobRow["status"]) => {
    const supabase = supabaseBrowserClient();
    const nextStatus = status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("jobs")
      .update({
        status: nextStatus,
        published_at:
          nextStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      toast.error("Unable to update status.");
      return;
    }

    toast.success("Job status updated.");
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this job? This action cannot be undone."
    );
    if (!confirmed) return;

    const supabase = supabaseBrowserClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete job.");
      return;
    }

    toast.success("Job deleted.");
    fetchJobs();
  };

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-primary">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Create roles and track incoming applications.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/jobs">View site</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/jobs/new">New job</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job listings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-primary/10 bg-white p-4"
              >
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-3 h-3 w-24" />
                <Skeleton className="mt-2 h-3 w-32" />
              </div>
            ))
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
              <p className="text-base font-semibold text-primary">
                No jobs published yet
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Create a new role to start accepting applications.
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <p className="text-base font-semibold text-primary">
                    {job.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge
                      variant={
                        job.status === "published" ? "accent" : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                    {job.category ? <span>{job.category}</span> : null}
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    {job.work_mode ? <span>{job.work_mode}</span> : null}
                  </div>
                  {job.updated_at ? (
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(job.updated_at).toLocaleDateString()}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/jobs/${job.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/jobs/${job.id}/applications`}>
                      Applications
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleToggleStatus(job.id, job.status)}
                  >
                    {job.status === "published"
                      ? "Move to draft"
                      : "Publish"}
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(job.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
