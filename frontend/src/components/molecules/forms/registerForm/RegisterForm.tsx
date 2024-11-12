import { zodResolver } from '@hookform/resolvers/zod';
import { CompoundButton } from 'atoms/button/Button';
import cn from 'classnames';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from 'store/api/authApi';
import { registerFormList } from 'utils/consts/forms/forms';
import useAccount from 'utils/hooks/useAccount';
import { registerSchema, TFormRegister } from 'utils/zodSchemas/registerSchema';
import FormItem from '../FormItem/FormItem';
import cl from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { onClickRegister } = useAccount();
  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  React.useEffect(() => {
    if (isError) {
      toast.error('Ошибка регистрации', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    if (isSuccess) {
      toast.success('Вы успешно зарегистрировались, войдите в систему.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      onClickRegister();
    }
  }, [isError, isSuccess, onClickRegister]);

  const form = useForm<TFormRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TFormRegister> = (data) => registerUser(data);

  React.useEffect(() => {
    form.setFocus('name');
  }, [form]);

  return (
    <div className={cl.wrapper}>
      <h1 className={cn('h1', cl.title)}>Регистрация</h1>

      <FormProvider {...form}>
        <form
          className={cl.registerForm}
          onSubmit={form.handleSubmit(onSubmit)}>
          <p className={cn(cl.notification, 'mini')}>
            Продолжая, вы соглашаетесь со сбором и обработкой персональных
            данных и пользовательским соглашением
          </p>
          {registerFormList.map((item) => (
            <FormItem {...item} key={item.name} />
          ))}
          <div className={cl.buttons}>
            <CompoundButton onClick={() => onClickRegister()}>
              Назад
            </CompoundButton>
            <CompoundButton
              isSubmit={true}
              isLoading={isLoading ? true : false}>
              Отправить
            </CompoundButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
