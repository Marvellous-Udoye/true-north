"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
