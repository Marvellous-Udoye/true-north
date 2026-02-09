"use client";

import { SubscribeForm } from "@/components/subscribe-form";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function BlogSubscribeSection() {
  return (
    <section
      id="blog-subscribe"
      className="relative overflow-hidden bg-[#0f1f4a] py-20 lg:py-32 text-white"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 size-64 border border-white rounded-full" />
        <div className="absolute bottom-10 left-10 size-40 border border-white rounded-full" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
              <Sparkles className="size-4" />
              Join the Community
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Stay Ahead with the <span className="text-orange-500 italic font-serif">Latest</span> Insights.
            </h2>
            <p className="max-w-xl text-lg text-slate-300 leading-relaxed font-medium">
              Subscribe to our newsletter and receive curated articles on leadership, 
              recruitment strategy, and market trends directly in your inbox.
            </p>
          </div>

          <div className="max-w-md">
            <SubscribeForm 
              variant="dark"
              buttonClassName="bg-[#EE4312] hover:bg-[#cf3a10]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden">
            <Image
              src="/assets/blogs-cta.svg"
              alt="Updates"
              width={560}
              height={360}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
