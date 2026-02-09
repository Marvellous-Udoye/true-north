"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  FileText, 
  Users, 
  Mail, 
  Briefcase, 
  Plus, 
  ArrowUpRight, 
  Clock,
  ExternalLink,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardStats = {
  blogs: number;
  drafts: number;
  contacts: number;
  subscribers: number;
  jobs: number;
};

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = supabaseBrowserClient();
      const [
        { count: blogs },
        { count: drafts },
        { count: contacts },
        { count: subscribers },
        { count: jobs },
      ] = await Promise.all([
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase
          .from("blogs")
          .select("id", { count: "exact", head: true })
          .eq("status", "draft"),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("subscribers")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("jobs")
          .select("id", { count: "exact", head: true }),
      ]);

      setStats({
        blogs: blogs ?? 0,
        drafts: drafts ?? 0,
        contacts: contacts ?? 0,
        subscribers: subscribers ?? 0,
        jobs: jobs ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const quickActions = [
    { label: "New Blog Post", href: "/dashboard/blogs/new", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Post a Job", href: "/dashboard/jobs/new", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "View Contacts", href: "/dashboard/contacts", icon: Mail, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Check Subscribers", href: "/dashboard/subscribers", icon: Users, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Welcome back. Here&apos;s what&apos;s happening with TrueNorth today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 shadow-sm" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Site
            </Link>
          </Button>
          <Button className="h-9 shadow-md shadow-primary/20" asChild>
            <Link href="/dashboard/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-slate-200/60 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="mt-2 h-3 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatCard 
              title="Published Blogs" 
              value={stats?.blogs ?? 0} 
              icon={FileText} 
              description={`${stats?.drafts ?? 0} drafts in progress`}
              trend="+2 this week"
            />
            <StatCard 
              title="Open Jobs" 
              value={stats?.jobs ?? 0} 
              icon={Briefcase} 
              description="Active opportunities"
              trend="New applications"
            />
            <StatCard 
              title="Contact Messages" 
              value={stats?.contacts ?? 0} 
              icon={Mail} 
              description="Customer inquiries"
              trend="Requires reply"
            />
            <StatCard 
              title="Total Subscribers" 
              value={stats?.subscribers ?? 0} 
              icon={Users} 
              description="Newsletter growth"
              trend="Growing steady"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-slate-200/60 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Commonly used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link 
                  key={action.label} 
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-slate-50 hover:shadow-sm"
                >
                  <div className={cn("flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110", action.bg)}>
                    <action.icon className={cn("h-6 w-6", action.color)} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{action.label}</p>
                    <p className="text-xs text-slate-500">Click to get started</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-slate-200/60 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-lg">Platform Status</CardTitle>
            <CardDescription>Real-time system health</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                <div className="size-2 animate-pulse rounded-full bg-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">System Online</p>
                <p className="text-xs text-slate-500">All services are operational</p>
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Stable</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Last backup</span>
                </div>
                <span className="font-medium text-slate-900">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span>Active Jobs</span>
                </div>
                <span className="font-medium text-slate-900">{stats?.jobs ?? 0} published</span>
              </div>
            </div>

            <Button variant="outline" className="w-full text-xs h-9" asChild>
              <Link href="/dashboard/profile">Manage Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  trend: string;
};

function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="border-slate-200/60 shadow-sm transition-all duration-200 hover:shadow-md group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <span className="font-semibold text-primary">{trend}</span>
          <span className="text-slate-300">•</span>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
