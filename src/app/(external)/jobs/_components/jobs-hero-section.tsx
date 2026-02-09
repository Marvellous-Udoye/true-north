"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JobsHeroSection() {
  return (
    <section
      id="jobs-hero"
      className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-32 md:pb-24"
    >
      <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 pointer-events-none border border-primary/5" />
      <div className="absolute top-1/4 left-0 size-64 border-4 border-primary/5 rounded-full -translate-x-1/2 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-10 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <Sparkles className="size-3" />
              Talent Opportunities
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] uppercase">
                Find Your <br />
                <span className="text-primary italic font-serif">True North</span> <br />
                In Your Career.
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                We connect exceptional professionals with forward-thinking
                organizations. Explore curated roles that align with your
                purpose and expertise.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-8 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
                  <Briefcase className="size-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Engagement</p>
                  <p className="text-sm font-bold text-slate-900">Full-time & Contract</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                  <MapPin className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Flexibility</p>
                  <p className="text-sm font-bold text-slate-900">Remote & Hybrid</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="h-14 px-10 rounded-2xl bg-primary text-white text-lg font-black uppercase tracking-widest shadow-none border-none hover:bg-primary/90 transition-all group">
                <Link href="#jobs">
                  Browse Roles
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/about-5.svg"
                alt="Professional career growth"
                width={600}
                height={700}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
