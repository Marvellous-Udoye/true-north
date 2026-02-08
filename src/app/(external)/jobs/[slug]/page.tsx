import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { JobApplyForm } from "../_components/job-apply-form";
import { supabaseServerClientReadonly } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

type Job = {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  type: string;
  work_mode: string | null;
  category: string | null;
  salary_range: string | null;
  published_at: string | null;
  created_at: string;
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  noStore();
  const { slug } = await params;
  const supabase = supabaseServerClientReadonly();
  const decodedSlug = decodeURIComponent(slug);

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "id, title, slug, description, location, type, work_mode, category, salary_range, published_at, created_at"
    )
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .maybeSingle();

  if (!job) {
    notFound();
  }

  const postDate = job.published_at || job.created_at;

  return (
    <main className="bg-[#f7f9fc]">
      <section className="border-b border-primary/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
          <Link
            href="/jobs"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to jobs
          </Link>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {job.category || "Opportunity"}
              </Badge>
              <span>{job.type}</span>
              {job.work_mode ? <span>{job.work_mode}</span> : null}
              <span>{job.location}</span>
              {postDate ? (
                <span>{new Date(postDate).toLocaleDateString()}</span>
              ) : null}
            </div>
            <h1 className="text-3xl font-semibold text-primary md:text-4xl">
              {job.title}
            </h1>
            {job.salary_range ? (
              <p className="text-sm text-muted-foreground">
                Compensation:{" "}
                <span className="font-semibold text-primary">
                  {job.salary_range}
                </span>
              </p>
            ) : null}
            <p className="text-base text-muted-foreground">
              Review the role details below, then submit your application.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-primary">
              Job Description
            </h2>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {job.description}
            </div>
          </div>
          <div>
            <JobApplyForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
