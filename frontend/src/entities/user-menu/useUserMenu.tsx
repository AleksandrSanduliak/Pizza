'use client';

import {
  toggleLoginMenu,
  toggleRegisterMenu,
  toggleBurgerMenu,
  toggleBasket,
} from '@entities/user-menu/user-menu.slice';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import userMenu from '@widgets/user-menu/user-menu/user-menu';

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
      isLoginClicked: useAppSelector((state) => state?.userMenu?.isLoginClicked) ?? false,
      isRegisterClicked: useAppSelector((state) => state?.userMenu?.isRegisterClicked) ?? false,
      isBurgerClicked: useAppSelector((state) => state?.userMenu?.isBurgerClicked) ?? false,
      isBasketClicked: useAppSelector((state) => state?.userMenu?.isBasketClicked) ?? false,
    },
  };
};

export default useUserMenu;
