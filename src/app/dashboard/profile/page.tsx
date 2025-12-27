"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function DashboardProfilePage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your admin profile and session settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Admin account</CardTitle>
        </CardHeader>
        <CardContent>
          {email ? (
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-semibold text-primary">Administrator</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
              <Button onClick={handleSignOut}>Sign out</Button>
            </div>
          ) : (
            <Skeleton className="h-4 w-40" />
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Access</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your account has permission to manage blogs, view subscribers, and handle incoming
            contact messages.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Keep your admin email secure and review access monthly to ensure only active teammates
            retain permissions.
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
