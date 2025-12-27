"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type DashboardStats = {
  blogs: number;
  drafts: number;
  contacts: number;
};

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = supabaseBrowserClient();
      const [{ count: blogs }, { count: drafts }, { count: contacts }] =
        await Promise.all([
          supabase.from("blogs").select("id", { count: "exact", head: true }),
          supabase
            .from("blogs")
            .select("id", { count: "exact", head: true })
            .eq("status", "draft"),
          supabase
            .from("contact_messages")
            .select("id", { count: "exact", head: true }),
        ]);

      setStats({
        blogs: blogs ?? 0,
        drafts: drafts ?? 0,
        contacts: contacts ?? 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Published blogs</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.blogs}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Drafts</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.drafts}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Contact messages</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-semibold text-primary">
                {stats.contacts}
              </CardContent>
            </Card>
          </>
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Keep your drafts organized and publish updates regularly to keep the public blog feed
          fresh.
        </CardContent>
      </Card>
    </div>
  );
}
