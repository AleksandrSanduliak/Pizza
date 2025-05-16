import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/rootReducer';
import { logout, setUser } from 'store/slices/authSlice';

type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

export const baseQueryWithReauth =
  (baseQuery: BaseQuery) =>
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions);

    const getState = api.getState() as RootState;
    // handle 401 error
    if ((result.error as Record<string, unknown>)?.originalStatus === 401) {
      try {
        const refreshRequest = await baseQuery('/refresh', api, extraOptions);
        if (!refreshRequest.data) {
          api.dispatch(logout());
          return result;
        }
        const getUserState = getState.auth.user;
        api.dispatch(setUser(getUserState));
      } catch (err) {
        console.log('Ошибка авторизации', err);
      }
    }

    return result;
  };
