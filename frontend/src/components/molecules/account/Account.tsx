import React from "react";
import AccImg from "assets/icons/isAccount.svg";
import Modal from "molecules/modal/Modal";
import LoginForm from "molecules/loginForm/LoginForm";
import RegisterForm from "molecules/registerForm/RegisterForm";
import { useAppSelector } from "utils/hooks/redux";
import { stopBubling } from "utils/funcs/stopBubling";
import cl from "./account.module.scss";

const Account = () => {
  const user = useAppSelector((state) => state.reducer.auth.isAuth);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = React.useState(false);

  const onClickAuth = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsClicked((prev) => !prev);
    console.log(isClicked, "isClicked Modal");
    stopBubling(e);
  };
  const onClickRegister = () => {
    setIsRegisterClicked((prev) => !prev);
  };

  return (
    <div className="account" onClick={onClickAuth}>
      <img
        className="icon"
        loading="lazy"
        src={AccImg}
        alt="Иконка Аккаунта"
      ></img>
      {user ? (
        <>
          <p className={cl.account__text}>Личный кабинет</p>
        </>
      ) : (
        <>
          <p className={cl.account__text}>Войти в аккаунт</p>
          <Modal isClicked={isClicked}>
            {isRegisterClicked ? (
              <div>
                <RegisterForm />
                <button onClick={() => setIsRegisterClicked(false)}>
                  Назад
                </button>
              </div>
            ) : (
              <>
                <h2>Вход в аккаунт</h2>
                <p>
                  Сможете быстро оформлять заказы,
                  <br />
                  использовать бонусы
                </p>
                <p onClick={onClickRegister}>Регистрация</p>
                <LoginForm isClicked={isClicked} setClick={setIsClicked} />
              </>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Account;
