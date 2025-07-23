import { useTranslation, Trans } from "react-i18next";
import { useRouter } from "next/router";

import { SearchBar } from "@/modules/core/components/SearchBar";

export const LandingHero = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 py-20 sm:py-28 overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 tracking-tight leading-tight transition-colors duration-200">
              <Trans
                components={{ 1: <span className="text-sky-600" /> }}
                i18nKey="hero.title"
              />
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed transition-colors duration-200">
              <Trans
                components={{ 1: <strong /> }}
                i18nKey="hero.description"
              />
            </p>
          </div>

          {/* BUSCADOR PROTAGONISTA en lugar de la imagen */}
          <div className="flex justify-center items-center animate-slide-in-right delay-300">
            <div className="relative w-full max-w-lg">
              {/* Marco del buscador simple y elegante */}
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-200">
                    Busca empresas
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                    Encuentra la información que necesitas
                  </p>
                </div>

                {/* Buscador más grande */}
                <div className="transform scale-105 lg:scale-110">
                  <SearchBar
                    variant="hero"
                    onSuggestionSelect={(suggestion) => {
                      router.push(`/company/${suggestion.id}`);
                    }}
                  />
                </div>

                {/* Trust badges movidos aquí */}
                <div className="flex items-center justify-center gap-4 lg:gap-6 text-xs lg:text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-6 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t("hero.trustBadges.free")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t("hero.trustBadges.verified")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t("hero.trustBadges.anonymous")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
