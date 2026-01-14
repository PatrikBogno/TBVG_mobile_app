import * as ImagePicker from "expo-image-picker";
import { Directory, File, Paths } from "expo-file-system";

// Define a dedicated folder in permanent storage 
const IMAGES_FOLDER = new Directory(Paths.document, "Images");

/**
 * Moves an image from the temporary cache to permanent storage.
 * Uses modern object-oriented File and Directory methods.
 */
async function persistImage(asset) {
  try {
    // Ensure directory exists; idempotent: true avoids manual checks 
    if (!IMAGES_FOLDER.exists) {
      await IMAGES_FOLDER.create({ idempotent: true });
    }

    // Instantiate File objects for source and destination 
    const sourceFile = new File(asset.uri);
    const ext = sourceFile.extension || ".jpg"; // Modern extension property 
    const fileName = `img_${Date.now()}${ext}`;
    
    // Create a new File handle within the destination directory 
    const destinationFile = new File(IMAGES_FOLDER, fileName);

    // Modern copy operation via File instance
    await sourceFile.copy(destinationFile);

    return destinationFile.uri;
  } catch (error) {
    console.error("Error persisting image:", error);
    return asset.uri;
  }
}

/**
 * Launches the system gallery using the modern SDK 54 configuration.
 */
export async function pickFromGallery() {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted) {
    alert("Permission to access the gallery is required.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], // Use array instead of deprecated MediaTypeOptions 
    quality: 0.8,
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.canceled) return null;

  // Modern result structure uses 'assets' array 
  const savedUri = await persistImage(result.assets[0]);
  return {
   ...result.assets[0],
    uri: savedUri,
  };
}

/**
 * Launches the camera using the modern SDK 54 configuration.
 */
export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    alert("Permission to use the camera is required.");
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'], // Modern array format 
    quality: 0.8,
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.canceled) return null;

  const savedUri = await persistImage(result.assets[0]);
  return {
   ...result.assets[0],
    uri: savedUri,
  };
}

/**
 * Deletes a single image using the File class.
 */
async function deleteImage(uri) {
  try {
    const targetFile = new File(uri);
    if (targetFile.exists) {
      await targetFile.delete(); // Modern synchronous-capable existence check 
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

/**
 * Deletes the entire images folder recursively.
 */
async function deleteAllImages() {
  try {
    if (IMAGES_FOLDER.exists) {
      await IMAGES_FOLDER.delete(); // Recursive by default in modern API 
      console.log("All stored images have been deleted.");
    }
  } catch (error) {
    console.error("Error deleting all images:", error);
  }
}

export default { 
  pickFromGallery, 
  takePhoto, 
  deleteImage, 
  deleteAllImages 
};