"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const workItems = [
  {
    title: "Analysis & Research",
    description:
      "Detailed discovery and market insight to shape practical, high-impact solutions.",
    icon: "/assets/our-work-1.svg",
  },
  {
    title: "Actualization",
    description:
      "Structured execution that aligns stakeholders and keeps delivery on track.",
    icon: "/assets/our-work-2.svg",
  },
  {
    title: "Initiate",
    description:
      "Launch support, playbooks, and checkpoints to keep momentum steady.",
    icon: "/assets/our-work-3.svg",
  },
];

export function OurWorkSection() {
  return (
    <section id="our-work" className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20">
      <div
        className="pointer-events-none absolute right-0 top-6 h-40 w-56 opacity-70"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              Our Work is For Your Success
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Tailored systematic solutions for your goals, ensuring comprehensive support and
              effective paths to success.
            </p>
          </div>
          <Button className="w-fit bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            Book an Appointment
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex flex-col gap-4 rounded-2xl bg-white px-6 py-8 text-left shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-[#f7f9fc]">
                <Image src={item.icon} alt="" width={36} height={36} />
              </div>
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
