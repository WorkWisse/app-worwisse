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
                i18nKey="hero.title"
                components={{ 1: <span className="text-sky-600" /> }}
              />
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed transition-colors duration-200">
              <Trans
                i18nKey="hero.description"
                components={{ 1: <strong /> }}
              />
            </p>

            <div className="mb-8">
              <SearchBar 
                variant="hero"
                onSubmit={(query) => {
                  router.push(`/companies?search=${encodeURIComponent(query)}`);
                }}
              />
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
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

          <div className="hidden lg:flex justify-center items-center animate-slide-in-right delay-300">
            <div className="relative">
              <img
                src="/images/home-1.png"
                alt="Trabajadores tomando decisiones informadas"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <title>Checkmark</title>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {t("hero.notifications.success")}
                    </p>
                    <p className="text-slate-600 text-xs">
                      {t("hero.notifications.timeAgo")}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {t("hero.notifications.rating")}
                    </p>
                    <p className="text-slate-600 text-xs">
                      {t("hero.notifications.reviews")}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
