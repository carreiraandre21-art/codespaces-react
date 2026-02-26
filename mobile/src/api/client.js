import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TOKEN_STORAGE_KEY = 'token';

export const api = axios.create({
  baseURL: 'http://192.168.10.104:4000/api'
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authApi = axios.create({
  baseURL: 'http://192.168.10.104:4000/api/auth'
});
