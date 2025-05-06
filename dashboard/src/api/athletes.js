import api from './axios';

/**
 * Athletes Service - Quản lý tất cả API calls liên quan đến vận động viên
 */
export const athletesService = {
  /**
   * Lấy danh sách tất cả vận động viên
   * @param {number} page - Trang hiện tại
   * @param {number} limit - Số lượng item trên mỗi trang
   * @returns {Promise} Danh sách vận động viên và thông tin phân trang
   */
  getAll: async (page = 1, limit = 5) => {
    const response = await api.get('/athletes', {
      params: {
        page,
        limit
      }
    });
    return {
      athletes: Array.isArray(response.data.data) ? response.data.data : [],
      pagination: {
        total: response.data.total || 0,
        page: response.data.page || 1,
        limit: response.data.limit || 5
      }
    };
  },
  
  /**
   * Lấy thông tin chi tiết của một vận động viên
   * @param {string|number} id - ID của vận động viên
   * @returns {Promise} Thông tin chi tiết vận động viên
   */
  getById: async (id) => {
    if (!id) throw new Error('Athlete ID is required');
    const response = await api.get(`/athletes/${id}`);
    return response.data;
  },
  
  /**
   * Tạo vận động viên mới
   * @param {FormData} formData - Dữ liệu vận động viên (multipart/form-data)
   * @returns {Promise} Vận động viên đã tạo
   */
  create: async (formData) => {
    if (!formData) throw new Error('Athlete data is required');
    
    const response = await api.post('/athletes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  /**
   * Cập nhật thông tin vận động viên
   * @param {string|number} id - ID của vận động viên
   * @param {FormData} formData - Dữ liệu cập nhật (multipart/form-data)
   * @returns {Promise} Vận động viên đã cập nhật
   */
  update: async (id, formData) => {
    if (!id) throw new Error('Athlete ID is required');
    if (!formData) throw new Error('Athlete data is required');
    
    const response = await api.put(`/athletes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  /**
   * Xóa vận động viên
   * @param {string|number} id - ID của vận động viên
   * @returns {Promise} Kết quả xóa
   */
  delete: async (id) => {
    if (!id) throw new Error('Athlete ID is required');
    const response = await api.delete(`/athletes/${id}`);
    return response.data;
  },
  
  /**
   * Tìm kiếm vận động viên
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise} Danh sách vận động viên phù hợp
   */
  search: async (query) => {
    if (!query) return athletesService.getAll();
    
    const response = await api.get(`/athletes/search`, {
      params: { q: query }
    });
    return Array.isArray(response.data) ? response.data : [];
  }
}; 