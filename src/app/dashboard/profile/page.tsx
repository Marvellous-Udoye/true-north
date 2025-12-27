"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";

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
    window.location.href = "/dashboard/login";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {email ? (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-base font-semibold text-primary">Admin account</p>
            <p>{email}</p>
            <Button
              onClick={handleSignOut}
              className="mt-4 w-fit bg-[#EE4312] text-white hover:bg-[#cf3a10]"
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Skeleton className="h-4 w-40" />
        )}
      </CardContent>
    </Card>
  );
}
