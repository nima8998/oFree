import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageItem = async (userOwner, item) => {
  try {
    const jsonValue = JSON.stringify(item)
    await AsyncStorage.setItem(`@${userOwner}`, jsonValue);
    return {message: "Progreso guardado.", status: 200}
  } catch (error) {
    return {message: "Error al guardar el progreso.", status: 400, error}
  }
}