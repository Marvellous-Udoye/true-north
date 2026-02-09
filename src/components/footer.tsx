"use client";

import { SubscribeForm } from "@/components/subscribe-form";
import { motion } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const shortcutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/jobs", label: "Careers" },
];

const companyLinks = [
  { href: "/#services", label: "Executive Search" },
  { href: "/#services", label: "Talent Advisory" },
  { href: "/#services", label: "Workforce Planning" },
  { href: "/#services", label: "Custom Solutions" },
];

const professionalLinks = [
  { href: "/#services", label: "Career Consultation" },
  { href: "/#services", label: "Resume Support" },
  { href: "/jobs", label: "Job Matching" },
];

const resourceLinks = [
  { href: "/jobs", label: "Open Roles" },
  { href: "/contact#faq", label: "FAQs" },
  { href: "/blogs", label: "Insights" },
];

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null,
  );

  return (
    <footer className="bg-primary py-12 overflow-hidden shadow-none text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="grid gap-16">
          <div className="">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative overflow-hidden rounded-xl ">
                    <Image
                      src="/logo.jpeg"
                      alt="TrueNorth logo"
                      width={100}
                      height={80}
                      className="h-14 object-cover"
                    />
                  </div>
                  <span className="text-2xl font-black tracking-tight text-white uppercase">
                    TrueNorth Talent Advisory
                  </span>
                </Link>
                <p className="text-lg text-white/60 font-medium leading-relaxed max-w-sm">
                  Strategic talent advisory connecting exceptional candidates
                  with purpose-led organizations.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/truenorth-talent-advisory/"
                    target="_blank"
                    className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </div>

              <div className="text-white relative overflow-hidden flex flex-col gap-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-4 mb-8">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Stay ahead of the curve.
                  </h3>
                  <p className="text-white/40 text-sm font-medium">
                    Join leaders receiving our weekly talent advisory
                    insights.
                  </p>
                </div>
                <div className="relative z-10">
                  <SubscribeForm
                    variant="dark"
                    buttonClassName="bg-[#EE4312] hover:bg-[#cf3a10]"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-2 md:grid-cols-4 pt-12">
              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                  Company
                </p>
                <nav className="flex flex-col gap-4">
                  {shortcutLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                  For Clients
                </p>
                <nav className="flex flex-col gap-4">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                  For Talent
                </p>
                <nav className="flex flex-col gap-4">
                  {professionalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                  Resources
                </p>
                <nav className="flex flex-col gap-4">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} TrueNorth Talent Advisory. All
            Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveModal("privacy")}
              className="text-[11px] font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors cursor-pointer shadow-none bg-transparent border-none p-0"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="text-[11px] font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors cursor-pointer shadow-none bg-transparent border-none p-0"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4"
          onClick={() => setActiveModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl rounded-[2.5rem] bg-white p-10 md:p-12 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {activeModal === "privacy" ? "Privacy Policy" : "Terms of Use"}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer shadow-none border-none"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {activeModal === "privacy"
                  ? "TrueNorth Talent Advisory is committed to protecting your privacy. We collect and use personal information solely for recruitment, career advisory, and talent consulting purposes. Your data is handled securely and is never sold or shared without consent."
                  : "By using this website, you agree that services provided by TrueNorth Talent Advisory are professional recruitment and advisory services. Content on this site is for informational purposes and may not be reproduced without explicit permission."}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
}
