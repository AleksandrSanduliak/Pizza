import { Box, Modal, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface PrimaryModal {
  isOpenModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  styles?: SxProps;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  dislay: 'flex',
  gap: '1rem',
};

const PrimaryModal = ({ isOpenModal, closeModal, children, styles }: PrimaryModal) => {
  return (
    <Modal open={isOpenModal} onClose={closeModal}>
      <Box sx={{ ...style, ...styles }}>{children}</Box>
    </Modal>
  );
};

export default PrimaryModal;
