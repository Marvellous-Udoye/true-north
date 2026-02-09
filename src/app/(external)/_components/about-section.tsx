"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="bg-[#0f1f4a] py-20 lg:py-32 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Know Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              We Build Trusted <span className="text-primary italic font-serif">Partnerships</span> for Growth.
            </h2>
            <p className="max-w-xl text-lg text-slate-300 leading-relaxed font-medium">
              Founded in 2019, TrueNorth delivers executive search, strategic
              recruitment, and talent advisory across borders. We combine
              global reach with tailored playbooks to connect exceptional talent.
            </p>
          </div>

          <div className="flex">
            <Button asChild className="h-14 px-10 rounded-2xl bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all group">
              <Link href="/about">
                Learn More
                <ArrowUpRight className="ml-2 size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <p className="text-3xl font-black text-white mb-1">2019</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Year Founded</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white mb-1">Global</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Network Reach</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-none">
            <Image
              src="/assets/about-us.svg"
              alt="Team"
              width={520}
              height={420}
              className="h-auto w-full object-cover rounded-[2rem] grayscale contrast-125"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 size-24 border-2 border-primary/20 rounded-full -z-10" />
          <div className="absolute -bottom-6 -right-6 size-48 bg-orange-500 rounded-[3rem] -z-10 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}
