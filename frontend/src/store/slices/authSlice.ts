import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Iuser } from "store/types";
import { IGenericResponse } from "store/api/authApi";
interface IuserState {
  user: Iuser | null;
  userData: any | null;
  accesToken: string | null;
  isAuth: boolean;
}
const initialState: IuserState = {
  user: null,
  userData: null,
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
      // state.userData = null;
    },
    setUser: (state, action: PayloadAction<IuserState | IGenericResponse>) => {
      console.log("setUser", action.payload);
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
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { logout, setUser, setUserData } = authSlice.actions;
