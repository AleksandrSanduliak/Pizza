'use client';

import { JSX } from 'react';

import Login from '@features/auth/login/login';
import RegisterForm from '@features/auth/register/register';
import useOverflowBody from '@shared/hooks/ui/useOverflowBody';
import {
  TIsAccountClick,
  TIsRegisterClick,
  TIsShoppingBagClick,
} from '@shared/types/useAccountTypes';
import Account from '@widgets/user-menu/user-menu/user-menu';
import useUserMenu from '@entities/user-menu/useUserMenu';

import cl from './burger.module.scss';
import BurgerNav from './BurgerNav';

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

export type TBurgerStrategyArgs = {
  isAccountClick: TIsAccountClick;
  isRegisterClick: TIsRegisterClick;
  isShoppingBagClick: TIsShoppingBagClick;
};

type TBurgerStrategyReturnType = JSX.Element | null;
export type TBurgerStrategy = {
  account: () => TBurgerStrategyReturnType;
  navigation: () => TBurgerStrategyReturnType;
  register: () => TBurgerStrategyReturnType;
  login: () => TBurgerStrategyReturnType;
};

const createBurgerStrategy = (
  isAccountClick: TIsAccountClick,
  isRegisterClick: TIsRegisterClick,
  isShoppingBagClick: TIsShoppingBagClick,
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
  const { isAccountClick, isRegisterClick, isBurgerClick, isShoppingBagClick } = useUserMenu();
  useOverflowBody(isBurgerClick);
  const burgerStrategies = createBurgerStrategy(
    isAccountClick,
    isRegisterClick,
    isShoppingBagClick,
  );

  return <div className={cl.burgerWrapper}>{burgerStrategies}</div>;
};

export default BurgetContent;
