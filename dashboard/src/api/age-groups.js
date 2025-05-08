import api from './axios';

/**
 * Age Groups Service - Quản lý tất cả API calls liên quan đến nhóm tuổi
 */
export const ageGroupsService = {
  /**
   * Lấy danh sách tất cả nhóm tuổi
   * @returns {Promise} Danh sách nhóm tuổi
   */
  getAll: async () => {
    const response = await api.get('/age-groups');
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Tạo nhóm tuổi mới
   * @param {Object} data - Dữ liệu nhóm tuổi
   * @param {string} data.name - Tên nhóm tuổi
   * @returns {Promise} Nhóm tuổi đã tạo
   */
  create: async (data) => {
    if (!data?.name) throw new Error('Age group name is required');
    
    const response = await api.post('/age-groups', data);
    return response.data;
  },

  /**
   * Cập nhật thông tin nhóm tuổi
   * @param {string|number} id - ID của nhóm tuổi
   * @param {Object} data - Dữ liệu cập nhật
   * @param {string} data.name - Tên nhóm tuổi
   * @returns {Promise} Nhóm tuổi đã cập nhật
   */
  update: async (id, data) => {
    if (!id) throw new Error('Age group ID is required');
    if (!data?.name) throw new Error('Age group name is required');
    
    const response = await api.put(`/age-groups/${id}`, data);
    return response.data;
  },

  /**
   * Xóa nhóm tuổi
   * @param {string|number} id - ID của nhóm tuổi
   * @returns {Promise} Kết quả xóa
   */
  delete: async (id) => {
    if (!id) throw new Error('Age group ID is required');
    const response = await api.delete(`/age-groups/${id}`);
    return response.data;
  }
}; 