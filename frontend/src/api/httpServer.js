import axios from "axios";

export const httpServer = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''
});

httpServer.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
      },
      error => {
          return Promise.reject(error);
      }
  );