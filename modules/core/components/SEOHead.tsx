import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
  alternateLanguages?: { hreflang: string; href: string }[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  ogImage = siteConfig.ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonical,
  noindex = false,
  nofollow = false,
  structuredData,
  alternateLanguages = [],
}) => {
  const router = useRouter();
  const currentUrl = `${siteConfig.siteUrl}${router.asPath}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = canonical || currentUrl;
  const fullOgImage = ogImage?.startsWith("http")
    ? ogImage
    : `${siteConfig.siteUrl}${ogImage}`;

  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
  ].join(", ");

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta content={description} name="description" />
      <meta content={keywords} name="keywords" />
      <meta content={siteConfig.author} name="author" />
      <meta content={robotsContent} name="robots" />
      <link href={canonicalUrl} rel="canonical" />

      {/* Viewport and Mobile */}
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        name="viewport"
      />
      <meta content="#0ea5e9" name="theme-color" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="default" name="apple-mobile-web-app-status-bar-style" />

      {/* Open Graph */}
      <meta content={ogType} property="og:type" />
      <meta content={fullTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={currentUrl} property="og:url" />
      <meta content={siteConfig.name} property="og:site_name" />
      <meta content={fullOgImage} property="og:image" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content={title || siteConfig.name} property="og:image:alt" />
      <meta content="es_ES" property="og:locale" />

      {/* Twitter Cards */}
      <meta content={twitterCard} name="twitter:card" />
      <meta content={siteConfig.twitterHandle} name="twitter:site" />
      <meta content={siteConfig.twitterHandle} name="twitter:creator" />
      <meta content={fullTitle} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={fullOgImage} name="twitter:image" />
      <meta content={title || siteConfig.name} name="twitter:image:alt" />

      {/* Alternate Languages */}
      {alternateLanguages.map((lang) => (
        <link
          key={lang.hreflang}
          href={lang.href}
          hrefLang={lang.hreflang}
          rel="alternate"
        />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          type="application/ld+json"
        />
      )}

      {/* Favicon and Icons */}
      <link href="/favicon.ico" rel="icon" />
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/site.webmanifest" rel="manifest" />

      {/* Preconnect to external domains */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="anonymous"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      <link href="https://www.google-analytics.com" rel="dns-prefetch" />
    </Head>
  );
};

export default SEOHead;
