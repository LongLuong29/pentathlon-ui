import api from './axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Firebase storage URL
 */
const uploadImageToFirebase = async (file) => {
  if (!file) return '';
  
  // Create a unique filename
  const filename = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `athletes/${filename}`);
  
  // Upload file
  const snapshot = await uploadBytes(storageRef, file);
  
  // Get download URL
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

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
   * @param {Object} data - Dữ liệu vận động viên
   * @returns {Promise} Kết quả tạo vận động viên
   */
  create: async (data) => {
    try {
      let avatarUrl = '';
      if (data.avatar instanceof File) {
        avatarUrl = await uploadImageToFirebase(data.avatar);
      }

      // Format data theo đúng yêu cầu của API
      const formattedData = {
        fullname: data.fullName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender.toLowerCase(),
        phone: data.phone,
        email: data.email,
        address: data.address,
        avatar: avatarUrl,
        password: data.password || 'Password123@',
        age_group_id: Array.isArray(data.ageGroups) ? data.ageGroups.map(Number) : [],
        sport_id: Array.isArray(data.sports) ? data.sports.map(Number) : []
      };

      console.log('Data being sent to API:', formattedData);

      const response = await api.post('/athletes', formattedData);
      return response.data;
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Error message:', error.message);

      // Xử lý các loại lỗi khác nhau
      if (error.response) {
        // Lỗi từ server với status code
        const errorMessage = error.response.data?.message || 'Server error occurred';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Lỗi không nhận được response
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Lỗi khi setting up request
        throw new Error(error.message || 'Error setting up the request');
      }
    }
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