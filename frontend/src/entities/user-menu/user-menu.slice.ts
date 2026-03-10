import { createSlice } from '@reduxjs/toolkit';

import { rootReducers } from '@shared/store/store';

interface UserMenuState {
  isLoginClicked: boolean;
  isRegisterClicked: boolean;
  isBurgerClicked: boolean;
  isBasketClicked: boolean;
}

const initialState: UserMenuState = {
  isLoginClicked: false,
  isRegisterClicked: false,
  isBurgerClicked: false,
  isBasketClicked: false,
};

export const userMenuSlice = createSlice({
  name: 'userMenu',
  initialState,
  selectors: {
    isLoginClicked: (state) => state.isLoginClicked,
    isRegisterClicked: (state) => state.isRegisterClicked,
    isBurgerClicked: (state) => state.isBurgerClicked,
    isBasketClicked: (state) => state.isBasketClicked,
  },
  reducers: {
    toggleLoginMenu: (state) => {
      if (!state.isLoginClicked && state.isRegisterClicked) {
        // desktop: при закрытии модалки авторизации сбрасываем флаг регистрации
        state.isRegisterClicked = !state.isRegisterClicked;
      }
      state.isLoginClicked = !state.isLoginClicked;
    },
    toggleRegisterMenu: (state) => {
      state.isRegisterClicked = !state.isRegisterClicked;
    },
    toggleBurgerMenu: (state) => {
      console.log(' state.isBurgerClicked ', state.isBurgerClicked);
      state.isBurgerClicked = !state.isBurgerClicked;
    },
    toggleBasket: (state) => {
      state.isBasketClicked = !state.isBasketClicked;
    },
  },
}).injectInto(rootReducers);

export default userMenuSlice.reducer;
export const { toggleLoginMenu, toggleRegisterMenu, toggleBasket, toggleBurgerMenu } =
  userMenuSlice.actions;
