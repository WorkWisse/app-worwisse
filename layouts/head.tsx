import React from "react";
import { SEOHead } from "@/modules/core/components/SEOHead";
import { getOrganizationStructuredData, getWebSiteStructuredData } from "@/modules/core/utils/structuredData";

interface HeadProps {
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

export const Head: React.FC<HeadProps> = (props) => {
  // Combinar datos estructurados por defecto con los personalizados
  const defaultStructuredData = [
    getOrganizationStructuredData(),
    getWebSiteStructuredData()
  ];
  
  const combinedStructuredData = props.structuredData 
    ? [...defaultStructuredData, props.structuredData]
    : defaultStructuredData;

  return (
    <SEOHead
      {...props}
      structuredData={combinedStructuredData}
      alternateLanguages={props.alternateLanguages || [
        { hreflang: 'es', href: 'https://workwisse.com' },
        { hreflang: 'en', href: 'https://workwisse.com/en' },
        { hreflang: 'pt', href: 'https://workwisse.com/pt' }
      ]}
    />
  );
};
