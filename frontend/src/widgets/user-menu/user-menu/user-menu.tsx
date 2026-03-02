'use client';
import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useUserMenu from '@entities/user-menu/useUserMenu';
import { useLogoutUser } from '@features/auth/authApi';
import { selectIsAuth } from '@features/auth/authSlice';
import Login from '@features/auth/login/login';
import RegisterForm from '@features/auth/register/register';
import { itemVariants, parentVariants } from '@shared/animations/dropdownAnim';
import { useAppSelector } from '@shared/store/hooks';
import { Button } from '@shared/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import useCabinetClick from '@widgets/user-menu/useCabinetClick';
import accoutImage from 'public/icons/isAccount.svg';

import styles from './user-menu.module.scss';

interface IAccoutList {
  key: string;
  text: string;
  className: string;
  animation?: object;
  onClick?: () => void;
}

const AccountButtonsList = ({ isOpenMenu }: { isOpenMenu: boolean }) => {
  const { mutate: logout } = useLogoutUser();
  const { actions } = useUserMenu();
  const bonuses = useAppSelector((state) => state.auth.bonuses);
  console.log('bonuses', bonuses);

  const router = useRouter();

  const logoutClick = (): void => {
    logout();
    router.push('/moscow');
  };

  const handleMenuClick = (url: string): void => {
    router.push(url);
    actions.toggleBurger();
  };

  const accoutList: Array<IAccoutList> = [
    {
      key: 'bonus',
      text: `${bonuses} бонусов`,
      className: cn('subtitle2', styles.bonus),
      animation: itemVariants,
    },
    {
      key: 'orderhistory',
      text: 'История заказов',
      onClick: () => handleMenuClick(ROUTES.ORDERHISTORY),
      className: cn('normal', styles.text),
      animation: itemVariants,
    },
    {
      key: 'settings',
      text: 'Настройки',
      onClick: () => handleMenuClick(ROUTES.SETTINGS),
      className: cn('normal', styles.text),
      animation: itemVariants,
    },
    {
      key: 'logout',
      text: 'Выход из аккаунта',
      onClick: () => logoutClick(),
      className: cn('normal', styles.logout, styles.text),
      animation: itemVariants,
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpenMenu && (
        <motion.ul
          key="userCabinet"
          className={styles.cabinet}
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
  );
};

const UserCabinet = () => {
  const { isOpenMenu, accountWrapper, setIsOpenMenu } = useCabinetClick();
  const onClick = () => setIsOpenMenu((prev) => !prev);

  return (
    <div ref={accountWrapper}>
      <Button onClick={onClick} variant="default">
        Личный кабинет
      </Button>
      <AccountButtonsList isOpenMenu={isOpenMenu} />
    </div>
  );
};

const AuthModal = () => {
  const { state } = useUserMenu();
  console.log('state', state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Войти в аккаунт</Button>
      </DialogTrigger>
      <DialogContent className={styles.modal}>
        <DialogHeader className="sr-only">
          <DialogTitle>Авторизация пользователя</DialogTitle>
          <DialogDescription>
            Авторизируйтесь или зарегистрируйте новую учетную запись
          </DialogDescription>
        </DialogHeader>
        {state.isRegisterClicked ? <RegisterForm /> : <Login />}
      </DialogContent>
    </Dialog>
  );
};

const UserMenu = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <div className={styles.userMenu}>
      <Image
        className={cn('icon', styles.icon)}
        loading="lazy"
        src={accoutImage}
        alt="Иконка Аккаунта"
      />
      {isAuth ? <UserCabinet /> : <AuthModal />}
    </div>
  );
};

export default UserMenu;
