"use client";

import { Mail } from "lucide-react";
import Image from "next/image";

export function VisitSection() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 lg:top-6 h-12 sm:h-24 lg:h-40 w-56 opacity-70"
        style={{
          backgroundImage: "url('/assets/hero-dots.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 md:px-10 lg:px-14">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
          <div className="md:w-1/2">
            <Image
              src="/assets/visit.svg"
              alt="TrueNorth office visit"
              width={640}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-6 bg-[#EE4312] p-6 text-white md:p-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Contact Us
              </p>
              <p className="text-lg font-semibold">Mon-Fri</p>
              <p className="text-2xl font-bold">9AM - 4PM UTC</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-base uppercase tracking-[0.14em] text-white/70">
                    Email
                  </p>
                  <p className="font-medium hidden sm:inline-block">
                    truenorthtalentadvisory.global@gmail.com
                  </p>
                </div>
              </div>
              <p className="font-medium -mt-4 inline-block sm:hidden">
                truenorthtalentadvisory.global@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
