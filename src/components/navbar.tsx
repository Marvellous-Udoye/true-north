"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navVariants = useMemo<Variants>(
    () => ({
      initial: { y: -20, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
        className="sticky top-0 z-40 w-full border-b border-primary/10 bg-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-10 lg:px-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold text-primary"
          >
            <Image
              src="/logo.jpeg"
              alt="TrueNorth logo"
              width={120}
              height={64}
              className="h-12 sm:h-16 object-cover"
            />
          </Link>
          <nav className="hidden items-center gap-8 text-base font-medium text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/contact#contact-form">Book an Appointment</Link>
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center text-primary transition lg:hidden cursor-pointer"
              aria-label="Toggle menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6 mr-2" />
              )}
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
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
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
                <Image
                  src="/logo.jpeg"
                  alt="TrueNorth logo"
                  width={100}
                  height={80}
                  className="h-8 sm:h-10 object-cover"
                />
                <button
                  type="button"
                  className="text-primary cursor-pointer"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-6" />
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
              <Button asChild className="w-full">
                <Link
                  href="/contact#contact-form"
                  onClick={() => setOpen(false)}
                >
                  Book an Appointment
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
