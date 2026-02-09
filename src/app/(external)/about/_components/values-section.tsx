"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Dedication",
    description: "We are deeply committed to delivering quality, consistency, and results.",
    icon: "/assets/value-1.svg",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Clarity",
    description: "We communicate transparently, ensuring alignment at every stage.",
    icon: "/assets/value-2.svg",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Innovation",
    description: "We apply modern practices to solve evolving talent challenges.",
    icon: "/assets/value-3.svg",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Collaboration",
    description: "We believe strong partnerships create the best outcomes.",
    icon: "/assets/value-4.svg",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Continuos Improvement",
    description: "We are committed to learning and refining how we deliver value.",
    icon: "/assets/value-5.svg",
    color: "bg-red-50 text-red-600",
  },
];

export function ValuesSection() {
  return (
    <section
      id="values"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-32"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Our Core Values
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Principles that <span className="text-primary italic font-serif">Guide</span> Us
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Our work is guided by deep-rooted principles that define how we engage with
              clients, candidates, and partners.
            </p>
          </div>
          <Button
            asChild
            className="h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all"
          >
            <Link href="/contact">Collaborate with Us</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-primary/20 "
            >
              <div className={cn("size-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform", value.color)}>
                <Image src={value.icon} alt="" width={28} height={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 font-medium">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
