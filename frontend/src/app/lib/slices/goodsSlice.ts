import { createSlice } from '@reduxjs/toolkit';

import { TGoodsData } from 'utils/types/types';

interface initialState {
  goods: TGoodsData;
}

const initialState: initialState = {
  goods: [],
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setGoods(state, action) {
      state.goods = action.payload;
    },
  },
});

export const { setGoods } = goodsSlice.actions;
export default goodsSlice.reducer;
