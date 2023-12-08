import { createSlice } from "@reduxjs/toolkit";

const initialState = { isVisible: false };

const isVisibleCategory = createSlice({
  name: "isVisibleCategory",
  initialState,
  reducers: {
    visibleStatus: (state, action) => {
      //   console.log(action.payload, "action");
      state.isVisible = action.payload;
    },
  },
});
export default isVisibleCategory.reducer;
export const { visibleStatus } = isVisibleCategory.actions;
