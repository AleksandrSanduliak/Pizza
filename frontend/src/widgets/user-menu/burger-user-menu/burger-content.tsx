'use client';

import { JSX } from 'react';

import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import Login from '@features/auth/login/login';
import RegisterForm from '@features/auth/register/register';
import useOverflowBody from '@shared/hooks/ui/useOverflowBody';
import { useAppSelector } from '@shared/store/hooks';
import Account from '@widgets/user-menu/user-menu/user-menu-inner';

import BurgerNav from './burger-nav';
import cl from './burger.module.scss';

const BurgerAccount = () => {
  return (
    <div className={cl.burgerAccount}>
      <div className="burgerAccount__container">
        <Account />
      </div>
    </div>
  );
};

const BurgerNavigation = () => {
  return <BurgerNav />;
};

const BurgerRegistration = () => {
  return (
    <div className={cl.burgerAuth}>
      <RegisterForm />
    </div>
  );
};

const BurgerLogin = () => {
  return (
    <div className={cl.burgerAuth}>
      <Login />
    </div>
  );
};

type TBurgerStrategyReturnType = JSX.Element | null;
export type TBurgerStrategy = {
  account: () => TBurgerStrategyReturnType;
  navigation: () => TBurgerStrategyReturnType;
  register: () => TBurgerStrategyReturnType;
  login: () => TBurgerStrategyReturnType;
};

const createBurgerStrategy = (
  isAccountClick: boolean,
  isRegisterClick: boolean,
  isShoppingBagClick: boolean,
) => {
  const burgerStrategies: TBurgerStrategy = {
    account: () =>
      !isAccountClick && !isShoppingBagClick ? <BurgerAccount key="burgerAccount" /> : null,
    navigation: () =>
      !isAccountClick && !isRegisterClick ? <BurgerNavigation key="burgerNavigation" /> : null,
    register: () =>
      isAccountClick && isRegisterClick ? <BurgerRegistration key="burgerRegistration" /> : null,
    login: () => (isAccountClick && !isRegisterClick ? <BurgerLogin key="burgerLogin" /> : null),
  };

  return Object.values(burgerStrategies).map((strategy) => strategy());
};

const BurgetContent = () => {
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  const isLoginClicked = useAppSelector((state) => userMenuSlice.selectors.isLoginClicked(state));
  const isRegisterClicked = useAppSelector((state) =>
    userMenuSlice.selectors.isRegisterClicked(state),
  );
  const isBasketClicked = useAppSelector((state) => userMenuSlice.selectors.isBasketClicked(state));
  useOverflowBody(isBurgerClicked);
  const burgerStrategies = createBurgerStrategy(isLoginClicked, isRegisterClicked, isBasketClicked);

  return <div className={cl.burgerWrapper}>{burgerStrategies}</div>;
};

export default BurgetContent;
