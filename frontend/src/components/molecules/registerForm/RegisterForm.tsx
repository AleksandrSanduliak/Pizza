import React from "react";
import cl from "./registerform.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUserMutation } from "../../../store/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import { toast } from "react-toastify";
import { registerSchema } from "../../../utils/zodSchemas/registerSchema";
import { FormRegister } from "../../../utils/types";

const dateBrithMask = createDefaultMaskGenerator("99-99-9999");
const phoneMask = createDefaultMaskGenerator("(+7) (999) 99 99");

const RegisterForm = () => {
  console.log("rendering register page");
  const [registerUser, { data, isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();
  if (isError) {
    // console.log("Ошибка регистрации");
    toast.error("Ошибка регистрации", {
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
  if (isSuccess) {
    toast.success("Вы успешно зарегистрировались, войдите в систему.", {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormRegister> = (data) => {
    console.log(data);
    registerUser(data);
  };

  console.log("register render");
  return (
    <form className={cl.registerform} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        {errors.name ? (
          <span style={{ color: "red" }}>{errors.name.message}</span>
        ) : (
          <>Имя:</>
        )}
      </label>
      <input id="name" {...register("name")} />

      <label htmlFor="email">
        {errors?.email ? (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        ) : (
          <>Email:</>
        )}
      </label>
      <input id="email" {...register("email")} />

      <label htmlFor="phone">
        {errors.phone ? (
          <span style={{ color: "red" }}>{errors.phone.message}</span>
        ) : (
          <>Номер телефона:</>
        )}
      </label>
      <input
        // maskGenerator={phoneMask}
        id="phone"
        // value="(+7)"
        {...register("phone")}
      />

      <label htmlFor="dateBrith">
        {errors.dateBrith ? (
          <span style={{ color: "red" }}>{errors.dateBrith.message}</span>
        ) : (
          <>День рождения</>
        )}
      </label>
      <input
        // maskGenerator={dateBrithMask}
        id="dateBrith"
        {...register("dateBrith")}
      />

      <label htmlFor="password">
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          <>Пароль</>
        )}
      </label>
      <input id="password" {...register("password")} />

      <label htmlFor="confirmPassword">
        {errors.confirmPassword ? (
          <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
        ) : (
          <>Подтверждение пароля</>
        )}
      </label>
      <input id="confirmPassword" {...register("confirmPassword")} />

      {isLoading ? (
        <Button isSubmit={true} isLoading={true}>
          Отправить
        </Button>
      ) : (
        <Button isSubmit={true}>Отправить</Button>
      )}
    </form>
  );
};

export default RegisterForm;
