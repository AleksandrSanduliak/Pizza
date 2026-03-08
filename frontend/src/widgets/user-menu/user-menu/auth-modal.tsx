'use client';
import useUserMenu from '@entities/user-menu/useUserMenu';
import { Login } from '@features/auth/login';
import RegisterForm from '@features/auth/register/register';
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
  const { state } = useUserMenu();
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
