"use client";

import { cn } from "@/lib/utils";
import { Briefcase, FileText, LayoutGrid, Mail, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="flex min-h-screen w-56 sm:w-64 flex-col lg:border-r border-primary/10 bg-white lg:px-4 lg:py-6 lg:flex">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-semibold text-primary">TrueNorth Admin</h2>
        <p className="text-xs text-muted-foreground">Admin dashboard</p>
      </div>
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition",
                isActive
                  ? "bg-primary/5 text-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
