import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials: any) => api.post('/auth/login/', credentials),
};

export const ordersApi = {
  list: (params?: any) => api.get('/orders/', { params }),
  get: (id: string) => api.get(`/orders/${id}/`),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/`, { status }),
};

export const staffApi = {
  list: (params?: any) => api.get('/staff/', { params }),
  create: (data: any) => api.post('/staff/', data),
  update: (id: number, data: any) => api.patch(`/staff/${id}/`, data),
  delete: (id: number) => api.delete(`/staff/${id}/`),
  resetPassword: (id: number, data: any) => api.post(`/staff/${id}/reset_password/`, data),
};

export default api;
