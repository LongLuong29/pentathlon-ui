// utils/formatDate.js

/**
 * Định dạng ngày từ định dạng ISO sang dd/mm/yyyy
 * @param {string} dateString - Chuỗi ngày ở định dạng ISO
 * @return {string} - Ngày định dạng dd/mm/yyyy
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng được tính từ 0
    const year = date.getFullYear();
    return `${day}/${month}`;
  }
  