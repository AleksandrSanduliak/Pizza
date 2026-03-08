'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { JSX } from 'react';

import useUserMenu from '@entities/user-menu/useUserMenu';
import { useLogoutUser } from '@features/auth/authApi';
import { itemVariants, parentVariants } from '@shared/animations/dropdownAnim';
import { ROUTES } from '@shared/consts/routes';
import { useAppSelector } from '@shared/store/hooks';
import { Button } from '@shared/ui/button/button';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { cn } from '@shared/utils/shadcn-utils';

import styles from './user-cabinet.module.scss';

interface AccoutList {
  key: string;
  text: string | JSX.Element;
  className: string;
  animation?: object;
  onClick?: () => void;
}

const AccountButtonsList = ({ isOpenMenu }: { isOpenMenu: boolean }) => {
  const { mutate: logout, isPending } = useLogoutUser();
  const { actions } = useUserMenu();
  const bonuses = useAppSelector((state) => state.auth.bonuses);

  const { city } = useParams();
  console.log('location', location);

  const router = useRouter();

  const logoutClick = (): void => {
    logout();
    router.push('/');
  };

  const handleMenuClick = (url: string): void => {
    console.log('url', url);
    router.push(url);
    actions.toggleBurger();
  };

  const accoutList: Array<AccoutList> = [
    {
      key: 'bonus',
      text: `${bonuses} бонусов`,
      className: cn('subtitle2', styles.bonus),
      animation: itemVariants,
    },
    {
      key: 'orderhistory',
      text: 'История заказов',
      onClick: () => handleMenuClick(`/${city}/${ROUTES.ORDERHISTORY}`),
      className: cn('normal', styles.text),
      animation: itemVariants,
    },
    {
      key: 'settings',
      text: 'Настройки',
      onClick: () => handleMenuClick(`/${city}/${ROUTES.SETTINGS}`),
      className: cn('normal', styles.text),
      animation: itemVariants,
    },
    {
      key: 'logout',
      text: (
        <div className="flex items-center gap-3">
          Выход из аккаунта {isPending && <Loader className="animate-spin" />}
        </div>
      ),
      onClick: () => logoutClick(),
      className: cn('normal', styles.logout, styles.text),
      animation: itemVariants,
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key="userCabinet"
        className={styles.cabinet}
        variants={parentVariants}
        initial="initial"
        animate={isOpenMenu ? 'animate' : 'exit'}
        exit="exit">
        {accoutList.map((item: AccoutList) => {
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
    </AnimatePresence>
  );
};

export const UserCabinet = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Личный кабинет</Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <AccountButtonsList isOpenMenu={true} />
      </PopoverContent>
    </Popover>
  );
};
