import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = (params) => API.get('/products', { params });
export const fetchFeatured = () => API.get('/products/featured');
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const fetchCart = () => API.get('/cart');
export const addCartItem = (data) => API.post('/cart', data);
export const updateCartItem = (productId, data) => API.put(`/cart/${productId}`, data);
export const removeCartItem = (productId) => API.delete(`/cart/${productId}`);
export const clearCart = () => API.delete('/cart');
export const createOrder = (data) => API.post('/orders', data);
export const verifyPayment = (id, data) => API.post(`/orders/${id}/verify`, data);
export const fetchMyOrders = () => API.get('/orders/myorders');
export const uploadImage = (formData) => API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export default API;
