import { Button } from "@heroui/button";
import { useTranslation, Trans } from "react-i18next";

export default function AboutCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <Trans
              i18nKey="about.cta.title"
              components={{
                1: <span className="text-sky-400 dark:text-sky-300" />,
              }}
            />
          </h2>
          <p className="text-xl text-slate-300 dark:text-slate-200 mb-8 leading-relaxed">
            {t("about.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="solid"
              className="bg-sky-500 dark:bg-sky-600 text-white hover:bg-sky-600 dark:hover:bg-sky-700 font-semibold px-8 py-4 text-lg transition-colors duration-200"
            >
              {t("about.cta.secondaryButton")}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl text-sky-400 dark:text-sky-300 mb-2">🚀</div>
              <h3 className="text-white font-semibold">
                {t("about.cta.benefits.improve.title")}
              </h3>
              <p className="text-slate-400 dark:text-slate-300 text-sm">
                {t("about.cta.benefits.improve.description")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 dark:text-sky-300 mb-2">🤝</div>
              <h3 className="text-white font-semibold">
                {t("about.cta.benefits.connect.title")}
              </h3>
              <p className="text-slate-400 dark:text-slate-300 text-sm">
                {t("about.cta.benefits.connect.description")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl text-sky-400 dark:text-sky-300 mb-2">📊</div>
              <h3 className="text-white font-semibold">
                {t("about.cta.benefits.information.title")}
              </h3>
              <p className="text-slate-400 dark:text-slate-300 text-sm">
                {t("about.cta.benefits.information.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
