import { ContactFaqSection } from "./_components/contact-faq-section";
import { ContactFormSection } from "./_components/contact-form-section";
import { ContactHeroSection } from "./_components/contact-hero-section";

export default function ContactPage() {
  return (
    <main>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactFaqSection />
    </main>
  );
}
