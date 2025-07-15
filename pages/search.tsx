import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { Card } from "@heroui/card";

import DefaultLayout from "@/layouts/default";
import { SearchBar } from "@/modules/core/components";
import { CompanyDocument } from "@/types";
import { SearchService } from "@/services/searchService";

interface SearchPageProps {
  initialResults?: CompanyDocument[];
  initialQuery?: string;
}

export default function SearchPage({
  initialResults = [],
  initialQuery = "",
}: SearchPageProps) {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] =
    useState<CompanyDocument[]>(initialResults);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);

      return;
    }

    setIsLoading(true);
    try {
      const results = await SearchService.searchCompanies(query);

      setSearchResults(results);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error searching companies:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t("search.title", "Buscar Empresas")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              {t(
                "search.description",
                "Encuentra información y reseñas de empresas",
              )}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                placeholder={t("search.placeholder", "Buscar empresas...")}
                onSubmit={handleSearch}
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-6">
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {t("search.loading", "Buscando...")}
                </p>
              </div>
            )}

            {!isLoading && searchResults.length === 0 && initialQuery && (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-300">
                  {t(
                    "search.noResults",
                    "No se encontraron resultados para tu búsqueda",
                  )}
                </p>
              </div>
            )}

            {!isLoading && searchResults.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((company) => (
                  <Card
                    key={company.id}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        alt={company.companyName}
                        className="w-12 h-12 rounded-lg object-cover"
                        src={company.logoUrl || "/images/default-company.png"}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                          {company.companyName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {company.industry}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {company.country}, {company.state}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm text-slate-600 dark:text-slate-300">
                            {company.rating?.toFixed(1) || "0.0"} (
                            {company.reviewsCount || 0} reseñas)
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;

  // If there's a search query in the URL, perform the search server-side
  if (query && typeof query === "string") {
    try {
      const results = await SearchService.searchCompanies(query);

      return {
        props: {
          initialResults: results,
          initialQuery: query,
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error in server-side search:", error);
    }
  }

  return {
    props: {
      initialResults: [],
      initialQuery: "",
    },
  };
};