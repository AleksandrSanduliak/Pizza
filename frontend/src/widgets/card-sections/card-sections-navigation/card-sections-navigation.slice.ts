import { createSlice } from '@reduxjs/toolkit';

import { toggleBurgerMenu } from '@entities/user-menu/user-menu.slice';
import { rootReducers } from '@shared/store/store';

type HeaderNavigation = {
  isVisible: boolean;
};

const initialState: HeaderNavigation = { isVisible: false };

export const headerNavigationSlice = createSlice({
  name: 'headerNavigation',
  initialState,
  selectors: {
    isVisibleHeaderNav: (store) => store.isVisible,
  },
  reducers: {
    visibleStatus: (state, action) => {
      state.isVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleBurgerMenu, (state, action) => {
      console.log('state, action', state, action);
      state.isVisible = false;
    });
  },
}).injectInto(rootReducers);

export default headerNavigationSlice.reducer;
export const { visibleStatus } = headerNavigationSlice.actions;
