"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function JobsHeroSection() {
  return (
    <section
      id="jobs-hero"
      className="relative overflow-hidden bg-white py-16 md:py-20 scroll-mt-20"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-5"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Career Opportunities
          </p>
          <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
            Join Our Network of Top Talent
          </h1>
          <p className="max-w-xl text-base text-muted-foreground ">
            Explore exciting career opportunities across various industries. At
            TrueNorth Talent Advisory, we connect exceptional professionals with
            forward-thinking organizations. Find your next challenge and grow
            your career with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/about-bg.svg"
              alt="TrueNorth jobs"
              width={560}
              height={420}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
