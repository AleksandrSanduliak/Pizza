import { combineReducers } from '@reduxjs/toolkit';

import authSlice from 'store/slices/authSlice';

import accountSlice from './slices/accountSlice';
import cartSlice from './slices/cartSlice';
import visibleStatus from './slices/categoriesSlice';
import goodsSlice from './slices/goodsSlice';

export const rootReducers = combineReducers({
  auth: authSlice,
  goods: goodsSlice,
  isVisible: visibleStatus,
  cartShopSlice: cartSlice,
  account: accountSlice,
});

export type RootState = ReturnType<typeof rootReducers>;
