import PrimaryModal from '@/5-shared/ui/components/Modal/PrimaryModal/PrimaryModal';
import { Box, Button } from '@mui/material';
import React from 'react';
import CreateCityForm from './CreateCityForm';

const CreateCityModal = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <Box>
      <Button onClick={openModal}>Cоздать Город</Button>
      <PrimaryModal isOpenModal={isOpenModal} closeModal={closeModal}>
        <CreateCityForm />
      </PrimaryModal>
    </Box>
  );
};

export default CreateCityModal;
