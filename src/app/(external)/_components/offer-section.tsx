"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const offers = [
  {
    title: "Method Development",
    description:
      "Strategic method development for business excellence and progress.",
    icon: "/assets/offer-1.svg",
  },
  {
    title: "Quality Assurance",
    description:
      "Quality excellence for optimal and sustainable business operation.",
    icon: "/assets/offer-2.svg",
  },
  {
    title: "Human Resources",
    description: "Optimize human resources for sustainable business growth.",
    icon: "/assets/offer-3.svg",
  },
  {
    title: "Policy Compliance",
    description:
      "Strategic policy compliance for seamless business operations.",
    icon: "/assets/offer-4.svg",
  },
  {
    title: "Business Strategies",
    description:
      "Unlocking growth potential using dynamic business strategies.",
    icon: "/assets/offer-5.svg",
  },
  {
    title: "Management System",
    description:
      "Maximize productivity with our advanced management structure.",
    icon: "/assets/offer-6.svg",
  },
];

export function OfferSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 top-0 right-0 h-12 max-sm:max-w-40"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="space-y-3">
          <p className="text-xl sm:text-3xl font-semibold uppercase tracking-[0.16em] text-primary">
            What We Can Offer You
          </p>
          <p className="max-w-2xl text-base text-muted-foreground">
            Optimize your journey with our consulting services, delivering
            personalized solutions for success.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <Image src={offer.icon} alt="" width={64} height={64} />
              </div>
              <h3 className="text-xl font-semibold text-primary">
                {offer.title}
              </h3>
              <p className="text-base text-muted-foreground">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
