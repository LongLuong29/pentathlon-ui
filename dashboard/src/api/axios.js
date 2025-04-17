import axios from 'axios';

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
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Don't handle 401 for login endpoint
    const isLoginRequest = error.config.url.includes('/auth/login');
    
    // Handle unauthorized errors (except for login requests)
    if (error.response.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      // Instead of redirecting, let the components handle the navigation
      const error401 = new Error('Unauthorized - Please login again');
      error401.status = 401;
      return Promise.reject(error401);
    }

    // Return the error message from the server if available
    const message = error.response?.data?.message || 'An error occurred';
    error.message = message;
    return Promise.reject(error);
  }
);

export default api; 