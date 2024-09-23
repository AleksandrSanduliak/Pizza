import { combineReducers } from '@reduxjs/toolkit';
import authSlice from 'store/slices/authSlice';
import visibleStatus from './slices/categoriesSlice';
import cartSlice from './slices/cartSlice';
import accountSlice from './slices/accountSlice';
import userCity from './slices/citySlice';

export const rootReducers = combineReducers({
  auth: authSlice,
  isVisible: visibleStatus,
  cartShopSlice: cartSlice,
  account: accountSlice,
  userCity: userCity,
});

export type RootState = ReturnType<typeof rootReducers>;
