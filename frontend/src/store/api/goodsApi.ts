import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/goods`;
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  mode: "cors",
  redirect: "follow",
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Credentials", "*");
    const accessToken = document.cookie.split("accesToken=")[1];
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGoods: builder.query<any, void>({
      query: () => ({
        url: `getGoods`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGoodsQuery } = goodsApi;
