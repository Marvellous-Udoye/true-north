"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const fetchContacts = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("contact_messages")
        .select(
          "id, full_name, email, company, phone, subject, message, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Unable to fetch contact messages.");
      } else {
        setContacts(data ?? []);
      }

      setLoading(false);
    };

    fetchContacts();
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

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Review incoming messages and respond quickly.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Latest messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-primary/10 p-4"
              >
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-3 h-3 w-32" />
              </div>
            ))
          ) : contacts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
              <p className="text-sm font-semibold text-primary">
                No messages yet
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                New contact form submissions will appear here.
              </p>
            </div>
          ) : (
            contacts.map((contact) => {
              const isExpanded = expandedIds.has(contact.id);
              return (
                <div
                  key={contact.id}
                  className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-primary">
                        {contact.subject}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{contact.full_name}</span>
                        <span>•</span>
                        <span>{contact.email}</span>
                        {contact.company ? (
                          <>
                            <span>•</span>
                            <span>{contact.company}</span>
                          </>
                        ) : null}
                        {contact.phone ? (
                          <>
                            <span>•</span>
                            <span>{contact.phone}</span>
                          </>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Received {new Date(contact.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Button onClick={() => toggleExpanded(contact.id)}>
                      {isExpanded ? "Hide message" : "See message"}
                    </Button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded ? "opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-4 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                      {contact.message || "No message content provided."}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
