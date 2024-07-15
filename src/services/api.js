import axios from 'axios';

const BASE_URL = 'https://5765-118-235-90-169.ngrok-free.app/api';

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
  console.log('Calling startGame API with userId:', userId);
  return api.post('/game/start-game', { userId })
    .then(response => {
      console.log('startGame API full response:', response);
      console.log('startGame API response data:', response.data);
      return response;
    })
    .catch(error => {
      console.error('startGame API error:', error);
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
