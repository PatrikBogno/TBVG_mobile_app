import React, { useState } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PageKeys from "../pages/pageKeys";
import GlobalLayout from "../layouts/layoutGlobal";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function NavigationStack() {
  return (
    <Tab.Navigator tabBar={() => null} screenOptions={{ headerShown: false }} initialRouteName="Main">
      <Tab.Screen name="Main" component={PageKeys.Main} />
      <Tab.Screen name="Week" component={PageKeys.Week} />
      <Tab.Screen name="Day" component={PageKeys.Day} />
      <Tab.Screen name="Task" component={PageKeys.Task} />
      <Tab.Screen name="Settings" component={PageKeys.Settings} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="rootStack">
        <Stack.Screen name="rootStack" component={NavigationStack} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

function Navigation(){
  const navigationRef = useNavigationContainerRef();
  const [route, setCurrentRoute] = useState("Main");

  return(
    <NavigationContainer
        ref={navigationRef}
        onReady={() => {
        const current = navigationRef.current?.getCurrentRoute()?.name;
        setCurrentRoute(current);
        }}
        onStateChange={() => {
        const current = navigationRef.current?.getCurrentRoute()?.name;
        if (current) setCurrentRoute(current);
        }}>
        <GlobalLayout route={route}>
            <RootStack/>
        </GlobalLayout>
    </NavigationContainer>
  );
}

export default Navigation;