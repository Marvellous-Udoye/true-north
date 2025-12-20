"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="bg-primary py-16 text-white md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            Know Our Story
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            We build trusted partnerships for growth-minded teams.
          </h2>
          <p className="text-base leading-relaxed text-white/70">
            Founded in 2019, TrueNorth delivers executive search, strategic
            recruitment, and talent advisory across industries. We combine
            global reach with tailored playbooks to connect exceptional talent
            to the right opportunities and keep teams aligned.
          </p>
          <Button className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border border-[#EE4312] md:block" />
          <div className="overflow-hidden">
            <Image
              src="/assets/about-us.svg"
              alt="TrueNorth team"
              width={520}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
