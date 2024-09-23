import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = { currentCity: '' };

const userCity = createSlice({
  name: 'userCity',
  initialState,
  reducers: {
    getUserCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export default userCity.reducer;
export const { getUserCity } = userCity.actions;
