import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthData } from '@features/auth/auth.interface';
import { eraseCookie } from '@shared/funcs/cookie';
import { setCookie } from '@shared/funcs/cookie2';
import { rootReducers, RootState } from '@shared/store/store';

const initialState: AuthData = {
  email: null,
  name: null,
  tokens: {
    accessToken: null,
  },
  isAuth: false,
  bonuses: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;

      eraseCookie('accessToken');
    },

    setUser: (state, action: PayloadAction<AuthData>) => {
      console.log(' action.payload', action.payload);
      const { email, name, bonuses } = action.payload;
      const { accessToken } = action.payload.tokens;
      state.email = email;
      state.name = name;
      state.tokens.accessToken = accessToken;

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
      // state.userData = action.payload;
    },
  },
}).injectInto(rootReducers);

export default authSlice.reducer;

export const selectIsAuth = (state: RootState) => state?.auth?.isAuth ?? false;

export const { logout, setUser, setUserData } = authSlice.actions;
