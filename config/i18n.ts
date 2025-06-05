import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esTranslations from "../locales/es.json";
import ptTranslations from "../locales/pt.json";
import enTranslations from "../locales/en.json";

const resources = {
  es: {
    translation: esTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", // Set default language to Spanish
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
