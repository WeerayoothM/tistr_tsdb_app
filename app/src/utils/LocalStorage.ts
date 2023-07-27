import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = {
  hasKey: async (key: string) => {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  },
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item;
  },
  setItem: async (key: string, item: string) => {
    if (typeof item !== typeof '') {
      throw new Error(
        'Attempt to setItem that is not a string on AsyncStorage',
      );
    }
    await AsyncStorage.setItem(key, item);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export default LocalStorage;
