"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const galleryImages = [
  "/assets/about-1.svg",
  "/assets/about-2.svg",
  "/assets/about-3.svg",
  "/assets/about-4.svg",
  "/assets/about-5.svg",
];

export function AboutHeroSection() {
  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-white py-16 md:py-20"
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
            About TrueNorth
          </p>
          <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
            Clients Success is Our Focus
          </h1>
          <p className="max-w-xl text-base text-muted-foreground ">
            Committed to your success, TrueNorth Talent Advisory delivers
            strategic recruitment and talent advisory solutions, helping
            organizations attract, retain, and develop the right talent to drive
            sustainable growth and long-term business excellence.
          </p>
          <Button
            asChild
            className="bg-[#EE4312] text-white hover:bg-[#cf3a10]"
          >
            <Link href="/contact">Collaborate with Us</Link>
          </Button>
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
              alt="TrueNorth consulting team"
              width={560}
              height={420}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-6 w-full max-w-6xl px-4 md:px-10 lg:px-0 mx-auto">
        {galleryImages.map((src) => (
          <div
            key={src}
            className="overflow-hidden rounded-md bg-white shadow-sm"
          >
            <Image
              src={src}
              alt=""
              width={120}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
