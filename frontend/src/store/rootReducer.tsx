import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/slices/authSlice";
import visibleStatus from "./slices/categoriesSlice";
import cartSlice from "./slices/cartSlice";
import accountSlice from "./slices/accountSlice";

export const rootReducers = combineReducers({
  auth: authSlice,
  isVisible: visibleStatus,
  cartShopSlice: cartSlice,
  account: accountSlice,
});

export type RootState = ReturnType<typeof rootReducers>;
