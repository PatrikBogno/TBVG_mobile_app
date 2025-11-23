import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Save new data (or overwrite)
  static async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(key, value)
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  }

  // Get stored data
  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  }

  // Update existing data (merge)
  static async updateItem(key, newValue) {
    try {
      let existing = await StorageService.getItem(key);

      // Ensure it's always an object
      if (typeof existing !== 'object' || existing === null) {
        existing = {};
      }

      const updated = { ...existing, ...newValue };

      await AsyncStorage.setItem(key, JSON.stringify(updated));

      return updated;
    } catch (error) {
      console.error("Error updating data:", error);
      return null;
    }
  }

  // Remove a key from storage
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing data:", error);
      return false;
    }
  }

  static async printAllData() {
    try {
      const keys = await AsyncStorage.getAllKeys();      
      const result = await AsyncStorage.multiGet(keys); 

      console.log("All AsyncStorage data:", result);

      return null; 
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    }
  }

  static async  setEspBrightnessToZero() {
  try {
    // Get current espSettings data
    const data = await AsyncStorage.getItem("espSettings");

    if (!data) {
      console.log("espSettings not found in AsyncStorage.");
      return;
    }

    // Parse JSON
    const settings = JSON.parse(data);

    // Update brightness
    settings.esp_volume = 0;

    // Save updated object
    await AsyncStorage.setItem("espSettings", JSON.stringify(settings));

    console.log("esp_brightness successfully updated to 0.");
  } catch (error) {
    console.error("Error updating esp_brightness:", error);
  }
}

}

export default StorageService;
