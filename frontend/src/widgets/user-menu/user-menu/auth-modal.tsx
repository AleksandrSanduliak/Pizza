'use client';
import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import { Login } from '@features/auth/login';
import RegisterForm from '@features/auth/register/register';
import { useAppSelector } from '@shared/store/hooks';
import { Button } from '@shared/ui/button/button';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@shared/ui/dialog';

import styles from './auth-modal.module.scss';

export const AuthModal = () => {
  const isRegisterClicked = useAppSelector((state) =>
    userMenuSlice.selectors.isRegisterClicked(state),
  );
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
        {isRegisterClicked ? <RegisterForm /> : <Login />}
      </DialogContent>
    </Dialog>
  );
};
