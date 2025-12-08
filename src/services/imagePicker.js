import * as ImagePicker from "expo-image-picker";

export async function pickFromGallery() {
  console.log("pickFromGallery called");

  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    console.warn("Media library permission not granted");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaType,
    quality: 0.8,
    allowsEditing: true,
    aspect: [4,3]
  });

  if (result.canceled) return null;
  return result.assets[0];
}

export async function takePhoto() {
  console.log("takePhoto called");

  const perm = await ImagePicker.requestCameraPermissionsAsync();
  if (!perm.granted) {
    console.warn("Camera permission not granted");
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaType,
    quality: 0.8,
    allowsEditing: true,
    aspect: [4,3]
  });

  if (result.canceled) return null;
  return result.assets[0];
}

export default {
  pickFromGallery,
  takePhoto,
};
