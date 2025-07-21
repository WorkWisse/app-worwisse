import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

import { CompanyDocument, ReviewDocument } from "../../../types";

interface CompanyDetailProps {
  company: CompanyDocument;
  reviews: ReviewDocument[];
}

// Helper interface for standardized review ratings
interface StandardizedRatings {
  workEnvironment: number;
  compensation: number;
  benefits: number;
  culture: number;
  communication: number;
  careerGrowth: number;
  workLifeBalance: number;
  inclusion: number;
}

export default function CompanyDetail({
  company,
  reviews,
}: CompanyDetailProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(5);

  // Map CompanyDocument properties to expected format
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
    reviewsCount: company.reviewsCount || reviews.length || 0,
    benefits:
      typeof company.benefits === "string"
        ? company.benefits.split(", ").filter(Boolean)
        : [],
  };

  // Función para calcular tiempo transcurrido
  const getTimeAgo = (date: Date | any) => {
    if (!date) return "Hace tiempo";

    const now = new Date();
    const reviewDate =
      date instanceof Date
        ? date
        : date.toDate
          ? date.toDate()
          : new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - reviewDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Hace menos de un minuto";

    if (diffInSeconds < 3600)
      return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;

    if (diffInSeconds < 86400)
      return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;

    if (diffInSeconds < 2592000)
      return `Hace ${Math.floor(diffInSeconds / 86400)} días`;

    return `Hace ${Math.floor(diffInSeconds / 2592000)} meses`;
  };

  // Map ReviewDocument to standardized ratings
  const mapReviewToStandardRatings = (
    review: ReviewDocument
  ): StandardizedRatings | null => {
    // If review has the ratings object, use it
    if (review.ratings) {
      return {
        workEnvironment: review.ratings.workEnvironment,
        compensation: review.ratings.compensation,
        benefits: review.ratings.benefits,
        culture: review.ratings.culture,
        communication: review.ratings.communication,
        careerGrowth: review.ratings.careerGrowth,
        workLifeBalance: review.ratings.workLifeBalance,
        inclusion: review.ratings.inclusion,
      };
    }

    // Map from individual rating properties if they exist
    if (typeof review.workEnvironment === "number") {
      return {
        workEnvironment: review.workEnvironment,
        compensation: review.salary || 0,
        benefits: review.benefits || 0,
        culture: review.companyCulture || 0,
        communication: review.internalCommunication || 0,
        careerGrowth: review.professionalGrowth || 0,
        workLifeBalance: review.workLifeBalance || 0,
        inclusion: review.workInclusion || 0,
      };
    }

    return null;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
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

  // Calcular promedios de calificaciones específicas
  const calculateRatingAverages = () => {
    const reviewsWithRatings = reviews
      .map((review) => mapReviewToStandardRatings(review))
      .filter((ratings) => ratings !== null) as StandardizedRatings[];

    if (reviewsWithRatings.length === 0) {
      return null;
    }

    const totals = {
      workEnvironment: 0,
      compensation: 0,
      benefits: 0,
      culture: 0,
      communication: 0,
      careerGrowth: 0,
      workLifeBalance: 0,
      inclusion: 0,
    };

    reviewsWithRatings.forEach((ratings) => {
      totals.workEnvironment += ratings.workEnvironment;
      totals.compensation += ratings.compensation;
      totals.benefits += ratings.benefits;
      totals.culture += ratings.culture;
      totals.communication += ratings.communication;
      totals.careerGrowth += ratings.careerGrowth;
      totals.workLifeBalance += ratings.workLifeBalance;
      totals.inclusion += ratings.inclusion;
    });

    const count = reviewsWithRatings.length;

    return {
      workEnvironment: Number((totals.workEnvironment / count).toFixed(1)),
      compensation: Number((totals.compensation / count).toFixed(1)),
      benefits: Number((totals.benefits / count).toFixed(1)),
      culture: Number((totals.culture / count).toFixed(1)),
      communication: Number((totals.communication / count).toFixed(1)),
      careerGrowth: Number((totals.careerGrowth / count).toFixed(1)),
      workLifeBalance: Number((totals.workLifeBalance / count).toFixed(1)),
      inclusion: Number((totals.inclusion / count).toFixed(1)),
    };
  };

  const ratingAverages = calculateRatingAverages();
  const displayedReviews = reviews.slice(0, displayedReviewsCount);

  const handleLoadMoreReviews = () => {
    setDisplayedReviewsCount((prev) => Math.min(prev + 5, reviews.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      {/* Compact Company Header */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Company Logo and Basic Info */}
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
                    {mappedCompany.location.city}
                    {", "}
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

            {/* Rating and Action */}
            <div className="flex xs:flex-row items-start xs:items-center gap-3 w-full sm:w-auto ">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <div className="flex scale-75 sm:scale-100">
                  {renderStars(mappedCompany.rating)}
                </div>
                <div className="flex text-xs xs:text-sm gap-2">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {mappedCompany.rating.toFixed(1)}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {mappedCompany.reviewsCount}{" "}
                    {mappedCompany.reviewsCount === 1 ? t("companyDetail.review") : t("companyDetail.reviews")}
                  </div>
                </div>
              </div>

              <Button
                className="w-full xs:w-auto hover:opacity-hover active:opacity-disabled bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-all duration-300"
                onPress={() =>
                  router.push(`/company/${company.slug || company.id}/review`)
                }
              >
                {t("companyDetail.writeReview")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating Breakdown */}
            {ratingAverages && (
              <Card className="">
                <CardHeader className="pb-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t("companyDetail.ratingBreakdown")}
                  </h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(ratingAverages).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {t(`reviewForm.ratings.${key}`)}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex scale-75">
                            {renderStars(value)}
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white min-w-[2rem]">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Recent Reviews */}
            <Card className="shadow-xl p-1 rounded-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t("companyDetail.recentReviews")}
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({reviews.length}{" "}
                      {reviews.length === 1 ? t("companyDetail.review") : t("companyDetail.reviews")})
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {displayedReviews.length > 0 ? (
                  <>
                    <div className="grid gap-4">
                      {displayedReviews.map((review) => (
                        <Card
                          key={review.id}
                          className="border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-md transition-shadow bg-sky-25 dark:bg-slate-800 bg-[##F8FAFC]"
                        >
                          <CardBody className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                      <p className="text-sm text-slate-700 dark:text-slate-400">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">
                                          {t("companyDetail.role")}: {review.role}
                                        </span>
                                      </p>
                                      {(review.wouldRecommend ||
                                        review.recommend) && (
                                          <Chip
                                            color="success"
                                            size="sm"
                                            variant="flat"
                                          >
                                            {t("companyDetail.recommends")}
                                          </Chip>
                                        )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex scale-75">
                                        {renderStars(
                                          review.rating ||
                                          review.overallRating ||
                                          0,
                                        )}
                                      </div>
                                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {review.rating || review.overallRating || 0}
                                        /5
                                      </span>
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                      {review.timeAgo ||
                                        getTimeAgo(review.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                      {t("companyDetail.pros")}
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                                      {review.pros ||
                                        review.positiveAspects ||
                                        "No disponible"}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                      {t("companyDetail.cons")}
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                      {review.cons ||
                                        review.areasForImprovement ||
                                        "No disponible"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>

                    {/* Load More Button */}
                    {displayedReviewsCount < reviews.length && (
                      <div className="flex justify-center pt-4">
                        <Button
                          className="px-6"
                          variant="bordered"
                          onPress={handleLoadMoreReviews}
                        >
                          {t("companyDetail.loadMore")} (
                          {reviews.length - displayedReviewsCount} {t("companyDetail.remaining")})
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-slate-500 dark:text-slate-400">
                      {t("companyDetail.noReviews")}
                    </p>
                    <Button
                      className="px-6"
                      color="primary"
                      onPress={() =>
                        router.push(
                          `/company/${company.slug || company.id}/review`,
                        )
                      }
                    >
                      {t("companyDetail.writeFirstReview")}
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {t("companyDetail.quickStats")}
                </h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {t("companyDetail.overallRating")}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex scale-75">
                      {renderStars(mappedCompany.rating)}
                    </div>
                    <span className="text-sm font-medium">
                      {mappedCompany.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {t("companyDetail.totalReviews")}
                  </span>
                  <span className="text-sm font-medium">
                    {mappedCompany.reviewsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {t("companyDetail.wouldRecommend")}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (reviews.filter((r) => r.wouldRecommend || r.recommend)
                        .length /
                        Math.max(reviews.length, 1)) *
                      100,
                    )}
                    %
                  </span>
                </div>
              </CardBody>
            </Card>

            {/* Benefits */}
            {mappedCompany.benefits.length > 0 && (
              <Card className="shadow-xl">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {t("companyDetail.benefits")}
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {mappedCompany.benefits.map((benefit, index) => (
                      <Chip
                        key={index}
                        color="primary"
                        size="sm"
                        variant="flat"
                      >
                        {benefit}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
