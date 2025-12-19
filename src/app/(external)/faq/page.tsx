import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How does TrueNorth engage with new clients?",
    answer:
      "We start with a discovery session to align on goals, role requirements, and success criteria. From there, we map the market and launch outreach with weekly updates.",
  },
  {
    question: "Do you support confidential executive searches?",
    answer:
      "Yes. We run discreet, high-touch search processes with controlled outreach, NDAs when required, and tailored shortlists.",
  },
  {
    question: "Can candidates get coaching without an active search?",
    answer:
      "Absolutely. We offer standalone career consultations, resume/profile reviews, and interview prep to help you land the right role.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            FAQ
          </p>
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            Frequently asked questions
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground">
            If you do not see your question here, reach out and we will tailor a plan to your
            needs.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm md:p-6">
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

        <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-primary px-6 py-6 text-primary-foreground shadow-md md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Still have questions?</p>
            <p className="text-sm text-primary-foreground/90">
              We are happy to set up a short call to understand what you need.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="bg-primary-foreground text-primary">
              Book a call
            </Button>
            <Link
              href="/"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >
              Back to landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
