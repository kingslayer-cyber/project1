import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL - would come from environment variables in a real app
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle specific error codes
      if (response.status === 401) {
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      } else if (response.data && response.data.message) {
        toast.error(response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      // Network errors, server down, etc.
      toast.error('Unable to connect to server. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

export default api;