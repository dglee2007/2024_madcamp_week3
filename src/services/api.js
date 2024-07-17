import axios from 'axios';

const api = axios.create({
  baseURL: 'https://4fae-118-235-90-230.ngrok-free.app/api',
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
  
  // trade 요청에 대한 특별한 로깅
  if (config.url === '/game/trade') {
    console.log('Trade Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
  }
  
  console.log('Request Config:', config);
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  // trade 응답에 대한 특별한 로깅
  if (response.config.url === '/game/trade') {
    console.log('Trade Response:', {
      status: response.status,
      data: response.data
    });
  }
  
  console.log('Response:', response);
  return response;
}, (error) => {
  // trade 오류에 대한 특별한 로깅
  if (error.config.url === '/game/trade') {
    console.error('Trade Error:', {
      status: error.response ? error.response.status : 'Unknown',
      data: error.response ? error.response.data : error.message
    });
  }
  
  console.error('Response Error:', error.response || error);
  return Promise.reject(error);
});

export default api;