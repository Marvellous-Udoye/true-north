"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function VisionSection() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-[#101c44] py-16 text-white md:py-20"
    >
      <div
        className="pointer-events-none absolute right-0 sm:right-10 top-0 md:top-10 h-16 sm:h-24 w-40 opacity-70"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-5"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            We Create Best Solution for You
          </h2>
          <p className="max-w-xl text-base text-white/70 md:text-base">
            We specialize in crafting bespoke solutions tailored to your unique
            needs, ensuring that our services not only meet but exceed your
            expectations, bringing the best results for your satisfaction.
          </p>
          <Button asChild className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            <Link href="/contact">Collaborate with Us</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 left-4 -bottom-4 rounded-3xl border border-[#EE4312]/70" />
          <div className="relative overflow-hidden ">
            <Image
              src="/assets/vision-bg.svg"
              alt="Handshake between partners"
              width={560}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
