"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Progressive Oriented",
    description:
      "Innovating progress with dynamic strategies and forward-thinking solutions.",
    icon: "/assets/benefit-1.svg",
  },
  {
    title: "Innovative Vision",
    description:
      "Crafting solutions through forward-thinking strategies and innovative vision.",
    icon: "/assets/benefit-2.svg",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-[#101c44] py-16 text-white lg:py-0 lg:pb-16"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Benefits
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            Benefits of Teaming Up with Us
          </h2>
          <p className="max-w-xl text-base text-white/70">
            Embark on a transformative journey with us, where tailored solutions
            and dedicated support redefine collaborative success.
          </p>

          <div className="mt-6 grid gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="rounded-2xl bg-white/95 px-5 py-4 text-primary shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Image src={benefit.icon} alt="" width={62} height={94} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/benefit-bg.svg"
              alt="Consultants collaborating on a strategy session"
              width={520}
              height={320}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
