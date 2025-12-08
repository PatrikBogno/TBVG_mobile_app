import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Host } from "react-native-portalize";

import Navigation from "./src/navigation/navigation";
import { useAppResources } from "./src/hooks/useAppResources";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

function App() {
  const resourcesLoaded = useAppResources();

  if ( !resourcesLoaded ) return <ActivityIndicator/>

  return (
    <ActionSheetProvider>
      <Host>
          <View style={{ flex: 1 }}>
              <Navigation />
          </View>
      </Host>
    </ActionSheetProvider>
  );
}

export default App;