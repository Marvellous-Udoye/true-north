"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Sparkles } from "lucide-react";

export function JobsHeroSection() {
  return (
    <section
      id="jobs-hero"
      className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-28 md:pb-24"
    >
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3" />
              Career Opportunities
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-[1.1] text-slate-900 md:text-5xl lg:text-6xl tracking-tight">
                Find Your{" "}
                <span className="text-primary italic font-serif">
                  True North
                </span>{" "}
                In Your Career
              </h1>
              <p className="mx-auto lg:mx-0 max-w-xl text-lg leading-relaxed text-slate-500">
                We connect exceptional professionals with forward-thinking
                organizations. Explore opportunities that align with your
                purpose and expertise.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Briefcase className="size-4 text-slate-600" />
                </div>
                <span>Full-time & Contract</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <MapPin className="size-4 text-slate-600" />
                </div>
                <span>Global & Remote Roles</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] ">
              <Image
                src="/assets/about-5.svg"
                alt="TrueNorth Talent Network"
                width={600}
                height={500}
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
