import React, { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalLayout from "./src/layouts/global_layout.jsx";
import { Pages } from "./src/pages/pages.js";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
      <Stack.Screen name="Main" component={Pages.Main} />
      <Stack.Screen name="Settings" component={Pages.Settings} />
      <Stack.Screen name="WeekView" component={Pages.WeekView} />
      <Stack.Screen name="EditDay" component={Pages.EditDay} />
      <Stack.Screen name="EditTask" component={Pages.EditTask} />
    </Stack.Navigator>
  );
}

function App() {
  const routeNameRef = useRef();
  const [current_route, setCurrentRoute] = useState("Main");

  return (
    <NavigationContainer
      onReady={() => {
        routeNameRef.current = "Main";
      }}
      onStateChange={(state) => {
        const currentRouteName = state?.routes[state.index]?.name;
        setCurrentRoute(currentRouteName);
      }}
    >
      <GlobalLayout current_route={current_route}>
        <RootStack />
      </GlobalLayout>
    </NavigationContainer>
  );
}

export default App;
