import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  isAccountClick: false,
  isRegisterClick: false,
  isBurgerClick: false,
  isShoppingBagClick: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state) => {
      state.isAccountClick = !state.isAccountClick;
      if (!state.isAccountClick && state.isRegisterClick) {
        state.isRegisterClick = !state.isRegisterClick;
      }
    },
    setRegister: (state) => {
      state.isRegisterClick = !state.isRegisterClick;
    },
    setBurger: (state) => {
      state.isBurgerClick = !state.isBurgerClick;
    },
    setShoppingBag: (state) => {
      state.isShoppingBagClick = !state.isShoppingBagClick;
    },
    setAuthMobile: (state) => {
      state.isAccountClick = true;
      state.isShoppingBagClick = false;
      state.isBurgerClick = true;
    },
    setAuthDesktop: (state) => {
      state.isAccountClick = true;
      state.isShoppingBagClick = false;
    },
  },
});
export default accountSlice.reducer;
export const {
  setAccount,
  setRegister,
  setBurger,
  setAuthDesktop,
  setAuthMobile,
  setShoppingBag,
} = accountSlice.actions;
