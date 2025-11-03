import { useFonts } from "expo-font";

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    ComicSansMS: require("../assets/fonts/comic-sans-ms/ComicSansMS3.ttf"),
    // Add more fonts here if needed
    // MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  return fontsLoaded;
}
