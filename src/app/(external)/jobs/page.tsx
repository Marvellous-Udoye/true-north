import { JobsHeroSection } from "./_components/jobs-hero-section";
import { JobsListSection } from "./_components/jobs-list-section";

export const metadata = {
  title: "Jobs | TrueNorth Talent Advisory",
  description: "Explore career opportunities and join our network of top talent at TrueNorth Talent Advisory.",
};

export default function JobsPage() {
  return (
    <main>
      <JobsHeroSection />
      <JobsListSection />
    </main>
  );
}
