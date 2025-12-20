"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "160", label: "Client Project" },
  { value: "340", label: "Successful Project" },
  { value: "300+", label: "Team Members" },
  { value: "82M", label: "Total Revenue" },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-16 pt-10 md:px-10 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col text-left"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              TrueNorth Talent Advisory
            </p>
            <h1 className="mt-4 mb-6 text-balance text-2xl sm:text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
              Strategic Talent Advisory Connecting Exceptional Candidates with
              Leading Organizations.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Experience a rise in your pursuits with our expert consulting. We
              tailor success strategies to your unique goals, covering diverse
              fields for maximum impact.
            </p>
            <div className="flex flex-wrap items-center gap-4 my-6">
              <Button asChild className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
                <Link href="/contact">Collaborate with Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#EE4312] text-[#EE4312] hover:bg-[#EE4312]/10"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-2 h-px w-24 bg-[#EE4312]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <Image
                src="/assets/hero-img.svg"
                alt="Consultants collaborating on a strategy session"
                width={520}
                height={420}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-primary/10 pt-8">
          <div className="space-y-2 ">
            <p className="text-2xl font-semibold text-primary">
              This is our result
            </p>
            <p className="max-w-xl text-base text-muted-foreground">
              How capable we are at work shines through in every endeavor.
            </p>
          </div>

          <div className="grid gap-6 text-primary grid-cols-2 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
