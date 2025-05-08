import api from './axios';

/**
 * Health Records Service - Quản lý tất cả API calls liên quan đến hồ sơ sức khỏe
 */
export const healthRecordsService = {
  /**
   * Lấy tất cả hồ sơ sức khỏe
   * @returns {Promise} Danh sách hồ sơ sức khỏe
   */
  getAll: async () => {
    const response = await api.get('/health-records');
    return Array.isArray(response.data) ? response.data : [];
  },
  
  /**
   * Lấy hồ sơ sức khỏe theo ID
   * @param {string|number} id - ID của hồ sơ sức khỏe
   * @returns {Promise} Chi tiết hồ sơ sức khỏe
   */
  getById: async (id) => {
    if (!id) throw new Error('Health record ID is required');
    const response = await api.get(`/health-records/${id}`);
    return response.data;
  },
  
  /**
   * Lọc hồ sơ sức khỏe theo vận động viên, chỉ số và khoảng thời gian
   * @param {string|number} athleteId - ID của vận động viên
   * @param {string|number} metricId - ID của chỉ số sức khỏe
   * @param {string} fromDate - Ngày bắt đầu (YYYY-MM-DD)
   * @param {string} toDate - Ngày kết thúc (YYYY-MM-DD)
   * @returns {Promise} Danh sách hồ sơ sức khỏe đã lọc
   */
  filter: async (athleteId, metricId, fromDate, toDate) => {
    if (!athleteId) throw new Error('Athlete ID is required');
    if (!metricId) throw new Error('Health metric ID is required');
    
    const response = await api.get(`/health-records/filter/${athleteId}/${metricId}/${fromDate}/${toDate}`);
    return Array.isArray(response.data) ? response.data : [];
  },
  
  /**
   * Tạo hồ sơ sức khỏe mới
   * @param {Object} data - Dữ liệu hồ sơ sức khỏe
   * @returns {Promise} Hồ sơ sức khỏe đã tạo
   */
  create: async (data) => {
    if (!data) throw new Error('Health record data is required');
    const response = await api.post('/health-records', data);
    return response.data;
  },
  
  /**
   * Cập nhật hồ sơ sức khỏe
   * @param {string|number} id - ID của hồ sơ sức khỏe
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise} Hồ sơ sức khỏe đã cập nhật
   */
  update: async (id, data) => {
    if (!id) throw new Error('Health record ID is required');
    if (!data) throw new Error('Health record data is required');
    
    const response = await api.put(`/health-records/${id}`, data);
    return response.data;
  },
  
  /**
   * Xóa hồ sơ sức khỏe
   * @param {string|number} id - ID của hồ sơ sức khỏe
   * @returns {Promise} Kết quả xóa
   */
  delete: async (id) => {
    if (!id) throw new Error('Health record ID is required');
    const response = await api.delete(`/health-records/${id}`);
    return response.data;
  }
};

/**
 * Health Metrics Service - Quản lý tất cả API calls liên quan đến chỉ số sức khỏe
 */
export const healthMetricsService = {
  /**
   * Lấy tất cả chỉ số sức khỏe
   * @returns {Promise} Danh sách chỉ số sức khỏe
   */
  getAll: async () => {
    const response = await api.get('/health-metrics');
    return Array.isArray(response.data) ? response.data : [];
  },
  
  /**
   * Lấy chỉ số sức khỏe theo nhóm
   * @param {string|number} groupId - ID của nhóm chỉ số
   * @returns {Promise} Danh sách chỉ số sức khỏe theo nhóm
   */
  getByGroup: async (groupId) => {
    if (!groupId) throw new Error('Metric group ID is required');
    const response = await api.get(`/health-metrics/filter/${groupId}`);
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Lấy tất cả nhóm chỉ số sức khỏe
   * @returns {Promise} Danh sách nhóm chỉ số sức khỏe
   */
  getAllGroups: async () => {
    const response = await api.get('/metric-groups');
    return Array.isArray(response.data) ? response.data : [];
  }
}; 