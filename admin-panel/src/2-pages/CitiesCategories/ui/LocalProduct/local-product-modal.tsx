import PrimaryModal from '@shared/ui/components/Modal/PrimaryModal/PrimaryModal';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const LocalProductModal = ({
  isOpenModal,
  closeModal,
  children,
}: {
  isOpenModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}) => {
  return (
    <PrimaryModal
      styles={{
        width: '90vw',
        maxWidth: '1200px',
        overflow: 'auto',
        height: '90vw',
        maxHeight: '90%',
      }}
      isOpenModal={isOpenModal}
      closeModal={closeModal}
    >
      <Box sx={{ mt: 6 }}>{children}</Box>
    </PrimaryModal>
  );
};
export default LocalProductModal;
