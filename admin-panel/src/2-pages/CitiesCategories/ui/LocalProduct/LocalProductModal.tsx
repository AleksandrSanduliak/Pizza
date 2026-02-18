import PrimaryModal from '@shared/ui/components/Modal/PrimaryModal/PrimaryModal';
import { Box } from '@mui/material';
import CityForm from './CityForm';

const LocalProductModal = ({ isOpenModal, closeModal, onSubmit, productData, buttonSlot }) => {
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
      <Box sx={{ mt: 6 }}>
        <CityForm productData={productData} onSubmit={onSubmit} buttonSlot={buttonSlot} />
      </Box>
    </PrimaryModal>
  );
};
export default LocalProductModal;
