"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLOG_FILTERS } from "@/lib/blog-categories";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
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
  const [dateAfter, setDateAfter] = useState<Date | undefined>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const normalizedFilter = activeFilter.toLowerCase();
    const dateFilter = dateAfter ?? null;

    const filtered = posts.filter((post) => {
      const matchesFilter =
        normalizedFilter === "all articles" ||
        (post.category ?? "").toLowerCase() === normalizedFilter;
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        (post.excerpt ?? "").toLowerCase().includes(term) ||
        (post.author ?? "").toLowerCase().includes(term);
      const postDate = getPostDate(post);
      const matchesDate =
        !dateFilter || (postDate && new Date(postDate) >= dateFilter);

      return matchesFilter && matchesSearch && matchesDate;
    });

    const sorted = [...filtered].sort((a, b) => {
      const left = new Date(getPostDate(a)).getTime();
      const right = new Date(getPostDate(b)).getTime();
      return right - left;
    });

    return sorted;
  }, [searchTerm, activeFilter, dateAfter, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setActiveFilter(BLOG_FILTERS[0]);
    setDateAfter(undefined);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pages = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
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
      className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute right-0 sm:right-0 top-0 h-12 sm:h-20 w-64 opacity-70"
        style={{
          backgroundImage: "url('/assets/testimonials-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2 lg:max-w-xl">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              All Blogs Collection
            </h2>
            <p className="text-base text-muted-foreground">
              Discover fresh insights curated for leaders, operators, and career
              builders.
            </p>
          </div>
          <div className="flex w-full gap-3 lg:max-w-md">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPage(1);
                }}
                className="w-full pl-11"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap overflow-y-auto gap-2">
          {BLOG_FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`rounded-md cursor-pointer border whitespace-nowrap px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? "border-[#EE4312] bg-[#EE4312] text-white"
                    : "border-primary/10 bg-white text-primary hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden bg-white py-0">
                  <div className="relative h-48 overflow-hidden">
                    <Skeleton className="h-full w-full" />
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                  <CardContent className="space-y-3 px-5 pb-5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))
            : pagedPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.03 }}
                >
                  <Link href={`/blogs/${post.slug}`} className="group h-full">
                    <Card className="flex h-full flex-col overflow-hidden bg-white py-0">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.cover_image_url || fallbackImage}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <Badge
                          variant="secondary"
                          className="absolute left-4 top-4 rounded-md px-3 py-1 bg-muted capitalize"
                        >
                          {post.category || "Insights"}
                        </Badge>
                      </div>
                      <CardContent className="flex flex-1 flex-col space-y-3 px-5 pb-5 text-primary">
                        <h3 className="text-base font-semibold">{post.title}</h3>
                        {post.excerpt ? (
                          <p className="text-base text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        ) : null}
                        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                          {getPostDate(post) ? (
                            <span>
                              {new Date(getPostDate(post)).toLocaleDateString()}
                            </span>
                          ) : (
                            <span>Recently added</span>
                          )}
                          <span className="font-semibold text-[#EE4312]">
                            Read More
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
        </div>

        {!loading && pagedPosts.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Search className="size08" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-primary">
                  No articles found
                </p>
                <p className="text-base text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationButton
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationButton>
            </PaginationItem>
            {pages.map((pageNumber, index) => (
              <PaginationItem key={`${pageNumber}-${index}`}>
                {pageNumber === "..." ? (
                  <span className="px-2 text-xs text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <PaginationButton
                    isActive={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber as number)}
                  >
                    {pageNumber}
                  </PaginationButton>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationButton
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationButton>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
