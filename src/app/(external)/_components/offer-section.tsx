"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const offers = [
  {
    title: "Executive Search & Strategic Recruitment",
    description:
      " Identifying and securing high-impact talent aligned with organizational goals.",
    icon: "/assets/offer-1.svg",
  },
  {
    title: "Talent Advisory & Workforce Planning",
    description:
      "Advising organizations on hiring strategy, talent structure, and growth readiness.",
    icon: "/assets/offer-2.svg",
  },
  {
    title: "Custom Talent Solutions",
    description: "Bespoke recruitment support tailored to unique business needs.",
    icon: "/assets/offer-3.svg",
  },
  {
    title: "Career Consultation & Advisory",
    description:
      "Supporting professionals with career direction, positioning, and opportunity alignment.",
    icon: "/assets/offer-4.svg",
  },
  {
    title: "Resume, Interview & Job Matching Support",
    description:
      " Helping candidates present themselves effectively and connect with suitable roles.",
    icon: "/assets/offer-6.svg",
  },
];

export function OfferSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 max-sm:h-12 max-sm:w-40 opacity-60"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="space-y-3">
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            What We Can Offer You
          </p>
          <p className="max-w-2xl text-base text-muted-foreground">
            Optimize your hiring and career journey with strategic talent advisory and recruitment solutions designed to deliver the right people, aligned with your goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
            >
              <div className="flex items-center justify-center">
                <Image src={offer.icon} alt="" width={64} height={64} />
              </div>
              <h3 className="text-xl font-semibold text-primary">{offer.title}</h3>
              <p className="text-base text-muted-foreground">{offer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
