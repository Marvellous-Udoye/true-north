"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#0f1f4a] text-white"
    >
      <div className="relative mx-auto grid lg:grid-cols-2 items-center gap-6 lg:pl-14">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Let&apos;s Collaborate
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            Let&apos;s Collaborate for Mutual Success
          </h2>
          <p className="text-sm text-white/70">
            Your success story begins with a click. Explore our consulting
            solutions for transformative results.
          </p>
          <Button className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            Collaborate with Us
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/cta-bg.svg"
              alt="Consultants collaborating on a strategy session"
              width={120}
              height={100}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
