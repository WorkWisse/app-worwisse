import DefaultLayout from "@/layouts/default";
import { LandingHero } from "@/modules/landing/components/LandingHero";
import { LandingFeatures } from "@/modules/landing/components/LandingFeatures";
import { LandingMainContent } from "@/modules/landing/components/LandingMainContent";
import { LandingFAQ } from "@/modules/landing/components/LandingFAQ";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <LandingHero />
      <LandingFeatures />
      <LandingMainContent />
      <LandingFAQ />
    </DefaultLayout>
  );
}
