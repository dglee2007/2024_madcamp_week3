import axios from 'axios';

const API_URL = 'https://b912-118-235-90-54.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    config.headers['Authorization'] = `Bearer ${user.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (username, password) => api.post('/auth/login', { username, password });
export const register = (username, password) => api.post('/auth/register', { username, password });
export const refreshToken = (refreshToken) => api.post('/auth/refresh-token', { refreshToken });

export default api;