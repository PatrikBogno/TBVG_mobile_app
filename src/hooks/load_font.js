import { useFonts } from "expo-font";

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    ComicSansMS: require("../assets/fonts/comic-sans-ms/ComicSansMS3.ttf"),
    Syncopate: require("../assets/fonts/Syncopate/Syncopate-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto/static/Roboto_Condensed-Regular.ttf"),
    SansationLight: require("../assets/fonts/Sansation/Sansation-Light.ttf"),
    // Add more fonts here if needed
    // MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  return fontsLoaded;
}
