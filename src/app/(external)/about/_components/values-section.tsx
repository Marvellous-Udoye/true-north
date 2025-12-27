"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Dedication",
    description:
      "We are deeply committed to delivering quality, consistency, and results.",
    icon: "/assets/value-1.svg",
  },
  {
    title: "Clarity",
    description:
      "We communicate transparently, ensuring alignment at every stage of the hiring process.",
    icon: "/assets/value-2.svg",
  },
  {
    title: "Innovation",
    description:
      "We apply modern recruitment practices and insights to solve evolving talent challenges.",
    icon: "/assets/value-3.svg",
  },
  {
    title: "Collaboration",
    description: "We believe strong partnerships create the best outcomes.",
    icon: "/assets/value-4.svg",
  },
  {
    title: "Continuos Improvement",
    description:
      "We are committed to learning, refining, and improving how we deliver value.",
    icon: "/assets/value-5.svg",
  },
];

export function ValuesSection() {
  return (
    <section
      id="values"
      className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute right-8 top-0 h-12 sm:h-24 w-44 opacity-70"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-4 left-6 h-20 w-32 opacity-70"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              Our Core Values
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              Our work is guided by principles that define how we engage with
              clients, candidates, and partners.
            </p>
          </div>
          <Button
            asChild
            className="w-fit bg-[#EE4312] text-white hover:bg-[#cf3a10]"
          >
            <Link href="/contact">Collaborate with Us</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="flex flex-col items-center rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
            >
              <div className="mb-4 flex items-center justify-center">
                <Image src={value.icon} alt="" width={64} height={64} />
              </div>
              <h3 className="text-base font-semibold text-primary">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
