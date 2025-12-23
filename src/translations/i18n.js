import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ServiceKeys from "../services/serviceKeys";
import en from "./en.json";
import sk from "./sk.json";

const availableLanguages = {
  en: { translation: en },
  sk: { translation: sk },
};

// 1. Initialize IMMEDIATELY and synchronously
i18next
  .use(initReactI18next)
  .init({
    resources: availableLanguages,
    compatibilityJSON: "v3",
    lng: "en", // Start with default
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

// 2. This function now only handles the ASYNC language switch
export async function initializeI18n() {
  let storage = ServiceKeys.serviceStorage;
  const savedSettings = await storage.getItem("appSettings");
  const savedLanguage = savedSettings?.language || "en";

  if (savedLanguage !== "en") {
    await i18next.changeLanguage(savedLanguage);
  }
}

export default i18next;