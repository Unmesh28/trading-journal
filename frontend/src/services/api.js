import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trade API
export const getTrades = (params) => API.get('/trades', { params });
export const getTrade = (id) => API.get(`/trades/${id}`);
export const createTrade = (tradeData) => API.post('/trades', tradeData);
export const updateTrade = (id, tradeData) => API.put(`/trades/${id}`, tradeData);
export const deleteTrade = (id) => API.delete(`/trades/${id}`);

// Analytics API
export const getSummary = () => API.get('/analytics/summary');
export const getPerformance = (period) => API.get('/analytics/performance', {
  params: { period }
});

export default API;
