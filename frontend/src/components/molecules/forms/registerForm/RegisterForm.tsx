'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import { CompoundButton } from 'atoms/Buttons/Button';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import BaseButton from 'atoms/Buttons/BaseButton';
import LoadingButton from 'atoms/Buttons/buttons/LoadingButton/LoadingButton';
import { useRegisterUserMutation } from 'store/api/authApi';
import { registerFormList } from 'utils/consts/forms/forms';
import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import useAccount from 'utils/hooks/ui/useAccount';
import { registerSchema, TFormRegister } from 'utils/zodSchemas/registerSchema';

import cl from './RegisterForm.module.scss';
import FormItem from '../FormItem/FormItem';

const RegisterForm = () => {
  const { onClickRegister } = useAccount();
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterUserMutation();

  React.useEffect(() => {
    if (isError) {
      NotificationFacade.toastError({
        message: 'Произошла ошибка при регистрации, попробуйте позже.',
      });
    }

    if (isSuccess) {
      NotificationFacade.toastSuccess({
        message: 'Вы успешно зарегистрировались, войдите в систему.',
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
        <form className={cl.registerForm} onSubmit={form.handleSubmit(onSubmit)}>
          <label className={cn('mini', cl.notification)}>
            Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским
            соглашением
          </label>
          {registerFormList.map((item) => (
            <FormItem {...item} key={item.name} />
          ))}
          <motion.div layoutId="registerFormWrap" className={cl.buttons}>
            <BaseButton type="button" buttonMode="primary" onClick={() => onClickRegister()}>
              Назад
            </BaseButton>
            <LoadingButton isLoading={isLoading}>Отправить</LoadingButton>
          </motion.div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
