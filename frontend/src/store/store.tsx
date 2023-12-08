import { useDispatch, useSelector } from "react-redux";

import { authApi } from "store/api/authApi";
import { rootReducers } from "store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    reducer: rootReducers,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const dispatchApp = useDispatch<AppDispatch>;
export const selectorApp = useSelector<RootState>;
