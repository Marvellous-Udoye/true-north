"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

type ShareRoleButtonProps = {
  title: string;
  url: string;
};

export function ShareRoleButton({ title, url }: ShareRoleButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: `Check out this role: ${title}`,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall through to clipboard/email fallback.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return;
      } catch {
        // Fall through to mailto fallback.
      }
    }

    const mailto = `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url)}`;
    window.open(mailto, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className="h-14 px-10 rounded-2xl border-2 border-slate-900/50 font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-none"
    >
      <Share2 className="mr-2 size-4" />
      {copied ? "Link Copied" : "Share Role"}
    </Button>
  );
}
