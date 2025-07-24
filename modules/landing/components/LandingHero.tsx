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
              {/* Efectos sutiles de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-sky-50/30 to-slate-100/20 dark:bg-gradient-to-r dark:from-sky-400/5 dark:to-blue-500/5 rounded-xl blur-xl transform scale-110" />

              {/* Marco del buscador simple y elegante */}
              <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 group">
                {/* Sutil brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-sky-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 transition-colors duration-200">
                      {t("hero.searchTitle")}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
                      {t("hero.searchSubtitle")}
                    </p>
                  </div>

                  {/* Buscador más grande */}
                  <div className="transform scale-105 lg:scale-110 transition-transform duration-300 group-hover:scale-110 lg:group-hover:scale-115">
                    <SearchBar
                      variant="hero"
                      onSuggestionSelect={(suggestion) => {
                        router.push(`/company/${suggestion.id}`);
                      }}
                    />
                  </div>

                  {/* Trust badges mejorados */}
                  <div className="flex items-center justify-center gap-4 lg:gap-6 text-xs lg:text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-6 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
                    <div className="flex items-center gap-2 group/badge hover:text-green-600 transition-colors duration-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium">{t("hero.trustBadges.free")}</span>
                    </div>
                    <div className="flex items-center gap-2 group/badge hover:text-green-600 transition-colors duration-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium">{t("hero.trustBadges.verified")}</span>
                    </div>
                    <div className="flex items-center gap-2 group/badge hover:text-green-600 transition-colors duration-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium">{t("hero.trustBadges.anonymous")}</span>
                    </div>
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
