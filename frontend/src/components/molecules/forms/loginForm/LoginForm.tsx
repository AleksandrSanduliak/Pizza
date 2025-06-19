'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import LoadingButton from 'atoms/Buttons/buttons/LoadingButton/LoadingButton';
import FormItem from 'molecules/forms/FormItem/FormItem';
import { useLoginUserMutation } from 'store/api/authApi';
import { loginFormList } from 'utils/consts/forms/forms';
import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import useAccount from 'utils/hooks/ui/useAccount';
import { loginSchema, TFormLogin } from 'utils/zodSchemas/loginSchema';

import cl from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const { onClickAuth } = useAccount();

  const form = useForm<TFormLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TFormLogin> = (data) => {
    loginUser(data);
  };

  React.useEffect(() => {
    form.setFocus('email');
  }, [form, form.setFocus]);

  React.useEffect(() => {
    if (isSuccess) {
      NotificationFacade.toastSuccess({ message: 'Вы зашли в систему' });
      onClickAuth();
    }
    if (isError) {
      NotificationFacade.toastError({
        message: 'Ошибка входа, проверьте введенную почту и пароль',
      });
    }
  }, [isError, isSuccess, onClickAuth]);

  return (
    <FormProvider {...form}>
      <form className={cl.formLogin} onSubmit={form.handleSubmit(onSubmit)}>
        {loginFormList.map((item) => (
          <FormItem key={item.name} name={item.name} title={item.title} />
        ))}
        <LoadingButton isLoading={isLoading}>Отправить</LoadingButton>
        <p className={cn('mini', cl.description)}>
          Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским
          соглашением
        </p>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
