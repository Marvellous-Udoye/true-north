"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#audiences", label: "Who we serve" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navVariants = useMemo<Variants>(
    () => ({
      initial: { y: -20, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      },
    }),
    []
  );

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="initial"
        animate="animate"
        className="fixed left-1/2 top-4 z-40 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-full border border-primary/15 bg-white shadow-md backdrop-blur"
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-base font-semibold text-primary">
            <Image
              src="/assets/logo.png"
              alt="TrueNorth logo"
              width={34}
              height={34}
              className="h-9 w-9 rounded-lg object-contain"
            />
            <span className="hidden sm:inline">TrueNorth</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden px-4 md:inline-flex">
              Book a call
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-primary transition hover:bg-primary/5 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute right-0 top-0 flex h-full w-80 flex-col gap-6 bg-white px-6 py-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">TrueNorth</span>
                <button
                  type="button"
                  className="rounded-full border border-primary/15 p-2 text-primary hover:bg-primary/5"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4 text-base font-medium text-muted-foreground">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-2 py-2 transition hover:bg-primary/5 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button className="w-full" size="lg">
                Book a call
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
