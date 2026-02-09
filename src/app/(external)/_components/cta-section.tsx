"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#0f1f4a] py-20 lg:py-32"
    >
      {/* Background Decorative Elements - Flat */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 size-64 border border-white rounded-full" />
        <div className="absolute bottom-10 left-10 size-40 border border-white rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-[1fr_0.8fr] items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
              <MessageSquare className="size-4" />
              Let&apos;s Collaborate
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                Let&apos;s Collaborate for{" "}
                <span className="text-orange-500 italic font-serif">
                  Mutual Success
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Your success story begins with a strategic conversation. Explore
                our consulting solutions for transformative results.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-14 px-10 rounded-2xl bg-[#EE4312] text-white text-lg font-bold hover:bg-[#cf3a10] transition-all group"
              >
                <Link href="/contact">
                  Get Started Now
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden">
              <Image
                src="/assets/cta-bg.svg"
                alt="Collaboration"
                width={500}
                height={600}
                className="h-auto min-h-[18rem] w-full object-cover rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
