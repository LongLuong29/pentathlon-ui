import { useState, useCallback } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      const response = await apiFunc(...params);
      setData(response);
      setError(null);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    error,
    loading,
    execute,
    clearError
  };
};

export default useApi; 