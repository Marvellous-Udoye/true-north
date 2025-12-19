import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Executive Search Consultation",
    tagline: "Find leaders who drive success.",
    detail:
      "Targeted leadership searches that align with your strategy, culture, and growth plans.",
  },
  {
    title: "Strategic Recruitment Advisory",
    tagline: "Recruit smarter, grow faster.",
    detail:
      "Workforce planning, hiring playbooks, and talent processes built to scale efficiently.",
  },
  {
    title: "Custom Talent Solutions",
    tagline: "Tailored talent, measurable results.",
    detail:
      "Bespoke programs for niche roles, hard-to-fill markets, and specialized teams.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Services for companies
          </p>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Build resilient teams with a partner who understands your market.
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            We specialize across Technology, SaaS, Engineering, Operations, Supply Chain,
            Logistics, Corporate Services, and Professional Services—so every search is grounded
            in domain expertise.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="h-full border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{service.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary/80">
                  {service.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">{service.detail}</p>
                <Button variant="link" className="p-0 text-primary">
                  Learn more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
