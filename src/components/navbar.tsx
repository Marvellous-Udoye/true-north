"use client";

import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/jobs", label: "Careers" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navVariants = useMemo<Variants>(
    () => ({
      initial: { y: -20, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      },
    }),
    [],
  );

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="initial"
        animate="animate"
        className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white backdrop-blur-md shadow-none"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-10 lg:px-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold text-primary rounded-xl"
          >
            <Image
              src="/logo.jpeg"
              alt="TrueNorth logo"
              width={120}
              height={64}
              className="h-12 sm:h-16 object-cover"
            />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-black transition-all duration-300",
                    isActive
                      ? "text-primary"
                      : "text-slate-400 hover:text-slate-900",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden lg:inline-flex h-11 px-6 rounded-xl bg-primary/90 text-white font-bold shadow-none hover:bg-primary/90 transition-all group"
            >
              <Link href="/contact#contact-form">
                Book Appointment
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden cursor-pointer shadow-none"
              aria-label="Toggle menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
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
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden shadow-none"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[300px] flex-col bg-white p-8 border-l border-slate-100 shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                <Image
                  src="/logo.jpeg"
                  alt="TrueNorth logo"
                  width={100}
                  height={80}
                  className="h-8 sm:h-10 object-cover"
                />
                <button
                  type="button"
                  className="size-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-900"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-tight transition-all",
                      pathname === link.href
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:bg-slate-50",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                    <ArrowRight
                      className={cn(
                        "size-4 opacity-30",
                        pathname === link.href && "opacity-100",
                      )}
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full h-14 rounded-2xl bg-primary text-white font-black shadow-none hover:bg-primary/90"
                >
                  <Link
                    href="/contact#contact-form"
                    onClick={() => setOpen(false)}
                  >
                    Book Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
