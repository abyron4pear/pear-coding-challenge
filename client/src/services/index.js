
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

const apiService = {
    get: async (url, config = {}) => {
        return await api.get(url, config);
    },
  
    post: async (url, data, config = {}) => {
        return await api.post(url, data, config);
    },
  
    put: async (url, data, config = {}) => {
        return await api.put(url, data, config);
    },
  
    delete: async (url, config = {}) => {
        return await api.delete(url, config);
    },
};

export default apiService;