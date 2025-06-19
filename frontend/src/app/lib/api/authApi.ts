import { createApi } from '@reduxjs/toolkit/query/react';

import { logout, setUser } from 'store/slices/authSlice';
import { setItems } from 'store/slices/cartSlice';

import { authApiUrl } from '../apiList';
import { BaseQueryWithBearerToken } from './common/baseQuery/BaseQueryWithBearerToken';
import { baseQueryWithReauth } from './common/baseQuery/baseQueryWithReauth';

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface IResponse {
  accessToken: string;
  status: string;
  message: string;
}

export type TUser = {
  email: string;
};

export type TUserCard = {
  card: [];
  cardInfo: any;
};

export type TUserResponse = {
  bonuses: number;
  user: {
    id: string;
    email: string;
  };
} & TTokens;

const baseQuery = BaseQueryWithBearerToken(authApiUrl);
const authApiBaseQuery = baseQueryWithReauth(baseQuery);
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authApiBaseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
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

    loginUser: builder.mutation({
      query: (data) => ({
        credentials: 'include',
        url: 'login',
        method: 'POST',
        body: data,
        mode: 'cors',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
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
      query() {
        return {
          url: 'logout',
          credentials: 'include',
          method: 'POST',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (e) {
          console.log(e);
        }
      },
    }),

    refreshToken: builder.query<TUserResponse, void>({
      query: () => ({
        credentials: 'include',
        url: 'refresh',
        method: 'GET',
        mode: 'cors',
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data) return;
          dispatch(setUser(data?.user));
          dispatch(setItems(data?.userCard));
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
