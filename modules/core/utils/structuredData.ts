import { siteConfig } from "@/config/site";
import { CompanyDocument } from "@/types";

export const getOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WorkWisse",
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/logo.png`,
    description: siteConfig.description,
    foundingDate: "2020",
    sameAs: [
      "https://twitter.com/workwisse",
      "https://linkedin.com/company/workwisse",
      "https://facebook.com/workwisse",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contacto@workwisse.com",
      availableLanguage: ["Spanish", "English", "Portuguese"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "UY",
      addressRegion: "Montevideo",
    },
  };
};

// Datos estructurados para el sitio web
export const getWebSiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: "WorkWisse",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

// Datos estructurados para una empresa específica
export const getCompanyStructuredData = (company: CompanyDocument) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.companyName,
    description:
      company.description ||
      `Información y opiniones sobre ${company.companyName}`,
    url: company.website,
    logo: company.logoUrl,
    address: {
      "@type": "PostalAddress",
      addressCountry: company.location.country,
      addressRegion: company.location.state,
    },
    aggregateRating: company.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: company.rating,
          reviewCount: company.reviewsCount || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    // Las reseñas se pueden agregar dinámicamente cuando estén disponibles
    // review: reviews?.slice(0, 5).map(review => ({
    //   '@type': 'Review',
    //   reviewRating: {
    //     '@type': 'Rating',
    //     ratingValue: review.overallRating,
    //     bestRating: 5,
    //     worstRating: 1
    //   },
    //   author: {
    //     '@type': 'Person',
    //     name: 'Empleado Verificado'
    //   },
    //   reviewBody: review.positiveAspects,
    //   datePublished: review.creationDate
    // })) || []
  };
};

// Datos estructurados para página de búsqueda
export const getSearchPageStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Buscar Empresas - WorkWisse",
    description:
      "Busca y encuentra información sobre empresas, salarios y opiniones de empleados",
    url: `${siteConfig.siteUrl}/search`,
    mainEntity: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

// Datos estructurados para FAQ
export const getFAQStructuredData = (
  faqs: Array<{ question: string; answer: string }>,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Datos estructurados para breadcrumbs
export const getBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
};

// Datos estructurados para artículo/blog
export const getArticleStructuredData = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "WorkWisse",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}/images/logo.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image
      ? {
          "@type": "ImageObject",
          url: article.image,
        }
      : undefined,
    url: article.url,
  };
};
