import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setUser } from 'store/slices/authSlice';
import { setItems } from 'store/slices/cartSlice';
import { FormLogin } from 'utils/types/types';

export type tokensData = {
  accessToken: string;
  refreshToken: string;
};

export interface IGenericResponse {
  accessToken: string;
  status: string;
  message: string;
}

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`;
const baseQuery = fetchBaseQuery({
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
const baseQueryReAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if ((result.error as Record<string, unknown>)?.originalStatus === 401) {
    const refreshRes = await baseQuery('/refresh', api, extraOptions);
    if (refreshRes?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setUser(user));
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryReAuth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, FormLogin>({
      query(data) {
        return {
          credentials: 'include',
          url: 'register',
          method: 'POST',
          body: data,
          mode: 'cors',
        };
      },
    }),
    loginUser: builder.mutation<IGenericResponse, FormLogin>({
      query: (data) => ({
        credentials: 'include',
        url: 'login',
        method: 'POST',
        body: data,
        mode: 'cors',
      }),
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setItems(data.userCard));
        } catch (e) {
          console.log(e);
        }
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query(data) {
        return {
          url: 'logout',
          credentials: 'include',
          method: 'POST',
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

    refreshToken: builder.query<IGenericResponse, FetchBaseQueryError>({
      query: () => ({
        credentials: 'include',
        url: 'refresh',
        method: 'GET',
        mode: 'cors',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setItems(data.userCard));
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
  useLazyRefreshTokenQuery,
} = authApi;
