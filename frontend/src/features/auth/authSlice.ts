import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';

import { LoginUserResponseData } from '@features/auth/model/api.interface';
import { eraseCookie } from '@shared/funcs/cookie';
import { setCookie } from '@shared/funcs/cookie2';
import { rootReducers } from '@shared/store/store';

interface AuthSlice {
  email: string | null;
  name: string | null;
  bonuses: number;
  tokens: {
    accessToken: string | null;
  };
  isAuth: boolean;
}

const initialState: AuthSlice = {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;

      eraseCookie('accessToken');
    },

    setUser: (state, action: PayloadAction<LoginUserResponseData>) => {
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

export const selectIsAuth = (state: AuthSlice) => state?.auth?.isAuth ?? false;

export const { logout, setUser, setUserData } = authSlice.actions;
