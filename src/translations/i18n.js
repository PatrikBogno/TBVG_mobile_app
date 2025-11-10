import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
//import * as RNLocalize from 'react-native-localize';

// Import your translation files
import en from './en.json';
import sk from './sk.json';

// Define the available languages
const availableLanguages = {
  en: { translation: en },
  sk: { translation: sk },
};

// Find the best available language from the device's preferences
//const bestLanguage = RNLocalize.findBestLanguageTag(
//  Object.keys(availableLanguages)
//);

i18next
  .use(initReactI18next) // Passes i18next down to react-i18next
  .init({
    // --- Standard Config ---
    resources: availableLanguages,
    compatibilityJSON: 'v3', // Crucial for React Native
    
    // --- Language Detection ---
    // Use the language we detected from the device
    // lng: bestLanguage?.languageTag || 'en', 
    lng: 'en',
    fallbackLng: 'en', // Use 'en' if detected language is not available

    // --- Other Options ---
    interpolation: {
      escapeValue: false, // React already escapes values (prevents XSS)
    },
    react: {
      useSuspense: false, // Recommended for React Native
    },
  });

export default i18next;