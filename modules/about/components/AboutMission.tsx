import { Card, CardBody } from "@heroui/card";
import { useTranslation, Trans } from "react-i18next";

interface ValueItem {
  key: string;
  icon: string;
}

const values: ValueItem[] = [
  {
    key: "transparency",
    icon: "🔍",
  },
  {
    key: "simplicity",
    icon: "💡",
  },
  {
    key: "community",
    icon: "🤝",
  },
  {
    key: "honesty",
    icon: "⭐",
  },
];

export default function AboutMission() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            <Trans
              i18nKey="about.mission.title"
              components={{
                1: <span className="text-sky-600 dark:text-sky-400" />,
              }}
            />
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("about.mission.description1")}
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              {t("about.mission.description2")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card
              key={value.key}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardBody className="p-8 text-center space-y-4">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t(`about.mission.values.${value.key}.title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(`about.mission.values.${value.key}.description`)}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
