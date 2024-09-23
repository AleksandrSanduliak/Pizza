import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/goods`;

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getGoods: builder.query<any, any>({
      query: () => ({
        url: `getGoods`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetGoodsQuery } = goodsApi;
