import { useEffect, useState } from 'react';
import { initializeI18n } from '../translations/i18n';

function useLoadTranslations() {
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      await initializeI18n();
      if (isMounted) {
        setTranslationsLoaded(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return translationsLoaded;
}

export default useLoadTranslations;