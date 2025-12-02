import useLoadFonts from './useLoadFonts';
import useLoadTranslations from './useLoadTranslations';

export function useAppResources() {
  const fontsLoaded = useLoadFonts();
  const translationsLoaded = useLoadTranslations();

  const resourcesLoaded = fontsLoaded && translationsLoaded;

  return {
    resourcesLoaded,
    fontsLoaded,
    translationsLoaded,
  };
}