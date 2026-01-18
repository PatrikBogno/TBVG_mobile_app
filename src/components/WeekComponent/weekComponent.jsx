import { View, Text, Pressable } from "react-native";
import StyleKeys from "../../styles/styleKeys";
import ServiceKeys from "../../services/serviceKeys";
import { sendData } from "../../services/sendData";

function WeekPortalContainer({ items, dayOfWeek, onAddTask, onClose }) {
  const style = StyleKeys.styleWeekPortalContainer;
  const storage = ServiceKeys.serviceStorage;

  const saveDay = async (item) => {
    try {
      const stringDayOfWeek = String(dayOfWeek);
      console.log("Ukladám pod kľúčom:", stringDayOfWeek);
  
      // skontrolujeme, či už niečo existuje
      const existingValue = await storage.getItem(stringDayOfWeek);
  
      if (existingValue) {
        console.log("Pre tento deň už existuje záznam – neukladám.");
        return;
      }
  
      const newTask = {
        dayOfWeek: dayOfWeek,
        id: item.id,
        label: item.label,
      };

      const newTaskToSend = {
        dayOfWeek: stringDayOfWeek,
        id: item.id,
        label: item.label,
      };
  
  
      await storage.setItem(stringDayOfWeek, JSON.stringify(newTask));
      //await sendData({ connectedDevice, storage, setSearchEspName, data: newTask});
      await sendData({
        data: newTask
      });
      onAddTask(dayOfWeek, newTask);
      onClose();
  
      console.log("Úspešne uložené:", newTask);
    } catch (error) {
      console.error("Kritická chyba pri ukladaní:", error);
    }
  };
  

  return (
    <View style={style.container}>
      {items.map((item) => (
        // PRIDANÝ key pre React optimalizáciu
        <Pressable key={item.id} onPress={() => saveDay(item)}>
          <Text style={style.title}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default WeekPortalContainer;