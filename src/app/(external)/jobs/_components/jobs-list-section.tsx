"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  work_mode: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
};

export function JobsListSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("jobs")
        .select(
          "id, title, slug, location, type, work_mode, category, published_at, created_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.category ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.location ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-bold text-primary">Open Positions</h2>
            <p className="text-muted-foreground">
              Browse our current openings and find the perfect match for your
              skills and aspirations.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs..."
              className="h-10 w-full bg-white pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white bg-white p-6 shadow-sm">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => {
              const postDate = job.published_at || job.created_at;
              const dateLabel = new Date(postDate).toLocaleDateString();

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative flex flex-col justify-between gap-4 rounded-xl border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none">
                        {job.category}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" /> {dateLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-[#EE4312] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="mr-1.5 h-4 w-4 text-[#EE4312]" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="mr-1.5 h-4 w-4 text-[#EE4312]" />
                        {job.type}
                        {job.work_mode ? ` · ${job.work_mode}` : ""}
                      </span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-[#EE4312] text-white hover:bg-[#cf3a10] md:w-auto"
                  >
                    <Link href={`/jobs/${job.slug}`}>
                      View Details <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                No jobs found matching your search.
              </p>
              <Button
                variant="link"
                className="mt-2 text-primary"
                onClick={() => setSearchTerm("")}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        <div className="mt-16 rounded-2xl bg-[#0f1f4a] p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Don&apos;t see a perfect fit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/70">
            Submit your resume to our talent pool, and we&apos;ll notify you when
            an opportunity that matches your profile opens up.
          </p>
          <Button
            asChild
            className="bg-white text-[#0f1f4a] hover:bg-white/90"
          >
            <Link href="/contact">Join Our Talent Pool</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
