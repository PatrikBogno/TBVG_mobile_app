import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";

import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar"; 

import GlobalLayout from "./src/layouts/layoutGlobal";
import PageKeys from "./src/pages/pageKeys.js";
import { Host } from "react-native-portalize";
import { initializeI18n } from "./src/translations/i18n.js";
import { useLoadFonts } from "./src/hooks/hookKeys"

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabFlow() {
  return (
    <Tab.Navigator tabBar={() => null} screenOptions={{ headerShown: false }} initialRouteName="Main">
      <Tab.Screen name="Main" component={PageKeys.Main} />
      <Tab.Screen name="WeekView" component={PageKeys.WeekView} />
      <Tab.Screen name="EditDay" component={PageKeys.EditDay} />
      <Tab.Screen name="EditTask" component={PageKeys.EditTask} />
      <Tab.Screen name="Settings" component={PageKeys.Settings} />
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
  const [route, setCurrentRoute] = useState("Main");

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SystemUI.setBackgroundColorAsync('transparent');

    NavigationBar.setButtonStyleAsync('dark');
  }, []);

  useEffect(() => {
  (async () => {
    await initializeI18n(); 
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
          <GlobalLayout route={route}>
            <RootStack />
          </GlobalLayout>
        </NavigationContainer>
      </View>
    </Host>
  );
}
