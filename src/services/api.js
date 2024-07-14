import axios from 'axios';

const BASE_URL = 'https://1d54-2001-e60-a302-2856-10b-ac1-29e4-3f8d.ngrok-free.app/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) => api.post('/auth/login', { username, password });
export const register = (username, password) => api.post('/auth/register', { username, password });
export const refreshToken = () => api.post('/auth/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });

export const startGame = (userId) => {
  console.log('Starting game with userId:', userId);
  return api.post('/game/start-game', { userId: parseInt(userId) })
    .then(response => {
      console.log('startGame API response:', response.data);
      return response;
    })
    .catch(error => {
      console.error('startGame API error:', error.response ? error.response.data : error.message);
      throw error;
    });
};
export const getGameState = (sessionId) => api.get(`/game/game-state/${sessionId}`);
export const tradeStock = (sessionId, companyId, amount, action) => api.post('/game/trade', { sessionId, companyId, amount, action });
export const getNews = (sessionId, companyId, isPremium) => api.get(`/game/news/${sessionId}/${companyId}/${isPremium}`);
export const endTurn = (sessionId) => api.post(`/game/end-turn/${sessionId}`);
export const getStockChanges = (sessionId) => api.get(`/game/stock-changes/${sessionId}`);

export const getTopProfitRate = () => api.get('/ranking/top-profit-rate');
export const getTopCumulativeProfit = () => api.get('/ranking/top-cumulative-profit');

export const getUserProfile = (userId) => api.get(`/profile/${userId}`);

export default api;