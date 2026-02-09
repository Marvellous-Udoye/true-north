"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-10 pb-20 lg:pt-20 lg:pb-32 scroll-mt-20"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/2 sm:translate-x-1/3 pointer-events-none border border-primary/5" />
      <div className="absolute top-10 left-10 w-24 h-24 border border-primary/5 rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
              Strategic Talent Advisory
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                Connecting{" "}
                <span className="text-primary italic font-serif">
                  Exceptional Candidates
                </span>{" "}
                with Leading Organizations.
              </h1>
              <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-500 font-medium">
                TrueNorth helps organizations and professionals find the right
                fit - strategically, thoughtfully, and with a vision for
                long-term growth.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-14 px-8 rounded-2xl bg-primary text-sm sm:text-lg font-bold hover:bg-primary/90 transition-all group"
              >
                <Link href="/contact">
                  Collaborate with Us
                  <ArrowRight className="hidden sm:inline-block ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 px-4 sm:px-8 rounded-2xl border-primary text-sm sm:text-lg font-bold hover:bg-slate-50 hover:text-primary transition-all"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden">
              <Image
                src="/assets/hero-img.svg"
                alt="Strategy session"
                width={600}
                height={800}
                className="h-auto lg:min-h-[32rem] w-full object-cover"
                priority
              />
            </div>

            <div className="absolute -top-6 -right-6 z-20 bg-white border border-slate-100 p-4 rounded-2xl hidden md:flex items-center gap-3">
              <div className="size-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Target className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Strategic Match
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Data-driven selection
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
