"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubscribeFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonLabel?: string;
  variant?: "light" | "dark";
};

export function SubscribeForm({
  className,
  inputClassName,
  buttonClassName,
  placeholder = "Your email address",
  buttonLabel = "Subscribe",
  variant = "light",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.error || "Unable to subscribe.");
      }
      toast.success("Thanks for subscribing.");
      setEmail("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to subscribe.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3 sm:flex-row w-full", className)}
    >
      <div className="relative flex-1 group">
        <Mail className={cn(
          "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          variant === "dark" ? "text-white/40 group-focus-within:text-white" : "text-slate-400 group-focus-within:text-primary"
        )} />
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(
            "h-12 pl-11 rounded-xl transition-all shadow-none border-none ring-1",
            variant === "dark" 
              ? "bg-white/10 ring-white/20 text-white placeholder:text-white/40 focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 focus:ring-primary/20" 
              : "bg-slate-50 ring-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-primary/20",
            inputClassName
          )}
          autoComplete="email"
          required
        />
      </div>
      <Button
        type="submit"
        className={cn(
          "h-12 px-6 bg-[#EE4312] text-white font-bold rounded-xl hover:bg-[#cf3a10] hover:-translate-y-0.5 transition-all shadow-none group",
          buttonClassName
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <div className="flex items-center gap-2">
            {buttonLabel}
            <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </div>
        )}
      </Button>
    </form>
  );
}
