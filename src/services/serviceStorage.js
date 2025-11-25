import AsyncStorage from '@react-native-async-storage/async-storage';

class storage {
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
      let existing = await storage.getItem(key);

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
}

export default storage;
