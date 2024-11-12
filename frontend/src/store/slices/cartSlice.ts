import { createSlice, current } from '@reduxjs/toolkit';
import { pizzaItem } from 'utils/types/types';

type initialState = {
  totalPrice: number;
  items: pizzaItem[];
  totalCount: number;
  discountPrice: number;
  isPromoCodeActive: boolean;
  orderId: number | null;
};

const initialState: initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
  discountPrice: 0,
  isPromoCodeActive: false,
  orderId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: { payload: pizzaItem }) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (findItem) {
        const { price } = findItem;
        findItem.count++;
        findItem.totalPrice += price;
        state.totalPrice += price;
        state.totalCount++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price,
        });
        state.totalCount++;
        state.totalPrice += action.payload.price;
      }
    },
    increment(state, action) {
      const index = state.items.findIndex((i) => i?.id === action.payload);
      state.items[index].count! += 1;
      state.items[index].totalPrice =
        state.items[index].price * state.items[index].count!;
      state.totalCount += 1;
      state.totalPrice += state.items[index].price;
    },
    decrement(state, action) {
      const index = state.items.findIndex((i) => i?.id === action.payload);
      state.items[index].count -= 1;
      state.items[index].totalPrice =
        state.items[index].price * state.items[index].count;
      state.totalCount -= 1;
      state.totalPrice -= state.items[index].price;
      if (state.items[index].count === 0) {
        state.items.splice(index, 1);
      }
    },
    removeItem(state, action) {
      const index = state.items.findIndex((i) => i?.id === action.payload);
      const { totalPrice, count } = state.items[index];
      state.totalPrice -= totalPrice;
      state.totalCount -= count;
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setDiscountPrice(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.discountPrice = action.payload.discountPrice;
      state.isPromoCodeActive = action.payload.isPromoCodeActive;
      // console.log('current', current(state));
    },
    setItems(state, action) {
      state.items = action.payload.card;
      state.totalPrice = action.payload.cardInfo.totalPrice;
      state.totalCount = action.payload.cardInfo.totalCount;
    },
    setOrderId(state, action) {
      // console.log('current', current(state));
      state.orderId = action.payload.orderId;
    },
  },
});

export const {
  addItem,
  increment,
  decrement,
  removeItem,
  setDiscountPrice,
  setItems,
  setOrderId,
} = cartSlice.actions;
export default cartSlice.reducer;
