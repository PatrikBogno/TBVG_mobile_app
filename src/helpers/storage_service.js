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
      const existing = await StorageService.getItem(key);

      const updated = {
        ...existing,
        ...newValue
      };

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
}

export default StorageService;
