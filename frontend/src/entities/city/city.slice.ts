import { createSlice } from '@reduxjs/toolkit';

import { City } from '@entities/city/city';
import { rootReducers } from '@shared/store/store';

const initialState: City | object = {
  // categories: [],
  // city: null,
  // id: null,
  // isActive: false,
  // name: null,
  // restaurants: [],
  // url: null,
};

const citySlice = createSlice({
  name: 'cityInfo',
  initialState,
  reducers: {
    setCityInfo: (state, action) => {
      state = action.payload;
    },
  },
}).injectInto(rootReducers);

export default citySlice.reducer;

export const { setCityInfo } = citySlice;
