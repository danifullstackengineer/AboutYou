import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import ro from "./locales/ro/translation.json";

const resources = {
  en: {
    translation: en,
  },
  ro: {
    translation: ro,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "production" ? false : true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    },
  })


export default i18n;
