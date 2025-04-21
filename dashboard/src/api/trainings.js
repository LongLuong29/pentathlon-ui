import api from './axios';

/**
 * Training Service - Quản lý tất cả API calls liên quan đến lịch tập luyện
 */
export const trainingService = {
  /**
   * Lấy tất cả lịch tập luyện
   * @returns {Promise} Danh sách lịch tập luyện
   */
  getAll: async () => {
    const response = await api.get('/trainings');
    return Array.isArray(response.data) ? response.data : [];
  },
  
  /**
   * Lấy lịch tập luyện theo ID
   * @param {string|number} id - ID của lịch tập luyện
   * @returns {Promise} Chi tiết lịch tập luyện
   */
  getById: async (id) => {
    if (!id) throw new Error('Training ID is required');
    const response = await api.get(`/trainings/${id}`);
    return response.data;
  },
  
  /**
   * Lấy lịch tập luyện theo khoảng thời gian
   * @param {string} fromDate - Ngày bắt đầu (YYYY-MM-DD)
   * @param {string} toDate - Ngày kết thúc (YYYY-MM-DD)
   * @returns {Promise} Danh sách lịch tập luyện trong khoảng thời gian
   */
  getByDateRange: async (fromDate, toDate) => {
    if (!fromDate || !toDate) throw new Error('Date range is required');
    
    const response = await api.get('/trainings/filter', {
      params: { fromDate, toDate }
    });
    return Array.isArray(response.data) ? response.data : [];
  },
  
  /**
   * Tạo lịch tập luyện mới
   * @param {Object} data - Dữ liệu lịch tập luyện
   * @returns {Promise} Lịch tập luyện đã tạo
   */
  create: async (data) => {
    if (!data) throw new Error('Training data is required');
    const response = await api.post('/trainings', data);
    return response.data;
  },
  
  /**
   * Cập nhật lịch tập luyện
   * @param {string|number} id - ID của lịch tập luyện
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise} Lịch tập luyện đã cập nhật
   */
  update: async (id, data) => {
    if (!id) throw new Error('Training ID is required');
    if (!data) throw new Error('Training data is required');
    
    const response = await api.put(`/trainings/${id}`, data);
    return response.data;
  },
  
  /**
   * Xóa lịch tập luyện
   * @param {string|number} id - ID của lịch tập luyện
   * @returns {Promise} Kết quả xóa
   */
  delete: async (id) => {
    if (!id) throw new Error('Training ID is required');
    const response = await api.delete(`/trainings/${id}`);
    return response.data;
  },
  
  /**
   * Thêm vận động viên vào lịch tập luyện
   * @param {string|number} trainingId - ID của lịch tập luyện
   * @param {string|number} athleteId - ID của vận động viên
   * @returns {Promise} Kết quả thêm
   */
  addAthlete: async (trainingId, athleteId) => {
    if (!trainingId) throw new Error('Training ID is required');
    if (!athleteId) throw new Error('Athlete ID is required');
    
    const response = await api.post(`/trainings/${trainingId}/athletes`, { athleteId });
    return response.data;
  },
  
  /**
   * Xóa vận động viên khỏi lịch tập luyện
   * @param {string|number} trainingId - ID của lịch tập luyện
   * @param {string|number} athleteId - ID của vận động viên
   * @returns {Promise} Kết quả xóa
   */
  removeAthlete: async (trainingId, athleteId) => {
    if (!trainingId) throw new Error('Training ID is required');
    if (!athleteId) throw new Error('Athlete ID is required');
    
    const response = await api.delete(`/trainings/${trainingId}/athletes/${athleteId}`);
    return response.data;
  }
}; 