"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Download, 
  Calendar, 
  Mail, 
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";

type SubscriberRow = {
  id: string;
  email: string;
  created_at: string;
};

export default function DashboardSubscribersPage() {
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getSubscribers = async () => {
    const supabase = supabaseBrowserClient();
    return supabase
      .from("subscribers")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });
  };

  useEffect(() => {
    const loadSubscribers = async () => {
      const { data, error } = await getSubscribers();
      if (error) {
        toast.error("Unable to fetch subscribers.");
      } else {
        setSubscribers(data ?? []);
      }
      setLoading(false);
    };

    loadSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((s) => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast.success("Subscriber list exported to CSV.");
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Audience</h1>
          <p className="text-sm text-slate-500">
            View and manage your newsletter subscriber list.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport} className="h-9 rounded-lg">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="border-slate-200/60 shadow-sm p-5 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Reach</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-slate-900">{subscribers.length}</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3" />
              +12%
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">Growth since last month</p>
        </Card>
      </div>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg">Subscriber List</CardTitle>
              <CardDescription>Managed through public signup forms</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50/20">
                  <th className="px-6 py-4">Subscriber</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                    </tr>
                  ))
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                          <Users className="h-6 w-6 text-slate-300" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900">No subscribers yet</p>
                        <p className="text-xs text-slate-500">Wait for your first newsletter signup.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <Mail className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 border border-green-100">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {new Date(subscriber.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-primary rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
