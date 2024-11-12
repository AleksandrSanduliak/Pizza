import cn from 'classnames';
import LoginForm from 'molecules/forms/loginForm/LoginForm';
import useAccount from 'utils/hooks/useAccount';
import cl from './login.module.scss';

const Login = () => {
  const { onClickRegister } = useAccount();

  return (
    <div className={cl.wrapper}>
      <div className={cl.pre_block}>
        <p className={cn(cl.title, 'h1')}>Вход в аккаунт</p>
        <p className={cn(cl.subtitle, 'normal')}>
          Сможете быстро оформлять заказы,
          <br />
          использовать бонусы
        </p>
        <p className="normal" onClick={() => onClickRegister()}>
          Отсутствует аккаунт?{' '}
          <span className={cl.registration}>Зарегистрируйтесь</span>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
