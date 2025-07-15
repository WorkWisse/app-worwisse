import { useTranslation } from "react-i18next";
import { Card } from "@heroui/card";

export default function TermsContent() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: "🎯",
      title: t("terms.content.purpose.title"),
      content: t("terms.content.purpose.content"),
    },
    {
      icon: "🤝",
      title: t("terms.content.respect.title"),
      content: t("terms.content.respect.content"),
    },
    {
      icon: "🔒",
      title: t("terms.content.privacy.title"),
      content: t("terms.content.privacy.content"),
    },
    {
      icon: "✅",
      title: t("terms.content.accuracy.title"),
      content: t("terms.content.accuracy.content"),
    },
    {
      icon: "🚫",
      title: t("terms.content.prohibited.title"),
      content: t("terms.content.prohibited.content"),
    },
    {
      icon: "⚖️",
      title: t("terms.content.consequences.title"),
      content: t("terms.content.consequences.content"),
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
            {t("terms.content.mainTitle")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
            {t("terms.content.mainSubtitle")}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="p-6 lg:p-8 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{section.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-200">
                    {section.title}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 transition-colors duration-200">
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-2">
                        {section.content.map(
                          (item: string, itemIndex: number) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2"
                            >
                              <span className="text-sky-600 dark:text-sky-400 font-bold mt-1">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional important notes */}
        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg transition-colors duration-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 transition-colors duration-200">
                {t("terms.content.important.title")}
              </h4>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed transition-colors duration-200">
                {t("terms.content.important.content")}
              </p>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-8 p-6 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-700 rounded-lg transition-colors duration-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📧</div>
            <div>
              <h4 className="font-bold text-sky-900 dark:text-sky-100 mb-2 transition-colors duration-200">
                {t("terms.content.contact.title")}
              </h4>
              <p className="text-sky-800 dark:text-sky-200 leading-relaxed transition-colors duration-200">
                {t("terms.content.contact.content")}{" "}
                <a
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline font-medium transition-colors duration-200"
                  href="/contact"
                >
                  {t("terms.content.contact.link")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
