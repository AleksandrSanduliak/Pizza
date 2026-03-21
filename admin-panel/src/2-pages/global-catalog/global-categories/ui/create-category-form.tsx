import { Box, Button, Tooltip } from '@mui/material';
import { useCreateCategoryMutation } from '@shared/api/Category';
import PrimaryModal from '@shared/ui/components/Modal/PrimaryModal/PrimaryModal';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextFormField from '@/5-shared/ui/components/Forms/fields/TextFormField/TextFormField';
import { capitalizeFirstLetter } from '@/5-shared/utils/uppercase-first-letter';

const CreateCategoryFormSchema = z.object({
  category: z
    .string()
    .min(3, 'Минимум 3 символа')
    .regex(/^[a-z]+$/i, 'Только латинские буквы')
    .toLowerCase(),
  categoryTitle: z
    .string()
    .min(3, 'Минимум 3 символа')
    .regex(/^[а-я]+$/i, 'Только русские буквы')
    .transform((val) => capitalizeFirstLetter(val)),
});

export type CategoryForm = z.infer<typeof CreateCategoryFormSchema>;

const CreateCategoryForm = () => {
  const { mutate: mutationFn } = useCreateCategoryMutation();

  const methods = useForm<CategoryForm>({
    resolver: zodResolver(CreateCategoryFormSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: CategoryForm) => {
    console.log('data', data);
    mutationFn(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Tooltip title='Пример: pizza, sushi' placement='top'>
          <TextFormField
            fullWidth
            id='global-form-category'
            name='category'
            label='Уникальный ключ категории (на латинице)'
          />
        </Tooltip>
        <TextFormField
          fullWidth
          id='global-form-categoryTitle'
          name='categoryTitle'
          label='Название категории(на русском)'
        />
        <Button type='submit'>Создать категорию</Button>
      </Box>
    </FormProvider>
  );
};

const CreateCategoryModal = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <Box>
      <Button onClick={openModal}>Cоздать категорию</Button>
      <PrimaryModal isOpenModal={isOpenModal} closeModal={closeModal}>
        <CreateCategoryForm />
      </PrimaryModal>
    </Box>
  );
};

export default CreateCategoryModal;
