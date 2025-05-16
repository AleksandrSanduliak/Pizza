import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

import { goodsApiUrl } from 'store/apiList';
import { setGoods } from 'store/slices/goodsSlice';
import { TGoodsData } from 'utils/types/types';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: goodsApiUrl,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getGoods: builder.query<TGoodsData, void>({
      query: () => ({
        url: 'getGoods',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setGoods(data.data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useLazyGetGoodsQuery } = goodsApi;
