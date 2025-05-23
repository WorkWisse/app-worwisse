import DefaultLayout from "@/layouts/default";
import { LandingHero } from "@/modules/landing/components/LandingHero";
import { LandingFeaturedLogos } from "@/modules/landing/components/LandingFeaturedLogos";
import { LandingMainContent } from "@/modules/landing/components/LandingMainContent";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <LandingHero />
      <LandingFeaturedLogos />
      <LandingMainContent />
    </DefaultLayout>
  );
}
