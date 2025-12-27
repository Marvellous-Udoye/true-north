"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseBrowserClient } from "@/lib/supabase/client";

type ContactRow = {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  created_at: string;
};

export default function DashboardContactsPage() {
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const supabase = supabaseBrowserClient();
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id, full_name, email, subject, created_at")
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-lg border border-primary/10 p-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-3 h-3 w-32" />
              </div>
            ))
          : contacts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
                <p className="text-sm font-semibold text-primary">No messages yet</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  New contact form submissions will appear here.
                </p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="rounded-lg border border-primary/10 p-4"
                >
                  <p className="text-sm font-semibold text-primary">{contact.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {contact.full_name} • {contact.email}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Received {new Date(contact.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
      </CardContent>
    </Card>
  );
}
