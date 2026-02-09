import { Button } from "@/components/ui/button";
import { supabaseServerClientReadonly } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobApplyForm } from "../_components/job-apply-form";
import { ShareRoleButton } from "../_components/share-role-button";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  noStore();
  const { slug } = await params;
  const supabase = supabaseServerClientReadonly();
  const decodedSlug = decodeURIComponent(slug);
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "https";

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "id, title, slug, description, location, type, work_mode, category, salary_range, published_at, created_at",
    )
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .maybeSingle();

  if (!job) {
    notFound();
  }

  const postDate = job.published_at || job.created_at;
  const shareUrl = host
    ? `${proto}://${host}/jobs/${job.slug}`
    : `/jobs/${job.slug}`;

  const quickFacts = [
    {
      label: "Location",
      value: job.location,
      icon: MapPin,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Employment",
      value: job.type,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Work Mode",
      value: job.work_mode || "Flexible",
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Posted On",
      value: new Date(postDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="absolute top-0 left-0 size-64 border border-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
          <Link
            href="/jobs"
            className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all mb-12"
          >
            <ChevronLeft className="mr-1 size-3.5 transition-transform group-hover:-translate-x-1" />
            Explore All Roles
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_auto] items-end">
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                  {job.category || "Active Opening"}
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] break-words uppercase">
                {job.title.split(" ").map((word: string, i: number) => (
                  <span
                    key={i}
                    className={
                      i % 4 === 3 ? "text-primary italic font-serif" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 group">
                  <div className="size-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center transition-transform group-hover:scale-110">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Location
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Briefcase className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Type
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {job.type}
                    </p>
                  </div>
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-3 group">
                    <div className="size-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center transition-transform group-hover:scale-110">
                      <DollarSign className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Salary
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {job.salary_range}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ShareRoleButton title={job.title} url={shareUrl} />
              <Button
                className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-none group"
                asChild
              >
                <a href="#apply">
                  Apply Now
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 md:px-10 ">
          <div className="grid gap-16 lg:grid-cols-[1fr_380px] items-start">
            <div className="space-y-12">
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-10 md:p-16 relative overflow-hidden transition-all">
                <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-bl-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-10">
                  <div className="size-10 sm:size-14 rounded-lg sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                    <Briefcase className="size-5 sm:size-7" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase italic">
                    Role{" "}
                    <span className="text-primary not-italic">Overview</span>
                  </h2>
                </div>

                <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-li:leading-relaxed text-slate-600 font-medium">
                  <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base md::text-lg">
                    {job.description}
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="p-10 rounded-[2.5rem] bg-[#0f1f4a] text-white flex flex-col justify-between gap-10 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 size-24 border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                  <Sparkles className="size-10 text-orange-500" />
                  <div>
                    <h4 className="text-2xl font-black uppercase italic leading-none mb-4">
                      Strategic{" "}
                      <span className="not-italic text-white/50">
                        Partnership.
                      </span>
                    </h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                      We don&apos;t just fill roles; we build teams that drive
                      long-term business excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-8 sticky top-28">
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 overflow-hidden relative">
                <div className="flex flex-col gap-8">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="flex items-center gap-5">
                      <div
                        className={cn(
                          "size-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100",
                          fact.bg,
                        )}
                      >
                        <fact.icon className={cn("size-5", fact.color)} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                          {fact.label}
                        </p>
                        <p className="text-sm font-black text-slate-900 tracking-tight">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-10 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-primary">
                    <CheckCircle2 className="size-5" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Active Recruitment
                    </span>
                  </div>
                </div>
              </div>

              <div id="apply" className="scroll-mt-32">
                <JobApplyForm jobId={job.id} jobTitle={job.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
