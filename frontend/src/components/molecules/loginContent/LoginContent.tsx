import cl from "./logincontent.module.scss";
import LoginForm from "molecules/forms/loginForm/LoginForm";
import useAccount from "utils/hooks/useAccount";
const LoginContent = () => {
  const { onClickRegister } = useAccount();
  return (
    <div className={cl.wrapper}>
      <div className={cl.pre_block}>
        <p className={`${cl.title} h1`}>Вход в аккаунт</p>
        <p className={`${cl.subtitle} normal`}>
          Сможете быстро оформлять заказы,
          <br />
          использовать бонусы
        </p>
        <p className="normal" onClick={() => onClickRegister()}>
          Отсутствует аккаунт?{" "}
          <span className={cl.registration}>Зарегистрируйтесь</span>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginContent;
