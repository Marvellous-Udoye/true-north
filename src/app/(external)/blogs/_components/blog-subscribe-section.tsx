"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function BlogSubscribeSection() {
  return (
    <section
      id="blog-subscribe"
      className="relative overflow-hidden bg-[#101c44] py-16 text-white md:py-20"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-12 sm:h-20 w-40 opacity-70"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-6 left-10 h-24 w-48 opacity-70"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold md:text-3xl max-w-md">
            Stay Updated on the Newest Blogs for your Success
          </h2>
          <p className="max-w-xl text-base text-white/70">
            Subscribe to our newsletter, so you can get every latest article and
            information about us every week.
          </p>
          <Button className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            Subscribe
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/blogs-cta.svg"
              alt="Newsletter updates"
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
