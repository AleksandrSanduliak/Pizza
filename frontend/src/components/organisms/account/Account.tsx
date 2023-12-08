import React from "react";

import Modal from "molecules/modal/Modal";
import AccImg from "assets/icons/isAccount.svg";
import { useAppSelector } from "utils/hooks/redux";
import LoginForm from "molecules/loginForm/LoginForm";
import { stopBubling } from "utils/funcs/stopBubling";
import RegisterForm from "molecules/registerForm/RegisterForm";

import cl from "./account.module.scss";
import clLogin from "./loginform.module.scss";
import { useLogoutUserMutation } from "store/api/authApi";
import { Link, useNavigate, useLocation } from "react-router-dom";
const Account = () => {
  const user = useAppSelector((state) => state.reducer.auth.isAuth);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = React.useState(false);
  const [isOpenDropdown, setOpenDropdown] = React.useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, { data, isLoading, isError, error, isSuccess }] =
    useLogoutUserMutation();
  const accountWrapper = React.useRef(null);
  const clickAllowedInner = React.useRef(null);
  const onClickAuth = (e) => {
    e.preventDefault();
    stopBubling(e);
    setIsClicked((prev) => !prev);
    console.log(isClicked, "isClicked Modal");
  };
  const onClickCabinet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    stopBubling(e);
    // console.log(e.target, "target");
    // console.log(accountWrapper.current, "ref");
    // console.log(accountWrapper.current.contains(e.target), "result");
    // console.log(clickAllowedInner.current, "allowedClick");

    if (accountWrapper.current.contains(e.target)) {
      console.log("click inslide");
      setOpenDropdown((prev) => !prev);
      if (clickAllowedInner.current.contains(e.target)) {
        console.log("include");
        setOpenDropdown(true);
      }
      return;
    }
    setOpenDropdown(false);
    // console.log("клик вне блока");
  };
  React.useEffect(() => {
    document.addEventListener("click", onClickCabinet);
    return () => document.removeEventListener("click", onClickCabinet);
  }, []);
  const onClickRegister = () => {
    setIsRegisterClicked((prev) => !prev);
  };
  const logoutClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div
      className="account"
      ref={accountWrapper}
      onClick={user ? onClickCabinet : onClickAuth}
    >
      <div className={cl.account__inner}>
        <img
          className="icon"
          loading="lazy"
          src={AccImg}
          alt="Иконка Аккаунта"
        ></img>
        {user ? (
          <>
            <p className={cl.account__text}>Личный кабинет</p>
            <div
              ref={clickAllowedInner}
              className={`${cl.account__cabinet}  ${
                isOpenDropdown ? cl.activeCabinet : ""
              }`}
            >
              <p
                className={`${cl.account__cabinet_bonus} ${cl.account__cabinet_text} subtitle2`}
              >
                100 бонусов
              </p>
              <div className={cl.account__cabinet_content}>
                <Link to="/orderhistory">
                  <p className={`${cl.account__cabinet_text} normal`}>
                    История заказов
                  </p>
                </Link>
                <Link to="/settings">
                  <p className={`${cl.account__cabinet_text} normal`}>
                    Настройки
                  </p>
                </Link>
              </div>
              <p
                className={`${cl.account__cabinet_logout} ${cl.account__cabinet_text} normal`}
                onClick={logoutClick}
              >
                Выход из аккаунта
              </p>
            </div>
          </>
        ) : (
          <>
            <p className={cl.account__text}>Войти в аккаунт</p>
            <Modal isClicked={isClicked}>
              {isRegisterClicked ? (
                <div>
                  <RegisterForm setIsRegisterClicked={setIsRegisterClicked} />
                </div>
              ) : (
                <>
                  <div className={clLogin.pre_block}>
                    <p className={`${clLogin.title} h1`}>Вход в аккаунт</p>
                    <p className={`${clLogin.subtitle} normal`}>
                      Сможете быстро оформлять заказы,
                      <br />
                      использовать бонусы
                    </p>
                    <p className="normal" onClick={onClickRegister}>
                      Отсутствует аккаунт? Пройдите{" "}
                      <span className={clLogin.registration}>Регистрацию</span>
                    </p>
                  </div>
                  <LoginForm isClicked={isClicked} setClick={setIsClicked} />
                </>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
