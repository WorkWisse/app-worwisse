import DefaultLayout from "@/layouts/default";
import { LandingHero } from "@/modules/landing/components/LandingHero";
import { LandingFeatures } from "@/modules/landing/components/LandingFeatures";
import { LandingMainContent } from "@/modules/landing/components/LandingMainContent";
import { LandingFAQ } from "@/modules/landing/components/LandingFAQ";
import { getFAQStructuredData } from "@/modules/core/utils/structuredData";

export default function IndexPage() {
  // Datos estructurados para FAQ
  const faqData = [
    {
      question: "¿Cómo funciona WorkWisse?",
      answer:
        "WorkWisse es una plataforma donde empleados comparten opiniones verificadas sobre sus empresas. Puedes buscar cualquier empresa y ver reseñas reales sobre ambiente laboral, salarios, beneficios y más.",
    },
    {
      question: "¿Las opiniones son reales?",
      answer:
        "Sí, todas las opiniones son de empleados verificados. Tenemos un sistema de verificación que asegura que solo personas que realmente trabajaron en las empresas puedan dejar reseñas.",
    },
    {
      question: "¿Es gratis usar WorkWisse?",
      answer:
        "Sí, WorkWisse es completamente gratuito para los trabajadores. Puedes buscar empresas, leer opiniones y dejar tus propias reseñas sin costo alguno.",
    },
    {
      question: "¿Puedo dejar una opinión anónima?",
      answer:
        "Absolutamente. Entendemos la importancia de la privacidad laboral. Todas las opiniones se publican de forma anónima para proteger tu identidad.",
    },
  ];

  const seoProps = {
    title: "WorkWisse - Opiniones Reales de Empresas y Empleos",
    description:
      "Descubre la verdad sobre tu próximo trabajo. Accede a opiniones verificadas de empleados, salarios reales y ambiente laboral. Más de 50,000 trabajadores ya confían en WorkWisse.",
    keywords:
      "opiniones empresas, reseñas trabajo, salarios reales, ambiente laboral, empleos uruguay, trabajos montevideo, glassdoor uruguay, reviews empleados",
    ogImage: "/images/og-home.jpg",
    structuredData: getFAQStructuredData(faqData),
  };

  return (
    <DefaultLayout seo={seoProps}>
      <LandingHero />
      <LandingFeatures />
      <LandingMainContent />
      <LandingFAQ />
    </DefaultLayout>
  );
}
