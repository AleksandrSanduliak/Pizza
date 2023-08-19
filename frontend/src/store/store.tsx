import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./reducers/rootReducer";
import { authApi } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
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
// setupListeners(store.dispatch);
