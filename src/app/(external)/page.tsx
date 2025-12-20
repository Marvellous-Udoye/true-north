import { AudienceSection } from "./_components/audience-section";
import { AboutSection } from "./_components/about-section";
import { FaqSection } from "./_components/faq-section";
import { HeroSection } from "./_components/hero-section";
import { OfferSection } from "./_components/offer-section";
import { ProcessSection } from "./_components/process-section";
import { ServicesSection } from "./_components/services-section";

export default function ExternalLandingPage() {
  return (
    <main>
      <HeroSection />
      <OfferSection />
      <AboutSection />
      <ServicesSection />
      <AudienceSection />
      <ProcessSection />
      <FaqSection />
    </main>
  );
}
