"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  User, 
  Building2, 
  Phone, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Search,
  Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";

type ContactRow = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string | null;
  created_at: string;
};

export default function DashboardContactsPage() {
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const getContacts = async () => {
    const supabase = supabaseBrowserClient();
    return supabase
      .from("contact_messages")
      .select(
        "id, full_name, email, company, phone, subject, message, created_at"
      )
      .order("created_at", { ascending: false });
  };

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await getContacts();
    if (error) {
      toast.error("Unable to fetch contact messages.");
    } else {
      setContacts(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadContacts = async () => {
      const { data, error } = await getContacts();
      if (error) {
        toast.error("Unable to fetch contact messages.");
      } else {
        setContacts(data ?? []);
      }
      setLoading(false);
    };

    loadContacts();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this message? This action cannot be undone.");
    if (!confirmed) return;

    const supabase = supabaseBrowserClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete message.");
      return;
    }

    toast.success("Message deleted.");
    fetchContacts();
  };

  const filteredContacts = contacts.filter((c) => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inquiries</h1>
          <p className="text-sm text-slate-500">
            Manage and respond to messages from your website visitors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <CardDescription>Total {filteredContacts.length} inquiries received</CardDescription>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 space-y-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
              ))
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Inbox className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Inbox is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mt-1">
                  When visitors fill out your contact form, their messages will appear here.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredContacts.map((contact) => {
                  const isExpanded = expandedIds.has(contact.id);
                  return (
                    <motion.div
                      key={contact.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "group transition-all duration-200",
                        isExpanded ? "bg-slate-50/50" : "hover:bg-slate-50/30"
                      )}
                    >
                      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{contact.subject}</span>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                              New
                            </span>
                          </div>
                          
                          <div className="grid gap-x-6 gap-y-2 text-xs text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-slate-400" />
                              <span className="font-medium text-slate-700">{contact.full_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 text-slate-400" />
                              <span>{contact.email}</span>
                            </div>
                            {contact.company && (
                              <div className="flex items-center gap-2">
                                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                <span>{contact.company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-auto">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "h-8 rounded-lg text-xs font-medium transition-all",
                              isExpanded ? "bg-white shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-primary hover:bg-primary/5"
                            )}
                            onClick={() => toggleExpanded(contact.id)}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="mr-1.5 h-3.5 w-3.5" />
                                Close
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-1.5 h-3.5 w-3.5" />
                                View Message
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0">
                              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-inner">
                                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                                  {contact.message || "No message content provided."}
                                </p>
                                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                                  <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                      <Phone className="h-3 w-3" />
                                      {contact.phone || "No phone"}
                                    </div>
                                  </div>
                                  <Button size="sm" className="h-8 text-xs rounded-lg" asChild>
                                    <a href={`mailto:${contact.email}`}>
                                      Reply via Email
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
