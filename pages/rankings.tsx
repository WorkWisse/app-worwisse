import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

import { LandingHeader } from "@/modules/core/components";
import { CompanyService } from "@/services";
import { ReviewService } from "@/services/reviewService";
import { CompanyDocument, ReviewDocument } from "@/types";

interface RankingCompany {
  id: string;
  companyName: string;
  logoUrl: string;
  rating: number;
  reviewsCount: number;
  industry: string;
  slug?: string;
  rank: number;
  // Promedios de categorías de reviews
  workEnvironment?: number;
  salary?: number;
  benefits?: number;
  companyCulture?: number;
  internalCommunication?: number;
  professionalGrowth?: number;
  workLifeBalance?: number;
  workInclusion?: number;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const StarIcon = (props: IconProps) => (
  <svg {...props} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
    <title>Star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ChevronLeftIcon = (props: IconProps) => (
  <svg
    {...props}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <title>Back</title>
    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RankingsPage() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<RankingCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTopCompanies = async () => {
      try {
        setIsLoading(true);
        // Get top 15 companies sorted by rating
        const companiesData = await CompanyService.getCompanies({
          sortBy: "rating",
          sortOrder: "desc",
          limit: 15,
        });

        const mappedCompanies: RankingCompany[] = await Promise.all(
          companiesData.map(async (company: CompanyDocument, index: number) => {
            // Obtener reviews de la empresa para calcular promedios
            let reviewAverages = {};

            try {
              const reviewsData = await ReviewService.getCompanyReviews(
                company.id || "",
                50
              );
              const reviews = reviewsData.reviews;

              if (reviews.length > 0) {
                // Calcular promedios de cada categoría
                const totals = reviews.reduce(
                  (acc, review: ReviewDocument) => ({
                    workEnvironment:
                      acc.workEnvironment + (review.workEnvironment || 0),
                    salary: acc.salary + (review.salary || 0),
                    benefits: acc.benefits + (review.benefits || 0),
                    companyCulture:
                      acc.companyCulture + (review.companyCulture || 0),
                    internalCommunication:
                      acc.internalCommunication +
                      (review.internalCommunication || 0),
                    professionalGrowth:
                      acc.professionalGrowth + (review.professionalGrowth || 0),
                    workLifeBalance:
                      acc.workLifeBalance + (review.workLifeBalance || 0),
                    workInclusion:
                      acc.workInclusion + (review.workInclusion || 0),
                  }),
                  {
                    workEnvironment: 0,
                    salary: 0,
                    benefits: 0,
                    companyCulture: 0,
                    internalCommunication: 0,
                    professionalGrowth: 0,
                    workLifeBalance: 0,
                    workInclusion: 0,
                  }
                );

                reviewAverages = {
                  workEnvironment: Number(
                    (totals.workEnvironment / reviews.length).toFixed(1)
                  ),
                  salary: Number((totals.salary / reviews.length).toFixed(1)),
                  benefits: Number(
                    (totals.benefits / reviews.length).toFixed(1)
                  ),
                  companyCulture: Number(
                    (totals.companyCulture / reviews.length).toFixed(1)
                  ),
                  internalCommunication: Number(
                    (totals.internalCommunication / reviews.length).toFixed(1)
                  ),
                  professionalGrowth: Number(
                    (totals.professionalGrowth / reviews.length).toFixed(1)
                  ),
                  workLifeBalance: Number(
                    (totals.workLifeBalance / reviews.length).toFixed(1)
                  ),
                  workInclusion: Number(
                    (totals.workInclusion / reviews.length).toFixed(1)
                  ),
                };
              }
            } catch (reviewError) {
              // eslint-disable-next-line no-console
              console.warn(
                `Error fetching reviews for company ${company.id}:`,
                reviewError
              );
            }

            return {
              id: company.id || "",
              companyName: company.companyName || "",
              logoUrl: company.logoUrl,
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
              ...reviewAverages,
            };
          })
        );

        setCompanies(mappedCompanies);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading companies ranking:", error);
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      <LandingHeader />

      <main className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-start">
            <Button
              as={Link}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
              href="/"
              startContent={<ChevronLeftIcon className="h-4 w-4" />}
              variant="ghost"
            >
              {t("rankings.backHome")}
            </Button>
          </div>

          <div className="mb-6 lg:mb-8">
            <h1 className="text-center text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4 leading-tight transition-colors duration-200">
              <Trans
                components={{
                  1: <span className="text-sky-600 dark:text-sky-400" />,
                }}
                i18nKey="rankings.title"
              />
            </h1>
            <p className="text-center text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
              {t("rankings.description")}
            </p>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="w-full px-2">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.company")}
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.industry")}
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.rating")}
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.reviews")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.workEnv")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.salary")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.benefits")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.culture")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.balance")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.growth")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.communication")}
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {t("rankings.table.inclusion")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                    {isLoading ? (
                      // Loading state
                      Array.from({ length: 15 }).map((_, index) => (
                        <tr key={`loading-${index}`} className="animate-pulse">
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="h-4 w-4 bg-slate-300 dark:bg-slate-600 rounded" />
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-slate-300 dark:bg-slate-600 rounded-full mr-2" />
                              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-600 rounded" />
                            </div>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="h-4 w-20 bg-slate-300 dark:bg-slate-600 rounded" />
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            <div className="h-4 w-8 bg-slate-300 dark:bg-slate-600 rounded mx-auto" />
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            <div className="h-4 w-6 bg-slate-300 dark:bg-slate-600 rounded mx-auto" />
                          </td>
                          {Array.from({ length: 8 }).map((_, i) => (
                            <td
                              key={i}
                              className="px-1 py-3 whitespace-nowrap text-center"
                            >
                              <div className="h-4 w-6 bg-slate-300 dark:bg-slate-600 rounded mx-auto" />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : companies.length === 0 ? (
                      <tr>
                        <td className="text-center py-16" colSpan={13}>
                          <p className="text-slate-500 dark:text-slate-400">
                            {t("rankings.noCompanies")}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      companies.map((company) => (
                        <tr
                          key={company.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        >
                          {/* Rank */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span
                              className={`text-lg font-bold ${
                                company.rank === 1
                                  ? "text-yellow-500"
                                  : company.rank === 2
                                    ? "text-slate-400"
                                    : company.rank === 3
                                      ? "text-amber-600"
                                      : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {company.rank}
                              {company.rank <= 3 && (
                                <span className="ml-1 text-xs">
                                  {company.rank === 1
                                    ? "🏆"
                                    : company.rank === 2
                                      ? "🥈"
                                      : "🥉"}
                                </span>
                              )}
                            </span>
                          </td>

                          {/* Company */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                alt={`${company.companyName} logo`}
                                className="h-8 w-8 rounded-full object-cover mr-2 flex-shrink-0"
                                src={company.logoUrl}
                              />
                              <Link
                                className="hover:underline"
                                href={`/company/${company.id}`}
                              >
                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                  {company.companyName}
                                </span>
                              </Link>
                            </div>
                          </td>

                          {/* Industry */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {company.industry}
                            </span>
                          </td>

                          {/* Rating */}
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center">
                              <StarIcon className="h-3 w-3 text-yellow-400 mr-1" />
                              <span className="text-sm font-bold text-sky-600">
                                {company.rating.toFixed(1)}
                              </span>
                            </div>
                          </td>

                          {/* Reviews Count */}
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {company.reviewsCount}
                            </span>
                          </td>

                          {/* Work Environment */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.workEnvironment ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.workEnvironment
                                ? company.workEnvironment.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Salary */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.salary ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.salary ? company.salary.toFixed(1) : "-"}
                            </span>
                          </td>

                          {/* Benefits */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.benefits ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.benefits
                                ? company.benefits.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Company Culture */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.companyCulture ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.companyCulture
                                ? company.companyCulture.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Work Life Balance */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.workLifeBalance ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.workLifeBalance
                                ? company.workLifeBalance.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Professional Growth */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.professionalGrowth ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.professionalGrowth
                                ? company.professionalGrowth.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Internal Communication */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.internalCommunication ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.internalCommunication
                                ? company.internalCommunication.toFixed(1)
                                : "-"}
                            </span>
                          </td>

                          {/* Work Inclusion */}
                          <td className="px-1 py-3 whitespace-nowrap text-center">
                            <span
                              className={`text-xs font-medium ${company.workInclusion ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}
                            >
                              {company.workInclusion
                                ? company.workInclusion.toFixed(1)
                                : "-"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
