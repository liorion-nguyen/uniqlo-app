import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";

export async function uploadImage(uri: string) {
  // Upload image to storage
  return { imageName: "", imageUrl: "" };
}