import type { FormLogin } from "molecules/loginForm/LoginForm";
import {
  BaseQueryApi,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser, setUserData } from "store/slices/authSlice";
import { Args } from "@storybook/react";
export type tokensData = {
  accessToken: string;
  refreshToken: string;
};
export interface IGenericResponse {
  status: string;
  message: string;
}
export interface FetchBaseQueryError {
  result: {
    error: {
      data: any;
      error: any;
      originalStatus: any;
      status: any;
    };
    // isUnhandledError: boolean;
    meta: any;
  };
}
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
const baseQueryReAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result, "RESULT");
  if ((result.error as Record<string, unknown>)?.originalStatus === 401) {
    const refreshRes = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshRes, "refreshRes");
    if (refreshRes?.data) {
      const user = api.getState().auth.user;
      console.log(api.getState());
      api.dispatch(setUser(user));
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryReAuth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, FormLogin>({
      query(data) {
        return {
          credentials: "include",
          url: "register",
          method: "POST",
          body: data,
          mode: "cors",
        };
      },
    }),
    loginUser: builder.mutation<IGenericResponse, FormLogin>({
      query: (data) => ({
        credentials: "include",
        url: "login",
        method: "POST",
        body: data,
        mode: "cors",
      }),
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        // console.log(data);
        // dispatch(setUser(data));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query(data) {
        console.log(data);
        return {
          url: "logout",
          credentials: "include",
          method: "POST",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (e) {
          console.log(e);
        }
      },
    }),
    refreshToken: builder.mutation<IGenericResponse, FetchBaseQueryError>({
      query: () => ({
        credentials: "include",
        url: "refresh",
        method: "GET",
        mode: "cors",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, "data");
          dispatch(setUser(data));
        } catch (e) {
          console.log(e);
        } finally {
        }
      },
    }),
    getUser: builder.mutation<IGenericResponse, FetchBaseQueryError>({
      query() {
        return {
          credentials: "include",
          url: "user",
          method: "GET",
          mode: "cors",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, "data getUser");
          dispatch(setUserData(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
  useGetUserMutation,
} = authApi;
