"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What does TrueNorth Talent Advisory do?",
    answer:
      "We provide strategic recruitment and talent advisory services, connecting organizations with exceptional talent and guiding professionals toward the right career opportunities.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We work with growth-focused companies and professionals across Technology, SaaS, Engineering, Operations, Supply Chain, Corporate Services, and Professional Services.",
  },
  {
    question: "Do you work with both clients and candidates?",
    answer:
      "Yes. We partner with organizations seeking top talent and support professionals through career advisory, job matching, and interview preparation.",
  },
  {
    question: "How do I get started?",
    answer:
      "You can book a consultation directly through our website or contact us to discuss your hiring or career needs.",
  },
  {
    question: "Do you offer customized solutions?",
    answer:
      "Absolutely. All our services are tailored to align with your specific goals, challenges, and timelines.",
  },
];

export function ContactFaqSection() {
  return (
    <section
      id="contact-faq"
      className="bg-white py-20 lg:py-32 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-6">
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs">
              <HelpCircle className="size-4" />
              Resources
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Common{" "}
              <span className="text-orange-600 italic font-serif">
                Questions
              </span>{" "}
              for Us.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Explore answers to common questions so you can connect with our
              advisory team with full confidence.
            </p>
            <div className="pt-8 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-900 mb-2">
                Still have questions?
              </p>
              <p className="text-sm text-slate-500">Reach out directly at</p>
              <Link href="mailto:truenorthtalentadvisory.global@gmail.com">
                <p className="text-sm font-black text-primary">
                  truenorthtalentadvisory.global@gmail.com
                </p>
              </Link>
            </div>
          </div>

          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className="rounded-[2rem] border border-slate-200 px-6 md:px-8 bg-slate-50/30 transition-all hover:border-primary/20"
                >
                  <AccordionTrigger className="text-left text-lg font-bold text-slate-900 hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-base text-slate-500 font-medium leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
