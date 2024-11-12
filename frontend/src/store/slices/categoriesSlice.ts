import { createSlice, current } from '@reduxjs/toolkit';
import { setAuthMobile } from './accountSlice';

const initialState = { isVisible: false };

const isVisibleCategory = createSlice({
  name: 'isVisibleCategory',
  initialState,
  reducers: {
    visibleStatus: (state, action) => {
      state.isVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAuthMobile, (state, action) => {
      console.log('state extra', current(state));
      state.isVisible = true;
    });
  },
});
export default isVisibleCategory.reducer;
export const { visibleStatus } = isVisibleCategory.actions;
