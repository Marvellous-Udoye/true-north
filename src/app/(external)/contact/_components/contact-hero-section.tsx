"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactHeroSection() {
  return (
    <section id="contact-hero" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div
        className="pointer-events-none absolute right-0 sm:right-6 top-0 h-20 w-32 opacity-70"
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
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Contact Us
          </p>
          <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
            Reach Out to Us Right Away
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-base">
            Connect now for swift assistance and discover the benefits of reaching out to us
            immediately for personalized solutions and support.
          </p>
          <Button asChild className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
            <Link href="/contact#contact-form">Collaborate with Us</Link>
          </Button>

          <div className="grid gap-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.14em] text-primary/70">
                  Headquarter Email
                </p>
                <p className="text-sm text-primary">hello@truenorth.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.14em] text-primary/70">
                  Headquarter Phone Number
                </p>
                <p className="text-sm text-primary">+1 (415) 555-0198</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/contact-bg.svg"
              alt="Support team assisting clients"
              width={560}
              height={420}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
