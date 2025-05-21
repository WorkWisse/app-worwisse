import DefaultLayout from "@/layouts/default";
import { LandingHero } from "@/components/LandingHero";
import { LandingFeaturedLogos } from "@/components/LandingFeaturedLogos";
import { LandingMainContent } from "@/components/LandingMainContent";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <LandingHero />
      <LandingFeaturedLogos />
      <LandingMainContent />
      {/* The salary survey banner from the original OpenQube site is not present in the provided images. */}
      {/* If you still want it, we can add the SalarySurveyBanner component here. */}
    </DefaultLayout>
  );
}
