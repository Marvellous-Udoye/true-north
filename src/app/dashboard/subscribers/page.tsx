"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

type SubscriberRow = {
  id: string;
  email: string;
  created_at: string;
};

export default function DashboardSubscribersPage() {
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("subscribers")
        .select("id, email, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Unable to fetch subscribers.");
      } else {
        setSubscribers(data ?? []);
      }

      setLoading(false);
    };

    fetchSubscribers();
  }, []);

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Subscribers</h1>
        <p className="text-sm text-muted-foreground">
          Track the audience growing your newsletter.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Latest subscribers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-lg border border-primary/10 p-4">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="mt-3 h-3 w-32" />
                </div>
              ))
            : subscribers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
                  <p className="text-sm font-semibold text-primary">
                    No subscribers yet
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Newsletter signups will show up here.
                  </p>
                </div>
              ) : (
                subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm md:flex-row md:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {subscriber.email}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Joined {new Date(subscriber.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full w-fit bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Newsletter
                    </span>
                  </div>
                ))
              )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
