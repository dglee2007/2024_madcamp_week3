// services/api.js
import axios from 'axios';

const API_URL = 'https://dd9b-2001-e60-a30b-20da-e904-cca5-5faa-4900.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};


export const refreshAccessToken = async (refreshToken) => {
  const response = await api.post('/auth/refresh-token', { refreshToken });
  return response.data;
};

// 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token이 만료되었거나 유효하지 않은 경우
          localStorage.removeItem('user');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const startGame = async (userId) => {
  console.log('startGame API 호출:', userId); // 로그 추가
  const response = await axios.post(`${API_URL}/game/start-game`, { userId });
  console.log('startGame API 응답:', response.data); // 로그 추가
  return response.data;
};

export const getGameState = async (sessionId) => {
  console.log('getGameState API 호출:', sessionId); // 로그 추가
  const response = await axios.get(`${API_URL}/game-state/${sessionId}`);
  console.log('getGameState API 응답:', response.data); // 로그 추가
  return response.data;
};

export default api;