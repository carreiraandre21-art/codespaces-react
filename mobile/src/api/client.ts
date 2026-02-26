import axios from 'axios';

export const API_HOST = 'http://192.168.10.104:4000';

export const api = axios.create({
  baseURL: `${API_HOST}/api/v1`
});
