import { createSlice } from '@reduxjs/toolkit';

import { rootReducers } from '@shared/store/store';

// import { setAuthMobile } from '../../../entities/user-menu/user-menu.slice';

type TInitialState = {
  isVisible: boolean;
};

const initialState: TInitialState = { isVisible: false };

const headerNavigationSlice = createSlice({
  name: 'headerNavigation',
  initialState,
  reducers: {
    visibleStatus: (state, action) => {
      state.isVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(setAuthMobile, (state) => {
    //   // console.log('state extra', current(state));
    //   state.isVisible = true;
    // });
  },
}).injectInto(rootReducers);

export default headerNavigationSlice.reducer;
export const { visibleStatus } = headerNavigationSlice.actions;
