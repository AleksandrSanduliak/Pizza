'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useLoginUser } from '@features/auth/authApi';
import { LoginFields, loginSchema } from '@features/auth/login/login.model';
import { Button } from '@shared/ui/button/button';
import FormItem from '@shared/ui/inptuts/form-items/form-item';
import PasswordInput from '@shared/ui/inptuts/password-input/PasswordInput';

import styles from './login-form.module.scss';

const LoginForm: React.FC = () => {
  const { mutate: loginRequest, isPending } = useLoginUser();

  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    loginRequest(data);
  };

  React.useEffect(() => {
    form.setFocus('email');
  }, [form, form.setFocus]);

  return (
    <FormProvider {...form}>
      <form className={styles.formLogin} onSubmit={form.handleSubmit(onSubmit)}>
        <FormItem name="email" title="Email" />
        <FormItem name="password" title="Password" />
        <Button variant="primary" disabled={isPending} isLoading={isPending}>
          Отправить
        </Button>
        <div className={styles.description}>
          <p className={cn('mini', styles.descriptionText)}>
            Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским
            соглашением
          </p>
        </div>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
