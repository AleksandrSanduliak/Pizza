'use client';
import cn from 'classnames';

import LoginForm from 'molecules/forms/LoginForm/LoginForm';
import useAccount from 'utils/hooks/ui/useAccount';

import cl from './Login.module.scss';

const Login = () => {
  const { onClickRegister } = useAccount();

  return (
    <div className={cl.wrapper}>
      <div className={cl.inner}>
        <p className={cn('h1', cl.title)}>Вход в аккаунт</p>
        <p className={cn('normal', cl.subtitle)}>
          Сможете быстро оформлять заказы,
          <br /> использовать накопленные бонусы, промокоды, скидки и уникальные акции
        </p>
        <p className={cn('normal', cl.registrationWrapper)} onClick={() => onClickRegister()}>
          Отсутствует аккаунт?&nbsp;<span className={cl.registration}>Зарегистрируйтесь</span>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
