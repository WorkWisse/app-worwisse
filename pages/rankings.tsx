import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

import { LandingHeader } from "@/modules/core/components";
import { CompanyService } from "@/services";
import { CompanyDocument } from "@/types";

interface RankingCompany {
    id: string;
    companyName: string;
    logoUrl: string;
    rating: number;
    reviewsCount: number;
    industry: string;
    slug?: string;
    rank: number;
}

interface IconProps extends React.SVGProps<SVGSVGElement> { }

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

                const mappedCompanies: RankingCompany[] = companiesData.map(
                    (company: CompanyDocument, index: number) => ({
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
                    })
                );

                setCompanies(mappedCompanies);
            } catch (error) {
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

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-start justify-start mb-6">
                        <Button
                            as={Link}
                            href="/"
                            variant="ghost"
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                            startContent={<ChevronLeftIcon className="h-4 w-4" />}
                        >
                            {t("rankings.backHome")}
                        </Button>
                    </div>
                    
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                            {t("rankings.title")}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            {t("rankings.description")}
                        </p>
                    </div>
                </div>

                {/* Rankings Table */}
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardBody className="p-0">
                            {isLoading ? (
                                // Loading state
                                <div className="space-y-0">
                                    {Array.from({ length: 15 }).map((_, index) => (
                                        <div
                                            key={`loading-${index}`}
                                            className="flex items-center p-6 border-b border-slate-100 dark:border-slate-700 last:border-b-0 animate-pulse"
                                        >
                                            <div className="w-12 text-center mr-6">
                                                <div className="h-6 w-6 bg-slate-300 dark:bg-slate-600 rounded mx-auto" />
                                            </div>
                                            <div className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-600 mr-4 flex-shrink-0" />
                                            <div className="flex-1 min-w-0 mr-4">
                                                <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-48 mb-2" />
                                                <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-24" />
                                            </div>
                                            <div className="text-right">
                                                <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-16 mb-1" />
                                                <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-20" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : companies.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-slate-500 dark:text-slate-400">
                                        {t("rankings.noCompanies")}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    {companies.map((company) => (
                                        <div
                                            key={company.id}
                                            className="flex items-center p-6 border-b border-slate-100 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group"
                                        >
                                            {/* Rank */}
                                            <div className="w-12 text-center mr-6 flex-shrink-0">
                                                <span
                                                    className={`text-2xl font-bold transition-colors duration-200 ${company.rank === 1
                                                        ? "text-yellow-500"
                                                        : company.rank === 2
                                                            ? "text-slate-400"
                                                            : company.rank === 3
                                                                ? "text-amber-600"
                                                                : "text-slate-500 dark:text-slate-400"
                                                        }`}
                                                >
                                                    {company.rank}
                                                </span>
                                            </div>

                                            {/* Company Logo */}
                                            <img
                                                alt={`${company.companyName} logo`}
                                                className="h-12 w-12 rounded-full object-cover mr-4 flex-shrink-0"
                                                src={company.logoUrl}
                                            />

                                            {/* Company Info */}
                                            <div className="flex-1 min-w-0 mr-4">
                                                <Link
                                                    href={`/company/${company.id}`}
                                                    className="hover:underline"
                                                >
                                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                        {company.companyName}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                    {company.industry}
                                                </p>
                                            </div>

                                            {/* Rating Info */}
                                            <div className="text-right flex-shrink-0">
                                                <div className="flex items-center justify-end text-lg font-bold text-sky-600 mb-1">
                                                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                                                    {company.rating.toFixed(1)}
                                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-normal ml-0.5">
                                                        /5
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {company.reviewsCount} {t("rankings.reviews")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    {/* CTA Section */}
                    <div className="text-center mt-12">
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            {t("rankings.cta.description")}
                        </p>
                        <Button
                            as={Link}
                            href="/company/add"
                            color="primary"
                            size="lg"
                            className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white font-semibold"
                        >
                            {t("rankings.cta.addCompany")}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
