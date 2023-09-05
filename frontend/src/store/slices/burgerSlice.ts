import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isOpen } from "store/types";

const initialState: isOpen = { isOpen: false };

const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    setOpenBurger: (state) => {
      state.isOpen = true;
    },
    setCloseBurger: (state) => {
      state.isOpen = false;
    },
  },
});
export default isOpenSlice.reducer;
export const { setOpenBurger, setCloseBurger } = isOpenSlice.actions;
