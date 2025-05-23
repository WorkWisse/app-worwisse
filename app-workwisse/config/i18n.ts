import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esTranslations from "../locales/es.json";
import ptTranslations from "../locales/pt.json";

const resources = {
  es: {
    translation: esTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
