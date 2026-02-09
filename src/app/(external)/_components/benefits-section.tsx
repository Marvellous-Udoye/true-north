"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Target, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Progressive Oriented",
    description: "Innovating progress with dynamic strategies and forward-thinking solutions.",
    icon: Sparkles,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Innovative Vision",
    description: "Crafting solutions through forward-thinking strategies and innovative vision.",
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Strategic Benefits
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Why Teams <span className="text-primary italic font-serif">Choose</span> TrueNorth.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
              Embark on a transformative journey with us, where bespoke solutions 
              and dedicated support redefine collaborative success.
            </p>
          </div>

          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-start gap-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white"
              >
                <div className={`size-14 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center shrink-0`}>
                  <benefit.icon className="size-7" />
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden rounded-[3rem] border-8 border-slate-50 bg-slate-100">
            <Image
              src="/assets/benefit-bg.svg"
              alt="Collaboration"
              width={520}
              height={400}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          {/* Floating High-Contrast Badge */}
          <div className="absolute -bottom-8 right-8 z-20 bg-primary text-white p-8 rounded-[2.5rem] hidden md:flex items-center gap-4">
             <ShieldCheck className="size-8 text-orange-500" />
             <div>
               <p className="text-2xl font-black">100%</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Alignment Rate</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
