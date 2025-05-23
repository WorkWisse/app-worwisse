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
    icon: "🚀",
    titleKey: "features.items.jobs.title",
    descriptionKey: "features.items.jobs.description",
    benefitKey: "features.items.jobs.benefit",
  },
  {
    icon: "🏆",
    titleKey: "features.items.rankings.title",
    descriptionKey: "features.items.rankings.description",
    benefitKey: "features.items.rankings.benefit",
  },
  {
    icon: "💡",
    titleKey: "features.items.insights.title",
    descriptionKey: "features.items.insights.description",
    benefitKey: "features.items.insights.benefit",
  },
  {
    icon: "🤝",
    titleKey: "features.items.community.title",
    descriptionKey: "features.items.community.description",
    benefitKey: "features.items.community.benefit",
  },
];

export const LandingFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <Trans
              i18nKey="features.title"
              components={{ 1: <span className="text-sky-600" /> }}
            />
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("features.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-sky-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                {t(feature.titleKey)}
              </h3>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {t(feature.descriptionKey)}
              </p>

              <div className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-2 rounded-full inline-block">
                ✓ {t(feature.benefitKey)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t("features.cta.title")}
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              {t("features.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg">
                {t("features.cta.primary")}
              </button>
              <button className="border-2 border-sky-600 text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                {t("features.cta.secondary")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
