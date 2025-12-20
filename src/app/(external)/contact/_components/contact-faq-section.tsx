"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We deliver executive search, strategic recruitment advisory, and bespoke talent solutions that align with your growth goals and organizational structure.",
  },
  {
    question: "How can your firm help improve our business?",
    answer:
      "We focus on structured hiring playbooks, stakeholder alignment, and fast feedback loops that shorten time-to-hire while improving retention and team fit.",
  },
  {
    question: "What experience do you have in our industry?",
    answer:
      "Our advisory team has led searches across Technology, SaaS, Engineering, Operations, and Professional Services, tailoring each engagement to the market.",
  },
  {
    question: "What is your approach or methodology?",
    answer:
      "We begin with discovery and scorecards, move through market mapping and outreach, then guide interviews, selection, and closing with weekly updates.",
  },
  {
    question: "Can you provide references or case studies?",
    answer:
      "Yes. We can share anonymized case studies and connect you with references aligned with your industry and hiring scope.",
  },
];

export function ContactFaqSection() {
  return (
    <section id="contact-faq" className="bg-white py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 max-sm:h-12 max-sm:w-40 opacity-60"
        style={{
          backgroundImage: "url('/assets/offer-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            FAQ
          </p>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Most Asked Question to Us
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Explore answers to common questions so you can connect with our team
            confidently.
          </p>
        </div>

        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-xl border border-primary/10 px-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
