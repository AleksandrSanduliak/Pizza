import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { IRegisterFormFields } from 'utils/types/types';
import cl from './FormItem.module.scss';

interface IField {
  children: React.ReactNode;
  error?: FieldError;
  fieldKey: string;
}

const Field = ({ children, error, fieldKey }: IField) => {
  return (
    <motion.p
      key={fieldKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        ease: 'easeIn',
        duration: 0.2,
      }}
      className={cn('mini', { redColor: error })}>
      {children}
    </motion.p>
  );
};

const FormItem = ({
  name,
  title,
  type,
  mask,
  maskOptions,
  isRegisterMask,
}: IRegisterFormFields) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors?.[name as keyof typeof errors] as FieldError;
  const registerWithMask = useHookFormMask(register);

  const conditionalRegister = isRegisterMask
    ? { ...registerWithMask(name, mask ?? '', maskOptions) } // mask не должен быть undefined
    : { ...register(name) };
  return (
    <div>
      <label htmlFor={name} className="label">
        <AnimatePresence mode="wait">
          {fieldError ? (
            <Field fieldKey="loginError" error={fieldError}>
              {fieldError?.message}
            </Field>
          ) : (
            <Field fieldKey="loginTitle">{title}</Field>
          )}
        </AnimatePresence>
      </label>
      <input
        id={name}
        type={type}
        {...conditionalRegister}
        className={cn('input', cl.input, { [cl.inputError]: fieldError })}
      />
    </div>
  );
};

export default FormItem;
