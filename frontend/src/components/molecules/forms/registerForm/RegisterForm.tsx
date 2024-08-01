import React from "react";
import { useRegisterUserMutation } from "store/api/authApi";
import { Button, CompoundButton } from "atoms/button/Button";
import { registerSchema } from "utils/zodSchemas/registerSchema";
import { FormRegister } from "utils/types/types";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import cl from "./registerform.module.scss";
import { withMask, useHookFormMask } from "use-mask-input";
import useAccount from "utils/hooks/useAccount";
import FormInput from "atoms/formInput/FormInput";

const RegisterForm = () => {
  const { isAccountClick, isRegisterClick, onClickRegister, onClickAuth } =
    useAccount();
  const [registerUser, { data, isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  if (isError) {
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
    onClickRegister();
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormRegister>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormRegister> = (data) => {
    registerUser(data);
  };

  React.useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const registerWithMask = useHookFormMask(register);
  return (
    <div className={cl.wrapper}>
      <h1 className={`h1 ${cl.title}`}>Регистрация</h1>
      <form className={cl.registerform} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="label">
          {errors.name ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.name.message}
            </span>
          ) : (
            <p className="mini">Имя</p>
          )}
        </label>
        <input className="input" id="name" {...register("name")} />

        <label htmlFor="email" className="label">
          {errors?.email ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.email.message}
            </span>
          ) : (
            <p className="mini">Email</p>
          )}
        </label>
        <input
          className="input"
          id="email"
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <label htmlFor="phone" className="label">
          {errors.phone ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.phone.message}
            </span>
          ) : (
            <p className="mini">Номер телефона</p>
          )}
        </label>
        <input
          className="input"
          id="phone"
          {...registerWithMask("phone", ["+7 999 999-99-99"], {
            required: true,
          })}
        />
        <label htmlFor="dateBrith" className="label">
          {errors.dateBrith ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.dateBrith.message}
            </span>
          ) : (
            <p className="mini">День рождения</p>
          )}
        </label>
        <input
          className="input"
          id="dateBrith"
          {...registerWithMask("dateBrith", "datetime", {
            inputFormat: "dd-mm-yyyy",
            required: true,
          })}
        />
        <label htmlFor="password" className="label">
          {errors.password ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.password.message}
            </span>
          ) : (
            <p className="mini">Пароль</p>
          )}
        </label>
        <input className="input" id="password" {...register("password")} />
        <label htmlFor="confirmPassword" className="label">
          {errors.confirmPassword ? (
            <span className="mini" style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          ) : (
            <p className="mini">Подтверждение пароля</p>
          )}
        </label>
        <input
          className="input"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        <div className={cl.buttonWrapper}>
          <CompoundButton onClick={() => onClickRegister()}>
            Назад
          </CompoundButton>
          <CompoundButton isSubmit={true} isLoading={isLoading ? true : false}>
            Отправить
          </CompoundButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
