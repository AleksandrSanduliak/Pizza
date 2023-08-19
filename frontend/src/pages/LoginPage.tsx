import React from "react";
import Modal from "../components/molecules/modal/Modal";
import LoginForm from "../components/molecules/loginForm/LoginForm";
import { useLoginUserMutation } from "../store/authApi";
const LoginPage = () => {
  console.log("rendering login page");
  const [isClicked, setIsClicked] = React.useState(false);
  const onClickAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsClicked((prev) => !prev);
  };
  return (
    <div>
      <p>Войти в аккаунт</p>
      <Modal isClicked={isClicked}>
        <h2>Вход в аккаунт</h2>
        <p>
          Сможете быстро оформлять заказы,
          <br />
          использовать бонусы
        </p>
        <LoginForm />
      </Modal>
    </div>
  );
};

export default LoginPage;
