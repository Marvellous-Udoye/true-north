import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "01. Discover",
    detail:
      "Deep-dive intake to clarify must-haves, culture markers, and success metrics for each role.",
  },
  {
    title: "02. Align & Activate",
    detail:
      "Market mapping, messaging, and outreach with weekly scorecards that keep stakeholders synced.",
  },
  {
    title: "03. Select & Support",
    detail:
      "Structured interviews, feedback loops, and closing support to secure the right talent quickly.",
  },
];

export function ProcessSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            How it works
          </p>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            A transparent, collaborative search process.
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            We combine structured recruiting practices with a hands-on advisory model so you always
            know where the search stands and what is needed next.
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
      </div>
    </section>
  );
}
