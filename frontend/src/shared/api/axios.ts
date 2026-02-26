'use client';
import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
export const AUTH_API_URL = `${baseUrl}/v1/auth`;
export const orderApiUrl = `${baseUrl}/v1/order`;
export const goodsApiUrl = `${baseUrl}/v1/goods`;

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];
      console.log('accessToken', accessToken);
      if (accessToken) {
        config.headers['accessToken'] = accessToken;
      }
      config.headers['Access-Control-Allow-Credentials'] = 'true';
    } else {
      const { cookies } = await import('next/headers');
      const cookiesString = await cookies();
      console.log('cookiesString', cookiesString.getAll());
      const accessToken = cookiesString.get('accessToken');
      if (accessToken) {
        config.headers['accessToken'] = accessToken.value;
      }
      config.headers['Access-Control-Allow-Credentials'] = 'true';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // const refreshResponse = await axiosInstance.get(`${AUTH_API_URL}/refresh`, {
          //   withCredentials: true,
          // });
          const response = await axios({
            method: 'get',
            url: 'http://localhost:3001/api/v1/auth/refresh',
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('response', response);
          // if (refreshResponse.data.accessToken) {
          //   // Повторяем оригинальный запрос
          //   return apiClient(originalRequest);
          // }
        } catch (refreshError) {
          // window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
