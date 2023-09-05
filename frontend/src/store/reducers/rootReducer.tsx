import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../authSlice";
// import { authApi } from "../authApi";
import isOpen from "../burgerSlice";
export const rootReducers = combineReducers({
  auth: authSlice,
  isOpen: isOpen,
});
export type RootState = ReturnType<typeof rootReducers>;
