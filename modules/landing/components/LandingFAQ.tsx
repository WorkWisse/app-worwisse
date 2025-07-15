import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
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
        : [...prev, index],
    );
  };

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 transition-colors duration-200">
            <Trans
              components={{
                1: <span className="text-sky-600 dark:text-sky-400" />,
              }}
              i18nKey="faq.title"
            />
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
            {t("faq.description")}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                aria-expanded={openItems.includes(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-inset rounded-xl"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 pr-4 transition-colors duration-200">
                  {t(faq.questionKey)}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-all duration-300 ${
                      openItems.includes(index) ? "rotate-180" : ""
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
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 transition-colors duration-200">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-200">
                      {t(faq.answerKey)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-sky-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 border border-sky-100 dark:border-slate-500 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
              {t("faq.cta.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 transition-colors duration-200">
              {t("faq.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                className="bg-sky-600 dark:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors duration-200"
                href="/contact"
              >
                {t("faq.cta.primary")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
