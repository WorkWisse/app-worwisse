import { LandingHeader } from "@/modules/core/components/LandingHeader";
import { LandingFooter } from "@/modules/core/components/LandingFooter";
import { Head } from "./head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
  alternateLanguages?: { hreflang: string; href: string }[];
}

export default function DefaultLayout({
  children,
  seo,
}: {
  children: React.ReactNode;
  seo?: SEOProps;
}) {
  return (
    <>
      <Head {...seo} />
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <LandingHeader />
        <main className="flex-grow">{children}</main>
        <LandingFooter />
      </div>
    </>
  );
}
