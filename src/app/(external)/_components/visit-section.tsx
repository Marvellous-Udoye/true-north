"use client";

import { Mail, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function VisitSection() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image Card - No shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-full min-h-[400px] overflow-hidden rounded-[2.5rem] border border-slate-100"
          >
            <Image
              src="/assets/visit.svg"
              alt="TrueNorth office"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between gap-12 rounded-[2.5rem] border border-orange-100 bg-orange-50/50 p-8 md:p-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs">
                <div className="h-px w-8 bg-orange-600" />
                Contact Information
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Let&apos;s Start a{" "}
                <span className="text-orange-600 italic font-serif">
                  Conversation
                </span>
              </h2>

              <div className="grid gap-8 pt-4">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-white border border-orange-100 flex items-center justify-center shrink-0">
                    <Mail className="size-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Email Address
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-slate-900 break-all">
                      truenorthtalentadvisory.global@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-white border border-orange-100 flex items-center justify-center shrink-0">
                    <Clock className="size-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Availability
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-slate-900">
                      Mon - Fri: 9AM - 4PM UTC
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-orange-600 transition-colors group"
            >
              Book a consultation
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
