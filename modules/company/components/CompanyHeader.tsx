import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { CompanyDocument } from "@/types";
import { renderStars } from "@/modules/core/utils/stars";

interface CompanyHeaderProps {
  company: CompanyDocument;
  totalReviewsCount: number;
  showBackButton?: boolean;
}

export default function CompanyHeader({
  company,
  totalReviewsCount,
  showBackButton = false,
}: CompanyHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const mappedCompany = {
    name: company.companyName || "Unknown Company",
    logo: company.logoUrl || "/default-company-logo.png",
    industry: company.industry || "Unknown Industry",
    location: {
      city: company.state || "Unknown City",
      country: company.country || "Unknown Country",
    },
    website: company.website,
    rating: company.rating || 0,
    reviewsCount: totalReviewsCount || 0,
  };

  const handleAction = () => {
    if (showBackButton) {
      router.back();
    } else {
      router.push(`/company/${company.slug || company.id}/review`);
    }
  };

  return (
    <section className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <img
                alt={`Logo de ${mappedCompany.name}`}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg shadow-md object-cover"
                src={mappedCompany.logo}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {mappedCompany.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">{mappedCompany.industry}</span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="truncate">
                  {mappedCompany.location.city},{" "}
                  {mappedCompany.location.country}
                </span>
                {mappedCompany.website && (
                  <>
                    <span className="text-slate-400 hidden md:inline">•</span>
                    <a
                      className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors hidden md:inline"
                      href={mappedCompany.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("companyDetail.website")}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex xs:flex-row items-start xs:items-center gap-3 w-full sm:w-auto ">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex scale-75 sm:scale-100">
                {renderStars(mappedCompany.rating, "w-5 h-5")}
              </div>
              <div className="flex text-xs xs:text-sm gap-2">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {mappedCompany.rating.toFixed(1)}
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  {mappedCompany.reviewsCount}{" "}
                  {mappedCompany.reviewsCount === 1
                    ? t("companyDetail.review")
                    : t("companyDetail.reviews")}
                </div>
              </div>
            </div>
            <Button
              className={`w-full xs:w-auto hover:opacity-hover active:opacity-disabled font-semibold transition-all duration-300 ${
                showBackButton
                  ? "bg-slate-600 hover:bg-slate-700 text-white"
                  : "bg-sky-600 hover:bg-sky-700 text-white"
              }`}
              onPress={handleAction}
            >
              {showBackButton
                ? t("companyDetail.goBack")
                : t("companyDetail.writeReview")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
