import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { Company, Review } from "../../../types";

import { LandingHeader } from "@/modules/core/components";

interface CompanyDetailProps {
  company: Company;
  reviews: Review[];
}

export default function CompanyDetail({
  company,
  reviews,
}: CompanyDetailProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-slate-300 dark:text-slate-600"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <LandingHeader />
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <img
                alt={`Logo de ${company.name}`}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl shadow-lg object-cover"
                src={company.logo}
              />
            </div>

            {/* Company Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                  {company.name}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                  {company.industry} • {company.location.city},{" "}
                  {company.location.country}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(company.rating)}</div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {company.rating}
                  </span>
                </div>
                <span className="text-slate-600 dark:text-slate-300">
                  {company.reviewsCount} opiniones
                </span>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                {company.website && (
                  <a
                    className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                    href={company.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <span>{t("companyDetail.website")}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="bg-sky-600 hover:bg-sky-700"
                color="primary"
                size="lg"
                onPress={() =>
                  router.push(`/company/${router.query.slug}/review`)
                }
              >
                {t("companyDetail.writeReview")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* About Section */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t("companyDetail.aboutTitle")} {company.name}
              </h2>
            </CardHeader>
            <CardBody>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {company.description}
              </p>
            </CardBody>
          </Card>

          {/* Benefits */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t("companyDetail.benefitsTitle")}
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {company.benefits.map((benefit, index) => (
                  <Chip key={index} color="primary" size="sm" variant="flat">
                    {benefit}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t("companyDetail.quickStatsTitle")}
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("companyDetail.quickStats.totalReviews")}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {company.reviewsCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("companyDetail.quickStats.wouldRecommend")}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {Math.round(
                      (reviews.filter((r) => r.wouldRecommend).length /
                        reviews.length) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("companyDetail.quickStats.averageRating")}
                  </span>
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {company.rating}/5
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Recent Reviews */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {t("companyDetail.recentReviewsTitle")}
                </h2>
                <Button color="primary" variant="light">
                  {t("companyDetail.viewAllReviews")}
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {review.role} • {review.timeAgo}
                        </p>
                      </div>
                      {review.wouldRecommend && (
                        <Chip color="success" size="sm" variant="flat">
                          {t("companyDetail.recommends")}
                        </Chip>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
                          {t("companyDetail.reviewSections.pros")}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {review.pros}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                          {t("companyDetail.reviewSections.cons")}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {review.cons}
                        </p>
                      </div>

                      {review.advice && (
                        <div>
                          <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                            {t("companyDetail.reviewSections.advice")}
                          </h4>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            {review.advice}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
