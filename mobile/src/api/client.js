import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const authApi = axios.create({
  baseURL: 'http://localhost:4000/api/auth'
});
