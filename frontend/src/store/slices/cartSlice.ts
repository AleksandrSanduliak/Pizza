import { pizzaItem } from "utils/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  totalPrice: null | number;
  items: pizzaItem[];
};

const initialState: initialState = { totalPrice: 0, items: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log(action.payload);
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((acc: number, value: pizzaItem) => {
        return value.price + acc;
      }, 0);
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
