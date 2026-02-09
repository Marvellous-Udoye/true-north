"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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

const pageSize = 6;

export function JobsListSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All roles");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("jobs")
        .select(
          "id, title, slug, location, type, work_mode, category, published_at, created_at",
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

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(jobs.map((j) => j.category).filter(Boolean)),
    );
    return ["All roles", ...uniqueCategories];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const normalizedFilter = activeCategory.toLowerCase();

    return jobs.filter((job) => {
      const matchesFilter =
        normalizedFilter === "all roles" ||
        (job.category ?? "").toLowerCase() === normalizedFilter;
      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        (job.location ?? "").toLowerCase().includes(term) ||
        (job.category ?? "").toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeCategory, jobs]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pages = useMemo(() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  return (
    <section
      ref={sectionRef}
      id="jobs"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Current Openings
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Our{" "}
              <span className="text-primary italic font-serif">Strategic</span>{" "}
              Roles
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Explore curated opportunities at leading organizations where you
              can make a meaningful impact.
            </p>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search roles or locations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="h-12 w-full rounded-2xl border-none bg-white pl-11 shadow-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-nowrap overflow-x-auto pb-4 gap-3 no-scrollbar">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveCategory(filter);
                setPage(1);
              }}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all duration-300 cursor-pointer shadow-none",
                filter === activeCategory
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-500 border-slate-200 hover:border-primary/30 hover:text-primary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2.5rem] border border-slate-100 bg-slate-50/30 p-8 space-y-4"
              >
                <Skeleton className="h-8 w-1/3 rounded-lg" />
                <Skeleton className="h-4 w-1/4 rounded-lg" />
              </div>
            ))
          ) : pagedJobs.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {pagedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 transition-all duration-500 hover:border-primary/40 md:p-10 shadow-none"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1.5 rounded-md"
                        >
                          {job.category}
                        </Badge>
                        <div className="size-1 rounded-full bg-slate-200" />
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <Clock className="size-3" />
                          {new Date(
                            job.published_at || job.created_at,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 group-hover:text-primary transition-colors tracking-tighter leading-none">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-bold text-slate-500">
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/50">
                              <MapPin className="size-4" />
                            </div>
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                              <Briefcase className="size-4" />
                            </div>
                            {job.type}
                            {job.work_mode ? ` · ${job.work_mode}` : ""}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <Button
                        asChild
                        className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all group shadow-none border-none"
                      >
                        <Link href={`/jobs/${job.slug}`}>
                          Apply
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <Layers className="size-12 text-slate-300 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 uppercase">
                No roles found
              </h3>
              <p className="text-slate-500 font-medium max-w-sm mt-2">
                Adjust your keywords or select a different category to see all
                roles.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All roles");
                  setPage(1);
                }}
                className="mt-6 text-primary font-black uppercase text-xs tracking-[0.2em]"
              >
                Clear All filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination - Aligned with Blogs UI */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <Pagination className="bg-white p-2 rounded-full border border-slate-200 shadow-none">
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-full h-10 w-10 border-none hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
                {pages.map((p, i) => (
                  <PaginationItem key={i}>
                    {p === "..." ? (
                      <span className="px-2">...</span>
                    ) : (
                      <PaginationButton
                        isActive={p === currentPage}
                        onClick={() => handlePageChange(p as number)}
                        className={cn(
                          "rounded-full h-10 w-10 border-none transition-all font-bold text-sm cursor-pointer",
                          p === currentPage
                            ? "bg-primary text-white"
                            : "hover:bg-slate-50",
                        )}
                      >
                        {p}
                      </PaginationButton>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationButton
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-full h-10 w-10 border-none hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
