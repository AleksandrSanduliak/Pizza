import cn from 'classnames';
import RegisterForm from 'molecules/forms/registerForm/RegisterForm';
import Login from 'molecules/Login/Login';
import Account from 'organisms/account/Account';
import { memo } from 'react';
import useAccount from 'utils/hooks/useAccount';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useOverflowBody from 'utils/hooks/useOverflowBody';
import cl from './burger.module.scss';
import BurgerNav from './BurgerNav';

const BurgetContent = memo(() => {
  const { isAccountClick, isRegisterClick, isBurgerClick, isShoppingBagClick } =
    useAccount();
  const isMobile = useMediaQuery();
  useOverflowBody(isBurgerClick);

  console.log('isMobile', isMobile);
  return (
    <div className={cn(cl.burgerInner)}>
      {isMobile && !isAccountClick && !isShoppingBagClick && (
        <div className={cl.burgerAccount}>
          <Account />
        </div>
      )}
      <div className={cl.burgerContent}>
        {isAccountClick && isMobile && isRegisterClick && (
          <div className={cl.modalContainer}>
            <RegisterForm />
          </div>
        )}
        {isAccountClick && isMobile && !isRegisterClick && (
          <div className={cl.modalContainer}>
            <Login />
          </div>
        )}
        {!isAccountClick && isMobile && !isRegisterClick && <BurgerNav />}
      </div>
    </div>
  );
});

export default BurgetContent;
