import { BenefitsSection } from "./_components/benefits-section";
import { CtaSection } from "./_components/cta-section";
import { HeroSection } from "./_components/hero-section";
import { OfferSection } from "./_components/offer-section";
import { OurWorkSection } from "./_components/our-work-section";
import { TestimonialsSection } from "./_components/testimonials-section";

export default function ExternalLandingPage() {
  return (
    <main>
      <HeroSection />
      <OfferSection />
      <OurWorkSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
