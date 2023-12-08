import React from "react";

import { toast } from "react-toastify";
// import { withMask, useHookFormMask } from "use-mask-input";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "atoms/button/Button";
import { FormLogin } from "utils/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "store/api/authApi";
import { loginSchema } from "utils/zodSchemas/loginSchema";

import cl from "./loginform.module.scss";
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
  // const registerWithMask = useHookFormMask(register);
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

  return (
    <form className={cl.formlogin} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        {errors.email ? (
          <span className={cl.formlogin__error}>{errors.email.message}</span>
        ) : (
          <p className="mini">Email</p>
        )}
      </label>
      <input
        // ref={withMask("9999-9999")}
        id="email"
        {...register("email")}
        // {...registerWithMask("email", ["+9 999 999-99-99"], {
        //   required: true,
        // })}
        className="input"
      />

      <label htmlFor="password">
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          <p className="mini">Пароль</p>
        )}
      </label>
      <input id="password" {...register("password")} className="input" />
      <Button isSubmit={true} isLoading={isLoading ? true : false}>
        Отправить
      </Button>
      <p className={`${cl.formlogin__desc} mini`}>
        Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и
        пользовательским соглашением
      </p>
    </form>
  );
};
export default LoginForm;
