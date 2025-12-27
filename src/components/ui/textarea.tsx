"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md border border-primary/10 bg-white px-3 py-2 text-sm text-primary shadow-sm outline-none transition focus:border-[#EE4312] focus:ring-2 focus:ring-[#EE4312]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
