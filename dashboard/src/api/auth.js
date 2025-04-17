import api from './axios';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login'
};

export const login = async (email, password) => {
  const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
}; 