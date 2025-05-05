import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

// Lấy API URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(handleApiError(error));
    }

    // Don't handle 401 for login endpoint
    const isLoginRequest = error.config.url.includes('/auth/login');
    
    // Handle unauthorized errors (except for login requests)
    if (error.response.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(handleApiError(error));
    }

    // Handle other errors
    return Promise.reject(handleApiError(error));
  }
);

export default api; 