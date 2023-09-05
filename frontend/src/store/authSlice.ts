import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Iuser } from "./types";
import { IGenericResponse } from "./authApi";
interface IuserState {
  user: Iuser | null;
  accesToken: string | null;
  isAuth: boolean;
}
const initialState: IuserState = {
  user: null,
  accesToken: null,
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.accesToken = null;
    },
    setUser: (state, action: PayloadAction<IuserState | IGenericResponse>) => {
      console.log(action.payload, "payload");
      const { user, accesToken } = action.payload;
      state.user = user;
      state.accesToken = accesToken;
      if (accesToken) {
        document.cookie = `accesToken=${accesToken}`;
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});
export default authSlice.reducer;
export const { logout, setUser } = authSlice.actions;
