import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Iuser } from 'store/types';

import { eraseCookie } from 'utils/funcs/cookie';
import { setCookie } from 'utils/funcs/cookie2';

interface IuserState {
  user: Iuser | null;
  userData: any | null;
  accessToken: string | null;
  isAuth: boolean;
  bonuses: number;
}

const initialState: IuserState = {
  user: null,
  userData: null,
  accessToken: null,
  isAuth: false,
  bonuses: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.accessToken = null;

      eraseCookie('accessToken');
    },

    setUser: (state, action: PayloadAction<IuserState>) => {
      const { user, accessToken, bonuses } = action.payload;

      state.user = user;
      state.accessToken = accessToken;

      if (!accessToken) {
        state.isAuth = false;
      }

      setCookie({
        name: 'accessToken',
        value: accessToken as string,
        expiresType: 'minutes',
        expiresValue: 15,
      });
      state.isAuth = true;
      state.bonuses = bonuses;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { logout, setUser, setUserData } = authSlice.actions;
