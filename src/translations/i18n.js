import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import StorageService from "../helpers/storage_service";

// Import translations
import en from "./en.json";
import sk from "./sk.json";

// Available languages
const availableLanguages = {
  en: { translation: en },
  sk: { translation: sk },
};

export async function initializeI18n() {
  // Load saved settings
  const savedSettings = await StorageService.getItem("appSettings");
  const savedLanguage = savedSettings?.language || "en";  // fallback

  console.log("Loading language:", savedLanguage);

  await i18next
    .use(initReactI18next)
    .init({
      resources: availableLanguages,
      compatibilityJSON: "v3",
      lng: savedLanguage,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18next;
}

export default i18next;
