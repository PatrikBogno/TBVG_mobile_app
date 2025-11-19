import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";

import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar"; 

import GlobalLayout from "./src/layouts/global_layout.jsx";
import { Pages } from "./src/pages/pages.js";
import useLoadFonts from "./src/hooks/load_font";
import global_style from "./src/styles/global_style.js";
import { Host } from "react-native-portalize";
import StorageService from "./src/helpers/storage_service.js";
import { initializeI18n } from "./src/translations/i18n.js";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabFlow() {
  return (
    <Tab.Navigator tabBar={() => null} screenOptions={{ headerShown: false }} initialRouteName="Main">
      <Tab.Screen name="Main" component={Pages.Main} />
      <Tab.Screen name="WeekView" component={Pages.WeekView} />
      <Tab.Screen name="EditDay" component={Pages.EditDay} />
      <Tab.Screen name="EditTask" component={Pages.EditTask} />
      <Tab.Screen name="Settings" component={Pages.Settings} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainFlow">
        <Stack.Screen name="MainFlow" component={MainTabFlow} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default function App() {
  const fontsLoaded = useLoadFonts();
  const navigationRef = useNavigationContainerRef();
  const [loaded, setLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("Main");

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SystemUI.setBackgroundColorAsync('transparent');

    NavigationBar.setButtonStyleAsync('dark');
  }, []);

  useEffect(() => {
  (async () => {
    console.log("Starting i18n init…");

    await initializeI18n(); 

    console.log("i18n successfully initialized.");
    setLoaded(true);
  })();
}, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  if (!loaded) return <ActivityIndicator/>;

  return (
    <Host>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            const current = navigationRef.current?.getCurrentRoute()?.name;
            setCurrentRoute(current);
          }}
          onStateChange={() => {
            const current = navigationRef.current?.getCurrentRoute()?.name;
            if (current) setCurrentRoute(current);
          }}
        >
          <GlobalLayout current_route={currentRoute}>
            <RootStack />
          </GlobalLayout>
        </NavigationContainer>
      </View>
    </Host>
  );
}
