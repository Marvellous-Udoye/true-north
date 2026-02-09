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
import { BLOG_FILTERS } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Layers, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  content: string | null;
  published_at: string | null;
  created_at: string | null;
};

type BlogsMainSectionProps = {
  posts: BlogPost[];
};

const pageSize = 6;
const fallbackImage = "/assets/hero-img.svg";

const getPostDate = (post: BlogPost) =>
  post.published_at || post.created_at || "";

export function BlogsMainSection({ posts }: BlogsMainSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(BLOG_FILTERS[0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const normalizedFilter = activeFilter.toLowerCase();

    return posts
      .filter((post) => {
        const matchesFilter =
          normalizedFilter === "all articles" ||
          (post.category ?? "").toLowerCase() === normalizedFilter;
        const matchesSearch =
          !term ||
          post.title.toLowerCase().includes(term) ||
          (post.excerpt ?? "").toLowerCase().includes(term);

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        return (
          new Date(getPostDate(b)).getTime() -
          new Date(getPostDate(a)).getTime()
        );
      });
  }, [searchTerm, activeFilter, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // const handleFilterChange = (filter: string) => {
  //   setActiveFilter(filter);
  //   setPage(1);
  // };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pages = (() => {
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
  })();

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-xl ">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our{" "}
              <span className="text-primary italic font-serif">Curated</span>{" "}
              Collection
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Discover fresh perspectives on leadership, recruitment, and
              high-growth strategies.
            </p>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by topic or title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="h-12 w-full rounded-2xl border-none bg-white pl-11 shadow-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* <div className="mb-10 flex flex-nowrap overflow-x-auto pb-4 gap-3 no-scrollbar">
          {BLOG_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all duration-300 cursor-pointer",
                filter === activeFilter
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-500 border-slate-200 hover:border-primary/30 hover:text-primary",
              )}
            >
              {filter}
            </button>
          ))}
        </div> */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-[2.5rem]">
                <Skeleton className="h-48 w-full rounded-[2rem] mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {pagedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative flex flex-col rounded-[2.5rem] transition-all duration-500"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="absolute inset-0 z-10"
                  />

                  <div className="flex-1 flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-slate-100 mb-6">
                      <Image
                        src={post.cover_image_url || fallbackImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <Badge className="absolute left-4 top-4 bg-white/90 backdrop-blur-md text-primary border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1.5">
                        {post.category || "Insights"}
                      </Badge>
                    </div>

                    <div className="px-3 space-y-4 pb-6">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar className="size-3.5" />
                        {new Date(getPostDate(post)).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                        <div className="size-1 rounded-full bg-slate-200" />
                        <Clock className="size-3.5 ml-1" />
                        <span>5 min</span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-slate-500 text-sm font-medium line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-auto px-3 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-900 group-hover:underline">
                        Read Article
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && pagedPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <Layers className="size-12 text-slate-300 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900">
              No articles found
            </h3>
            <p className="text-slate-500 max-w-sm mt-2">
              Try adjusting your keywords or selecting a different category.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("");
                setActiveFilter(BLOG_FILTERS[0]);
              }}
              className="mt-6 text-primary font-bold"
            >
              Clear all search filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <Pagination className="bg-white p-2 rounded-full border border-slate-200">
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-full h-10 w-10 border-none hover:bg-slate-50"
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
                          "rounded-full h-10 w-10 border-none transition-all font-bold text-sm",
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
                    className="rounded-full h-10 w-10 border-none hover:bg-slate-50"
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

import { Calendar } from "lucide-react";
