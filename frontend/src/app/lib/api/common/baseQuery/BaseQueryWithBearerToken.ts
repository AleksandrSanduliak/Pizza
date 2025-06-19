import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BaseQueryWithBearerToken = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Credentials', '*');
      const accessToken = document.cookie.split('accessToken=')[1];

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  });
};
