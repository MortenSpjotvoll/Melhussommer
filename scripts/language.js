import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeLanguageSelection(value) {
  try {
    await AsyncStorage.setItem("@language", value);
    language = value;
  } catch (e) {
    alert(e);
  }
}
let language = null;

export async function initLanguage() {
  if (language !== null) {
    return language;
  }
  try {
    const value = await AsyncStorage.getItem("@language");
    if (value !== null) {
      language = value;
      return value;
    }
  } catch (e) {
    alert(e);
    language = "NO";
    return "NO";
  }
  language = "NO";
  return "NO";
}
