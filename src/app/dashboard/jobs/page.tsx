"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Calendar,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type JobRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  category: string | null;
  location: string;
  type: string;
  work_mode: string | null;
  updated_at: string | null;
  slug: string;
};

export default function DashboardJobsPage() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getJobs = async () => {
    const supabase = supabaseBrowserClient();
    return supabase
      .from("jobs")
      .select("id, title, status, category, location, type, work_mode, updated_at, slug")
      .order("updated_at", { ascending: false });
  };

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await getJobs();
    if (error) {
      toast.error("Unable to fetch jobs.");
    } else {
      setJobs(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadJobs = async () => {
      const { data, error } = await getJobs();
      if (error) {
        toast.error("Unable to fetch jobs.");
      } else {
        setJobs(data ?? []);
      }
      setLoading(false);
    };

    loadJobs();
  }, []);

  const handleToggleStatus = async (id: string, status: JobRow["status"]) => {
    const supabase = supabaseBrowserClient();
    const nextStatus = status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("jobs")
      .update({
        status: nextStatus,
        published_at: nextStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      toast.error("Unable to update status.");
      return;
    }

    toast.success(`Job marked as ${nextStatus}.`);
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this job? This will also delete all applications.");
    if (!confirmed) return;

    const supabase = supabaseBrowserClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete job.");
      return;
    }

    toast.success("Job posting deleted.");
    fetchJobs();
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === "all" || job.status === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Postings</h1>
          <p className="text-sm text-slate-500">
            Manage career opportunities and review incoming applications.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild className="h-9">
            <Link href="/jobs" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Site
            </Link>
          </Button>
          <Button asChild className="h-9 shadow-md shadow-primary/20">
            <Link href="/dashboard/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/30 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-slate-100/80 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-primary">All Roles</TabsTrigger>
                <TabsTrigger value="published" className="data-[state=active]:bg-white data-[state=active]:text-primary text-blue-600">Published</TabsTrigger>
                <TabsTrigger value="draft" className="data-[state=active]:bg-white data-[state=active]:text-primary text-orange-600">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search postings..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 space-y-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No job postings found</h3>
                <p className="text-sm text-slate-500 max-w-xs mt-1">
                  Ready to grow your team? Post your first job opening.
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/dashboard/jobs/new">Post New Job</Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group flex flex-col gap-4 p-5 transition-all duration-200 hover:bg-slate-50/50 md:flex-row md:items-center"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <Badge
                          variant={job.status === "published" ? "accent" : "secondary"}
                          className={cn(
                            "text-[10px] h-5 px-1.5",
                            job.status === "published" 
                              ? "bg-blue-50 text-blue-600 border-blue-100" 
                              : "bg-orange-50 text-orange-600 border-orange-100"
                          )}
                        >
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                          {job.type}
                        </span>
                        {job.category && (
                          <span className="flex items-center gap-1.5 bg-primary/5 px-2 py-0.5 rounded border border-primary/10 text-primary font-medium">
                            {job.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          Updated {job.updated_at ? new Date(job.updated_at).toLocaleDateString() : "Never"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="outline" size="sm" asChild className="h-9 rounded-lg bg-white shadow-sm border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        <Link href={`/dashboard/jobs/${job.id}/applications`}>
                          <Users className="mr-2 h-3.5 w-3.5" /> 
                          Applications
                        </Link>
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg">
                          <Link href={`/jobs/${job.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg">
                          <Link href={`/dashboard/jobs/${job.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 rounded-lg">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-48 p-1 rounded-xl border-slate-200 shadow-lg">
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-xs h-9 rounded-lg px-2"
                              onClick={() => handleToggleStatus(job.id, job.status)}
                            >
                              {job.status === "published" ? "Mark as draft" : "Publish posting"}
                            </Button>
                            <div className="my-1 h-px bg-slate-100" />
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-xs h-9 rounded-lg px-2 text-red-600 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Job
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
