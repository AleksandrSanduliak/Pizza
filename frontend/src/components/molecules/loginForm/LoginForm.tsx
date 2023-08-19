import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import cl from "./loginform.module.scss";
import { FormLogin } from "../../../utils/types";
import { loginSchema } from "../../../utils/zodSchemas/loginSchema";
import { useLoginUserMutation } from "../../../store/authApi";
import { toast } from "react-toastify";

export default function LoginForm() {
  // console.log("rendering login page");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(loginSchema) });
  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    // console.log(data, "data");
    loginUser(data);
  };
  const [isClicked, setIsClicked] = React.useState(false);
  const onClickAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsClicked((prev) => !prev);
  };
  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Вы зашли в систему", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      document.cookie = `accesToken=${data.accesToken}`;
    }
    if (isError) {
      console.log("login error");
      toast.error("Ошибка входа, проверьте введенную почту и пароль", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading]);
  return (
    <form className={cl.formlogin} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">
        {errors.email ? (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        ) : (
          <>Email</>
        )}
      </label>
      <input id="login" {...register("email")} />
      <label htmlFor="password">
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          <>Пароль</>
        )}
      </label>
      <input id="password" {...register("password")} />
      {isLoading ? (
        <Button isSubmit={true} isLoading={true}>
          Отправить
        </Button>
      ) : (
        <Button isSubmit={true}>Отправить</Button>
      )}
      <p className={cl.formlogin__desc}>
        Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и
        пользовательским соглашением
      </p>
    </form>
  );
}
