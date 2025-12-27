"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import Link from "next/link";

const shortcutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const companyLinks = [
  { href: "/#services", label: "Executive Search & Strategic Recruitment" },
  { href: "/#services", label: "Talent Advisory & Workforce Planning" },
  { href: "/#services", label: "Custom Talent Solutions" },
];

const professionalLinks = [
  { href: "/#services", label: "Career Consultation & Advisory" },
  { href: "/#services", label: "Resume, Interview & Job Matching Support" },
  { href: "/contact#contact-form", label: "Book a Consultation" },
];

const resourceLinks = [{ href: "/contact#faq", label: "FAQs" }];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/truenorth-talent-advisory/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null
  );

  const closeModal = () => setActiveModal(null);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#0f1f4a] py-12 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="TrueNorth logo"
                width={160}
                height={64}
                className="h-16 w-auto object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold">Get in Touch</h3>
            </div>
            <p className="max-w-xl text-base text-white/70">
              Whether you&apos;re a company seeking top-tier talent or a
              professional exploring your next opportunity, TrueNorth Talent
              Advisory is your trusted partner for navigating the talent
              landscape.
            </p>
          </div>
          <div className="flex flex-col lg:items-end gap-4">
            <Button
              asChild
              className="bg-[#EE4312] text-white hover:bg-[#cf3a10]"
            >
              <Link href="/contact#contact-form">Book an Appointment</Link>
            </Button>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                TrueNorth Talent Advisory
              </p>
              <nav className="flex lg:justify-between gap-4 text-sm text-white/70">
                {shortcutLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                For Companies
              </p>
              <nav className="flex flex-col gap-2 text-sm text-white/70">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                Legal
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="text-left transition hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="text-left transition hover:text-white cursor-pointer"
                >
                  Terms of Use
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                Resources
              </p>
              <nav className="flex flex-col gap-2 text-sm text-white/70">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-3 pt-2">
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
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                For Professionals
              </p>
              <nav className="flex flex-col gap-2 text-sm text-white/70">
                {professionalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex border-t border-white/10 pt-4 text-xs text-white/60 md:flex-row md:items-center md:justify-center">
          <p>
            TrueNorth Talent Advisory. @{new Date().getFullYear()}. All rights
            reserved.
          </p>
        </div>
      </div>

      {activeModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl rounded-md bg-white p-6 text-primary shadow-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">
                {activeModal === "privacy" ? "Privacy Policy" : "Terms of Use"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-primary transition hover:text-primary cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {activeModal === "privacy"
                ? "TrueNorth Talent Advisory is committed to protecting your privacy. We collect and use personal information solely for recruitment, career advisory, and talent consulting purposes. Your data is handled securely and is never sold or shared without consent, except where required by law."
                : "By using this website, you agree that services provided by TrueNorth Talent Advisory are professional recruitment and advisory services and do not guarantee employment outcomes. Content on this site is for informational purposes and may not be reproduced without permission."}
            </p>
          </div>
        </div>
      ) : null}
    </motion.footer>
  );
}
