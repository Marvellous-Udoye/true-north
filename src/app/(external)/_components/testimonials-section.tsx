"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Heimlin Marka",
    title: "Executive Director",
    quote:
      "Working with TrueNorth was a game-changer for our business. Their strategic insights transformed our approach and boosted our success.",
    avatar: "/assets/hero-img.svg",
  },
  {
    name: "Karmel Otto",
    title: "Accountant & Finance Manager",
    quote:
      "Exceptional service! The team navigated us through challenges with precision, delivering impactful strategies that led to tangible results.",
    avatar: "/assets/hero-img.svg",
  },
  {
    name: "Karnie Rose",
    title: "Project Coordinator",
    quote:
      "The consulting team demonstrated depth and insight, guiding us toward effective decisions and significantly improved outcomes.",
    avatar: "/assets/hero-img.svg",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                <div className="h-px w-8 bg-primary" />
                Client Stories
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Real Voices, Real <span className="text-primary italic font-serif">Impact.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Explore the authentic experiences of our partners as they share 
                the results of our collaborative journey.
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="size-14 rounded-2xl border-slate-200 bg-white transition-all hover:bg-primary hover:text-white hover:border-primary"
              >
                <ChevronLeft className="size-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="size-14 rounded-2xl border-slate-200 bg-white transition-all hover:bg-primary hover:text-white hover:border-primary"
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3 w-full relative">
            <div className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="wait">
                {[0, 1].map((offset) => {
                  const itemIndex = (index + offset) % testimonials.length;
                  const item = testimonials[itemIndex];
                  
                  return (
                    <motion.div
                      key={`${item.name}-${itemIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: offset * 0.1 }}
                      className={cn(
                        "rounded-[2.5rem] border border-slate-200 bg-white p-10 flex flex-col gap-8 transition-all duration-300 hover:border-primary/20",
                        offset === 1 ? "hidden md:flex" : "flex"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="size-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>

                      <div className="flex-1">
                        <Quote className="size-10 mb-6 text-slate-100 fill-slate-100" />
                        <p className="text-xl font-medium text-slate-600 leading-relaxed italic">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                        <div className="size-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white grayscale">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 leading-none">{item.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{item.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
