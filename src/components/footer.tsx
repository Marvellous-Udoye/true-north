"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#audiences", label: "Who we serve" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="border-t border-primary/10 bg-white py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="TrueNorth logo"
            width={120}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <div className="space-y-1">
            <p className="text-base font-semibold text-primary">TrueNorth Talent Advisory</p>
            <p className="max-w-xl text-xs text-muted-foreground">
              Strategic recruitment, executive search, and career support that keep companies and
              professionals aligned.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 px-6 text-center text-xs text-muted-foreground md:px-10 lg:px-14">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} TrueNorth Talent Advisory. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
