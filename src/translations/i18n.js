import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ServiceKeys from "../services/serviceKeys";
import en from "./en.json";
import sk from "./sk.json";

const availableLanguages = {
  en: { translation: en },
  sk: { translation: sk },
};

i18next
  .use(initReactI18next)
  .init({
    resources: availableLanguages,
    compatibilityJSON: "v3",
    lng: "en", 
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export async function initializeI18n() {
  let storage = ServiceKeys.serviceStorage;
  const savedSettings = await storage.getItem("appSettings");
  const savedLanguage = savedSettings?.language || "en";

  if (savedLanguage !== "en") {
    await i18next.changeLanguage(savedLanguage);
  }
}

export default i18next;