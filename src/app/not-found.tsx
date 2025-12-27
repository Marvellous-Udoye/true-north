"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        We could not find what you were looking for. You can return to the
        previous page.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={() => router.back()}>Go back</Button>
      </div>
    </div>
  );
}
