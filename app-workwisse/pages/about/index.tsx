import DefaultLayout from "@/layouts/default";
import AboutHero from "@/modules/about/components/AboutHero";
import AboutMission from "@/modules/about/components/AboutMission";
import AboutHistory from "@/modules/about/components/AboutHistory";
import AboutTeam from "@/modules/about/components/AboutTeam";
import AboutStats from "@/modules/about/components/AboutStats";
import AboutCTA from "@/modules/about/components/AboutCTA";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <AboutHero />
      <AboutMission />
      <AboutHistory />
      <AboutStats />
      <AboutTeam />
      <AboutCTA />
    </DefaultLayout>
  );
}
