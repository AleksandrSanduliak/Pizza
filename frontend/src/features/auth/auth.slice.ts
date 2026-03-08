import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type UserData } from '@entities/user/user.schema';
import { eraseCookie } from '@shared/funcs/cookie';
import { setCookie } from '@shared/funcs/cookie2';
import { rootReducers, RootState } from '@shared/store/store';

export interface AuthState {
  email: string | null;
  name: string | null;
  bonuses: number;
  tokens: {
    accessToken: string | null;
  };
  isAuth: boolean;
}

const initialState: AuthState = {
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
      // state.isAuth = false;
      console.log('state', state);
      eraseCookie('accessToken'); // todo убрать должна быть чистая функция
      return initialState;
    },

    setUser: (state, action: PayloadAction<UserData>) => {
      console.log(' action.payload', action.payload);
      if (!action.payload?.tokens?.accessToken) {
        state.isAuth = false;
        return;
      }
      const { email, name, bonuses } = action.payload;
      const { accessToken } = action.payload.tokens;
      state.email = email;
      state.name = name;
      state.tokens.accessToken = accessToken;
      console.log('action pay', action.payload);
      setCookie({
        name: 'accessToken',
        value: accessToken as string,
        expiresType: 'minutes',
        expiresValue: 15,
      }); // todo убрать должна быть чистая функция
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
