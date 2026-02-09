"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Clock,
  ExternalLink,
  Filter,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const fallbackImage = "/assets/hero-img.svg";
const pageSize = 5;

type BlogRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  category: string | null;
  updated_at: string | null;
  cover_image_url: string | null;
  excerpt: string | null;
  slug: string;
};

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getBlogs = async () => {
    const supabase = supabaseBrowserClient();
    return supabase
      .from("blogs")
      .select(
        "id, title, status, category, updated_at, cover_image_url, excerpt, slug"
      )
      .order("updated_at", { ascending: false });
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await getBlogs();
    if (error) {
      toast.error("Unable to fetch blogs.");
    } else {
      setBlogs(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadBlogs = async () => {
      const { data, error } = await getBlogs();
      if (error) {
        toast.error("Unable to fetch blogs.");
      } else {
        setBlogs(data ?? []);
      }
      setLoading(false);
    };

    loadBlogs();
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

    toast.success(`Blog moved to ${nextStatus}.`);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog? This action is permanent."
    );
    if (!confirmed) return;

    const supabase = supabaseBrowserClient();
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete blog.");
      return;
    }

    toast.success("Blog deleted successfully.");
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTab = activeTab === "all" || blog.status === activeTab;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blogs</h1>
          <p className="text-sm text-slate-500">
            Create, manage and publish articles for your audience.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild className="h-9">
            <Link href="/blogs" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Site
            </Link>
          </Button>
          <Button asChild className="h-9 shadow-md shadow-primary/20">
            <Link href="/dashboard/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/30 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setPage(1);
              }}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-slate-100/80 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">All Posts</TabsTrigger>
                <TabsTrigger value="published" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-blue-600">Published</TabsTrigger>
                <TabsTrigger value="draft" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-orange-600">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4 text-slate-500" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-16 w-24 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))
            ) : filteredBlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No articles found</h3>
                <p className="text-sm text-slate-500 max-w-xs mt-1">
                  Try adjusting your search or filters, or create a new blog post to get started.
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/dashboard/blogs/new">Create Your First Post</Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {pagedBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group flex flex-col gap-4 p-4 transition-colors hover:bg-slate-50/50 md:flex-row md:items-center"
                  >
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      <Image
                        src={blog.cover_image_url || fallbackImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <Badge
                          variant={blog.status === "published" ? "accent" : "secondary"}
                          className={cn(
                            "text-[10px] h-5 px-1.5",
                            blog.status === "published" 
                              ? "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100" 
                              : "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100"
                          )}
                        >
                          {blog.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 capitalize text-primary font-medium">
                          {blog.category || "Uncategorized"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {blog.updated_at ? new Date(blog.updated_at).toLocaleDateString() : "Never"}
                        </span>
                        <span className="hidden sm:inline line-clamp-1 max-w-sm">
                          {blog.excerpt || "No excerpt provided"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5">
                        <Link href={`/blogs/${blog.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5">
                        <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-48 p-1 rounded-xl border-slate-200 shadow-lg">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-xs h-9 rounded-lg"
                            onClick={() => handleToggleStatus(blog.id, blog.status)}
                          >
                            {blog.status === "published" ? "Move to drafts" : "Publish now"}
                          </Button>
                          <div className="my-1 h-px bg-slate-100" />
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-xs h-9 rounded-lg text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Post
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
        
        {!loading && totalPages > 1 ? (
          <div className="border-t border-slate-100 bg-slate-50/30 p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    aria-label="Previous page"
                    disabled={currentPage === 1}
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
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </Card>
    </motion.div>
  );
}
