import { CtaSection } from "./_components/cta-section";
import { HeroSection } from "./_components/hero-section";
import { OfferSection } from "./_components/offer-section";
import { VisitSection } from "./_components/visit-section";

export default function ExternalLandingPage() {
  return (
    <main>
      <HeroSection />
      <OfferSection />
      <CtaSection />
      <VisitSection />
    </main>
  );
}
