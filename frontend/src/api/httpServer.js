import axios from "axios";

export const httpServer = axios.create({
    baseURL: 'https://backend-ejlb.onrender.com'
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