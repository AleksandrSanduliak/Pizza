import { createSlice } from '@reduxjs/toolkit';

import { rootReducers } from '@shared/store/store';

const initialState = {
  isLoginClicked: false,
  isRegisterClicked: false,
  isBurgerClicked: false,
  isBasketClicked: false,
};

const userMenuSlice = createSlice({
  name: 'userMenu',
  initialState,
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
      state.isBurgerClicked = !state.isBurgerClicked;
    },
    toggleBasket: (state) => {
      state.isBasketClicked = !state.isBasketClicked;
    },
    // setAuthMobileClick: (state) => {
    //   state.isAccountClick = true;
    //   state.isShoppingBagClick = false;
    //   state.isBurgerClick = true;
    // },
    // setAuthDesktopClick: (state) => {
    //   state.isAccountClick = true;
    //   state.isShoppingBagClick = false;
    // },
  },
}).injectInto(rootReducers);

export default userMenuSlice.reducer;
export const { toggleLoginMenu, toggleRegisterMenu, toggleBasket, toggleBurgerMenu } =
  userMenuSlice.actions;
