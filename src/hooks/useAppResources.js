import useLoadFonts from './useLoadFonts';
import useLoadTranslations from './useLoadTranslations';
import useLoadImages from './useLoadImages';

export function useAppResources() {
  const fontsLoaded = useLoadFonts();
  const translationsLoaded = useLoadTranslations();
  const imagesLoaded = useLoadImages();

  const resourcesLoaded = fontsLoaded && translationsLoaded && imagesLoaded;

  return {
    resourcesLoaded,
    fontsLoaded,
    translationsLoaded,
  };
}