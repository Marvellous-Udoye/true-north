import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const steps = [
  {
    title: "Discovery & Alignment",
    detail:
      "We clarify the role, outcomes, and culture markers. You get a scorecard, messaging, and a launch plan.",
  },
  {
    title: "Market Mapping & Outreach",
    detail:
      "We identify priority talent pools, run targeted outreach, and share weekly pipeline updates.",
  },
  {
    title: "Selection & Close",
    detail:
      "Structured interviews, feedback loops, references, and closing support to land the right hire quickly.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            How it works
          </p>
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            A clear path from brief to hire.
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground">
            TrueNorth blends strategic advisory with hands-on recruiting so every search stays
            transparent, on-schedule, and outcome-focused.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="h-full border-primary/10 bg-white shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-lg text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {step.detail}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-6 shadow-sm">
          <p className="text-base font-semibold text-primary">
            Ready to see this in action?
          </p>
          <p className="text-sm text-muted-foreground">
            Book a consultation and we will share a tailored plan for your roles.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Back to landing
          </Link>
        </div>
      </div>
    </div>
  );
}
