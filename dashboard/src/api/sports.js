import api from './axios';

/**
 * Sports Service - Quản lý tất cả API calls liên quan đến môn thể thao
 */
export const sportsService = {
  /**
   * Lấy danh sách tất cả môn thể thao
   * @returns {Promise} Danh sách môn thể thao
   */
  getAll: async () => {
    const response = await api.get('/sports');
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Tạo môn thể thao mới
   * @param {Object} data - Dữ liệu môn thể thao
   * @param {string} data.name - Tên môn thể thao
   * @returns {Promise} Môn thể thao đã tạo
   */
  create: async (data) => {
    if (!data?.name) throw new Error('Sport name is required');
    
    const response = await api.post('/sports', data);
    return response.data;
  },

  /**
   * Cập nhật thông tin môn thể thao
   * @param {string|number} id - ID của môn thể thao
   * @param {Object} data - Dữ liệu cập nhật
   * @param {string} data.name - Tên môn thể thao
   * @returns {Promise} Môn thể thao đã cập nhật
   */
  update: async (id, data) => {
    if (!id) throw new Error('Sport ID is required');
    if (!data?.name) throw new Error('Sport name is required');
    
    const response = await api.put(`/sports/${id}`, data);
    return response.data;
  },

  /**
   * Xóa môn thể thao
   * @param {string|number} id - ID của môn thể thao
   * @returns {Promise} Kết quả xóa
   */
  delete: async (id) => {
    if (!id) throw new Error('Sport ID is required');
    const response = await api.delete(`/sports/${id}`);
    return response.data;
  }
}; 