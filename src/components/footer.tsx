"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const primaryLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#our-work", label: "Our Work" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#cta", label: "Contact" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-[#0f1f4a] py-12 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold">
              Get in Touch for Your Path to Success
            </h3>
            <p className="max-w-xl text-base text-white/70">
              Whether you&apos;re a company seeking top-tier talent or a
              professional exploring your next opportunity, TrueNorth Talent
              Advisory is your trusted partner for navigating the talent
              landscape.
            </p>
          </div>
            <Button className="bg-[#EE4312] text-white hover:bg-[#cf3a10]">
              Book an Appointment
            </Button>
        </div>

        <div className="flex flex-col gap-6 pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-col lg:flex-row gap-4 text-base text-white/70">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="rounded-full border border-white/20 p-2 text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} TrueNorth Talent Advisory. All rights
            reserved.
          </p>
          <p>Designed by TrueNorth Advisory Studio.</p>
        </div>
      </div>
    </motion.footer>
  );
}
