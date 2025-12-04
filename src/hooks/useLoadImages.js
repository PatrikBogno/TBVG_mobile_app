import { useEffect ,useState } from "react";
import HelperKeys from "../helpers/helperKeys";

function useLoadImages(){
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            await HelperKeys.preloadImages();
            if (isMounted) {
            setImagesLoaded(true);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return imagesLoaded;
}

export default useLoadImages;