import accoutImage from 'assets/icons/isAccount.svg';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterForm from 'molecules/forms/registerForm/RegisterForm';
import Login from 'molecules/Login/Login';
import Modal from 'molecules/modals/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from 'store/api/authApi';
import { itemVariants, parentVariants } from 'utils/animations/dropdownAnim';
import { useAppSelector } from 'utils/hooks/redux';
import useAccount from 'utils/hooks/useAccount';
import useCabinetClick from 'utils/hooks/useCabinetClick';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cl from './account.module.scss';

interface IAccoutList {
  key: string;
  text: string;
  className: string;
  animation?: object;
  onClick?: () => void;
}

const UserCabinet = () => {
  const { isOpenMenu, accountWrapper, clickAllowedInner } = useCabinetClick();
  const actualLocation = useAppSelector(
    (state) => state.reducer.userCity.currentCity,
  );
  const bonuses = useAppSelector((state) => state.reducer.auth.bonuses);

  const { onClickBurger } = useAccount();
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutClick = (): void => {
    logout();
    navigate(actualLocation);
  };

  const handleMenuClick = (url: string): void => {
    navigate(url);
    onClickBurger();
  };

  const accoutList: Array<IAccoutList> = [
    {
      key: 'bonus',
      text: `${bonuses} бонусов`,
      className: cn('subtitle2', cl.bonus),
      animation: itemVariants,
    },
    {
      key: 'orderhistory',
      text: 'История заказов',
      onClick: () => handleMenuClick(`${actualLocation}/orderhistory`),
      className: cn('normal', cl.text),
      animation: itemVariants,
    },
    {
      key: 'settings',
      text: 'Настройки',
      onClick: () => handleMenuClick('/settings'),
      className: cn('normal', cl.text),
      animation: itemVariants,
    },
    {
      key: 'logout',
      text: 'Выход из аккаунта',
      onClick: () => logoutClick(),
      className: cn('normal', cl.logout, cl.text),
      animation: itemVariants,
    },
  ];

  return (
    <div ref={accountWrapper}>
      <p className={cn(cl.header, { [cl.activeHeader]: isOpenMenu })}>
        Личный кабинет
      </p>
      <AnimatePresence mode="wait">
        {isOpenMenu && (
          <motion.ul
            key="userCabinet"
            ref={clickAllowedInner}
            className={cl.cabinet}
            variants={parentVariants}
            initial="initial"
            animate={isOpenMenu ? 'animate' : 'exit'}
            exit="exit">
            {accoutList.map((item: IAccoutList) => {
              return (
                <motion.li
                  key={item.key}
                  className={item.className}
                  variants={itemVariants}
                  onClick={item.onClick}>
                  {item.text}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoginModal = () => {
  const { isAccountClick, isRegisterClick, onClickAuth } = useAccount();
  const isMobile = useMediaQuery();
  return (
    <div onClick={() => onClickAuth()}>
      <p className={cn(cl.header, { [cl.activeHeader]: isAccountClick })}>
        Войти в аккаунт
      </p>
      <Modal isOpen={!isMobile && isAccountClick} setIsOpen={onClickAuth}>
        <div className={cl.modalWrapper}>
          <div className={cl.modal}>
            {isRegisterClick ? <RegisterForm /> : <Login />}
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Account = () => {
  const user = useAppSelector((state) => state.reducer.auth.isAuth);
  const isMobile = useMediaQuery();

  return (
    <div className={cl.account}>
      {!isMobile && (
        <img
          className={cn('icon', cl.icon)}
          loading="lazy"
          src={accoutImage}
          alt="Иконка Аккаунта"
        />
      )}
      {user ? <UserCabinet /> : <LoginModal />}
    </div>
  );
};

export default Account;
