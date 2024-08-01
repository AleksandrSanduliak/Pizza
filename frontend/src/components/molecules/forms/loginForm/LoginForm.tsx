import React from "react";

import { toast } from "react-toastify";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CompoundButton } from "atoms/button/Button";
import { useLoginUserMutation } from "store/api/authApi";
import { FormLogin } from "utils/types/types";
import { loginSchema } from "utils/zodSchemas/loginSchema";

import useAccount from "utils/hooks/useAccount";
import cl from "./loginform.module.scss";
import FormLabel from "atoms/formLabel/FormLabel";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<FormLogin>({ resolver: zodResolver(loginSchema) });
  const methods = useFormContext();
  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    loginUser(data);
    // reset();
  };
  const { onClickAuth } = useAccount();

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  React.useEffect(() => {
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
      onClickAuth();
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
  }, [data?.accesToken, isError, isSuccess, onClickAuth]);

  return (
    <form className={cl.formlogin} onSubmit={handleSubmit(onSubmit)}>
      {/* <label htmlFor="email" className="label">
        {errors.email ? (
          <span className={`${cl.formlogin__error} mini`}>
            {errors.email.message}
          </span>
        ) : (
          <p className="mini">Email</p>
        )}
      </label> */}
      <FormLabel htmlFor="email" title="Email" errors={errors} />
      <input id="email" {...register("email")} className="input" />
      <label htmlFor="password" className="label">
        {errors.password ? (
          <span className="mini" style={{ color: "red" }}>
            {errors.password.message}
          </span>
        ) : (
          <p className="mini">Пароль</p>
        )}
      </label>
      <input id="password" {...register("password")} className="input" />
      <CompoundButton isSubmit={true} isLoading={isLoading ? true : false}>
        Отправить
      </CompoundButton>
      <p className={`${cl.formlogin__desc} mini`}>
        Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и
        пользовательским соглашением
      </p>
    </form>
  );
};
export default LoginForm;
