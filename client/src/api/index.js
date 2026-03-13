import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const fetchCrops = () => api.get('/crops').then(res => res.data);
export const fetchMandis = () => api.get('/mandis').then(res => res.data);
export const fetchReports = (params = {}) => api.get('/reports', { params }).then(res => res.data);
export const submitReport = (formData) => api.post('/reports', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then(res => res.data);

export default api;
