import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../authSlice";
import { authApi } from "../authApi";
export const rootReducers = combineReducers({
  auth: authSlice,
});
export type RootState = ReturnType<typeof rootReducers>;
