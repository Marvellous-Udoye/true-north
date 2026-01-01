"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fallbackImage = "/assets/hero-img.svg";
const pageSize = 4;

type BlogRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  category: string | null;
  updated_at: string | null;
  cover_image_url: string | null;
  excerpt: string | null;
};

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const fetchBlogs = async () => {
    setLoading(true);
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id, title, status, category, updated_at, cover_image_url, excerpt"
      )
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Unable to fetch blogs.");
    } else {
      setBlogs(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, []);

  const handleToggleStatus = async (id: string, status: BlogRow["status"]) => {
    const supabase = supabaseBrowserClient();
    const nextStatus = status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("blogs")
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

    toast.success("Blog status updated.");
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this blog? This action cannot be undone."
    );
    if (!confirmed) return;

    const supabase = supabaseBrowserClient();
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete blog.");
      return;
    }

    toast.success("Blog deleted.");
    fetchBlogs();
  };

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === activeTab);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
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
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-primary">Blogs</h1>
          <p className="text-sm text-muted-foreground">
            Manage published articles and drafts in one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/blogs">View site</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/blogs/new">New blog</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setPage(1);
            }}
          >
            <TabsList className="flex h-auto w-fit flex-wrap gap-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-primary/10 bg-white p-4"
                  >
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="mt-3 h-3 w-24" />
                  </div>
                ))
              ) : filteredBlogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 flex flex-col items-center justify-center text-center min-h-[400px] lg:min-h-[200px]">
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    No blogs yet
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                    Draft your first article or publish a new post to see it
                    here.
                  </p>
                </div>
              ) : (
                pagedBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="grid min-w-0 gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm md:grid-cols-[160px_1fr_auto] md:items-center"
                  >
                    <div className="relative h-32 overflow-hidden rounded-xl">
                      <Image
                        src={blog.cover_image_url || fallbackImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <p className="text-sm font-semibold text-primary break-words">
                        {blog.title}
                      </p>
                      {blog.excerpt ? (
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-lg break-words">
                          {blog.excerpt}
                        </p>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant={
                            blog.status === "published" ? "accent" : "secondary"
                          }
                        >
                          {blog.status}
                        </Badge>
                        {blog.category ? (
                          <span className="text-xs py-2 px-3 rounded-md border">
                            {blog.category}
                          </span>
                        ) : null}
                      </div>
                      {blog.updated_at ? (
                        <span className="text-xs text-muted-foreground">
                          Updated{" "}
                          {new Date(blog.updated_at).toLocaleDateString()}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleToggleStatus(blog.id, blog.status)}
                      >
                        {blog.status === "published"
                          ? "Move to draft"
                          : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
          {!loading && totalPages > 1 ? (
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
                      <span className="px-2 text-xs text-muted-foreground">...</span>
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
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
