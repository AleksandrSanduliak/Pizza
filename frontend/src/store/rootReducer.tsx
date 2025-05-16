import { combineReducers } from '@reduxjs/toolkit';

import authSlice from 'store/slices/authSlice';

import accountSlice from './slices/accountSlice';
import cartSlice from './slices/cartSlice';
import visibleStatus from './slices/categoriesSlice';
import userCity from './slices/citySlice';
import goodsSlice from './slices/goodsSlice';

export const rootReducers = combineReducers({
  auth: authSlice,
  goods: goodsSlice,
  isVisible: visibleStatus,
  cartShopSlice: cartSlice,
  account: accountSlice,
  userCity: userCity,
});

export type RootState = ReturnType<typeof rootReducers>;
