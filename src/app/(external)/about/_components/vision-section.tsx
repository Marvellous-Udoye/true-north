"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function VisionSection() {
  const highlights = [
    "Bespoke Recruitment Strategies",
    "Executive Search Expertise",
    "Outcome-Driven Methodology",
    "Global Talent Network",
  ];

  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-[#0f1f4a] py-20 lg:py-32 text-white"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 size-96 border-4 border-white rounded-full translate-x-1/2" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-orange-500" />
              Our Vision
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              We Deliver the{" "}
              <span className="text-orange-500 italic font-serif">Right</span>{" "}
              Talent Solutions.
            </h2>
            <p className="max-w-xl text-lg text-slate-300 leading-relaxed font-medium">
              We specialize in providing bespoke recruitment and talent advisory
              services designed around your organization&apos;s unique DNA. Our
              focus is on delivering sustainable outcomes—not just filling
              roles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-orange-500" />
                <span className="text-sm font-bold text-white tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex pt-4">
            <Button
              asChild
              className="h-14 px-10 rounded-2xl bg-[#EE4312] text-white text-lg font-bold hover:bg-[#cf3a10] hover:-translate-y-1 transition-all group"
            >
              <Link href="/contact">
                Work With Us
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden ">
            <Image
              src="/assets/vision-bg.svg"
              alt="Handshake"
              width={560}
              height={420}
              className="h-auto w-full object-cover rounded-[2rem]"
            />
          </div>
          {/* Decorative Outline */}
          <div className="absolute -top-6 -left-6 size-32 border-2 border-orange-500/30 rounded-full -z-10 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
