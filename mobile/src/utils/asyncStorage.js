const memoryStore = new Map();

const webStorage =
  typeof globalThis !== 'undefined' && globalThis.localStorage
    ? globalThis.localStorage
    : null;

const AsyncStorage = {
  async getItem(key) {
    if (webStorage) {
      return webStorage.getItem(key);
    }
    return memoryStore.has(key) ? memoryStore.get(key) : null;
  },

  async setItem(key, value) {
    if (webStorage) {
      webStorage.setItem(key, value);
      return;
    }
    memoryStore.set(key, String(value));
  },

  async removeItem(key) {
    if (webStorage) {
      webStorage.removeItem(key);
      return;
    }
    memoryStore.delete(key);
  },

  async multiGet(keys) {
    const entries = await Promise.all(
      keys.map(async (key) => {
        const value = await AsyncStorage.getItem(key);
        return [key, value];
      }),
    );

    return entries;
  },
};

export default AsyncStorage;
