import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = ["response", "information", "consultation", "hours"];

  return (
    <section className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("contact.faq.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("contact.faq.description")}
          </p>
        </div>

        <div className="space-y-4">
          {faqKeys.map((faqKey, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                aria-expanded={openIndex === index}
                className="w-full px-6 py-4 text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {t(`contact.faq.items.${faqKey}.question`)}
                </span>
                <svg
                  aria-label="Toggle FAQ"
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Toggle FAQ</title>
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white dark:bg-slate-900">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(`contact.faq.items.${faqKey}.answer`)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
