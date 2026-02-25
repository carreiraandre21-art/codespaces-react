import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.10.104:4000/api'
});

export const authApi = axios.create({
  baseURL: 'http://192.168.10.104:4000/api/auth'
});
