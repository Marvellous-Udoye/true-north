"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/blogs": "Blogs",
  "/dashboard/contacts": "Contacts",
  "/dashboard/profile": "Profile",
};

export function DashboardTopbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";
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

  return (
    <header className="flex items-center justify-between border-b border-primary/10 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="border-primary/10 lg:hidden"
              size="icon"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex h-full flex-col">
              <DashboardSidebar />
            </div>
          </SheetContent>
        </Sheet>
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-xl font-semibold text-primary">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 rounded-full border border-primary/10 px-3 py-1 text-xs text-primary transition hover:border-primary/30"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EE4312] text-xs font-semibold text-white">
            {email ? email.charAt(0).toUpperCase() : <User className="h-3 w-3" />}
          </span>
          <span className="hidden sm:inline">{email ?? "Admin"}</span>
        </Link>
      </div>
    </header>
  );
}
