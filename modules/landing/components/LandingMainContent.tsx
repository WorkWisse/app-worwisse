import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useFeaturedCompanies } from "@/hooks/useCompanies";
import { useLatestReviews, ReviewWithCompany } from "@/hooks/useReviews";
import { CompanySkeleton, ReviewSkeleton } from "@/components/skeletons";
import { OptimizedImage } from "@/components/OptimizedImage";

interface TopCompany {
  id: string;
  companyName: string;
  logoUrl: string;
  rating: number;
  reviewsCount: number;
  industry: string;
  slug?: string;
  rank: number;
}

// Helper function to calculate time ago
const getTimeAgo = (
  creationDate: string,
  t: (key: string, options?: { count: number }) => string,
): string => {
  const now = new Date();
  const reviewDate = new Date(creationDate);

  // Reset hours, minutes, seconds, and milliseconds to compare only dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const reviewDay = new Date(
    reviewDate.getFullYear(),
    reviewDate.getMonth(),
    reviewDate.getDate(),
  );

  const diffInMs = today.getTime() - reviewDay.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return t("landing.timeAgo.today");
  } else if (diffInDays === 1) {
    return t("landing.timeAgo.oneDay");
  } else if (diffInDays < 7) {
    return t("landing.timeAgo.days", { count: diffInDays });
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);

    return weeks === 1
      ? t("landing.timeAgo.oneWeek")
      : t("landing.timeAgo.weeks", { count: weeks });
  } else {
    const months = Math.floor(diffInDays / 30);

    return months === 1
      ? t("landing.timeAgo.oneMonth")
      : t("landing.timeAgo.months", { count: months });
  }
};

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronLeftIcon = (props: IconProps) => (
  <svg
    {...props}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <title>Previous</title>
    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = (props: IconProps) => (
  <svg
    {...props}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <title>Next</title>
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = (props: IconProps) => (
  <svg {...props} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
    <title>Star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const LandingMainContent = () => {
  const { t } = useTranslation();

  // Usar hooks optimizados con React Query
  const { data: companiesData = [], isLoading: isLoadingCompanies } =
    useFeaturedCompanies(5);
  const { data: reviewsData = [], isLoading: isLoadingReviews } =
    useLatestReviews(5);

  const [[currentReviewIndex, direction], setCurrentReviewState] = useState([
    0, 0,
  ]);

  // Mapear datos de empresas para el formato esperado
  const featuredCompanies: TopCompany[] = companiesData.map(
    (company, index) => ({
      id: company.id || "",
      companyName: company.companyName || "",
      logoUrl:
        company.logoUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName || "")}&background=0D8ABC&color=fff&size=80`,
      rating: company.rating || 0,
      reviewsCount: company.reviewsCount || 0,
      industry: company.industry || "",
      slug:
        company.slug ||
        company.companyName
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") ||
        "",
      rank: index + 1,
    }),
  );

  // Mapear datos de reseñas con información de empresa optimizada
  const latestReviews = reviewsData.map((review: ReviewWithCompany) => ({
    id: review.id || "",
    companyId: review.companyId || "",
    companyName: review.companyName || "",
    companySlug:
      review.company?.slug ||
      review.companyName
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      "",
    companyLogoUrl:
      review.company?.logoUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(review.companyName || "")}&background=0D8ABC&color=fff&size=80`,
    companyIndustry: review.company?.industry || "Tecnología",
    role: review.role || "",
    overallRating: review.overallRating || 0,
    positiveAspects: review.positiveAspects || "",
    areasForImprovement: review.areasForImprovement || "",
    creationDate: review.creationDate || new Date().toISOString(),
    recommend: review.recommend || false,
    timeAgo: getTimeAgo(review.creationDate || new Date().toISOString(), t),
  }));

  const paginate = (newDirection: number) => {
    let newIndex = currentReviewIndex + newDirection;

    if (newIndex < 0) {
      newIndex = latestReviews.length - 1;
    } else if (newIndex >= latestReviews.length) {
      newIndex = 0;
    }

    setCurrentReviewState([newIndex, newDirection]);
  };

  const currentReview = latestReviews[currentReviewIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 py-20 sm:py-28 overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Top 5 Companies */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-300">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200">
                {t("landing.featuredCompanies.title")}
              </h2>
              <Link
                className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center transition-colors duration-300"
                href="/rankings"
              >
                {t("landing.featuredCompanies.viewAll")}
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            {isLoadingCompanies ? (
              <CompanySkeleton count={5} showRank={true} />
            ) : featuredCompanies.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                {t("landing.featuredCompanies.noCompanies")}
              </p>
            ) : (
              featuredCompanies.map((company) => (
                <Card
                  key={company.id}
                  isPressable
                  as={Link}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 bg-white dark:bg-slate-800 rounded-xl overflow-hidden w-full group"
                  href={`/company/${company.id}`}
                >
                  <CardBody className="p-5">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 w-5 text-center transition-colors duration-200">
                        {company.rank}.
                      </span>
                      <OptimizedImage
                        alt={`${company.companyName} logo`}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        height={40}
                        lazy={true}
                        src={company.logoUrl}
                        width={40}
                      />
                      <div className="flex-grow min-w-0">
                        <h3
                          className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                          title={company.companyName}
                        >
                          {company.companyName}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>
                            {company.rating.toFixed(1)} ({company.reviewsCount}{" "}
                            {t("landing.featuredCompanies.reviews")})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>

          {/* Latest Reviews */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-500 overflow-x-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200">
                {t("landing.latestReviews.title")}
              </h2>
              {latestReviews.length > 1 && (
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    aria-label={t("landing.latestReviews.previous")}
                    className="rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200"
                    variant="ghost"
                    onClick={() => paginate(-1)}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label={t("landing.latestReviews.next")}
                    className="rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200"
                    variant="ghost"
                    onClick={() => paginate(1)}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
            <div className="relative min-h-[500px] overflow-x-hidden">
              {isLoadingReviews ? (
                <ReviewSkeleton />
              ) : (
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  {currentReview && (
                    <motion.div
                      key={currentReview.id}
                      animate="center"
                      className="w-full absolute top-0 left-0"
                      custom={direction}
                      exit="exit"
                      initial="enter"
                      style={{ position: "absolute" }}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      variants={slideVariants}
                    >
                      <Card className="shadow-lg bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
                        <CardHeader className="p-5 pb-3 border-b border-slate-100 dark:border-slate-700 transition-colors duration-200">
                          <div className="flex items-start justify-between w-full">
                            <div className="flex items-center space-x-4 flex-1">
                              <OptimizedImage
                                alt={`${currentReview.companyName} logo`}
                                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                                height={48}
                                lazy={false}
                                src={currentReview.companyLogoUrl}
                                width={48}
                              />
                              <div className="min-w-0">
                                <Link
                                  className="hover:underline"
                                  href={`/company/${currentReview.companyId}`}
                                >
                                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                    {currentReview.companyName}
                                  </h3>
                                </Link>
                                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                                  {currentReview.companyIndustry}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-start ml-4 flex-shrink-0">
                              <div className="flex items-center text-lg font-bold text-sky-600 mb-1">
                                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                                {currentReview.overallRating.toFixed(1)}
                                <span className="text-sm text-slate-400 dark:text-slate-500 font-normal ml-0.5 transition-colors duration-200">
                                  /5
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 dark:text-slate-500 transition-colors duration-200 whitespace-nowrap">
                                {currentReview.timeAgo}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className="p-5 space-y-4">
                          {/* Rol/Puesto */}
                          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 inline-block">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mr-2">
                              {t("landing.latestReviews.role")}
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-200">
                              {currentReview.role}
                            </span>
                          </div>

                          {/* Aspectos Positivos */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wide flex items-center">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                              {t("landing.latestReviews.positiveAspects")}
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-4 border-l-2 border-green-200 dark:border-green-800">
                              {currentReview.positiveAspects}
                            </p>
                          </div>

                          {/* Aspectos a Mejorar */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide flex items-center">
                              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2" />
                              {t("landing.latestReviews.areasForImprovement")}
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-4 border-l-2 border-orange-200 dark:border-orange-800">
                              {currentReview.areasForImprovement}
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
            {latestReviews.length === 0 && !isLoadingReviews && (
              <p className="text-slate-500 dark:text-slate-400 text-center py-10 transition-colors duration-200">
                {t("landing.latestReviews.noReviews")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
