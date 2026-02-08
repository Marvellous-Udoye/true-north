"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type JobApplication = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  resume_url: string | null;
  cover_letter: string | null;
  created_at: string;
};

type JobMeta = {
  title: string;
};

export default function JobApplicationsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [job, setJob] = useState<JobMeta | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const supabase = supabaseBrowserClient();
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("title")
        .eq("id", params.id)
        .single();

      if (jobError || !jobData) {
        toast.error("Unable to load job.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .select(
          "id, first_name, last_name, email, phone, country, resume_url, cover_letter, created_at"
        )
        .eq("job_id", params.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Unable to fetch applications.");
      } else {
        setApplications(data ?? []);
      }

      setJob(jobData);
      setLoading(false);
    };

    fetchApplications();
  }, [params.id]);

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-primary">
            Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            {job ? `Applicants for ${job.title}` : "Loading job details..."}
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to jobs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applicant list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-primary/10 bg-white p-4"
              >
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-3 h-3 w-32" />
                <Skeleton className="mt-2 h-3 w-20" />
              </div>
            ))
          ) : applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
              <p className="text-base font-semibold text-primary">
                No applications yet
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Once candidates apply, their details will appear here.
              </p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-primary">
                      {app.first_name} {app.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {app.email} · {app.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {app.country} •{" "}
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {app.resume_url ? (
                    <Button variant="outline" asChild>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    </Button>
                  ) : null}
                </div>
                {app.cover_letter ? (
                  <div className="mt-4 rounded-lg border border-primary/10 bg-primary/5 p-4 text-sm text-muted-foreground">
                    {app.cover_letter}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
