import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/slices/authSlice";
// import { authApi } from "../authApi";
import isOpen from "store/slices/burgerSlice";
import visibleStatus from "./slices/categoriesSlice";
import cartSlice from "./slices/cartSlice";
export const rootReducers = combineReducers({
  auth: authSlice,
  isOpen: isOpen,
  isVisible: visibleStatus,
  cartShopSlice: cartSlice,
});
export type RootState = ReturnType<typeof rootReducers>;
