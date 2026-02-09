"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const topicTags = [
  "Leadership",
  "Recruitment",
  "Workplace Culture",
  "Growth",
];

export function BlogHeroSection() {
  return (
    <section
      id="blog-hero"
      className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-32 md:pb-24 scroll-mt-20"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50 -skew-y-6 origin-top-right pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[0.8fr_0.8fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
            <BookOpen className="size-3" />
            TrueNorth Insights
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              Article Collection for{" "}
              <span className="text-primary italic font-serif">Builders</span> &
              Leaders.
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              Explore curated insights on leadership, recruitment, and growth
              strategies so you can stay ahead of market shifts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 w-full mb-2">
              Popular Topics
            </span>
            {topicTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden rounded-[3rem] border-8 border-white bg-white">
            <Image
              src="/assets/blogs-hero.svg"
              alt="Blog insights"
              width={600}
              height={500}
              className="h-[350px] md:h-[500px] w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
