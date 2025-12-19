import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const audiences = [
  {
    title: "For Companies",
    bullets: [
      "Role design, market mapping, and candidate outreach.",
      "Interview frameworks and stakeholder alignment.",
      "Onboarding plans to land leaders and teams smoothly.",
    ],
    cta: "Book with an advisor",
  },
  {
    title: "For Professionals",
    bullets: [
      "Career consultations tailored to your next move.",
      "Resume and profile reviews that elevate your brand.",
      "Interview coaching and curated job matching.",
    ],
    cta: "Schedule a career call",
  },
];

export function AudienceSection() {
  return (
    <section id="audiences" className="bg-primary/5 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-14">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Two-sided partnership
          </p>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Support for both hiring teams and ambitious candidates.
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            We align company needs with candidate aspirations, creating transparent pathways that
            move quickly and stay human.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {audiences.map((item) => (
            <Card
              key={item.title}
              className="h-full border-primary/10 bg-white shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  What to expect
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Button size="sm">{item.cta}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
