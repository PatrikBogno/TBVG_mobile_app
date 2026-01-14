import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Host } from "react-native-portalize";

import Navigation from "./src/navigation/navigation";
import { useAppResources } from "./src/hooks/useAppResources";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import * as NavigationBar from 'expo-navigation-bar';
import * as StatusBar from 'expo-status-bar';

import StyleKeys from "./src/styles/styleKeys";
import ServiceKeys from "./src/services/serviceKeys";

function App() {
  const resourcesLoaded = useAppResources();
  let style = StyleKeys.styleGlobal;
  ServiceKeys.serviceTaskHandler.init();
  useEffect(() => {
    changeNavigationBarColor(style.colors.primary, false);
    StatusBar.setStatusBarStyle("dark");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  if ( !resourcesLoaded ) return <ActivityIndicator/>

  return (
    <ActionSheetProvider>
      <Host>
          <View style={{ flex: 1, backgroundColor: style.colors.detailsDark }}>
              <Navigation />
          </View>
      </Host>
    </ActionSheetProvider>
  );
}

export default App;