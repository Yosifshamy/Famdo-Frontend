import axios from 'axios';
import { getToken } from './auth'; // ADD THIS IMPORT

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
});

// attach token if present
api.interceptors.request.use((config) => {
  const token = getToken(); // CHANGE THIS LINE
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;