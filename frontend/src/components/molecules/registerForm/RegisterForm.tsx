import React from "react";
import { useRegisterUserMutation } from "store/api/authApi";
import { Button } from "atoms/button/Button";
import { registerSchema } from "utils/zodSchemas/registerSchema";
import { FormRegister } from "utils/types/types";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import cl from "./registerform.module.scss";
import { withMask, useHookFormMask } from "use-mask-input";
// const dateBrithMask = createDefaultMaskGenerator("99-99-9999");
// const phoneMask = createDefaultMaskGenerator("(+7) (999) 99 99");

const RegisterForm = ({ setIsRegisterClicked }) => {
  console.log("rendering register page");
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
    setIsRegisterClicked(false);
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
  const registerWithMask = useHookFormMask(register);
  console.log("register render");
  return (
    <>
      <form className={cl.registerform} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          {errors.name ? (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          ) : (
            <p className="mini">Имя</p>
          )}
        </label>

        <input
          // {...registerWithMask("name", ["+9 999 999-99-99"], {
          //   required: true,
          // })}
          className="input"
          id="name"
          {...register("name")}
        />
        <label htmlFor="email">
          {errors?.email ? (
            <span style={{ color: "red" }}>{errors.email.message}</span>
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
        <label htmlFor="phone">
          {errors.phone ? (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          ) : (
            <p className="mini">Номер телефона</p>
          )}
        </label>
        <input
          className="input"
          id="phone"
          {...registerWithMask("phone", ["+9 999 999-99-99"], {
            required: true,
          })}
        />
        <label htmlFor="dateBrith">
          {errors.dateBrith ? (
            <span style={{ color: "red" }}>{errors.dateBrith.message}</span>
          ) : (
            <p className="mini">День рождения</p>
          )}
        </label>
        <input
          className="input"
          // maskGenerator={dateBrithMask}
          id="dateBrith"
          // {...register("dateBrith")}
          {...registerWithMask("dateBrith", "datetime", {
            // inputFormat: "yyyy-mm-dd",
            inputFormat: "dd-mm-yyyy",
          })}
        />
        <label htmlFor="password">
          {errors.password ? (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          ) : (
            <p className="mini">Пароль</p>
          )}
        </label>
        <input className="input" id="password" {...register("password")} />
        <label htmlFor="confirmPassword">
          {errors.confirmPassword ? (
            <span style={{ color: "red" }}>
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
        {isLoading ? (
          <Button isSubmit={true} isLoading={true}>
            Отправить
          </Button>
        ) : (
          <Button isSubmit={true}>Отправить</Button>
        )}
      </form>
      <button onClick={() => setIsRegisterClicked(false)}>Назад</button>
    </>
  );
};

export default RegisterForm;
