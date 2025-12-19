"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-linear-to-b from-primary/5 via-primary/3 to-background min-h-[115vh] pt-24"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: "url('/assets/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 md:px-10 lg:px-14 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-4 text-center md:gap-6 lg:gap-7"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            TrueNorth Talent Advisory
          </p>
          <h1 className="text-balance text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
            Fill critical roles faster with tailored talent advisory built for
            growth teams.
          </h1>
          {/* <div className="mx-auto flex w-full flex-col gap-3 rounded-2xl border border-primary/15 bg-white/70 p-3 backdrop-blur md:w-fit md:flex-row md:items-center md:gap-4 md:p-4">
            <input
              type="email"
              placeholder="Your work email"
              className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm shadow-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 md:w-72"
            />
            <Button className="h-11 w-full md:w-auto" size="lg">
              Book a consultation
            </Button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
