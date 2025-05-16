import React from 'react';

import {
  setAccount,
  setAuthDesktop,
  setAuthMobile,
  setBurger,
  setRegister,
  setShoppingBag,
} from 'store/slices/accountSlice';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';

const useAccount = () => {
  const dispatch = useAppDispatch();

  const isAccountClick = useAppSelector((state) => state.reducer.account.isAccountClick);
  const isRegisterClick = useAppSelector((state) => state.reducer.account.isRegisterClick);
  const isBurgerClick = useAppSelector((state) => state.reducer.account.isBurgerClick);
  const isShoppingBagClick = useAppSelector((state) => state.reducer.account.isShoppingBagClick);

  const onClickAuth = React.useCallback(() => {
    dispatch(setAccount());
  }, [dispatch]);

  const onClickRegister = React.useCallback(() => {
    dispatch(setRegister());
  }, [dispatch]);

  const onClickBurger = React.useCallback(() => {
    dispatch(setBurger());
  }, [dispatch]);

  const onClickShoppingBag = React.useCallback(() => {
    dispatch(setShoppingBag());
  }, [dispatch]);

  // const setAuthForDesktop = React.useCallback(() => {
  //   dispatch(setAuthDesktop());
  // }, [dispatch]);

  // const setAuthForMobile = React.useCallback(() => {
  //   dispatch(setAuthMobile());
  // }, [dispatch]);
  // const originalStyle = window.getComputedStyle(document.body).overflow;
  // const setOriginalOverflow = () => (document.body.style.overflow = originalStyle);
  // React.useEffect(() => {
  //   if (!isMobile && isBurgerClick) {
  //     document.body.style.overflow = originalStyle;
  //     // useOverflowBody(isBurgerClick);

  //     // if (lock) {
  //     //   document.body.style.overflow = 'hidden';
  //     // }
  //   }

  //   // if ()
  //   document.body.style.overflow = originalStyle;
  // }, [isAccountClick, isBurgerClick, isMobile, onClickAuth, onClickBurger]);

  return {
    isAccountClick: isAccountClick,
    isRegisterClick: isRegisterClick,
    isBurgerClick: isBurgerClick,
    isShoppingBagClick: isShoppingBagClick,
    onClickRegister: onClickRegister,
    onClickAuth: onClickAuth,
    onClickBurger: onClickBurger,
    onClickShoppingBag: onClickShoppingBag,
    // setAuthForDesktop: setAuthForDesktop,
    // setAuthForMobile: setAuthForMobile,
  };
};

export default useAccount;
