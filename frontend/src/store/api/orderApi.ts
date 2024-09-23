import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from './authApi';
import { setDiscountPrice, setItems, setOrderId } from '../slices/cartSlice';
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/order`;

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Credentials', '*');
      const accessToken = document.cookie.split('accesToken=')[1];
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPromo: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        return {
          url: 'getPromo',
          method: 'POST',
          body: data,
          mode: 'cors',
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data);
          dispatch(setDiscountPrice({ ...data, isPromoCodeActive: true }));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    saveCard: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        console.log('saveCard data', data);
        return {
          credentials: 'include',
          url: 'saveCard',
          method: 'PATCH',
          body: data,
          mode: 'cors',
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data);
          dispatch(setItems(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    incrementCardItem: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        return {
          credentials: 'include',
          url: 'incrementItem',
          method: 'PATCH',
          mode: 'cors',
          body: data,
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data);
          dispatch(setItems(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    decrementCardItem: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        return {
          credentials: 'include',
          url: 'decrementItem',
          method: 'PATCH',
          mode: 'cors',
          body: data,
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data);
          dispatch(setItems(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    deleteCardItem: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        return {
          credentials: 'include',
          url: 'deleteItem',
          method: 'DELETE',
          mode: 'cors',
          body: data,
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data);
          dispatch(setItems(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    saveOrder: builder.mutation<IGenericResponse, unknown>({
      query(data) {
        return {
          credentials: 'include',
          url: 'saveOrder',
          method: 'POST',
          mode: 'cors',
          body: data,
        };
      },
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted data', data.orderId);
          dispatch(setOrderId({ orderId: data.orderId }));
          dispatch(
            setItems({ items: [], cardInfo: { totalPrice: 0, totalCount: 0 } }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useGetPromoMutation,
  useSaveCardMutation,
  useIncrementCardItemMutation,
  useDecrementCardItemMutation,
  useDeleteCardItemMutation,
  useSaveOrderMutation,
} = orderApi;
