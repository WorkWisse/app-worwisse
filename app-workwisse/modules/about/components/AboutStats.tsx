import { useTranslation, Trans } from "react-i18next";

interface Stat {
  key: string;
}

const stats: Stat[] = [
  {
    key: "workers",
  },
  {
    key: "companies",
  },
  {
    key: "satisfaction",
  },
  {
    key: "availability",
  },
];

export default function AboutStats() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-sky-600 to-sky-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <Trans
              i18nKey="about.stats.title"
              components={{
                1: <span className="text-sky-200" />,
              }}
            />
          </h2>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
            {t("about.stats.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="text-center space-y-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                  {t(`about.stats.items.${stat.key}.number`)}
                </div>
                <h3 className="text-xl font-semibold text-sky-100 mb-3">
                  {t(`about.stats.items.${stat.key}.label`)}
                </h3>
                <p className="text-sky-200 text-sm leading-relaxed">
                  {t(`about.stats.items.${stat.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("about.stats.cta.title")}
            </h3>
            <p className="text-sky-100 mb-6 text-lg">
              {t("about.stats.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
                {t("about.stats.cta.primaryButton")}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                {t("about.stats.cta.secondaryButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
