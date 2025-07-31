import { useTranslation, Trans } from "react-i18next";

interface TimelineEvent {
  year: string;
}

const timeline: TimelineEvent[] = [
  {
    year: "2020",
  },
  {
    year: "2021",
  },
  {
    year: "2022",
  },
  {
    year: "2023",
  },
  {
    year: "2024",
  },
];

export default function AboutHistory() {
  const { t } = useTranslation();

  return (
    <section
      className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-200"
      id="history"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            <Trans
              components={{
                1: <span className="text-sky-600 dark:text-sky-400" />,
              }}
              i18nKey="about.history.title"
            />
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t("about.history.description")}
          </p>
        </div>

        {/* Personal Story Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl lg:text-3xl font-bold text-sky-600 dark:text-sky-400 mb-8 text-center">
              {t("about.history.personal.question")}
            </h3>

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {t("about.history.personal.story")}
              </p>

              <blockquote className="border-l-4 border-sky-500 dark:border-sky-400 pl-6 py-4 my-8 bg-sky-50 dark:bg-sky-900/20 rounded-r-lg">
                <p className="text-lg font-medium italic text-sky-800 dark:text-sky-200 mb-0">
                  {t("about.history.personal.quote")}
                </p>
              </blockquote>

              <p className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                {t("about.history.personal.beginning")}
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {t("about.history.personal.background")}
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {t("about.history.personal.frustration")}
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-400 dark:border-orange-500 rounded-r-lg p-4 my-6">
                <p className="text-base font-medium text-orange-900 dark:text-orange-200 italic mb-0">
                  {t("about.history.personal.priorityContrast")}
                </p>
              </div>

              <p className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {t("about.history.personal.realization")}
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {t("about.history.personal.problem")}
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {t("about.history.personal.reflection")}
              </p>

              <div className="bg-gradient-to-r from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-800/20 border-l-4 border-sky-400 dark:border-sky-500 rounded-r-lg p-6 my-8">
                <p className="text-lg font-medium text-sky-800 dark:text-sky-200 italic mb-0">
                  {t("about.history.personal.mainQuestion")}
                </p>
              </div>

              <p className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                {t("about.history.personal.change")}
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {t("about.history.personal.creation")}
              </p>

              <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-700 rounded-xl p-6 mt-8">
                <p className="text-lg text-sky-800 dark:text-sky-200 leading-relaxed font-medium mb-0">
                  {t("about.history.personal.mission")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
