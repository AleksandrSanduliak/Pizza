import { createSlice } from '@reduxjs/toolkit';

import { City } from '@entities/city/model/city.schema';
import { rootReducers } from '@shared/store/store';

const initialState: City | object = {
  categories: [],
  city: null,
  id: null,
  isActive: false,
  name: null,
  restaurants: [],
  url: null,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCityInfo: (state, action) => {
      console.log('action', action);
      state.city = action.payload.city;
      state.name = action.payload.name;
    },
  },
}).injectInto(rootReducers);

export default citySlice.reducer;

export const { setCityInfo } = citySlice.actions;
