import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldView } from '../../../../../../4-entities/ProductForm/model/fields';
const NumberFormField = ({ name, label, ...fieldProps }: FormFieldView) => {
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
      render={({ field }) => {
        return (
          <TextField
            {...(register(name),
            {
              valueAsNumber: true,
            })}
            label={label}
            id={name}
            type='number'
            slotProps={{
              htmlInput: {
                step: 'any',
                type: 'number',
              },
            }}
            variant='outlined'
            {...field}
            {...fieldProps}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        );
      }}
    />
  );
};

export default NumberFormField;
