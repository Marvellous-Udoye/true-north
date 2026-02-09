"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Clock, Sparkles } from "lucide-react";

export function ContactHeroSection() {
  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-32 md:pb-24 scroll-mt-20"
    >
      <div className="absolute top-0 right-0 w-full h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] w-fit">
            <Sparkles className="size-3" />
            Get In Touch
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              Reach Out to Us{" "}
              <span className="text-primary italic font-serif">
                Right Away.
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              Connect with our advisory team to discuss your talent needs and
              discover how our strategic approach can support your business
              goals.
            </p>
          </div>

          {/* <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-14 px-10 rounded-2xl bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all group"
            >
              <Link href="/contact#contact-form">
                Start a Conversation
                <Send className="ml-2 size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div> */}

          <div className="grid gap-6">
            <div className="flex items-center gap-4 group">
              <div className="size-12 rounded-2xl border border-slate-100 flex items-center justify-center transition-colors bg-primary text-white">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                  Email Address
                </p>
                <Link href="mailto:truenorthtalentadvisory.global@gmail.com">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    truenorthtalentadvisory.global@gmail.com
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="size-12 rounded-2xl border border-slate-100 flex items-center justify-center transition-colors bg-orange-500 text-white">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                  Monday - Friday
                </p>
                <p className="text-sm font-bold text-slate-900">
                  9AM - 4PM UTC
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden">
            <Image
              src="/assets/contact-bg.svg"
              alt="Support team"
              width={560}
              height={620}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
