"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Activity, PlayCircle } from "lucide-react";

const workItems = [
  {
    title: "Analysis & Research",
    description: "We conduct detailed market analysis and research, employing strategic methodologies to deliver deep talent insights.",
    icon: Search,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Actualization",
    description: "In the execution phase, we adeptly translate strategies into action, ensuring seamless matching of objectives.",
    icon: Activity,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    title: "Initiate & Scale",
    description: "We kickstart initiatives with expertise, ensuring a smooth launch and effective implementation of bespoke solutions.",
    icon: PlayCircle,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
];

export function OurWorkSection() {
  return (
    <section
      id="our-work"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-32"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Our Methodology
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Work Built for Your <span className="text-primary italic font-serif">Success.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Tailored systematic solutions for your unique goals, ensuring 
              comprehensive support and effective paths to growth.
            </p>
          </div>
          <Button asChild className="h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all group">
            <Link href="/contact">
              Book a Consultation
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {workItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-8 rounded-[2.5rem] border border-slate-200 bg-white p-10 transition-all duration-300 hover:border-primary/20 hover:bg-slate-50/50"
            >
              <div className="flex items-center justify-between">
                <div className={`size-16 rounded-[1.5rem] ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <item.icon className="size-8" />
                </div>
                <span className="text-4xl font-black text-slate-100 group-hover:text-primary/10 transition-colors">0{index + 1}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                Phase Details
                <div className="h-px w-4 bg-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
