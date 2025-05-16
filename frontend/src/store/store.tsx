import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from 'store/api/authApi';
import { orderApi } from 'store/api/orderApi';
import { rootReducers } from 'store/rootReducer';

import { goodsApi } from './api/goodsApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartShopSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
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

export default store;

export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const dispatchApp = useDispatch<AppDispatch>;
export const selectorApp = useSelector<RootState>;
