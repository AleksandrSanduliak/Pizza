import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { useGetUserMutation } from "store/api/userApi";
const baseUrl = "http://localhost:3000/api/auth";
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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUser: builder.mutation<any, any>({
      query() {
        return {
          credentials: "include",
          url: "user",
          method: "GET",
          mode: "cors",
        };
      },
    }),
  }),
});
export const { useGetUserMutation } = userApi;
