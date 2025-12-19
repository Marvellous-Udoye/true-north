import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What industries does TrueNorth specialize in?",
    answer:
      "We work across Technology, SaaS, Engineering, Operations, Supply Chain, Logistics, Corporate Services, and Professional Services with tailored playbooks for each market.",
  },
  {
    question: "Do you support both companies and candidates?",
    answer:
      "Yes. We advise hiring teams on search strategy and process, and we coach professionals on career moves, resumes, interviews, and matching to live roles.",
  },
  {
    question: "How quickly can a search start?",
    answer:
      "After a discovery call, we align on scope and launch within days with clear milestones, scorecards, and weekly updates.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-primary/5 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            FAQ
          </p>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Answers to common questions.
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Need something specific? Book time with the team and we will tailor a plan to your
            goals.
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

        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl bg-primary px-6 py-6 text-primary-foreground shadow-md md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.12em]">
              Ready to move
            </p>
            <p className="text-lg font-semibold md:text-xl">
              Book a discovery call to start your search or career plan.
            </p>
          </div>
          <Button variant="secondary" className="bg-primary-foreground text-primary">
            Schedule now
          </Button>
        </div>
      </div>
    </section>
  );
}
