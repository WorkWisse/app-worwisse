import DefaultLayout from "@/layouts/default";
import TermsHero from "@/modules/terms/components/TermsHero";
import TermsContent from "@/modules/terms/components/TermsContent";

export default function TermsPage() {
  return (
    <DefaultLayout>
      <TermsHero />
      <TermsContent />
    </DefaultLayout>
  );
}
