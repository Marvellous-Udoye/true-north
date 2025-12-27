"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const topicTags = ["Business", "Marketing", "Finance", "Technology", "Design"];

export function BlogHeroSection() {
  return (
    <section
      id="blog-hero"
      className="relative overflow-hidden bg-white py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-12 sm:h-24 w-48 opacity-60"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Blog Insights
          </p>
          <h1 className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            Article Collection for Leaders &amp; Builders
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            Explore curated insights on leadership, recruitment, and growth
            strategies so you can stay ahead of market shifts and make smarter
            talent decisions.
          </p>
          <div className="flex flex-wrap gap-2">
            {topicTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/10 bg-white px-3 py-1 text-base font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 left-4 -right-2 z-1 top-4 -bottom-4 rounded-3xl border border-[#EE4312]/70" />
          <div className="relative overflow-hidden">
            <Image
              src="/assets/blogs-hero.svg"
              alt="TrueNorth blog insights"
              width={560}
              height={300}
              className="h-[300px] md:h-[420px] w-full object-cover rounded-3xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
