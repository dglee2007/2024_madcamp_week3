import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5cf6-118-235-90-225.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

export const refreshAccessToken = async (refreshToken) => {
  const response = await api.post('/auth/refresh-token', { refreshToken });
  return response.data;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request Config:', config); // 요청 설정 로깅
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  console.log('Response:', response); // 응답 로깅
  return response;
}, (error) => {
  console.error('Response Error:', error.response || error);
  return Promise.reject(error);
});

export default api;