import React, { useState } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import GlobalLayout from "./src/layouts/global_layout.jsx";
import { Pages } from "./src/pages/pages.js";

import useLoadFonts from "./src/hooks/load_font.js";

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

function App() {
  const fontsLoaded = useLoadFonts();

  const navigationRef = useNavigationContainerRef();
  const [current_route, setCurrentRoute] = useState("Main");

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        setCurrentRoute(currentRouteName);
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        
        if (currentRouteName) {
          setCurrentRoute(currentRouteName);
        }
      }}
    >
      <GlobalLayout current_route={current_route}>
        <RootStack />
      </GlobalLayout>
    </NavigationContainer>
  );
}

export default App;