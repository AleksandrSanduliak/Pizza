import { Box, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldView } from '@entities/ProductForm/model/fields';

const TextFormField = ({ name, label, ...fieldProps }: FormFieldView) => {
  const { control, register } = useFormContext();
  if (!control || !register) {
    console.error(
      'Control или register не передан в компонент TextFormField либо используется вне FormProvider '
    );
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...register(name)}
            helperText={error ? error.message : null}
            error={!!error}
            label={label}
            id={name}
            variant='outlined'
            {...field}
            {...fieldProps}
          />
        );
      }}
    />
  );
};

export default TextFormField;
