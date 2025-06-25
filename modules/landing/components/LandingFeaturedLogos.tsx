import { useState, useEffect } from "react";

import { CompanyService } from "@/services";
import { CompanyDocument } from "@/types";

interface FeaturedCompany {
  id: string;
  name: string;
  logoUrl: string;
  slug: string;
}

export const LandingFeaturedLogos = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState<FeaturedCompany[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load featured companies from Firebase
  useEffect(() => {
    const loadFeaturedCompanies = async () => {
      try {
        setIsLoading(true);
        // Get companies sorted by rating, limited to 5
        const companies = await CompanyService.getCompanies({
          sortBy: "rating",
          sortOrder: "desc",
          limit: 5,
        });

        const mappedCompanies: FeaturedCompany[] = companies.map(
          (company: CompanyDocument) => ({
            id: company.id || "",
            name: company.companyName || "",
            logoUrl:
              company.logoUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName || "")}&background=0D8ABC&color=fff&size=120&format=png`,
            slug:
              company.slug ||
              company.companyName
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "") ||
              "",
          }),
        );

        setFeaturedCompanies(mappedCompanies);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading featured companies:", error);
        setFeaturedCompanies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedCompanies();
  }, []);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-10 transition-colors duration-200">
          Empresas que confían en la transparencia
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16 animate-fade-in-up delay-500">
          {isLoading ? (
            // Loading state
            Array.from({ length: 5 }).map((_, index) => (
              <div key={`loading-${index}`} className="animate-pulse">
                <div className="h-[35px] sm:h-[40px] w-[120px] bg-slate-300 dark:bg-slate-600 rounded" />
              </div>
            ))
          ) : featuredCompanies.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center">
              No hay empresas para mostrar
            </p>
          ) : (
            featuredCompanies.map((company) => (
              <a
                key={company.id}
                className="group transition-transform duration-300 ease-out hover:scale-110"
                href={`/company/${company.id}`}
                title={`Ver cultura en ${company.name}`}
              >
                <img
                  alt={`${company.name} logo`}
                  className="h-[35px] sm:h-[40px] w-[120px] object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded"
                  src={company.logoUrl}
                />
              </a>
            ))
          )}
        </div>
        <div className="text-center mt-16 animate-fade-in-up delay-700">
          <svg
            aria-hidden="true"
            className="h-7 w-7 text-slate-400 dark:text-slate-500 mx-auto animate-subtle-bounce transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Scroll down to see more</title>
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
