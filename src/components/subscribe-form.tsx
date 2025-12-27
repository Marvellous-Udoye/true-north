"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubscribeFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonLabel?: string;
};

export function SubscribeForm({
  className,
  inputClassName,
  buttonClassName,
  placeholder = "Your email",
  buttonLabel = "Subscribe",
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
      className={cn("flex flex-col gap-3 sm:flex-row", className)}
    >
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn("h-12 pl-11", inputClassName)}
          autoComplete="email"
          required
        />
      </div>
      <Button
        type="submit"
        className={cn(
          "h-10 bg-[#EE4312] text-white hover:bg-[#cf3a10]",
          buttonClassName
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : buttonLabel}
      </Button>
    </form>
  );
}
