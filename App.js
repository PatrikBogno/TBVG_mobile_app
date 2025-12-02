import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Host } from "react-native-portalize";

import Navigation from "./src/navigation/navigation";
import { useAppResources } from "./src/hooks/useAppResources";

function App() {
  const resourcesLoaded = useAppResources();

  if ( !resourcesLoaded ) return <ActivityIndicator/>

  return (
    <Host>
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    </Host>
  );
}

export default App;