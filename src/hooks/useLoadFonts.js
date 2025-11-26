import { useFonts } from "expo-font";

function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    Syncopate: require("../assets/fonts/Syncopate/Syncopate-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto/static/Roboto_Condensed-Regular.ttf"),
  });

  return fontsLoaded;
}

export default useLoadFonts;