'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import useUserMenu from '@entities/user-menu/useUserMenu';
import { useRegisterUser } from '@features/auth/authApi';
import { Register, registerSchema } from '@features/auth/register/register.model';
import { Button } from '@shared/ui/button/button';
import FormItem from '@shared/ui/inptuts/form-items/form-item';

import styles from './register.module.scss';

const FormFields = () => {
  return (
    <div className={styles.formFieldsWrapper}>
      <FormItem name="name" title="Имя" />
      <FormItem name="email" title="Email" />
      <FormItem
        name="phone"
        title="Номер телефона"
        mask={['+7 999 999-99-99']}
        maskOptions={{
          required: true,
        }}
      />
      <FormItem
        name="dateBirth"
        title="День рождения"
        mask="datetime"
        maskOptions={{
          inputFormat: 'dd-mm-yyyy',
          required: true,
        }}
      />
      <FormItem name="password" title="Пароль" />
      <FormItem name="confirmPassword" title="Подтверждение пароля" />
    </div>
  );
};

const RegisterForm = () => {
  const { actions } = useUserMenu();

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate: mutationFn, isPending } = useRegisterUser();
  const onSubmit: SubmitHandler<Register> = (data) => mutationFn(data);

  React.useEffect(() => {
    form.setFocus('name');
  }, [form]);

  return (
    <div className={styles.wrapper}>
      <h1 className={cn('h1', styles.title)}>Регистрация</h1>
      <FormProvider {...form}>
        <form className={styles.registerForm} onSubmit={form.handleSubmit(onSubmit)}>
          <label className={cn('mini', styles.notification)}>
            Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским
            соглашением
          </label>
          <FormFields />
          <motion.div layoutId="registerFormWrap" className={styles.buttons}>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                actions.toggleRegister();
              }}>
              Назад
            </Button>
            <Button variant="primary" disabled={isPending} isLoading={isPending}>
              Отправить
            </Button>
          </motion.div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
