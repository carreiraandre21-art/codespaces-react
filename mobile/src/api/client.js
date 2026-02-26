import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TOKEN_STORAGE_KEY = 'token';
export const API_HOST = 'http://192.168.10.104:4000';

export const api = axios.create({
  baseURL: `${API_HOST}/api`
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
  baseURL: `${API_HOST}/api/auth`
});
