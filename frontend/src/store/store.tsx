import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { authApi } from "store/api/authApi";
import { orderApi } from "store/api/orderApi";
import { goodsApi } from "./api/goodsApi";

import { rootReducers } from "store/rootReducer";
import { PersistorOptions } from "redux-persist/es/types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartShopSlice"],
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
// store.subscribe(() => {
//   console.log("state\n", store.getState().reducer.cartShopSlice);
// });
// store.subscribe(() => {
//   console.log("state\n", store.getState().reducer.auth);
// });
export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const dispatchApp = useDispatch<AppDispatch>;
export const selectorApp = useSelector<RootState>;
