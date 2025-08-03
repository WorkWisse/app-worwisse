import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Using the simple Card component structure defined earlier
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className}`}>{children}</div>;

// Placeholder for icons, replace with actual icon components if available
const ChevronLeftIcon = () => (
  <svg
    aria-labelledby="chevLeftTitle"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="chevLeftTitle">Previous</title>
    <path
      d="M15 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    aria-labelledby="chevRightTitle"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="chevRightTitle">Next</title>
    <path
      d="M9 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

interface Review {
  id: string;
  companyName: string;
  companyLogoInitial: string;
  companyType: string;
  date: string;
  rating: number;
  pros: string;
  cons: string;
}

const lastReviewsData: Review[] = [
  {
    id: "1",
    companyName: "BBVA",
    companyLogoInitial: "B",
    companyType: "Banco",
    date: "Hace 13 días",
    rating: 8.0,
    pros: "Las ventajas de estar dentro de Bancarios y que el edificio es 'nuevo'.",
    cons: "Políticas de trabajo del 1900, los líderes no tienen la mas pálida idea de hacer Infosec, llegas a liderar un área por se el pesado que pregunta siempre 'Como'.",
  },
  // Add more reviews if needed for carousel functionality
];

export const LandingLastReviews = () => {
  const { t } = useTranslation();
  
  // Estado para manejar "Ver más" en textos largos
  const [expandedTexts, setExpandedTexts] = useState<Set<string>>(new Set());

  // Función para truncar texto con límites responsivos
  const truncateText = (text: string, isMobile: boolean = false) => {
    const maxLength = isMobile ? 120 : 230;
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Función para alternar expansión de texto específico (pros o cons)
  const toggleTextExpansion = (reviewId: string, textType: 'pros' | 'cons') => {
    const key = `${reviewId}-${textType}`;
    const newExpanded = new Set(expandedTexts);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedTexts(newExpanded);
  };

  // Verificar si un texto específico está expandido
  const isTextExpanded = (reviewId: string, textType: 'pros' | 'cons') => {
    return expandedTexts.has(`${reviewId}-${textType}`);
  };

  // Verificar si el texto necesita truncarse con límites responsivos
  const needsTruncation = (text: string, isMobile: boolean = false) => {
    const maxLength = isMobile ? 120 : 230;
    return text && text.length > maxLength;
  };

  // Basic state for carousel, would need more logic for actual sliding
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600">
            {t("landing.latestReviews.title")}
          </h2>

        </div>
        {/* This would be part of a carousel/slider in a real implementation */}
        {lastReviewsData.map((review) => (
          <Card key={review.id} className="shadow-lg">
            <CardBody>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-gray-200 text-gray-700 flex items-center justify-center rounded-full text-xl font-semibold">
                    {review.companyLogoInitial}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review.companyName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.companyType} &middot; {review.date}
                    </p>
                  </div>
                </div>
                <div className="text-yellow-500 text-2xl font-bold">
                  ★ {review.rating.toFixed(1)}/10
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">{t("companyDetail.pros")}:</h4>
                <div className="text-gray-600 mb-3 text-sm">
                  {/* Mobile version */}
                  <span className="block sm:hidden">
                    {isTextExpanded(review.id, 'pros') || !needsTruncation(review.pros, true) 
                      ? review.pros 
                      : truncateText(review.pros, true)
                    }
                    {needsTruncation(review.pros, true) && (
                      <button
                        className="ml-2 text-purple-600 hover:text-purple-800 font-medium text-xs underline"
                        onClick={() => toggleTextExpansion(review.id, 'pros')}
                      >
                        {isTextExpanded(review.id, 'pros') ? t("common.showLess") : t("common.showMore")}
                      </button>
                    )}
                  </span>
                  {/* Desktop version */}
                  <span className="hidden sm:block">
                    {isTextExpanded(review.id, 'pros') || !needsTruncation(review.pros, false) 
                      ? review.pros 
                      : truncateText(review.pros, false)
                    }
                    {needsTruncation(review.pros, false) && (
                      <button
                        className="ml-2 text-purple-600 hover:text-purple-800 font-medium text-xs underline"
                        onClick={() => toggleTextExpansion(review.id, 'pros')}
                      >
                        {isTextExpanded(review.id, 'pros') ? t("common.showLess") : t("common.showMore")}
                      </button>
                    )}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-700 mb-1">{t("companyDetail.cons")}:</h4>
                <div className="text-gray-600 mb-3 text-sm">
                  {/* Mobile version */}
                  <span className="block sm:hidden">
                    {isTextExpanded(review.id, 'cons') || !needsTruncation(review.cons, true) 
                      ? review.cons 
                      : truncateText(review.cons, true)
                    }
                    {needsTruncation(review.cons, true) && (
                      <button
                        className="ml-2 text-purple-600 hover:text-purple-800 font-medium text-xs underline"
                        onClick={() => toggleTextExpansion(review.id, 'cons')}
                      >
                        {isTextExpanded(review.id, 'cons') ? t("common.showLess") : t("common.showMore")}
                      </button>
                    )}
                  </span>
                  {/* Desktop version */}
                  <span className="hidden sm:block">
                    {isTextExpanded(review.id, 'cons') || !needsTruncation(review.cons, false) 
                      ? review.cons 
                      : truncateText(review.cons, false)
                    }
                    {needsTruncation(review.cons, false) && (
                      <button
                        className="ml-2 text-purple-600 hover:text-purple-800 font-medium text-xs underline"
                        onClick={() => toggleTextExpansion(review.id, 'cons')}
                      >
                        {isTextExpanded(review.id, 'cons') ? t("common.showLess") : t("common.showMore")}
                      </button>
                    )}
                  </span>
                </div>
                <Link
                  className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                  href={`/reviews/${review.id}`}
                >
                  Ver más
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};
