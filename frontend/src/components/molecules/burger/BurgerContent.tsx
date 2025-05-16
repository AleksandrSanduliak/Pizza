import RegisterForm from 'molecules/forms/RegisterForm/RegisterForm';
import Login from 'molecules/Login/Login';
import Account from 'organisms/Account/Account';
import useAccount from 'utils/hooks/ui/useAccount';
import useOverflowBody from 'utils/hooks/ui/useOverflowBody';
import {
  TIsAccountClick,
  TIsRegisterClick,
  TIsShoppingBagClick,
} from 'utils/types/useAccountTypes';
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
  const { isAccountClick, isRegisterClick, isBurgerClick, isShoppingBagClick } = useAccount();
  useOverflowBody(isBurgerClick);
  const burgerStrategies = createBurgerStrategy(
    isAccountClick,
    isRegisterClick,
    isShoppingBagClick,
  );

  return <div className={cl.burgerWrapper}>{burgerStrategies}</div>;
};

export default BurgetContent;
