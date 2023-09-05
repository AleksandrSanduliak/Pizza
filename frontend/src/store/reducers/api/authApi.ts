import type { FormLogin } from "molecules/loginForm/LoginForm";
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState, dispatchApp } from "store";
import { logout, setUser } from "store/slices/authSlice";
// import { RootState } from "./reducers/rootReducer";

export interface IGenericResponse {
  status: string;
  message: string;
}
export interface FetchBaseQueryError {
  error: {};
  isUnhandledError: boolean;
  meta: any;
}
const baseUrl = "http://localhost:3000/api/auth";
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  mode: "cors",
  redirect: "follow",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Credentials", "*");
    const accessToken = document.cookie.split("accesToken=")[1];
    console.log(accessToken, "accesToken for api");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
const baseQueryReAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 401) {
    const refreshRes = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshRes, "refreshRes");
    if (refreshRes?.data) {
      const user = api.getState().auth.user;
      console.log(user);
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
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
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
          dispatch(setUser(data));
        } catch (e) {
          console.log(e);
        } finally {
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
} = authApi;
