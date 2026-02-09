"use client";

import { cn } from "@/lib/utils";
import { Briefcase, FileText, LayoutGrid, Mail, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/contacts", label: "Contacts", icon: Mail },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

type DashboardSidebarProps = {
  onNavigate?: () => void;
};

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-full flex-col bg-white lg:border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
      <div className="mb-8 px-6 pt-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            T
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">TrueNorth</h2>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Admin Console</p>
      </div>
      
      <nav className="flex flex-1 flex-col gap-1 px-3 overflow-y-auto">
        <div className="px-3 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400/80">Menu</p>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 h-4 w-1 rounded-r-full bg-white"
                  initial={false}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
