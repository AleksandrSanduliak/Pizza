import axios from 'axios';

import { baseUrl, REFRESH_API_URL } from '@shared/api/api-list';
import { isServer } from '@shared/consts/helpers';

export const axiosInstance = axios.create({
  baseURL: `${baseUrl()}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // if (!isServer) {
    //   const accessToken = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('accessToken='))
    //     ?.split('=')[1];
    //   console.log('accessToken', accessToken);
    //   if (accessToken) {
    //     config.headers['accessToken'] = accessToken;
    //   }
    //   config.headers['Access-Control-Allow-Credentials'] = 'true';
    // } else {
    //   try {
    //     const { cookies } = await import('next/headers');
    //     const cookiesString = await cookies();
    //     console.log('cookiesString', cookiesString.getAll());
    //     const accessToken = cookiesString.get('accessToken');
    //     if (accessToken) {
    //       config.headers['accessToken'] = accessToken.value;
    //     }
    //     config.headers['Access-Control-Allow-Credentials'] = 'true';
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

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
          const response = await axios({
            method: 'get',
            url: REFRESH_API_URL,
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('response', response);
        } catch (refreshError) {
          // window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
