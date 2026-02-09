"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const galleryImages = [
  "/assets/about-1.svg",
  "/assets/about-2.svg",
  "/assets/about-3.svg",
  "/assets/about-4.svg",
];

export function AboutHeroSection() {
  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-white py-20 lg:py-32 scroll-mt-20"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50 -skew-y-6 origin-top-left pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
            <Star className="size-3 fill-current" />
            TrueNorth Story
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              Client Success is Our{" "}
              <span className="text-primary italic font-serif">Only</span>{" "}
              Focus.
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              TrueNorth Talent Advisory delivers strategic recruitment
              solutions, helping organizations attract and develop high-impact
              talent to drive long-term excellence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-14 px-10 rounded-2xl bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all group"
            >
              <Link href="/contact">
                Collaborate with Us
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden shadow-none">
            <Image
              src="/assets/about-bg.svg"
              alt="Team collaboration"
              width={560}
              height={420}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border-4 border-white bg-slate-100 aspect-video md:aspect-square relative"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
