import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import cl from "./loginform.module.scss";
import { FormLogin } from "../../../utils/types";
import { loginSchema } from "../../../utils/zodSchemas/loginSchema";
import { useLoginUserMutation } from "../../../store/authApi";
import { toast } from "react-toastify";

type LoginForm = {
  isClicked: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm: React.FC<LoginForm> = ({ isClicked, setClick }) => {
  console.log("rendering login page");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(loginSchema) });
  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    loginUser(data);
  };
  const onClickAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  React.useLayoutEffect(() => {
    if (isSuccess) {
      toast.success("Вы зашли в систему", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      document.cookie = `accesToken=${data.accesToken}`;
      setClick((prev: boolean) => (prev = false));
    }
    if (isError) {
      toast.error("Ошибка входа, проверьте введенную почту и пароль", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading]);
  console.log(isLoading, "isLoading");
  return (
    <form className={cl.formlogin} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        {errors.email ? (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        ) : (
          <>Email</>
        )}
      </label>
      <input id="email" {...register("email")} className="input" />

      <label htmlFor="password">
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          <>Пароль</>
        )}
      </label>
      <input id="password" {...register("password")} className="input" />
      <Button isSubmit={true} isLoading={isLoading ? true : false}>
        Отправить
      </Button>
      <p className={cl.formlogin__desc}>
        Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и
        пользовательским соглашением
      </p>
    </form>
  );
};
export default LoginForm;
