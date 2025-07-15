import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";

interface Feature {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  benefitKey: string;
}

const features: Feature[] = [
  {
    icon: "🔍",
    titleKey: "features.items.reviews.title",
    descriptionKey: "features.items.reviews.description",
    benefitKey: "features.items.reviews.benefit",
  },
  {
    icon: "📊",
    titleKey: "features.items.data.title",
    descriptionKey: "features.items.data.description",
    benefitKey: "features.items.data.benefit",
  },
  {
    icon: "🏆",
    titleKey: "features.items.rankings.title",
    descriptionKey: "features.items.rankings.description",
    benefitKey: "features.items.rankings.benefit",
  },
];

export const LandingFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 transition-colors duration-200">
            <Trans
              components={{ 1: <span className="text-sky-600" /> }}
              i18nKey="features.title"
            />
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
            {t("features.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600 hover:shadow-xl dark:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-sky-100 dark:hover:border-sky-800 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {t(feature.titleKey)}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed transition-colors duration-200">
                {t(feature.descriptionKey)}
              </p>

              <div className="text-sm font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-3 py-2 rounded-full inline-block transition-colors duration-200">
                ✓ {t(feature.benefitKey)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100 dark:border-slate-600 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-200">
              {t("features.cta.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg transition-colors duration-200">
              {t("features.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
                href="/rankings"
              >
                {t("features.cta.primary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
