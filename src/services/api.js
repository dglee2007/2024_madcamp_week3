import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c2c4-2001-e60-a30b-2429-3056-f958-ace0-4638.ngrok-free.app/api', // 백엔드 서버 주소에 맞게 수정
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;