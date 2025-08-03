import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DocumentSnapshot } from "firebase/firestore";

import { CompanyDocument, ReviewDocument } from "../../../types";
import { ReviewService } from "../../../services";

import CompanyHeader from "./CompanyHeader";

import { renderStars } from "@/modules/core/utils/stars";

interface CompanyDetailProps {
  company: CompanyDocument;
  totalReviewsCount: number;
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
  equalOpportunity: number;
}

export default function CompanyDetail({
  company,
  totalReviewsCount,
}: CompanyDetailProps) {
  const { t } = useTranslation();
  const router = useRouter();

  // Estados para paginación real
  const [reviews, setReviews] = useState<ReviewDocument[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>(
    undefined
  );
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Estado para manejar "Ver más" en textos largos
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  // Cargar reseñas iniciales
  useEffect(() => {
    const loadInitialReviews = async () => {
      try {
        const initialPageSize =
          Number(process.env.NEXT_PUBLIC_REVIEW_LIMITER) || 3;
        const result = await ReviewService.getCompanyReviews(
          company.id || "",
          initialPageSize
        );

        setReviews(result.reviews);
        setLastDoc(result.lastDoc);
        setHasMoreReviews(result.reviews.length < totalReviewsCount);
      } catch (error) {
        console.error("Error loading initial reviews:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (company.id) {
      loadInitialReviews();
    }
  }, [company.id, totalReviewsCount]);

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
        equalOpportunity: review.ratings.equalOpportunity || 0,
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
        equalOpportunity: review.equalOpportunity || 0,
      };
    }

    return null;
  };

  // Función para estrellas compactas (para tarjetas de reseñas)
  const renderCompactStars = (rating: number) => {
    return renderStars(rating, "w-3 h-3");
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
      equalOpportunity: 0,
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
      totals.equalOpportunity += ratings.equalOpportunity || 0;
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
      equalOpportunity: Number((totals.equalOpportunity / count).toFixed(1)),
    };
  };

  const ratingAverages = calculateRatingAverages();

  // Función para truncar texto con límites responsivos
  const truncateText = (text: string, isMobile: boolean = false) => {
    const maxLength = isMobile ? 120 : 230;
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Función para alternar expansión de texto específico (pros o cons)
  const toggleTextExpansion = (reviewId: string, textType: 'pros' | 'cons') => {
    const key = `${reviewId}-${textType}`;
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedReviews(newExpanded);
  };

  // Verificar si un texto específico está expandido
  const isTextExpanded = (reviewId: string, textType: 'pros' | 'cons') => {
    return expandedReviews.has(`${reviewId}-${textType}`);
  };

  // Verificar si el texto necesita truncarse con límites responsivos
  const needsTruncation = (text: string, isMobile: boolean = false) => {
    const maxLength = isMobile ? 120 : 230;
    return text && text.length > maxLength;
  };

  const handleLoadMoreReviews = async () => {
    if (isLoadingMore || !hasMoreReviews) return;

    setIsLoadingMore(true);
    try {
      const loadMoreCount =
        Number(process.env.NEXT_PUBLIC_REVIEW_LOAD_MORE) || 5;
      const result = await ReviewService.getCompanyReviews(
        company.id || "",
        loadMoreCount,
        lastDoc
      );

      if (result.reviews.length > 0) {
        const newReviews = [...reviews, ...result.reviews];

        setReviews(newReviews);
        setLastDoc(result.lastDoc);
        // Verificar si hay más reseñas basado en el total count
        setHasMoreReviews(newReviews.length < totalReviewsCount);
      } else {
        setHasMoreReviews(false);
      }
    } catch (error) {
      console.error("Error loading more reviews:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      {/* Reusable Company Header */}
      <CompanyHeader company={company} totalReviewsCount={totalReviewsCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating Breakdown */}
            {ratingAverages && (
              <Card className="p-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50">
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
                            {renderStars(value, "w-5 h-5")}
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
            <Card className="p-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl rounded-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t("companyDetail.recentReviews")}
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({totalReviewsCount}{" "}
                      {totalReviewsCount === 1 ? "reseña" : "reseñas"})
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {isInitialLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      {t("companyDetail.loadingReviews") ||
                        "Cargando reseñas..."}
                    </p>
                  </div>
                ) : reviews.length > 0 ? (
                  <>
                    <div className="grid gap-3 sm:gap-4">
                      {reviews.map((review) => {
                        const prosText = review.pros || review.positiveAspects || "No disponible";
                        const consText = review.cons || review.areasForImprovement || "No disponible";
                        const isProsExpanded = isTextExpanded(review.id || '', 'pros');
                        const isConsExpanded = isTextExpanded(review.id || '', 'cons');
                        
                        return (
                          <Card
                            key={review.id}
                            className="bg-white/60 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/30 shadow-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/50 transition-all duration-200"
                          >
                            <CardBody className="p-3 sm:p-4">
                              {/* Layout mobile optimizado */}
                              <div className="space-y-3">
                                {/* Header con rating y tiempo - Más compacto en mobile */}
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                                        {review.role || t("companyDetail.anonymous")}
                                      </span>
                                      {(review.wouldRecommend || review.recommend) && (
                                        <Chip
                                          className="text-xs h-5"
                                          color="success"
                                          size="sm"
                                          variant="flat"
                                        >
                                          {t("companyDetail.recommends")}
                                        </Chip>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                      <div className="flex items-center gap-1">
                                        <div className="flex">
                                          {renderCompactStars(
                                            review.rating || review.overallRating || 0
                                          )}
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                          {review.rating || review.overallRating || 0}/5
                                        </span>
                                      </div>
                                      <span>•</span>
                                      <span>{review.timeAgo || getTimeAgo(review.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Pros - Más compacto */}
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-1">
                                      {t("companyDetail.pros")}
                                    </span>
                                  </div>
                                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border-l-2 border-green-500">
                                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {/* Mobile version */}
                                      <span className="block sm:hidden">
                                        {isProsExpanded || !needsTruncation(prosText, true) 
                                          ? prosText 
                                          : truncateText(prosText, true)
                                        }
                                        {needsTruncation(prosText, true) && (
                                          <button
                                            className="ml-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium text-xs underline"
                                            onClick={() => toggleTextExpansion(review.id || '', 'pros')}
                                          >
                                            {isProsExpanded ? t("common.showLess") : t("common.showMore")}
                                          </button>
                                        )}
                                      </span>
                                      {/* Desktop version */}
                                      <span className="hidden sm:block">
                                        {isProsExpanded || !needsTruncation(prosText, false) 
                                          ? prosText 
                                          : truncateText(prosText, false)
                                        }
                                        {needsTruncation(prosText, false) && (
                                          <button
                                            className="ml-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium text-xs underline"
                                            onClick={() => toggleTextExpansion(review.id || '', 'pros')}
                                          >
                                            {isProsExpanded ? t("common.showLess") : t("common.showMore")}
                                          </button>
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                {/* Cons - Más compacto */}
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-orange-600 dark:text-orange-400 text-xs font-medium flex items-center gap-1">
                                      {t("companyDetail.cons")}
                                    </span>
                                  </div>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded border-l-2 border-orange-500">
                                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                      {/* Mobile version */}
                                      <span className="block sm:hidden">
                                        {isConsExpanded || !needsTruncation(consText, true) 
                                          ? consText 
                                          : truncateText(consText, true)
                                        }
                                        {needsTruncation(consText, true) && (
                                          <button
                                            className="ml-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium text-xs underline"
                                            onClick={() => toggleTextExpansion(review.id || '', 'cons')}
                                          >
                                            {isConsExpanded ? t("common.showLess") : t("common.showMore")}
                                          </button>
                                        )}
                                      </span>
                                      {/* Desktop version */}
                                      <span className="hidden sm:block">
                                        {isConsExpanded || !needsTruncation(consText, false) 
                                          ? consText 
                                          : truncateText(consText, false)
                                        }
                                        {needsTruncation(consText, false) && (
                                          <button
                                            className="ml-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium text-xs underline"
                                            onClick={() => toggleTextExpansion(review.id || '', 'cons')}
                                          >
                                            {isConsExpanded ? t("common.showLess") : t("common.showMore")}
                                          </button>
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Load More Button */}
                    {hasMoreReviews && totalReviewsCount > reviews.length && (
                      <div className="flex justify-center pt-4">
                        <Button
                          className="border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-semibold px-8 transition-colors duration-200"
                          disabled={
                            isLoadingMore || totalReviewsCount <= reviews.length
                          }
                          size="lg"
                          variant="bordered"
                          onPress={handleLoadMoreReviews}
                        >
                          {isLoadingMore
                            ? t("companyDetail.loading")
                            : t("companyDetail.loadMore", {
                                count: Math.min(
                                  Number(
                                    process.env.NEXT_PUBLIC_REVIEW_LOAD_MORE
                                  ) || 5,
                                  Math.max(
                                    0,
                                    totalReviewsCount - reviews.length
                                  )
                                ),
                                remaining: Math.max(
                                  0,
                                  totalReviewsCount - reviews.length
                                ),
                              })}
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
                      className="bg-sky-600 dark:bg-sky-600 text-white hover:bg-sky-700 dark:hover:bg-sky-700 font-semibold px-8 transition-colors duration-200"
                      size="lg"
                      onPress={() =>
                        router.push(
                          `/company/${company.slug || company.id}/review`
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
            <Card className="p-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl">
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
                      {renderStars(mappedCompany.rating, "w-5 h-5")}
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
                        100
                    )}
                    %
                  </span>
                </div>
              </CardBody>
            </Card>

            {/* Benefits */}
            {mappedCompany.benefits.length > 0 && (
              <Card className="p-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl">
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
