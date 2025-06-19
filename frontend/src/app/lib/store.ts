import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducers } from 'store/rootReducer';

import { authApi } from './api/authApi';
import { goodsApi } from './api/goodsApi';
import { orderApi } from './api/orderApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartShopSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const makeStore = () => {
  return configureStore({
    reducer: {
      reducer: persistedReducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(orderApi.middleware, authApi.middleware, goodsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
