"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

import { usePathname } from "next/navigation";

export function DashboardTopbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Overview";
    const last = segments[segments.length - 1];
    if (last.length > 20) return "Details"; // Handle IDs
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="size-9 border-slate-200 lg:hidden p-0"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0 w-72 border-none">
            <DashboardSidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        
        <div className="hidden lg:flex flex-col">
          <h2 className="text-sm font-bold text-slate-900">{getPageTitle()}</h2>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>Dashboard</span>
            <span className="size-1 rounded-full bg-slate-200" />
            <span className="capitalize">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-xs font-bold text-slate-900">{email?.split("@")[0] || "Admin"}</p>
          <p className="text-[10px] text-slate-400">Authorized Access</p>
        </div>
        
        <Link
          href="/dashboard/profile"
          className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-1 pr-3 transition-all hover:border-primary/20 hover:bg-white"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shadow-sm transition-transform group-hover:scale-95">
            {email ? email.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </div>
          <span className="hidden text-xs font-medium text-slate-600 sm:inline group-hover:text-primary transition-colors">Profile</span>
        </Link>
      </div>
    </header>
  );
}
