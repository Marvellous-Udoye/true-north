import { AudienceSection } from "./_components/audience-section";
import { FaqSection } from "./_components/faq-section";
import { HeroSection } from "./_components/hero-section";
import { ProcessSection } from "./_components/process-section";
import { ServicesSection } from "./_components/services-section";

export default function ExternalLandingPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AudienceSection />
      <ProcessSection />
      <FaqSection />
    </main>
  );
}
