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
  (config) => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Access-Control-Allow-Credentials'] = 'true';

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${authApiUrl}/refresh`,
          {},
          { withCredentials: true },
        );

        if (refreshResponse.data.accessToken) {
          // Повторяем оригинальный запрос
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
