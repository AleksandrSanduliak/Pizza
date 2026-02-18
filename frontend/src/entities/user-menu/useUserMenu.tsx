'use client';

import {
  toggleLoginMenu,
  toggleRegisterMenu,
  toggleBurgerMenu,
  toggleBasket,
} from '@entities/user-menu/user-menu.slice';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { RootState } from '@shared/store/store';

export type TIsAccountClick = boolean;
export type TIsRegisterClick = boolean;
export type TIsShoppingBagClick = boolean;

const useUserMenu = () => {
  const dispatch = useAppDispatch();

  return {
    actions: {
      toggleLogin: () => dispatch(toggleLoginMenu()),
      toggleRegister: () => dispatch(toggleRegisterMenu()),
      toggleBurger: () => dispatch(toggleBurgerMenu()),
      toggleBasket: () => dispatch(toggleBasket()),
      // setAuthMobile: () => dispatch(setAuthMobile()),
      // setAuthDesktop: () => dispatch(setAuthDesktop()),
    },
    state: {
      isLoginClicked: useAppSelector((state) => state.userMenu.isLoginClicked),
      isRegisterClicked: useAppSelector((state) => state.userMenu.isRegisterClicked),
      isBurgerClicked: useAppSelector((state) => state.userMenu.isBurgerClicked),
      isBasketClicked: useAppSelector((state) => state.userMenu.isBasketClicked),
    },
  };
};

export default useUserMenu;
