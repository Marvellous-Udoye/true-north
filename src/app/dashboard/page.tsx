"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

type DashboardStats = {
  blogs: number;
  drafts: number;
  contacts: number;
  subscribers: number;
};

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = supabaseBrowserClient();
      const [
        { count: blogs },
        { count: drafts },
        { count: contacts },
        { count: subscribers },
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
      ]);

      setStats({
        blogs: blogs ?? 0,
        drafts: drafts ?? 0,
        contacts: contacts ?? 0,
        subscribers: subscribers ?? 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Get an overview of your blogs, subscribers, and contact messages.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Published blogs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.blogs}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Drafts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.drafts}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Contact messages
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.contacts}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Subscribers
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.subscribers}
              </CardContent>
            </Card>
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Publishing momentum</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have {stats?.blogs ?? 0} published blogs and{" "}
            {stats?.drafts ?? 0} drafts ready for review. Keep your cadence
            steady to grow readership.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inbox health</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {stats?.contacts ?? 0} contact requests received. Replying within 24
            hours keeps response rates high.
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
