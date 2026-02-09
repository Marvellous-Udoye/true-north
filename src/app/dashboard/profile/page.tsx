"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { 
  LogOut, 
  ShieldCheck, 
  Key, 
  Mail, 
  Bell
} from "lucide-react";

export default function DashboardProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
      setLoading(false);
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
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200/60 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-lg">Admin Profile</CardTitle>
              <CardDescription>Personal information and account identification</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {loading ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="size-20 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ) : email ? (
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                  <div className="relative group">
                    <div className="flex size-24 items-center justify-center rounded-3xl bg-primary text-3xl font-bold text-white shadow-lg shadow-primary/20 ring-4 ring-white">
                      {email.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-8 rounded-xl bg-white p-1 shadow-md">
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-green-500 text-white">
                        <ShieldCheck className="size-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">Administrator</h3>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail className="size-4" />
                      <span className="text-sm">{email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        Owner
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                        Verified Access
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="h-10 rounded-xl border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all"
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-lg">Security & Access</CardTitle>
              <CardDescription>Control who can access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Key className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Authentication</p>
                      <p className="text-xs text-slate-500">Manage your password and security keys</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">Update</Button>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Two-Factor Auth</p>
                      <p className="text-xs text-slate-500">Currently enabled for your safety</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded-md">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200/60 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-slate-400" />
                  <span className="text-sm text-slate-700 font-medium">New Enquiries</span>
                </div>
                <div className="size-5 rounded bg-primary/10 flex items-center justify-center">
                  <div className="size-2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-slate-400" />
                  <span className="text-sm text-slate-700 font-medium">New Job Applicants</span>
                </div>
                <div className="size-5 rounded bg-primary/10 flex items-center justify-center">
                  <div className="size-2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <Button variant="link" className="h-auto p-0 text-xs text-primary">Notification Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1f4a] text-white border-none shadow-lg shadow-[#0f1f4a]/20">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="size-6 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold">Pro Admin Features</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  You have full access to the TrueNorth ecosystem. Use responsibly and keep your credentials private.
                </p>
              </div>
              <Button className="w-full bg-[#EE4312] hover:bg-[#EE4312]/90 border-none h-10 rounded-xl font-bold">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
