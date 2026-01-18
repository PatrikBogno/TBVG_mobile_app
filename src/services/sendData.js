import { Alert } from "react-native";
import { sendJsonToESP } from "./wsClientConnection.js";

export const sendData = async ({
    data
  }) => {
    /*if (!connectedDevice) {
      const savedName = await storage.getItem("ESP_Name");
  
      if (savedName) {
        Alert.alert(
          "UPOZORNENIE",
          "Zariadenie bolo odpojené"
        );

        //setSearchEspName(savedName);
        return;
      }
  
      Alert.alert("Chyba", "Zariadenie nebolo pripojené");
      return;
    }*/
  
    sendJsonToESP(data);
  };
  