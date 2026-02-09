"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const offers = [
  {
    title: "Executive Search & Strategic Recruitment",
    description:
      "Identifying and securing high-impact talent aligned with organizational goals.",
    details:
      "Our executive search methodology combines deep industry research with a rigorous vetting process. We don't just find candidates; we secure leaders who fit your culture and drive long-term strategic growth.",
    icon: "/assets/offer-1.svg",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Talent Advisory & Workforce Planning",
    description:
      "Advising organizations on hiring strategy, talent structure, and growth readiness.",
    details:
      "We help you forecast future hiring needs, analyze skill gaps, and build a sustainable talent pipeline. Our advisory services ensure your human capital is prepared for scale and market shifts.",
    icon: "/assets/offer-2.svg",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Custom Talent Solutions",
    description:
      "Bespoke recruitment support tailored to unique business needs.",
    details:
      "Every business is different. We design flexible recruitment frameworks that adapt to your specific timeline, budget, and technical requirements, providing a truly personalized hiring experience.",
    icon: "/assets/offer-3.svg",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Career Consultation & Advisory",
    description:
      "Supporting professionals with career direction, positioning, and opportunity alignment.",
    details:
      "We work with high-potential individuals to define their career path, optimize their professional brand, and align them with organizations where they can have the most significant impact.",
    icon: "/assets/offer-4.svg",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Resume, Interview & Job Matching Support",
    description:
      "Helping candidates present themselves effectively and connect with suitable roles.",
    details:
      "From narrative-driven resume restructuring to intensive mock interviews, we equip candidates with the tools and confidence to win their ideal roles in competitive markets.",
    icon: "/assets/offer-6.svg",
    color: "bg-red-50 text-red-600",
  },
];

function OfferCard({
  offer,
  index,
}: {
  offer: (typeof offers)[0];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-[380px] w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className={cn(
          "relative h-full w-full transition-all duration-500",
          isFlipped ? "rotate-y-180" : "",
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 flex h-full w-full flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-primary/20"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className={cn(
              "size-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3",
              offer.color,
            )}
          >
            <Image src={offer.icon} alt="" width={32} height={32} />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
              {offer.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 font-medium">
              {offer.description}
            </p>
          </div>
          <div
            onClick={() => setIsFlipped(true)}
            className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary cursor-pointer hover:opacity-80"
          >
            Learn more
            <div className="h-px w-4 bg-primary" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col rounded-[2rem] border border-primary/20 bg-white p-8 text-primary"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary italic font-serif">
              Service Details
            </h3>
            <button
              onClick={() => setIsFlipped(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold leading-tight">{offer.title}</h4>
            <p className="text-sm leading-relaxed text-slate-500 font-medium">
              {offer.details}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function OfferSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-32"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <div className="h-px w-8 bg-primary" />
              Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              What We Can{" "}
              <span className="text-primary italic font-serif">Offer</span> You
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Optimize your hiring and career journey with strategic talent
              advisory and recruitment solutions designed to deliver results.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <OfferCard key={offer.title} offer={offer} index={index} />
          ))}

          <div className="hidden lg:flex flex-col h-[380px] justify-center gap-6 rounded-[2rem] border border-primary/10 bg-primary/95 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <h3 className="text-2xl font-bold relative z-10">
              Need a custom solution?
            </h3>
            <p className="text-slate-300 text-sm font-medium relative z-10">
              We provide bespoke talent strategies for fast-growing startups and
              established enterprises.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-400 transition-colors relative z-10"
            >
              Speak with an expert
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
