import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqData: FAQItem[] = [
  {
    questionKey: "faq.items.free.question",
    answerKey: "faq.items.free.answer",
  },
  {
    questionKey: "faq.items.verification.question",
    answerKey: "faq.items.verification.answer",
  },
  {
    questionKey: "faq.items.anonymity.question",
    answerKey: "faq.items.anonymity.answer",
  },
  {
    questionKey: "faq.items.information.question",
    answerKey: "faq.items.information.answer",
  },
  {
    questionKey: "faq.items.addCompany.question",
    answerKey: "faq.items.addCompany.answer",
  },
  {
    questionKey: "faq.items.salaryData.question",
    answerKey: "faq.items.salaryData.answer",
  },
];

export const LandingFAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <Trans
              i18nKey="faq.title"
              components={{ 1: <span className="text-sky-600" /> }}
            />
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t("faq.description")}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset rounded-xl"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {t(faq.questionKey)}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Toggle FAQ</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-slate-600 leading-relaxed">
                      {t(faq.answerKey)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-sky-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t("faq.cta.title")}
            </h3>
            <p className="text-slate-600 mb-6">{t("faq.cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
                {t("faq.cta.primary")}
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                {t("faq.cta.secondary")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
