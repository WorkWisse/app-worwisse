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
    const reviewsWithRatings = reviews.filter(review => review.ratings);

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

    reviewsWithRatings.forEach(review => {
      if (review.ratings) {
        totals.workEnvironment += review.ratings.workEnvironment;
        totals.compensation += review.ratings.compensation;
        totals.benefits += review.ratings.benefits;
        totals.culture += review.ratings.culture;
        totals.communication += review.ratings.communication;
        totals.careerGrowth += review.ratings.careerGrowth;
        totals.workLifeBalance += review.ratings.workLifeBalance;
        totals.inclusion += review.ratings.inclusion;
      }
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
  const recentReviews = reviews.slice(0, 3);

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
                  alt={`Logo de ${company.name}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg shadow-md object-cover"
                  src={company.logo}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium">{company.industry}</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="truncate">{company.location.city}, {company.location.country}</span>
                  {company.website && (
                    <>
                      <span className="text-slate-400 hidden md:inline">•</span>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors hidden md:inline"
                      >
                        {t("companyDetail.website")}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Rating and Action */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex scale-75 sm:scale-100">{renderStars(company.rating)}</div>
                <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {company.rating}
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  ({company.reviewsCount} {t("companyDetail.reviews")})
                </span>
              </div>

              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 sm:px-6 py-2 text-sm sm:text-base w-full xs:w-auto"
                size="sm"
                onPress={() =>
                  router.push(`/company/${router.query.slug}/review`)
                }
              >
                {t("companyDetail.writeReview")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Mobile: Company Stats (First on mobile) */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm lg:hidden">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t("companyDetail.statistics")}
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {t("companyDetail.totalReviews")}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        {company.reviewsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {t("companyDetail.wouldRecommend")}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                        {Math.round(
                          (reviews.filter((r) => r.wouldRecommend).length /
                            reviews.length) *
                          100,
                        )}%
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Ratings Breakdown (Second on mobile) */}
              {ratingAverages && (
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {t("companyDetail.ratingsBreakdown")}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
                        {t("companyDetail.ratingsBreakdownDesc")}
                      </p>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingWorkEnvironmentShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingWorkEnvironment")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.workEnvironment)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.workEnvironment}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingCompensationShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingCompensation")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.compensation)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.compensation}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingBenefitsShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingBenefits")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.benefits)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.benefits}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingCultureShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingCulture")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.culture)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.culture}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingCommunicationShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingCommunication")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.communication)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.communication}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingCareerGrowthShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingCareerGrowth")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.careerGrowth)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.careerGrowth}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingWorkLifeBalanceShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingWorkLifeBalance")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.workLifeBalance)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.workLifeBalance}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 md:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                            <span className="md:hidden">{t("companyDetail.ratingInclusionShort")}</span>
                            <span className="hidden md:inline">{t("companyDetail.ratingInclusion")}</span>
                          </span>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex text-xs md:text-sm">{renderStars(ratingAverages.inclusion)}</div>
                            <span className="font-bold text-slate-900 dark:text-white min-w-[1.5rem] md:min-w-[2rem] text-sm md:text-base">
                              {ratingAverages.inclusion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Mobile: Benefits & Perks (Third on mobile) */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm lg:hidden">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t("companyDetail.benefits")}
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-3">
                    {company.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <span className="text-sky-500">✓</span>
                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Employee Reviews Section */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    {t("companyDetail.recentReviewsTitle")}
                  </h2>
                  <Button
                    color="primary"
                    variant="light"
                    className="text-sky-600 hover:text-sky-700 self-start sm:self-auto text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 h-auto min-h-0"
                    size="sm"
                  >
                    <span className="sm:hidden">{t("companyDetail.viewAllReviewsShort")}</span>
                    <span className="hidden sm:inline">{t("companyDetail.viewAllReviews")}</span>
                  </Button>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-8">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50/50 dark:bg-slate-700/50 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="font-bold text-slate-900 dark:text-white text-lg">
                                {review.rating}/5
                              </span>
                              {review.wouldRecommend && (
                                <Chip color="success" size="sm" variant="flat" className="ml-2">
                                  {t("companyDetail.recommends")}
                                </Chip>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                              <span className="font-medium">{review.role}</span>
                              <span>•</span>
                              <span>{review.timeAgo}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                              {t("companyDetail.pros")}
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-green-50/50 dark:bg-green-900/20 p-3 rounded-lg">
                              {review.pros}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                              {t("companyDetail.cons")}
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-amber-50/50 dark:bg-amber-900/20 p-3 rounded-lg">
                              {review.cons}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">

              {/* Company Stats - Hidden on mobile */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hidden lg:block">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t("companyDetail.statistics")}
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {t("companyDetail.totalReviews")}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        {company.reviewsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {t("companyDetail.wouldRecommend")}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                        {Math.round(
                          (reviews.filter((r) => r.wouldRecommend).length /
                            reviews.length) *
                          100,
                        )}%
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Benefits & Perks - Hidden on mobile */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hidden lg:block">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t("companyDetail.benefits")}
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-3">
                    {company.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <span className="text-sky-500">✓</span>
                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Call to Action */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20">
                <CardBody className="text-center space-y-4">
                  <div className="text-4xl">🚀</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t("companyDetail.ctaTitle")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {t("companyDetail.ctaDescription")}
                  </p>
                  <Button
                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold w-full"
                    onPress={() =>
                      router.push(`/company/${router.query.slug}/review`)
                    }
                  >
                    {t("companyDetail.writeReview")}
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
