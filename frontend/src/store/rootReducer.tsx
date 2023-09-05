import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/slices/authSlice";
// import { authApi } from "../authApi";
import isOpen from "store/slices/burgerSlice";
export const rootReducers = combineReducers({
  auth: authSlice,
  isOpen: isOpen,
});
export type RootState = ReturnType<typeof rootReducers>;
