import React from "react";
import Dropdown from "../../../molecules/dropdown/Dropdown";
import "./HeaderTop.scss";
import AccImg from "../../../../assets/icons/isAccount.svg";
import Modal from "../../../molecules/modal/Modal";
import LoginForm from "../../../molecules/loginForm/LoginForm";
import { useAppSelector } from "../../../../utils/hooks/redux";
import RegisterForm from "../../../molecules/registerForm/RegisterForm";

const HeaderTop = () => {
  const user = useAppSelector((state) => state.reducer.auth.isAuth);
  const userdata = useAppSelector((state) => state.reducer.auth);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = React.useState(false);
  console.log(user, "user data account");
  console.log(userdata, "user data account");
  const onClickAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsClicked((prev) => !prev);
  };
  return (
    <div className="HeaderTop">
      <Dropdown />
      <div className="HeaderTop-leftblock">
        <p>Проверить адрес</p>
        <p>
          Среднее время доставки*:<span className="bold-span">00:24:19</span>
        </p>
      </div>
      <div className="HeaderTop-rightblock">
        <p>Время работы: с 11:00 до 23:00</p>
      </div>
      <div className="account" onClick={onClickAuth}>
        <img className="icon" src={AccImg} alt="Иконка Аккаунта"></img>
        {user ? (
          <>
            <p>Личный кабинет</p>
          </>
        ) : (
          <>
            <p>Войти в аккаунт</p>
            <Modal isClicked={isClicked}>
              {isRegisterClicked ? (
                <div>
                  <RegisterForm />
                  <button onClick={(e) => setIsRegisterClicked(false)}>
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
                  <p onClick={(e) => setIsRegisterClicked((prev) => !prev)}>
                    Регистрация
                  </p>
                  <LoginForm />
                </>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
