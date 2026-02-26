'use client';
import cn from 'classnames';

import useUserMenu from '@entities/user-menu/useUserMenu';
import LoginForm from '@features/auth/login/login-form';

import styles from './login.module.scss';

const Login = () => {
  const { actions } = useUserMenu();
  console.log('actions', actions);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={cn('h1', styles.title)}>Вход в аккаунт</p>
        <p className={cn('normal', styles.subtitle)}>
          Сможете быстро оформлять заказы, использовать накопленные бонусы, промокоды, скидки и
          уникальные акции
        </p>
        <p className={cn('normal', styles.register)}>
          Отсутствует аккаунт?&nbsp;
          <span onClick={() => actions.toggleRegister()} className={styles.registration}>
            Зарегистрируйтесь
          </span>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
