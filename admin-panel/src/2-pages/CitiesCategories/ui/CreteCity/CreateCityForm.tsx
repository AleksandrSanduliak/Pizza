import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useCreateCityMutation } from '../../api/api';
import { CityFormFields } from '../CititesCategories';

const CreateCityForm = () => {
  const { register, handleSubmit, control } = useForm<CityFormFields>({
    defaultValues: {
      city: '',
      name: '',
      url: '',
      isActive: true,
    },
  });

  const { mutate: mutationFn } = useCreateCityMutation();
  const onSubmit = (data: CityFormFields) => {
    console.log('data', data);
    mutationFn(data);
  };

  return (
    <Box
      component='form'
      sx={{ display: 'flex', flexDirection: 'column', width: '150px', gap: 2.5 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField {...register('city')} label='Город' />
      <TextField {...register('name')} label='Название' />
      <TextField {...register('url')} label='URL' />
      <Controller
        name='isActive'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>Статус города</FormLabel>
            <RadioGroup {...field}>
              <FormControlLabel value='true' control={<Radio />} label='Доступен' />
              <FormControlLabel value='false' control={<Radio />} label='Недоступен' />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Button type='submit'>Создать</Button>
    </Box>
  );
};

export default CreateCityForm;
