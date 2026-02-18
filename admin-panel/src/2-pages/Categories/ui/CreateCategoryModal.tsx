import { Box, Button, TextField } from '@mui/material';
import { useCreateCategoryMutation } from '@shared/api/Category';
import { CategoryTitles } from '@shared/interface/category-interface';
import PrimaryModal from '@shared/ui/components/Modal/PrimaryModal/PrimaryModal';
import React from 'react';
import { useForm } from 'react-hook-form';

const CreateCategoryForm = () => {
  const { mutate: mutationFn } = useCreateCategoryMutation();

  const { register, handleSubmit } = useForm<CategoryTitles>();
  const onSubmit = (data: CategoryTitles) => {
    mutationFn(data);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField {...register('category')} label='Категория(на латинице)' />
      <TextField {...register('categoryTitle')} label='Категория(на русском)' />
      <Button type='submit'>Создать категорию</Button>
    </Box>
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
