import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const getCitysApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/getCitys`,
  }),
  endpoints: (builder) => ({
    getCityList: builder.query<any, any>({
      query: () => ({ url: 'cityList' }),
    }),
  }),
});

export const { useGetCityListQuery } = getCitysApi;
