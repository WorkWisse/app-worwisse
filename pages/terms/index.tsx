import DefaultLayout from "@/layouts/default";
import TermsHero from "@/modules/terms/components/TermsHero";
import TermsContent from "@/modules/terms/components/TermsContent";
import TermsCTA from "@/modules/terms/components/TermsCTA";

export default function TermsPage() {
    return (
        <DefaultLayout>
            <TermsHero />
            <TermsContent />
            <TermsCTA />
        </DefaultLayout>
    );
}
