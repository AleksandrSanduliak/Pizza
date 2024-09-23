import React, { Dispatch, SetStateAction } from 'react';

import Modal from 'molecules/modals/Modal/Modal';
import AccImg from 'assets/icons/isAccount.svg';
import { useAppSelector } from 'utils/hooks/redux';
import { stopBubling } from 'utils/funcs/stopBubling';
import RegisterForm from 'molecules/forms/registerForm/RegisterForm';

import cl from './account.module.scss';
import { useLogoutUserMutation } from 'store/api/authApi';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import LoginContent from 'molecules/loginContent/LoginContent';
import useAccount from 'utils/hooks/useAccount';

const Account = () => {
  const [isOpenDropdown, setOpenDropdown] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.reducer.auth.isAuth);
  const { isAccountClick, isRegisterClick, onClickAuth, onClickBurger } =
    useAccount();
  const accountWrapper = React.useRef(null);
  const clickAllowedInner = React.useRef(null);
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();
  const [isMobile] = useMediaQuery();

  const onClickCabinet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (accountWrapper?.current?.contains(e?.target)) {
      setOpenDropdown((prev) => !prev);
      if (clickAllowedInner?.current?.contains(e?.target)) {
        setOpenDropdown(true);
      }
      return;
    }
    setOpenDropdown(false);
  };

  React.useEffect(() => {
    document.addEventListener('click', onClickCabinet);
    return () => document.removeEventListener('click', onClickCabinet);
  }, []);

  const logoutClick = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (url) => {
    navigate(url);
    onClickBurger();
  };

  return (
    <div
      className="account"
      ref={accountWrapper}
      onClick={() => (user ? onClickCabinet() : onClickAuth())}>
      <div className={cl.account__inner}>
        {!isMobile && (
          <img
            className={`icon ${cl.icon}`}
            loading="lazy"
            src={AccImg}
            alt="Иконка Аккаунта"
          />
        )}
        {user ? (
          <>
            <p className={cl.account__text}>Личный кабинет</p>
            <div
              ref={clickAllowedInner}
              className={`${cl.account__cabinet}  ${
                isOpenDropdown ? cl.activeCabinet : ''
              }`}>
              <p
                className={`${cl.account__cabinet_bonus} ${cl.account__cabinet_text} subtitle2`}>
                100 бонусов
              </p>
              <div className={cl.account__cabinet_content}>
                <p
                  onClick={() => handleMenuClick('/orderhistory')}
                  className={`${cl.account__cabinet_text} normal`}>
                  История заказов
                </p>

                <p
                  onClick={() => handleMenuClick('/settings')}
                  className={`${cl.account__cabinet_text} normal`}>
                  Настройки
                </p>
              </div>
              <p
                className={`${cl.account__cabinet_logout} ${cl.account__cabinet_text} normal`}
                onClick={logoutClick}>
                Выход из аккаунта
              </p>
            </div>
          </>
        ) : (
          <>
            <p className={cl.account__text}>Войти в аккаунт</p>
            {!isMobile && isAccountClick && (
              <Modal isOpen={isAccountClick}>
                <div className={cl.modalWrapper}>
                  <div className={cl.modal}>
                    {isRegisterClick ? (
                      <div>
                        <RegisterForm />
                      </div>
                    ) : (
                      <LoginContent />
                    )}
                  </div>
                </div>
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
