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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <Trans
              i18nKey="about.history.title"
              components={{
                1: <span className="text-sky-600" />,
              }}
            />
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("about.history.description")}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-sky-200 h-full hidden lg:block" />

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <div
                key={event.year}
                className={`flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div
                    className={`space-y-4 ${index % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8"}`}
                  >
                    <div className="inline-block bg-sky-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {t(`about.history.timeline.${event.year}.title`)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {t(`about.history.timeline.${event.year}.description`)}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-4 h-4 bg-sky-600 rounded-full border-4 border-white shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 bg-sky-600 rounded-full animate-ping opacity-20" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t("about.history.future.title")}
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t("about.history.future.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                {t("about.history.future.tags.countries")}
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                {t("about.history.future.tags.experience")}
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                {t("about.history.future.tags.information")}
              </span>
              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full">
                {t("about.history.future.tags.partnerships")}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
