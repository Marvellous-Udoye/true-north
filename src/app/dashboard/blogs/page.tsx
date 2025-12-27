"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type BlogRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  category: string | null;
  updated_at: string | null;
};

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchBlogs = async () => {
    setLoading(true);
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, status, category, updated_at")
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
        published_at: nextStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      toast.error("Unable to update status.");
      return;
    }

    toast.success("Blog status updated.");
    fetchBlogs();
  };

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === activeTab);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Blogs</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage published articles and drafts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" className="border-primary/10">
            <Link href="/blogs">View site</Link>
          </Button>
          <Button asChild className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            <Link href="/dashboard/blogs/new">New blog</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-lg border border-primary/10 p-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="mt-3 h-3 w-24" />
                  </div>
                ))
              : filteredBlogs.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
                    <p className="text-sm font-semibold text-primary">No blogs yet</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Draft your first article or publish a new post to see it here.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <Button asChild className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
                        <Link href="/dashboard/blogs/new">Create a blog</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/blogs">View public blog</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex flex-col gap-3 rounded-lg border border-primary/10 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary">{blog.title}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant={blog.status === "published" ? "accent" : "secondary"}
                        >
                          {blog.status}
                        </Badge>
                        {blog.category ? <span>{blog.category}</span> : null}
                        {blog.updated_at ? (
                          <span>Updated {new Date(blog.updated_at).toLocaleDateString()}</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/dashboard/blogs/${blog.id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleToggleStatus(blog.id, blog.status)}
                      >
                        {blog.status === "published" ? "Move to draft" : "Publish"}
                      </Button>
                    </div>
                  </div>
                )))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
