import { zodResolver } from '@hookform/resolvers/zod';
import { CompoundButton } from 'atoms/button/Button';
import cn from 'classnames';
import FormItem from 'molecules/forms/FormItem/FormItem';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from 'store/api/authApi';
import { loginFormList } from 'utils/consts/forms/forms';
import useAccount from 'utils/hooks/useAccount';
import { loginSchema, TFormLogin } from 'utils/zodSchemas/loginSchema';
import cl from './loginform.module.scss';

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
      toast.success('Вы зашли в систему', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      onClickAuth();
    }
    if (isError) {
      toast.error('Ошибка входа, проверьте введенную почту и пароль', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isError, isSuccess, onClickAuth]);

  return (
    <FormProvider {...form}>
      <form className={cl.formlogin} onSubmit={form.handleSubmit(onSubmit)}>
        {loginFormList.map((item) => (
          <FormItem key={item.name} name={item.name} title={item.title} />
        ))}
        <CompoundButton
          onClick={form.handleSubmit(onSubmit)}
          isSubmit={true}
          isLoading={isLoading ? true : false}>
          Отправить
        </CompoundButton>
        <p className={cn(cl.formlogin__desc, 'mini')}>
          Продолжая, вы соглашаетесь со сбором и обработкой персональных данных
          и пользовательским соглашением
        </p>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
