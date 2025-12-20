"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Heimlin Marka",
    title: "Informatics Engineering",
    quote:
      "Working with this consulting firm was a game-changer for our business. Their strategic insights transformed our approach and boosted our success.",
    avatar: "/assets/hero-img.svg",
    rating: 5,
  },
  {
    name: "Karmel Otto",
    title: "Accountant & Finance Manager",
    quote:
      "Exceptional service! The consulting firm navigated us through challenges with precision, delivering impactful strategies that led to tangible results.",
    avatar: "/assets/hero-img.svg",
    rating: 5,
  },
  {
    name: "Karnie Rose",
    title: "Project Coordinator",
    quote:
      "The consulting team demonstrated depth and insight, guiding us toward effective decisions and improved outcomes.",
    avatar: "/assets/hero-img.svg",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const visibleTestimonials = [
    testimonials[index % total],
    testimonials[(index + 1) % total],
    testimonials[(index + 2) % total],
  ];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#f7f9fc] py-16 md:py-20">
      <div
        className="pointer-events-none absolute right-0 top-0 h-40 w-64 opacity-70"
        style={{
          backgroundImage: "url('/assets/testimonials-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-64 opacity-70"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              See What Clients Are Saying
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Explore the authentic sentiments and experiences of our clients as they share their
              thoughts and satisfaction.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="border-primary/20 text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="border-primary/20 text-primary hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {visibleTestimonials.map((testimonial, cardIndex) => (
            <motion.div
              key={`${testimonial.name}-${cardIndex}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35 }}
              className={cardIndex === 0 ? "" : "hidden md:block"}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="flex-1 px-6 py-6 text-sm text-muted-foreground">
                  {testimonial.quote}
                </div>
                <div className="flex items-center justify-between bg-[#EE4312] px-6 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/70">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-white/80">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-white text-white" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
